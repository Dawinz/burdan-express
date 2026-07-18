import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useBooking } from '../store.jsx';
import { formatMoney } from '../utils/format.js';

export default function Seats() {
  const navigate = useNavigate();
  const { search, selectedTrip, selectedSeats, setSelectedSeats } = useBooking();
  const [seatMap, setSeatMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const maxSeats = search.passengers || 1;

  useEffect(() => {
    if (!selectedTrip) {
      navigate('/');
      return;
    }
    api
      .getSeats(selectedTrip.id)
      .then(setSeatMap)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = useMemo(() => {
    if (!seatMap) return [];
    const byRow = {};
    seatMap.seats.forEach((s) => {
      byRow[s.row] = byRow[s.row] || [];
      byRow[s.row].push(s);
    });
    return Object.keys(byRow)
      .sort((a, b) => a - b)
      .map((r) => byRow[r]);
  }, [seatMap]);

  const toggle = (seat) => {
    if (seat.occupied) return;
    setSelectedSeats((prev) => {
      if (prev.includes(seat.label)) return prev.filter((s) => s !== seat.label);
      if (prev.length >= maxSeats) return [...prev.slice(1), seat.label];
      return [...prev, seat.label];
    });
  };

  const total = (selectedTrip?.price || 0) * selectedSeats.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="font-heading font-bold text-xl text-burdan-black mb-1">Choose your seats</h1>
      <p className="text-burdan-darkgray/60 text-sm mb-5">
        Select {maxSeats} {maxSeats > 1 ? 'seats' : 'seat'} · {selectedTrip?.bus.name}
      </p>

      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-burdan-gray p-5">
          <div className="flex items-center gap-4 mb-5 text-xs font-body">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 border border-burdan-gray bg-white inline-block" /> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 bg-burdan-red inline-block" /> Selected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 bg-burdan-gray inline-block" /> Taken
            </span>
          </div>

          {loading && <div className="h-64 bg-burdan-cream animate-pulse" />}

          {!loading && seatMap && (
            <div className="inline-block">
              <div className="text-center text-[11px] text-burdan-darkgray/50 mb-3 border border-burdan-gray py-1 px-3 inline-block ml-auto">
                Driver ▾
              </div>
              <div className="space-y-2">
                {rows.map((row, ri) => (
                  <div key={ri} className="flex items-center gap-2">
                    {row.map((seat) => (
                      <React.Fragment key={seat.label}>
                        <button
                          onClick={() => toggle(seat)}
                          disabled={seat.occupied}
                          title={seat.label}
                          className={`w-9 h-9 text-[11px] font-semibold border transition-colors ${
                            seat.occupied
                              ? 'bg-burdan-gray border-burdan-gray text-burdan-darkgray/40 cursor-not-allowed'
                              : selectedSeats.includes(seat.label)
                              ? 'bg-burdan-red border-burdan-red text-white'
                              : 'bg-white border-burdan-gray hover:border-burdan-red text-burdan-darkgray'
                          }`}
                        >
                          {seat.label}
                        </button>
                        {seat.aisleAfter && <span className="w-5" />}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border border-burdan-gray p-5 h-fit">
          <h3 className="font-heading font-bold text-burdan-black mb-3">Summary</h3>
          <dl className="text-sm space-y-2">
            <div className="flex justify-between">
              <dt className="text-burdan-darkgray/60">Route</dt>
              <dd className="font-semibold text-right">
                {selectedTrip?.originName} → {selectedTrip?.destinationName}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-burdan-darkgray/60">Departure</dt>
              <dd className="font-semibold">{selectedTrip?.departureTime}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-burdan-darkgray/60">Seats</dt>
              <dd className="font-semibold">
                {selectedSeats.length ? selectedSeats.join(', ') : '—'}
              </dd>
            </div>
          </dl>
          <div className="border-t border-burdan-gray mt-4 pt-4 flex justify-between items-baseline">
            <span className="text-burdan-darkgray/60 text-sm">Total</span>
            <span className="font-heading font-extrabold text-xl text-burdan-black">
              {formatMoney(total)}
            </span>
          </div>
          <button
            disabled={selectedSeats.length !== maxSeats}
            onClick={() => navigate('/passengers')}
            className="mt-4 w-full bg-burdan-red hover:bg-burdan-darkred text-white font-heading font-bold py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedSeats.length === maxSeats
              ? 'Continue'
              : `Select ${maxSeats - selectedSeats.length} more`}
          </button>
        </div>
      </div>
    </div>
  );
}
