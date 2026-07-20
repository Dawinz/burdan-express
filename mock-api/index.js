require('dotenv').config();
'use strict';

/**
 * Burdan Express booking API — thin proxy over SafariPlus REST v2.
 * Docs: https://demo.safariyetu.com/safariplus/v2/docs
 *
 * Keeps the SafariPlus API key server-side. Clients talk only to this API.
 */

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SAFARIPLUS_BASE = process.env.SAFARIPLUS_BASE || 'https://www.safariyetu.com/safariplus';
const API_KEY = process.env.SAFARIPLUS_API_KEY || '';
const OPERATOR_ID = process.env.SAFARIPLUS_OPERATOR_ID || '2203260042';

const CITY_CATALOG = [
  { id: 'dar-es-salaam', name: 'Dar es Salaam', search: 'Dar es Salaam' },
  { id: 'lindi', name: 'Lindi', search: 'Lindi' },
  { id: 'masasi', name: 'Masasi', search: 'Masasi' },
  { id: 'kilwa', name: 'Kilwa Masoko', search: 'Kilwa' },
  { id: 'mtwara', name: 'Mtwara', search: 'Mtwara' },
  { id: 'nangurukuru', name: 'Nangurukuru', search: 'Nangurukuru' },
  { id: 'nachingwea', name: 'Nachingwea', search: 'Nachingwea' },
  { id: 'newala', name: 'Newala', search: 'Newala' },
  { id: 'tandahimba', name: 'Tandahimba', search: 'Tandahimba' },
  { id: 'ruangwa', name: 'Ruangwa', search: 'Ruangwa' },
];

function cityById(id) {
  return CITY_CATALOG.find((c) => c.id === id) || { id, name: id, search: id };
}

function parseMoney(amount) {
  if (typeof amount === 'number') return amount;
  return Number(String(amount || '0').replace(/,/g, '')) || 0;
}

