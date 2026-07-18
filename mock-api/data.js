'use strict';

/**
 * Mock domain data for Burdan Express.
 * Everything here is fake but realistic, so the web & mobile demos can show a
 * full, professional booking flow driven by a real HTTP API (instead of an
 * embedded third-party widget script).
 */

const CITIES = [
  { id: 'dar-es-salaam', name: 'Dar es Salaam', region: 'Pwani' },
  { id: 'kibiti', name: 'Kibiti', region: 'Pwani' },
  { id: 'ikwiriri', name: 'Ikwiriri', region: 'Pwani' },
  { id: 'nangurukuru', name: 'Nangurukuru', region: 'Lindi' },
  { id: 'kilwa', name: 'Kilwa Masoko', region: 'Lindi' },
  { id: 'lindi', name: 'Lindi', region: 'Lindi' },
  { id: 'mingoyo', name: 'Mingoyo', region: 'Lindi' },
  { id: 'masasi', name: 'Masasi', region: 'Mtwara' },
  { id: 'mtwara', name: 'Mtwara', region: 'Mtwara' },
];

// Distance (km) from Dar es Salaam along the southern corridor.
const DISTANCE_FROM_DAR = {
  'dar-es-salaam': 0,
  kibiti: 140,
  ikwiriri: 190,
  nangurukuru: 250,
  kilwa: 300,
  lindi: 450,
  mingoyo: 470,
  masasi: 610,
  mtwara: 560,
};

const BUSES = [
  {
    id: 'bus-yutong-01',
    name: 'Burdan Royal Class',
    model: 'Yutong ZK6122',
    plate: 'T123 BDN',
    seatLayout: '2x2',
    totalSeats: 49,
    amenities: ['Air Conditioning', 'Reclining Seats', 'USB Charging', 'WiFi', 'Refreshments', 'On-board Toilet'],
    rating: 4.8,
  },
  {
    id: 'bus-yutong-02',
    name: 'Burdan Business',
    model: 'Yutong ZK6119',
    plate: 'T456 BDN',
    seatLayout: '2x2',
    totalSeats: 45,
    amenities: ['Air Conditioning', 'Reclining Seats', 'USB Charging', 'Refreshments'],
    rating: 4.6,
  },
  {
    id: 'bus-yutong-03',
    name: 'Burdan Express Deluxe',
    model: 'Yutong ZK6128',
    plate: 'T789 BDN',
    seatLayout: '2x2',
    totalSeats: 53,
    amenities: ['Air Conditioning', 'Reclining Seats', 'USB Charging', 'WiFi', 'Entertainment', 'Refreshments', 'On-board Toilet'],
    rating: 4.9,
  },
];

const DEPARTURES = [
  { code: 'M', time: '06:00', bus: 'bus-yutong-03' },
  { code: 'A', time: '09:30', bus: 'bus-yutong-01' },
  { code: 'B', time: '13:00', bus: 'bus-yutong-02' },
  { code: 'N', time: '19:30', bus: 'bus-yutong-01' },
];

const FARE_PER_KM = 55; // TZS per km, rounded to a friendly number

function cityName(id) {
  const c = CITIES.find((x) => x.id === id);
  return c ? c.name : id;
}

function computeFare(origin, destination) {
  const a = DISTANCE_FROM_DAR[origin];
  const b = DISTANCE_FROM_DAR[destination];
  if (a == null || b == null) return 25000;
  const km = Math.abs(b - a);
  const raw = Math.max(km * FARE_PER_KM, 12000);
  return Math.round(raw / 500) * 500; // round to nearest 500 TZS
}

function durationHours(origin, destination) {
  const a = DISTANCE_FROM_DAR[origin];
  const b = DISTANCE_FROM_DAR[destination];
  const km = Math.abs((b || 0) - (a || 0));
  return Math.max(1, Math.round((km / 65) * 10) / 10); // avg 65 km/h
}

function addHoursToTime(time, hours) {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + Math.round(hours * 60);
  const hh = Math.floor((total % (24 * 60)) / 60);
  const mm = total % 60;
  const nextDay = total >= 24 * 60;
  return {
    time: `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`,
    nextDay,
  };
}

// Deterministic pseudo-random so seat availability is stable per trip.
function seededInt(seed, min, max) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const n = Math.abs(h);
  return min + (n % (max - min + 1));
}

function tripId(origin, destination, date, code) {
  return `${origin}_${destination}_${date}_${code}`;
}

function searchTrips({ origin, destination, date }) {
  if (!origin || !destination || origin === destination) return [];
  const fare = computeFare(origin, destination);
  const dur = durationHours(origin, destination);

  return DEPARTURES.map((dep) => {
    const bus = BUSES.find((b) => b.id === dep.bus);
    const arrival = addHoursToTime(dep.time, dur);
    const id = tripId(origin, destination, date, dep.code);
    const booked = seededInt(id, 4, bus.totalSeats - 6);
    return {
      id,
      operator: 'Burdan Express',
      origin,
      originName: cityName(origin),
      destination,
      destinationName: cityName(destination),
      date,
      departureTime: dep.time,
      arrivalTime: arrival.time,
      arrivesNextDay: arrival.nextDay,
      durationHours: dur,
      price: fare,
      currency: 'TZS',
      bus: {
        id: bus.id,
        name: bus.name,
        model: bus.model,
        plate: bus.plate,
        seatLayout: bus.seatLayout,
        rating: bus.rating,
      },
      amenities: bus.amenities,
      totalSeats: bus.totalSeats,
      seatsAvailable: bus.totalSeats - booked,
    };
  });
}

function parseTripId(id) {
  const [origin, destination, date, code] = String(id).split('_');
  return { origin, destination, date, code };
}

function getTrip(id) {
  const { origin, destination, date, code } = parseTripId(id);
  if (!origin || !destination || !date || !code) return null;
  const trips = searchTrips({ origin, destination, date });
  return trips.find((t) => t.code === code || t.id === id) || null;
}

/**
 * Build a seat map for a trip. Seats are laid out 2 + aisle + 2 across rows.
 * Occupancy is deterministic per trip so the demo is stable.
 */
function getSeatMap(id) {
  const trip = getTrip(id);
  if (!trip) return null;
  const cols = ['A', 'B', 'C', 'D'];
  const rows = Math.ceil(trip.totalSeats / 4);
  const seats = [];
  let count = 0;
  for (let r = 1; r <= rows; r++) {
    for (const col of cols) {
      count++;
      if (count > trip.totalSeats) break;
      const label = `${r}${col}`;
      const occupied = seededInt(`${id}_${label}`, 0, 9) < 3; // ~30% occupied
      seats.push({
        label,
        row: r,
        col,
        aisleAfter: col === 'B',
        occupied,
      });
    }
  }
  return {
    tripId: id,
    layout: '2x2',
    rows,
    price: trip.price,
    currency: trip.currency,
    seats,
  };
}

module.exports = {
  CITIES,
  BUSES,
  cityName,
  searchTrips,
  getTrip,
  getSeatMap,
  computeFare,
};
