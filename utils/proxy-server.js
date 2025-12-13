const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Enable CORS and CORP to prevent ORB blocking
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

    // Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Parse the request URL
    const parsedUrl = url.parse(req.url, true);

    // Extract Traficom WMTS parameters from query string
    const layer = parsedUrl.query.layer;
    const z = parsedUrl.query.z;
    const x = parsedUrl.query.x;
    const y = parsedUrl.query.y;

    if (!layer || !z || !x || !y) {
        res.writeHead(400, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Cross-Origin-Resource-Policy': 'cross-origin'
        });
        res.end('Missing parameters. Required: layer, z, x, y');
        return;
    }

    // Construct Traficom WMTS URL (TileMatrix format: WGS84_Pseudo-Mercator:z)
    // WMTS REST format: .../TileMatrixSet/TileMatrix/TileRow/TileCol
    // Leaflet sends: z={z}, x={col}, y={row}
    const tileMatrix = `WGS84_Pseudo-Mercator:${z}`;
    const traficomUrl = `https://julkinen.traficom.fi/rasteripalvelu/wmts/rest/${encodeURIComponent(layer)}/default/WGS84_Pseudo-Mercator/${tileMatrix}/${y}/${x}?format=image/png`;

    console.log(`Proxying: ${traficomUrl}`);

    // Fetch from Traficom
    https.get(traficomUrl, (traficomRes) => {
        console.log(`Response: ${traficomRes.statusCode} ${traficomRes.headers['content-type']}`);

        // Forward status code and headers with CORP to prevent ORB blocking
        const headers = {
            'Content-Type': traficomRes.headers['content-type'] || 'image/png',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Cross-Origin-Resource-Policy': 'cross-origin'
        };

        res.writeHead(traficomRes.statusCode, headers);

        // Pipe the response data
        traficomRes.pipe(res);
    }).on('error', (err) => {
        console.error('Error fetching from Traficom:', err);
        res.writeHead(500, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Cross-Origin-Resource-Policy': 'cross-origin'
        });
        res.end('Error fetching tile');
    });
});

server.listen(PORT, () => {
    console.log(`Traficom WMTS Proxy running on http://localhost:${PORT}`);
    console.log(`Usage: http://localhost:${PORT}?layer=Traficom:Merikarttasarja%20C%20public&z=10&x=123&y=456`);
});