async function safariFetch(path, options = {}) {
  if (!API_KEY) {
    const err = new Error('SAFARIPLUS_API_KEY is not configured on the server');
    err.status = 500;
    throw err;
  }
  const res = await fetch(`${SAFARIPLUS_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const err = new Error(data.detail || data.title || `SafariPlus error (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

function mapSearchItem(item) {
  const price = parseMoney(item.fareAmount);
  const seats = Array.isArray(item.seats) ? item.seats : [];
  return {
    id: `${item.safariId}__${item.fareQuoteId}`,
    safariId: item.safariId,
    fareQuoteId: item.fareQuoteId,
    serviceClassId: item.serviceClassId,
    fareName: item.fareName,
    operator: item.operatorName || 'Burdan Express',
    operatorId: item.operatorId || OPERATOR_ID,
    origin: item.origin?.id,
    originName: item.origin?.name || item.origin?.city,
    originCity: item.origin?.state || item.origin?.city,
    destination: item.destination?.id,
    destinationName: item.destination?.name || item.destination?.city,
    destinationCity: item.destination?.state || item.destination?.city,
    date: item.origin?.departureDate,
    departureTime: item.origin?.departureTime,
    arrivalTime: item.destination?.arrivalTime,
    arrivesNextDay: item.destination?.arrivalDate && item.origin?.departureDate
      ? item.destination.arrivalDate !== item.origin.departureDate
      : false,
    durationHours: null,
    price,
    currency: item.currencyCode || 'TZS',
    bus: {
      id: item.vehicleNumber,
      name: item.serviceClassName || item.safariName || 'Burdan Express',
      model: item.safariName || 'Yutong',
      plate: item.vehicleNumber || '',
      rating: 4.8,
    },
    amenities: ['Air Conditioning', 'Reclining Seats', 'USB Charging'],
    totalSeats: item.seatsCount || seats.length,
    seatsAvailable: item.availableSeatsCount ?? seats.filter((s) => s.available).length,
    seats,
    pickupPoints: item.pickupPoints || [],
    dropoffPoints: item.dropoffPoints || [],
    raw: item,
  };
}

function mapSeatGrid(seats) {
  return (seats || []).map((s) => ({
    label: String(s.label),
    row: s.rowIndex ?? 0,
    col: String.fromCharCode(65 + (s.columnIndex ?? 0)),
    columnIndex: s.columnIndex ?? 0,
    aisleAfter: (s.columnIndex ?? 0) === 1 || (s.columnIndex ?? 0) === 3,
    occupied: s.available === false,
  }));
}

app.get('/', (req, res) => {
  res.json({
    name: 'Burdan Express Booking API',
    version: '2.0.0',
    poweredBy: 'SafariPlus REST v2',
    docs: 'https://demo.safariyetu.com/safariplus/v2/docs',
    authenticated: Boolean(API_KEY),
    endpoints: [
      'GET  /api/cities',
      'GET  /api/trips?origin=&destination=&date=&passengers=',
      'GET  /api/trips/:id/seats',
      'POST /api/bookings',
      'GET  /api/bookings/:tripId/payments',
      'POST /api/bookings/:tripId/pay',
      'GET  /api/bookings/:tripId',
      'DELETE /api/bookings/:tripId',
    ],
  });
});

app.get('/api/cities', (req, res) => {
  res.json({
    cities: CITY_CATALOG.map(({ id, name }) => ({ id, name, region: 'Tanzania' })),
  });
});

app.get('/api/trips', async (req, res) => {
  try {
    const { origin, destination, date, passengers } = req.query;
    if (!origin || !destination) {
      return res.status(400).json({ error: 'origin and destination are required' });
    }
    if (origin === destination) {
      return res.status(400).json({ error: 'origin and destination must differ' });
    }
    const travelDate = date || new Date().toISOString().slice(0, 10);
    const pax = Math.max(1, parseInt(passengers, 10) || 1);
    const from = cityById(origin);
    const to = cityById(destination);

    const qs = new URLSearchParams({
      origin: from.search,
      destination: to.search,
      departureDate: travelDate,
      passengersCount: String(pax),
      operatorId: OPERATOR_ID,
    });

    const page = await safariFetch(`/v2/searches?${qs.toString()}`);
    const trips = (page.items || [])
      .filter((item) => !OPERATOR_ID || item.operatorId === OPERATOR_ID)
      .map(mapSearchItem)
      .filter((t) => t.seatsAvailable >= pax);

    res.json({
      query: { origin, destination, date: travelDate, passengers: pax },
      count: trips.length,
      trips,
      source: 'safariplus',
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message, detail: err.data });
  }
});

app.get('/api/trips/:id/seats', async (req, res) => {
  try {
    const [safariId, fareQuoteId] = String(req.params.id).split('__');
    if (!safariId || !fareQuoteId) {
      return res.status(400).json({ error: 'invalid trip id' });
    }
    // Re-search around today+7 to locate the quote, then return its seats.
    // Clients should prefer seats already returned on the trip card.
    const today = new Date();
    let found = null;
    for (let i = 0; i < 10 && !found; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const ymd = d.toISOString().slice(0, 10);
      const qs = new URLSearchParams({
        origin: 'Dar es Salaam',
        destination: 'Lindi',
        departureDate: ymd,
        operatorId: OPERATOR_ID,
      });
      const page = await safariFetch(`/v2/searches?${qs.toString()}`);
      found = (page.items || []).find(
        (it) => it.safariId === safariId && it.fareQuoteId === fareQuoteId
      );
      if (!found) {
        const qs2 = new URLSearchParams({
          origin: 'Dar es Salaam',
          destination: 'Masasi',
          departureDate: ymd,
          operatorId: OPERATOR_ID,
        });
        const page2 = await safariFetch(`/v2/searches?${qs2.toString()}`);
        found = (page2.items || []).find(
          (it) => it.safariId === safariId && it.fareQuoteId === fareQuoteId
        );
      }
    }

    // Prefer seats posted by the client body? No — GET only.
    // Fallback: accept seats from query cache via POST body is not available.
    if (!found) {
      return res.status(404).json({
        error: 'trip not found — open seats from the selected trip card instead',
      });
    }

    const trip = mapSearchItem(found);
    res.json({
      tripId: req.params.id,
      layout: 'grid',
      rows: Math.max(...trip.seats.map((s) => (s.rowIndex || 0) + 1), 1),
      price: trip.price,
      currency: trip.currency,
      seats: mapSeatGrid(trip.seats),
      trip,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message, detail: err.data });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { trip, seats, passengers, contact } = req.body || {};
    if (!trip || !trip.safariId || !trip.fareQuoteId) {
      return res.status(400).json({ error: 'trip (with safariId + fareQuoteId) is required' });
    }
    if (!Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ error: 'at least one seat is required' });
    }
    if (!Array.isArray(passengers) || passengers.length !== seats.length) {
      return res.status(400).json({ error: 'passenger count must match seat count' });
    }
    if (!contact || !contact.phone) {
      return res.status(400).json({ error: 'contact phone is required' });
    }

    const body = {
      contactName: passengers[0]?.name || 'Passenger',
      contactPhone: contact.phone,
      contactEmail: contact.email || undefined,
      passengersCount: passengers.length,
      passengers: passengers.map((p, index) => ({
        index,
        name: p.name,
        phone: p.phone || contact.phone,
        gender: p.gender || 'M',
      })),
      segments: [
        {
          safariId: trip.safariId,
          originId: trip.origin,
          destinationId: trip.destination,
          serviceClassId: trip.serviceClassId,
          fareQuoteId: trip.fareQuoteId,
          pickupPoint: trip.pickupPoints?.[0] || { id: trip.origin, name: trip.originName },
          dropoffPoint: trip.dropoffPoints?.[0] || { id: trip.destination, name: trip.destinationName },
          passengers: seats.map((seatLabel, index) => ({ index, seatLabel: String(seatLabel) })),
        },
      ],
    };

    const created = await safariFetch('/v2/trips', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const t = created.trip || created;
    const amount = trip.price * seats.length;

    res.status(201).json({
      booking: {
        reference: t.tripReference || t.tripId,
        tripId: t.tripId,
        status: 'reserved',
        createdAt: new Date().toISOString(),
        trip,
        seats,
        passengers,
        contact,
        amount,
        currency: trip.currency || 'TZS',
        safariTrip: t,
      },
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message, detail: err.data });
  }
});

app.get('/api/bookings/:tripId/payments', async (req, res) => {
  try {
    const data = await safariFetch(`/v2/trips/${encodeURIComponent(req.params.tripId)}/payments`);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message, detail: err.data });
  }
});

