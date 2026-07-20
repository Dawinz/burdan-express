# Burdan Express — API-Powered Booking Demos

These demos use the **official SafariPlus REST API v2** with Burdan’s live
operator account (`2203260042`), authenticated via `X-API-Key`.

Docs:
- Widget embed: https://demo.safariyetu.com/safariplus/v1/examples/embed.html
- REST API: https://demo.safariyetu.com/safariplus/v2/docs

| Folder | What it is | Tech |
| --- | --- | --- |
| `mock-api/` | Server-side SafariPlus proxy (keeps API key private) | Node.js + Express |
| `web-api-demo/` | Professional booking **website** | React + Vite + Tailwind |
| `mobile-app/` | Professional booking **mobile app** | Flutter |

The main marketing site (`src/`) uses the official SafariPlus **widget** with
`apiKey` + `operatorId` + `brand`, per the embed guide.

---

## Live links

- Marketing site (widget): https://burdan-express.vercel.app
- Web API demo: https://web-api-demo-sigma.vercel.app
- Booking API proxy: https://mock-api-jet-theta.vercel.app

---

## Authentication

```http
X-API-Key: <your-safariplus-key>
```

Set these server env vars for the proxy (`mock-api/`):

```bash
SAFARIPLUS_API_KEY=sp_...
SAFARIPLUS_OPERATOR_ID=2203260042
SAFARIPLUS_BASE=https://www.safariyetu.com/safariplus
```

For the marketing site (CRA):

```bash
REACT_APP_SAFARIPLUS_API_KEY=sp_...
```

Never commit real keys. Use `.env` locally (gitignored) and Vercel project env vars in production.

---

## Booking flow (web & mobile)

1. Search — cities + live SafariPlus `/v2/searches`
2. Trips — real Burdan departures, fares, seat counts
3. Seats — live seat map from the search result
4. Details — passenger + contact
5. Payment — creates a real trip via `POST /v2/trips`, then initiates payment
6. Ticket — reference + QR

> Payment may trigger a **live USSD** prompt on the contact phone number.

---

## Run locally

### 1) API proxy

```bash
cd mock-api
cp .env.example .env   # paste your API key
npm install
npm start              # http://localhost:4000
```

### 2) Web demo

```bash
cd web-api-demo
npm install
npm run dev            # http://localhost:5175 → localhost:4000
```

### 3) Flutter app

```bash
cd mobile-app
flutter pub get
flutter run --dart-define=API_BASE=http://localhost:4000
```

### 4) Marketing site widget

```bash
# repo root
echo 'REACT_APP_SAFARIPLUS_API_KEY=sp_...' > .env
npm start
```

---

## Proxy endpoints

```
GET  /api/cities
GET  /api/trips?origin=&destination=&date=&passengers=
POST /api/bookings
GET  /api/bookings/:tripId/payments
POST /api/bookings/:tripId/pay
GET  /api/bookings/:tripId
DELETE /api/bookings/:tripId
```
