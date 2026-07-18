import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useBooking } from '../store.jsx';
import { formatMoney, formatDate } from '../utils/format.js';

export default function Ticket() {
  const navigate = useNavigate();
  const { booking, reset } = useBooking();

  if (!booking) {
    navigate('/');
    return null;
  }

  const { trip } = booking;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-heading font-extrabold text-2xl text-burdan-black">Booking confirmed</h1>
        <p className="text-burdan-darkgray/60 text-sm mt-1">
          Your e-ticket has been issued. Show the QR code when boarding.
        </p>
      </div>

      <div className="bg-white border border-burdan-gray shadow-lg overflow-hidden">
        <div className="bg-burdan-black text-white p-5 flex items-center justify-between">
          <div>
            <div className="font-heading font-bold tracking-wide">BURDAN EXPRESS</div>
            <div className="text-[11px] text-burdan-orange tracking-[0.2em] uppercase">E-Ticket</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-white/50 uppercase tracking-wider">Reference</div>
            <div className="font-heading font-bold text-lg">{booking.reference}</div>
          </div>
        </div>

        <div className="p-5 grid sm:grid-cols-3 gap-5">
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="font-heading font-extrabold text-2xl text-burdan-black">
                  {trip.departureTime}
                </div>
                <div className="text-xs text-burdan-darkgray/55">{trip.originName}</div>
              </div>
              <div className="flex-1 border-t border-dashed border-burdan-gray relative">
                <span className="absolute left-1/2 -translate-x-1/2 -top-2 text-[10px] text-burdan-darkgray/50 bg-white px-1">
                  {trip.bus.name}
                </span>
              </div>
              <div className="text-right">
                <div className="font-heading font-extrabold text-2xl text-burdan-black">
                  {trip.arrivalTime}
                </div>
                <div className="text-xs text-burdan-darkgray/55">{trip.destinationName}</div>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3 text-sm">
              <Info label="Date" value={formatDate(trip.date)} />
              <Info label="Bus" value={`${trip.bus.model} · ${trip.bus.plate}`} />
              <Info label="Seats" value={booking.seats.join(', ')} />
              <Info label="Boarding" value={booking.ticket?.gate || '—'} />
              <Info label="Amount paid" value={formatMoney(booking.amount, booking.currency)} />
              <Info label="Payment" value={(booking.payment?.method || '').toUpperCase()} />
            </dl>

            <div>
              <div className="text-[11px] text-burdan-darkgray/50 uppercase tracking-wider mb-1">
                Passengers
              </div>
              <ul className="text-sm text-burdan-black space-y-0.5">
                {booking.passengers.map((p, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{p.name}</span>
                    <span className="text-burdan-darkgray/55">Seat {p.seat || booking.seats[i]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-dashed border-burdan-gray pt-4 sm:pt-0 sm:pl-4">
            <div className="p-2 border border-burdan-gray">
              <QRCodeSVG value={booking.ticket?.qr || booking.reference} size={120} />
            </div>
            <div className="text-[10px] text-burdan-darkgray/50 mt-2 text-center">
              Scan at boarding gate
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => window.print()}
          className="flex-1 border border-burdan-gray hover:border-burdan-red text-burdan-black font-heading font-semibold py-3 text-sm transition-colors"
        >
          Print / Save
        </button>
        <button
          onClick={() => {
            reset();
            navigate('/');
          }}
          className="flex-1 bg-burdan-red hover:bg-burdan-darkred text-white font-heading font-bold py-3 text-sm transition-colors"
        >
          Book another trip
        </button>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <dt className="text-[11px] text-burdan-darkgray/50 uppercase tracking-wider">{label}</dt>
      <dd className="font-semibold text-burdan-black">{value}</dd>
    </div>
  );
}
