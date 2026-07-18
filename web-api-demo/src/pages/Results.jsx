import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useBooking } from '../store.jsx';
import { formatMoney, formatDuration, formatDate } from '../utils/format.js';

export default function Results() {
  const navigate = useNavigate();
  const { search, setSelectedTrip } = useBooking();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!search.origin || !search.destination) {
      navigate('/');
      return;
    }
    setLoading(true);
    api
      .searchTrips(search)
      .then((d) => setTrips(d.trips))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (trip) => {
    setSelectedTrip(trip);
    navigate('/seats');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="font-heading font-bold text-xl text-burdan-black">
            {trips[0] ? `${trips[0].originName} → ${trips[0].destinationName}` : 'Available trips'}
          </h1>
          <p className="text-burdan-darkgray/60 text-sm mt-0.5">
            {formatDate(search.date)} · {search.passengers}{' '}
            {search.passengers > 1 ? 'passengers' : 'passenger'}
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-sm font-semibold text-burdan-red hover:text-burdan-darkred whitespace-nowrap"
        >
          Change search
        </button>
      </div>

      {loading && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 bg-white border border-burdan-gray animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      {!loading && !error && trips.length === 0 && (
        <div className="p-8 bg-white border border-burdan-gray text-center text-burdan-darkgray/60">
          No trips available for this route and date.
        </div>
      )}

      <div className="space-y-3">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white border border-burdan-gray hover:border-burdan-red/50 transition-colors"
          >
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-heading font-bold text-burdan-black">{trip.bus.name}</span>
                  <span className="text-[11px] bg-burdan-lightred text-burdan-red px-1.5 py-0.5 font-semibold">
                    ★ {trip.bus.rating}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-burdan-black">
                  <div className="text-center">
                    <div className="font-heading font-bold text-lg">{trip.departureTime}</div>
                    <div className="text-[11px] text-burdan-darkgray/50">{trip.originName}</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center min-w-[70px]">
                    <span className="text-[11px] text-burdan-darkgray/50">
                      {formatDuration(trip.durationHours)}
                    </span>
                    <span className="w-full h-px bg-burdan-gray relative">
                      <span className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-burdan-red" />
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-heading font-bold text-lg">
                      {trip.arrivalTime}
                      {trip.arrivesNextDay && <sup className="text-[10px] text-burdan-red">+1</sup>}
                    </div>
                    <div className="text-[11px] text-burdan-darkgray/50">{trip.destinationName}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {trip.amenities.slice(0, 4).map((a) => (
                    <span
                      key={a}
                      className="text-[11px] text-burdan-darkgray/60 border border-burdan-gray px-1.5 py-0.5"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:text-right sm:pl-5 sm:border-l border-burdan-gray flex sm:block items-center justify-between">
                <div>
                  <div className="font-heading font-extrabold text-xl text-burdan-black">
                    {formatMoney(trip.price, trip.currency)}
                  </div>
                  <div className="text-[11px] text-green-600 font-semibold">
                    {trip.seatsAvailable} seats left
                  </div>
                </div>
                <button
                  onClick={() => choose(trip)}
                  className="mt-2 bg-burdan-red hover:bg-burdan-darkred text-white font-heading font-bold px-5 py-2.5 text-sm transition-colors"
                >
                  Select seats
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
