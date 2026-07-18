import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

const initialSearch = {
  origin: '',
  destination: '',
  date: '',
  passengers: 1,
};

export function BookingProvider({ children }) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [contact, setContact] = useState({ phone: '', email: '' });
  const [booking, setBooking] = useState(null);

  const reset = () => {
    setSearch(initialSearch);
    setSelectedTrip(null);
    setSelectedSeats([]);
    setPassengers([]);
    setContact({ phone: '', email: '' });
    setBooking(null);
  };

  const value = {
    search,
    setSearch,
    selectedTrip,
    setSelectedTrip,
    selectedSeats,
    setSelectedSeats,
    passengers,
    setPassengers,
    contact,
    setContact,
    booking,
    setBooking,
    reset,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
