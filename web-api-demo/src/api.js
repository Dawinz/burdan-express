const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  base: API_BASE,
  getCities: () => request('/api/cities'),
  searchTrips: ({ origin, destination, date, passengers }) =>
    request(
      `/api/trips?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(
        destination
      )}&date=${encodeURIComponent(date)}&passengers=${passengers}`
    ),
  getSeats: (tripId) => request(`/api/trips/${encodeURIComponent(tripId)}/seats`),
  createBooking: (payload) =>
    request('/api/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  payBooking: (reference, payload) =>
    request(`/api/bookings/${encodeURIComponent(reference)}/pay`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
