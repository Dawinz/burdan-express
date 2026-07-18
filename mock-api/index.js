'use strict';

const express = require('express');
const cors = require('cors');
const { CITIES, searchTrips, getTrip, getSeatMap } = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory booking store (best-effort; the clients also hold the data,
// so the flow still works across serverless cold starts).
const bookings = new Map();

function makeReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `BE-${s}`;
}

app.get('/', (req, res) => {
  res.json({
    name: 'Burdan Express Mock Booking API',
    version: '1.0.0',
    note: 'Fake data for demonstration only.',
    endpoints: [
      'GET  /api/cities',
      'GET  /api/trips?origin=&destination=&date=&passengers=',
      'GET  /api/trips/:id',
      'GET  /api/trips/:id/seats',
      'POST /api/bookings',
      'POST /api/bookings/:reference/pay',
      'GET  /api/bookings/:reference',
    ],
  });
});

app.get('/api/cities', (req, res) => {
  res.json({ cities: CITIES });
});

app.get('/api/trips', (req, res) => {
  const { origin, destination, date, passengers } = req.query;
  if (!origin || !destination) {
    return res.status(400).json({ error: 'origin and destination are required' });
  }
  if (origin === destination) {
    return res.status(400).json({ error: 'origin and destination must differ' });
  }
  const travelDate = date || new Date().toISOString().slice(0, 10);
  const pax = Math.max(1, parseInt(passengers, 10) || 1);
  const trips = searchTrips({ origin, destination, date: travelDate }).filter(
    (t) => t.seatsAvailable >= pax
  );
  res.json({ query: { origin, destination, date: travelDate, passengers: pax }, count: trips.length, trips });
});

app.get('/api/trips/:id', (req, res) => {
  const trip = getTrip(req.params.id);
  if (!trip) return res.status(404).json({ error: 'trip not found' });
  res.json({ trip });
});

app.get('/api/trips/:id/seats', (req, res) => {
  const map = getSeatMap(req.params.id);
  if (!map) return res.status(404).json({ error: 'trip not found' });
  res.json(map);
});

app.post('/api/bookings', (req, res) => {
  const { tripId, seats, passengers, contact } = req.body || {};
  const trip = getTrip(tripId);
  if (!trip) return res.status(404).json({ error: 'trip not found' });
  if (!Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({ error: 'at least one seat is required' });
  }
  if (!Array.isArray(passengers) || passengers.length !== seats.length) {
    return res.status(400).json({ error: 'passenger count must match seat count' });
  }
  if (!contact || !contact.phone) {
    return res.status(400).json({ error: 'contact phone is required' });
  }

  const reference = makeReference();
  const amount = trip.price * seats.length;
  const booking = {
    reference,
    status: 'reserved',
    createdAt: new Date().toISOString(),
    trip,
    seats,
    passengers,
    contact,
    amount,
    currency: trip.currency,
    // Reservations expire in 15 minutes (demo only)
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  };
  bookings.set(reference, booking);
  res.status(201).json({ booking });
});

app.post('/api/bookings/:reference/pay', (req, res) => {
  const { method } = req.body || {};
  let booking = bookings.get(req.params.reference);

  // Fallback for stateless environments: rebuild from posted booking payload.
  if (!booking && req.body && req.body.booking) {
    booking = { ...req.body.booking, reference: req.params.reference };
  }
  if (!booking) return res.status(404).json({ error: 'booking not found' });

  booking.status = 'paid';
  booking.paidAt = new Date().toISOString();
  booking.payment = {
    method: method || 'mobile-money',
    transactionId: `TXN${Date.now()}`,
    status: 'success',
  };
  booking.ticket = {
    reference: booking.reference,
    qr: `BURDAN|${booking.reference}|${booking.trip.id}|${booking.seats.join(',')}`,
    boardingTime: booking.trip.departureTime,
    gate: `Bay ${((booking.reference.charCodeAt(3) % 8) + 1)}`,
  };
  bookings.set(booking.reference, booking);
  res.json({ booking });
});

app.get('/api/bookings/:reference', (req, res) => {
  const booking = bookings.get(req.params.reference);
  if (!booking) return res.status(404).json({ error: 'booking not found' });
  res.json({ booking });
});

if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Burdan mock API running on http://localhost:${port}`);
  });
}

module.exports = app;
