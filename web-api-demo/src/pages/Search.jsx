import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useBooking } from '../store.jsx';
import { todayYmd } from '../utils/format.js';

export default function Search() {
  const navigate = useNavigate();
  const { search, setSearch, reset } = useBooking();
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState({
    origin: search.origin || 'dar-es-salaam',
    destination: search.destination || 'masasi',
    date: search.date || todayYmd(),
    passengers: search.passengers || 1,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    reset();
    api
      .getCities()
      .then((d) => setCities(d.cities))
      .catch(() => setError('Could not load cities from the API.'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (form.origin === form.destination) {
      setError('Origin and destination must be different.');
      return;
    }
    setLoading(true);
    setSearch(form);
    navigate('/results');
  };

  return (
    <div>
      <section className="bg-burdan-black text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-24">
          <p className="text-burdan-orange font-body font-semibold text-xs tracking-[0.24em] uppercase mb-3">
            DAR · LINDI · MASASI
          </p>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight max-w-2xl leading-tight">
            Book your seat in a few taps
          </h1>
          <p className="text-white/60 font-body mt-3 max-w-xl">
            A professional, API-driven booking experience — search live trips, pick your exact seat,
            pay, and get a digital ticket. No embedded widgets.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <form
          onSubmit={submit}
          className="bg-white border border-burdan-gray shadow-lg -mt-16 p-5 sm:p-7"
        >
          <h2 className="font-heading font-bold text-lg text-burdan-black mb-4">Find your journey</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">
                From
              </label>
              <select
                value={form.origin}
                onChange={(e) => setForm({ ...form, origin: e.target.value })}
                className="w-full p-2.5 border border-burdan-gray bg-white text-sm focus:border-burdan-red focus:outline-none"
              >
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">
                To
              </label>
              <select
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                className="w-full p-2.5 border border-burdan-gray bg-white text-sm focus:border-burdan-red focus:outline-none"
              >
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">
                Travel date
              </label>
              <input
                type="date"
                value={form.date}
                min={todayYmd()}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full p-2.5 border border-burdan-gray bg-white text-sm focus:border-burdan-red focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">
                Passengers
              </label>
              <select
                value={form.passengers}
                onChange={(e) => setForm({ ...form, passengers: Number(e.target.value) })}
                className="w-full p-2.5 border border-burdan-gray bg-white text-sm focus:border-burdan-red focus:outline-none"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n > 1 ? 'passengers' : 'passenger'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full sm:w-auto bg-burdan-red hover:bg-burdan-darkred text-white font-heading font-bold px-8 py-3 text-sm transition-colors disabled:opacity-60"
          >
            {loading ? 'Searching…' : 'Search trips'}
          </button>
        </form>

        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {[
            { t: 'Live availability', d: 'Seat counts and prices come straight from the API in real time.' },
            { t: 'Pick your seat', d: 'Interactive seat map — choose exactly where you sit.' },
            { t: 'Digital ticket', d: 'Instant QR ticket after a secure mock payment.' },
          ].map((f) => (
            <div key={f.t} className="bg-white border border-burdan-gray p-5">
              <h3 className="font-heading font-bold text-burdan-black text-sm">{f.t}</h3>
              <p className="text-burdan-darkgray/65 text-sm mt-1">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
