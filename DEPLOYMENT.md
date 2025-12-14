# WebMuikku Deployment-ohjeet

## GitHub Secrets -konfiguraatio

Lisää nämä secretit GitHubissa: **Repository → Settings → Secrets and variables → Actions → New repository secret**

| Secret Name     | Arvo                     | Kuvaus                          |
|-----------------|--------------------------|----------------------------------|
| SSH_PRIVATE_KEY | ✓ Lisätty jo             | SSH private key palvelimelle     |
| SSH_HOST        | muikku.muikea.fi         | Palvelimen osoite                |
| SSH_USER        | muikku                   | SSH käyttäjätunnus               |
| DEPLOY_PATH     | /home/muikku/apps/muikku | Deployment-polku palvelimella    |

## Palvelimen rakenne

```
/home/muikku/apps/muikku/
├── dist/              ← Frontend (nginx palvelee tästä)
│   ├── index.html
│   └── screenshots/
├── package.json
├── README.md
└── LICENSE
```

## Deployment-prosessi

### Automaattinen deployment (GitHub Actions)

1. Push koodi main-branchiin:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. GitHub Actions käynnistyy automaattisesti ja:
   - Luo dist-kansion
   - Kopioi index.html ja screenshots dist-kansioon
   - Deployaa tiedostot palvelimelle rsync:llä
   - Verifoi deploymentin

3. Seuraa deploymenttiä: **GitHub → Actions → Deploy to Muikku Server**

### Manuaalinen deployment

Jos haluat deployata ilman pushia:

1. Mene GitHub → Actions
2. Valitse "Deploy to Muikku Server"
3. Klikkaa "Run workflow" → "Run workflow"

### Paikallinen testaus ennen deploymenttiä

```bash
npm run serve
# Avaa http://localhost:8000
```

## Vianmääritys

### SSH-yhteys ei toimi
- Tarkista että SSH_PRIVATE_KEY on oikea
- Varmista että public key on palvelimella: `~/.ssh/authorized_keys`

### Deployment epäonnistuu
- Tarkista GitHub Actions logit
- Varmista että polku `/home/muikku/apps/muikku` on olemassa palvelimella
- Tarkista käyttöoikeudet: `chown -R muikku:muikku /home/muikku/apps/muikku`

### Sivusto ei päivity
- Tyhjennä selaimen cache (Ctrl+Shift+R / Cmd+Shift+R)
- Tarkista nginx config että root osoittaa: `/home/muikku/apps/muikku/dist`

## Nginx-konfiguraatio

Varmista että nginx config sisältää:

```nginx
server {
    listen 80;
    server_name muikku.muikea.fi;

    root /home/muikku/apps/muikku/dist;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

## Muistiinpanoja

- **Ei buildia**: WebMuikku on staattinen sivu, ei vaadi npm buildia
- **Dist-kansio**: Luodaan automaattisesti deploymentissä
- **Rsync --delete**: Poistaa vanhat tiedostot, pitää dist-kansion puhtaana
