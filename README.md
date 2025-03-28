# NTP API via Vercel

Expose `/api/current-time` pour retourner l'heure UTC actuelle.

Basé sur l'API publique : https://worldtimeapi.org/api/timezone/Etc/UTC

## Endpoints

- `GET /api/current-time` → `{ "utc_datetime": "..." }`
- `GET /openapi.json` → OpenAPI spec pour intégrer dans ChatGPT Custom GPTs

## Déploiement

1. Crée un repo GitHub : `ntp-api-vercel`
2. Déploie avec Vercel (https://vercel.com/import)
3. Ajoute `https://.../openapi.json` dans ChatGPT → GPTs → Actions