import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Search from './pages/Search.jsx';
import Results from './pages/Results.jsx';
import Seats from './pages/Seats.jsx';
import Passengers from './pages/Passengers.jsx';
import Payment from './pages/Payment.jsx';
import Ticket from './pages/Ticket.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/results" element={<Results />} />
        <Route path="/seats" element={<Seats />} />
        <Route path="/passengers" element={<Passengers />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
