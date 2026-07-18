import React from 'react';
import { useLocation } from 'react-router-dom';

const steps = [
  { path: '/', label: 'Search' },
  { path: '/results', label: 'Trips' },
  { path: '/seats', label: 'Seats' },
  { path: '/passengers', label: 'Details' },
  { path: '/payment', label: 'Payment' },
  { path: '/ticket', label: 'Ticket' },
];

export default function Stepper() {
  const { pathname } = useLocation();
  const activeIndex = Math.max(
    0,
    steps.findIndex((s) => s.path === pathname)
  );

  return (
    <div className="bg-white border-b border-burdan-gray">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 overflow-x-auto">
        <ol className="flex items-center gap-1 sm:gap-2 min-w-max">
          {steps.map((step, i) => {
            const done = i < activeIndex;
            const active = i === activeIndex;
            return (
              <li key={step.path} className="flex items-center gap-1 sm:gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center justify-center w-6 h-6 text-xs font-heading font-bold rounded-full transition-colors ${
                      active
                        ? 'bg-burdan-red text-white'
                        : done
                        ? 'bg-burdan-red/15 text-burdan-red'
                        : 'bg-burdan-gray text-burdan-darkgray/50'
                    }`}
                  >
                    {done ? '✓' : i + 1}
                  </span>
                  <span
                    className={`text-xs font-body font-semibold whitespace-nowrap ${
                      active ? 'text-burdan-black' : 'text-burdan-darkgray/50'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <span className="w-4 sm:w-8 h-px bg-burdan-gray" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
