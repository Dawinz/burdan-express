import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useBooking } from '../store.jsx';
import { formatMoney } from '../utils/format.js';

const methods = [
  { id: 'mpesa', label: 'M-Pesa', hint: 'Vodacom mobile money' },
  { id: 'airtel', label: 'Airtel Money', hint: 'Airtel mobile money' },
  { id: 'card', label: 'Card', hint: 'Visa / Mastercard' },
];

export default function Payment() {
  const navigate = useNavigate();
  const { selectedTrip, selectedSeats, passengers, contact, setBooking } = useBooking();
  const [method, setMethod] = useState('mpesa');
  const [status, setStatus] = useState('idle'); // idle | booking | paying | error
  const [error, setError] = useState('');

  if (!selectedTrip || selectedSeats.length === 0) {
    navigate('/');
    return null;
  }

  const total = selectedTrip.price * selectedSeats.length;

  const pay = async () => {
    setError('');
    try {
      setStatus('booking');
      const { booking } = await api.createBooking({
        tripId: selectedTrip.id,
        seats: selectedSeats,
        passengers,
        contact,
      });

      setStatus('paying');
      // small delay to mimic a mobile-money prompt
      await new Promise((r) => setTimeout(r, 1200));
      const { booking: paid } = await api.payBooking(booking.reference, {
        method,
        booking, // fallback so stateless API can still complete
      });

      setBooking(paid);
      navigate('/ticket');
    } catch (e) {
      setError(e.message || 'Payment failed. Please try again.');
      setStatus('error');
    }
  };

  const busy = status === 'booking' || status === 'paying';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="font-heading font-bold text-xl text-burdan-black mb-5">Payment</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-burdan-gray p-5">
          <h3 className="font-heading font-bold text-burdan-black mb-4">Choose a payment method</h3>
          <div className="space-y-3">
            {methods.map((m) => (
              <label
                key={m.id}
                className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${
                  method === m.id ? 'border-burdan-red bg-burdan-lightred/40' : 'border-burdan-gray'
                }`}
              >
                <input
                  type="radio"
                  name="method"
                  checked={method === m.id}
                  onChange={() => setMethod(m.id)}
                  className="accent-burdan-red"
                />
                <span>
                  <span className="block font-semibold text-burdan-black text-sm">{m.label}</span>
                  <span className="block text-xs text-burdan-darkgray/55">{m.hint}</span>
                </span>
              </label>
            ))}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {busy && (
            <div className="mt-4 p-3 bg-burdan-cream border border-burdan-gray text-sm text-burdan-darkgray flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-burdan-red border-t-transparent rounded-full animate-spin" />
              {status === 'booking' ? 'Reserving your seats…' : 'Confirming payment…'}
            </div>
          )}
        </div>

        <div className="bg-white border border-burdan-gray p-5 h-fit">
          <h3 className="font-heading font-bold text-burdan-black mb-3">Summary</h3>
          <dl className="text-sm space-y-2">
            <div className="flex justify-between">
              <dt className="text-burdan-darkgray/60">Route</dt>
              <dd className="font-semibold text-right">
                {selectedTrip.originName} → {selectedTrip.destinationName}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-burdan-darkgray/60">Seats</dt>
              <dd className="font-semibold">{selectedSeats.join(', ')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-burdan-darkgray/60">Passengers</dt>
              <dd className="font-semibold">{passengers.length}</dd>
            </div>
          </dl>
          <div className="border-t border-burdan-gray mt-4 pt-4 flex justify-between items-baseline">
            <span className="text-burdan-darkgray/60 text-sm">Total</span>
            <span className="font-heading font-extrabold text-xl text-burdan-black">
              {formatMoney(total)}
            </span>
          </div>
          <button
            onClick={pay}
            disabled={busy}
            className="mt-4 w-full bg-burdan-red hover:bg-burdan-darkred text-white font-heading font-bold py-3 text-sm transition-colors disabled:opacity-60"
          >
            {busy ? 'Processing…' : `Pay ${formatMoney(total)}`}
          </button>
          <p className="text-[11px] text-burdan-darkgray/45 mt-2 text-center">
            Demo only — no real payment is charged.
          </p>
        </div>
      </div>
    </div>
  );
}
