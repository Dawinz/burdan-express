import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-burdan-cream pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-burdan-red/10 text-burdan-red font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">LEGAL</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-burdan-black tracking-tight">PRIVACY POLICY</h1>
          <p className="text-burdan-darkgray/50 font-body mt-3">Last updated: July 15, 2026</p>
        </div>
        <div className="space-y-5">
          {[
            { title: '1. Information We Collect', content: 'We may collect booking and contact details including your name, phone number, email address, route, and travel information.' },
            { title: '2. How We Use Information', list: ['To process and manage bookings.', 'To provide travel and support updates.', 'To improve customer experience and service quality.', 'To comply with legal obligations.'] },
            { title: '3. Data Sharing', content: 'We share data only when required for service delivery, legal compliance, or with your consent.' },
            { title: '4. Contact', content: <span>For privacy requests, email <a href="mailto:privacy@burdanexpress.co.tz" className="text-burdan-red hover:underline font-semibold">privacy@burdanexpress.co.tz</a>.</span> }
          ].map(({ title, content, list }, i) => (
            <section key={i} className="bg-white rounded-2xl p-6 border border-burdan-gray">
              <h2 className="text-lg font-heading font-bold text-burdan-black mb-3">{title}</h2>
              {content && <p className="text-burdan-darkgray/70 font-body text-sm leading-relaxed">{content}</p>}
              {list && <ul className="space-y-2 text-burdan-darkgray/70 font-body text-sm">{list.map((item, j) => <li key={j} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-burdan-red mt-2 flex-shrink-0" />{item}</li>)}</ul>}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
