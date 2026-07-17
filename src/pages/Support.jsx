import React from 'react';

const Support = () => {
  return (
    <div className="min-h-screen bg-burdan-cream pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-burdan-red/10 text-burdan-red font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">HELP</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-burdan-black tracking-tight">SUPPORT CENTER</h1>
          <p className="text-lg text-burdan-darkgray/60 font-body max-w-xl mx-auto mt-4">Need help with booking, trips, or the app? We're here for you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { title: 'Phone / WhatsApp', content: <a href="tel:+255717009600" className="text-burdan-red font-semibold">+255 717 009 600</a> },
            { title: 'Email', content: <a href="mailto:support@burdanexpress.co.tz" className="text-burdan-red font-semibold break-all">support@burdanexpress.co.tz</a> },
            { title: 'Hours', content: <span>Daily, 5:00 AM - 10:00 PM</span> }
          ].map(({ title, content }, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-burdan-gray">
              <h2 className="text-sm font-heading font-bold text-burdan-black mb-2 uppercase tracking-wider">{title}</h2>
              <div className="font-body text-sm text-burdan-darkgray/70">{content}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-3xl p-8 border border-burdan-gray">
          <h2 className="text-xl font-heading font-bold text-burdan-black mb-5">Quick Help Topics</h2>
          <ul className="space-y-3 text-burdan-darkgray/70 font-body text-sm">
            {['Booking confirmation and ticket reference support.', 'Trip schedule updates and boarding-time assistance.', 'Refund and cancellation guidance.', 'Mobile app install, login, and booking troubleshooting.'].map((item, i) => (
              <li key={i} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-burdan-red mt-2 flex-shrink-0" />{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Support;
