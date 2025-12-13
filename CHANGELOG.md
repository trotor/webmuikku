# Changelog

Kaikki merkittävät muutokset projektiin dokumentoidaan tähän.

Formaatti perustuu [Keep a Changelog](https://keepachangelog.com/fi/1.0.0/),
ja tämä projekti noudattaa [semanttista versiointia](https://semver.org/lang/fi/).

## [1.1.0] - 2025-12-13

### Muutettu
- 🔧 **Yksinkertaistettu arkkitehtuuri**
  - Poistettu proxy-palvelimen vaatimus
  - Sovellus käyttää nyt suoraa yhteyttä Traficomin WMTS-palveluun
  - Yksinkertaisemmat asennusohjeet
  - Ei tarvita Node.js:ää

### Poistettu
- ❌ Proxy-palvelin (utils/proxy-server.js)
- ❌ Node.js riippuvuudet
- ❌ npm start -skripti

### Lisätty
- 📸 Sovelluksen screenshot dokumentaatiossa

## [1.0.0] - 2025-12-13

### Lisätty
- 🗺️ **42 Traficomin karttatasoa**
  - Veneilykartat, rannikkokartat, satamakartat
  - Yleiskartat 1:100k ja 1:250k
  - Yksittäiset sarjat A-V
  - Kooste "Kaikki merikartat"
- 📍 **GPS-paikannus ja seuranta**
  - Reaaliaikainen sijainnin seuranta
  - Automaattinen kartan keskitys
  - Nopeus solmuina (kn)
  - Kurssi (°)
  - GPS-tarkkuuden näyttö
- 📊 **Koordinaatit ja tiedot**
  - WGS84-koordinaatit (desimaaliasteet)
  - EUREF-FIN koordinaatit (ETRS-TM35FIN)
  - Proj4.js koordinaattimuunnokset
- 🌅 **Auringon ajat**
  - Auringonnousu
  - Auringonlasku
  - SunCalc.js kirjasto
- 🎯 **Käyttöliittymä**
  - Yksinkertainen keskityspainike
    - Yksi klikkaus = Keskitä kartta
    - Tuplaklikkaus = Toggle automaattinen seuranta
  - Karttatasojen vaihto
  - Zoom-tason näyttö
  - Kartan keskipisteen koordinaatit
- 🔧 **Proxy-palvelin**
  - Node.js proxy CORS-ongelmien kiertämiseen
  - WMTS-pyyntöjen välitys Traficomille
  - Cross-Origin-Resource-Policy headerit
- 📱 **Mobiilioptimoidut ominaisuudet**
  - Kosketusnäytölle optimoitu
  - Wake Lock API (näyttö pysyy päällä)
  - Responsiivinen design
  - PWA-valmius
- 📄 **Dokumentaatio**
  - README.md suomeksi
  - Asennusohjeet
  - Käyttöohjeet
  - Tekninen dokumentaatio

### Tekninen toteutus
- Leaflet.js 1.9.4 - Karttakirjasto
- Proj4.js 2.11.0 - Koordinaattimuunnokset
- SunCalc.js 1.9.0 - Auringon ajat
- Node.js - Proxy-palvelin
- Traficom WMTS REST API

### Tiedossa olevat rajoitukset
- CORS-esto vaatii proxy-palvelimen
- GPS toimii vain HTTPS:llä tai localhost:ssa
- Merikartat kattavat vain merialueet (ei sisävesiä)

## [Tulossa]

### Suunniteltu versio 1.1.0
- 💾 Offline-tuki (Service Worker)
- 📌 Waypoint-merkinnät
- 📏 Etäisyyksien mittaus
- 🧭 Kompassinäkymä
- 📈 Reitin tallennus
- 🎨 Teemavaihtoehdot (päivä/yö)

### Mahdolliset tulevat ominaisuudet
- 🌊 Vesisyvyyden näyttö
- 🌪️ Sääennusteet
- 🐟 Kalastuspaikkojen tallennus
- 📤 GPX-tiedostojen vienti
- 🔔 Ankkurivahti
- 📱 PWA-asennus kotinäytölle

---

[1.1.0]: https://github.com/trotor/webmuikku/releases/tag/v1.1.0
[1.0.0]: https://github.com/trotor/webmuikku/releases/tag/v1.0.0
