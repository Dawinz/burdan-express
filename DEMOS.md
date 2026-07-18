# Burdan Express — API-Powered Booking Demos

This repository now contains **two additional demo versions** that show how a
Burdan Express booking experience looks when it is built on a **real HTTP API**
(search → seat selection → passenger details → payment → digital ticket),
instead of embedding a third‑party booking widget script.

There are three new folders:

| Folder          | What it is                                    | Tech                         |
| --------------- | --------------------------------------------- | ---------------------------- |
| `mock-api/`     | Shared mock booking API (fake but realistic)  | Node.js + Express            |
| `web-api-demo/` | Professional booking **website**              | React + Vite + Tailwind CSS  |
| `mobile-app/`   | Professional booking **mobile app**           | Flutter (iOS / Android / web)|

> All data is **fake** and no real payment is charged. These are demonstrations.

---

## Live links (already deployed)

- **Web demo:** https://web-api-demo-sigma.vercel.app
- **Mock API:** https://mock-api-jet-theta.vercel.app

Both the web app and the mobile app talk to the same live mock API, so the whole
flow works out of the box.

---

## The booking flow (both web & mobile)

1. **Search** — pick origin, destination, date, passengers (cities load from the API).
2. **Trips** — live list of departures with bus, times, price and seats available.
3. **Seats** — interactive seat map; choose your exact seat(s).
4. **Details** — enter passenger names and contact.
5. **Payment** — choose M‑Pesa / Airtel Money / Card (mock).
6. **Ticket** — instant digital e‑ticket with a QR code.

---

## Mock API

### Run locally

```bash
cd mock-api
npm install
npm start          # http://localhost:4000
```

### Endpoints

```
GET  /api/cities
GET  /api/trips?origin=&destination=&date=&passengers=
GET  /api/trips/:id
GET  /api/trips/:id/seats
POST /api/bookings
POST /api/bookings/:reference/pay
GET  /api/bookings/:reference
```

This is where a **real** SafariPlus (or any provider) REST integration would
slot in later — the clients only depend on this HTTP contract, not on an
embedded script.

---

## Web demo (`web-api-demo`)

### Run locally

```bash
# 1) start the mock API first (see above)
cd web-api-demo
npm install
npm run dev        # http://localhost:5175  (uses http://localhost:4000 by default)
```

The production build points at the deployed API via `.env.production`
(`VITE_API_BASE`).

### Deploy

```bash
cd web-api-demo
vercel --prod
```

---

## Mobile app (`mobile-app`, Flutter)

### Run locally

```bash
cd mobile-app
flutter pub get

# Against the live deployed API (default):
flutter run

# Against a local mock API:
flutter run --dart-define=API_BASE=http://localhost:4000
```

Runs on an iOS simulator, Android emulator, a physical device, or Chrome
(`flutter run -d chrome`).

### Build

```bash
flutter build apk        # Android
flutter build ios        # iOS (needs Xcode)
flutter build web        # Web
```

The API base URL is set in `lib/config.dart` (override with
`--dart-define=API_BASE=...`).

---

## Why this is more professional than the widget script

- **Full control of the UX** — your own seat map, branding, copy and steps.
- **Consistent across web & mobile** — one API, two native-feeling front ends.
- **No screen-blocking third-party overlay** — everything is first‑party UI.
- **Swappable backend** — replace the mock API with the real provider's REST API
  without changing the apps.