app.post('/api/bookings/:tripId/pay', async (req, res) => {
  try {
    const { token, phoneOverride, method } = req.body || {};
    let payToken = token;

    if (!payToken) {
      const methods = await safariFetch(
        `/v2/trips/${encodeURIComponent(req.params.tripId)}/payments`
      );
      const items = methods.items || [];
      const chosen =
        items.find((m) => (m.name || '').toLowerCase().includes((method || 'mpesa').toLowerCase())) ||
        items[0];
      payToken = chosen?.action?.initiate?.token || chosen?.token;
      if (!payToken) {
        return res.status(400).json({
          error: 'No payable method token available for this trip',
          methods,
        });
      }
    }

    const result = await safariFetch(
      `/v2/trips/${encodeURIComponent(req.params.tripId)}/payments`,
      {
        method: 'POST',
        body: JSON.stringify({
          token: payToken,
          phoneOverride: phoneOverride || undefined,
        }),
      }
    );

    // Poll briefly for completion (USSD is async).
    let status = null;
    for (let i = 0; i < 8; i++) {
      await new Promise((r) => setTimeout(r, 1500));
      status = await safariFetch(
        `/v2/trips/${encodeURIComponent(req.params.tripId)}/payments/status`
      );
      if (status.paymentCompleted || status.expired) break;
    }

    const trip = await safariFetch(`/v2/trips/${encodeURIComponent(req.params.tripId)}`);
    const t = trip.trip || trip;

    res.json({
      booking: {
        reference: t.tripReference || t.tripId,
        tripId: t.tripId,
        status: status?.paymentCompleted ? 'paid' : 'pending_payment',
        payment: {
          method: method || 'mobile-money',
          transactionId: status?.transactionId || payToken,
          status: status?.paymentCompleted ? 'success' : 'pending',
          raw: status,
        },
        ticket: {
          reference: t.tripReference || t.tripId,
          qr: `BURDAN|${t.tripReference || t.tripId}|${t.tripId}`,
          boardingTime: t.segments?.[0]?.origin?.departureTime,
          gate: 'Boarding gate',
        },
        safariTrip: t,
        initiate: result,
      },
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message, detail: err.data });
  }
});

app.get('/api/bookings/:tripId', async (req, res) => {
  try {
    const trip = await safariFetch(`/v2/trips/${encodeURIComponent(req.params.tripId)}`);
    const t = trip.trip || trip;
    res.json({
      booking: {
        reference: t.tripReference || t.tripId,
        tripId: t.tripId,
        status: 'reserved',
        safariTrip: t,
      },
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message, detail: err.data });
  }
});

app.delete('/api/bookings/:tripId', async (req, res) => {
  try {
    const data = await safariFetch(`/v2/trips/${encodeURIComponent(req.params.tripId)}`, {
      method: 'DELETE',
    });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message, detail: err.data });
  }
});

if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Burdan SafariPlus proxy on http://localhost:${port} (key ${API_KEY ? 'set' : 'MISSING'})`);
  });
}

module.exports = app;
