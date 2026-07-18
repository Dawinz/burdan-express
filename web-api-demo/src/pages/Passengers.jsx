import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../store.jsx';
import { formatMoney } from '../utils/format.js';

export default function Passengers() {
  const navigate = useNavigate();
  const { selectedTrip, selectedSeats, passengers, setPassengers, contact, setContact } =
    useBooking();
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedTrip || selectedSeats.length === 0) {
      navigate('/');
      return;
    }
    setRows(
      selectedSeats.map((seat, i) => ({
        seat,
        name: passengers[i]?.name || '',
        phone: passengers[i]?.phone || '',
        gender: passengers[i]?.gender || 'M',
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (i, field, value) => {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [field]: value } : r)));
  };

  const submit = (e) => {
    e.preventDefault();
    if (rows.some((r) => !r.name.trim())) {
      setError('Please enter every passenger name.');
      return;
    }
    if (!contact.phone.trim()) {
      setError('A contact phone number is required.');
      return;
    }
    setPassengers(rows.map((r) => ({ name: r.name.trim(), phone: r.phone.trim(), gender: r.gender, seat: r.seat })));
    navigate('/payment');
  };

  const total = (selectedTrip?.price || 0) * selectedSeats.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="font-heading font-bold text-xl text-burdan-black mb-5">Passenger details</h1>
      <form onSubmit={submit} className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
          )}
          {rows.map((r, i) => (
            <div key={r.seat} className="bg-white border border-burdan-gray p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-burdan-red text-white text-xs font-bold px-2 py-1">
                  Seat {r.seat}
                </span>
                <span className="text-sm text-burdan-darkgray/60">Passenger {i + 1}</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">
                    Full name
                  </label>
                  <input
                    value={r.name}
                    onChange={(e) => update(i, 'name', e.target.value)}
                    className="w-full p-2.5 border border-burdan-gray text-sm focus:border-burdan-red focus:outline-none"
                    placeholder="e.g. Asha Juma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">
                    Gender
                  </label>
                  <select
                    value={r.gender}
                    onChange={(e) => update(i, 'gender', e.target.value)}
                    className="w-full p-2.5 border border-burdan-gray text-sm bg-white focus:border-burdan-red focus:outline-none"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white border border-burdan-gray p-5">
            <h3 className="font-heading font-bold text-burdan-black mb-4">Contact</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">
                  Phone (M-Pesa / Airtel)
                </label>
                <input
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="w-full p-2.5 border border-burdan-gray text-sm focus:border-burdan-red focus:outline-none"
                  placeholder="07XX XXX XXX"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">
                  Email (optional)
                </label>
                <input
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full p-2.5 border border-burdan-gray text-sm focus:border-burdan-red focus:outline-none"
                  placeholder="you@email.com"
                />
              </div>
            </div>
          </div>
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
              <dt className="text-burdan-darkgray/60">Seats</dt>
              <dd className="font-semibold">{selectedSeats.join(', ')}</dd>
            </div>
          </dl>
          <div className="border-t border-burdan-gray mt-4 pt-4 flex justify-between items-baseline">
            <span className="text-burdan-darkgray/60 text-sm">Total</span>
            <span className="font-heading font-extrabold text-xl text-burdan-black">
              {formatMoney(total)}
            </span>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-burdan-red hover:bg-burdan-darkred text-white font-heading font-bold py-3 text-sm transition-colors"
          >
            Continue to payment
          </button>
        </div>
      </form>
    </div>
  );
}
