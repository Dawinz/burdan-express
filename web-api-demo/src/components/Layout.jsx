import React from 'react';
import { Link } from 'react-router-dom';
import Stepper from './Stepper.jsx';
import { api } from '../api.js';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-burdan-black text-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 bg-burdan-red flex items-center justify-center">
              <span className="font-heading font-black text-sm">BE</span>
            </div>
            <div className="leading-none">
              <span className="block font-heading font-bold tracking-wide">BURDAN EXPRESS</span>
              <span className="block text-[10px] tracking-[0.2em] text-burdan-orange uppercase mt-0.5">
                API Booking Demo
              </span>
            </div>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-body font-semibold text-white/60 border border-white/15 px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live REST API
          </span>
        </div>
      </header>

      <Stepper />

      <main className="flex-1">{children}</main>

      <footer className="bg-burdan-black text-white/50 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs font-body">
          <span>&copy; {new Date().getFullYear()} Burdan Express — demonstration build.</span>
          <span className="truncate">Powered by REST API: {api.base.replace('https://', '')}</span>
        </div>
      </footer>
    </div>
  );
}
