import React from 'react';
import Hero from '../components/Hero';
import SearchForm from '../components/SearchForm';
import Gallery from '../components/Gallery';
import { useLanguage } from '../contexts/LanguageContext';

const Home = ({ setIsBookingDialogOpen }) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen">
      <section className="relative">
        <Hero />
        <div className="absolute inset-0 flex items-center justify-center md:hidden z-10">
          <div className="w-full max-w-sm mx-4">
            <div className="text-center mb-6">
              <h1 className="text-white text-2xl font-heading font-bold tracking-tight drop-shadow-lg">
                {t('bookYourJourney')}
              </h1>
              <p className="text-white/70 text-sm font-body mt-1">DAR • LINDI • MASASI</p>
            </div>
            <SearchForm setIsBookingDialogOpen={setIsBookingDialogOpen} />
          </div>
        </div>
      </section>

      <section className="hidden md:block -mt-32 relative z-30 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <SearchForm setIsBookingDialogOpen={setIsBookingDialogOpen} />
        </div>
      </section>

      <section className="py-20 bg-burdan-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-burdan-red/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-burdan-orange/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-burdan-red/10 text-burdan-red font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              {t('motto')}
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-burdan-black tracking-tight">
              {t('whyChoose')}
            </h2>
            <p className="text-lg text-burdan-darkgray/60 font-body max-w-xl mx-auto mt-4">
              {t('experienceDifference')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
                color: 'bg-burdan-red',
                title: t('premiumComfort'),
                desc: t('comfortDesc')
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
                color: 'bg-burdan-orange',
                title: t('onTimeDeparture'),
                desc: t('onTimeDesc')
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
                color: 'bg-burdan-black',
                title: t('safeTravel'),
                desc: t('safeTravelDesc')
              }
            ].map((feature, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 border border-burdan-gray hover:border-burdan-red/20 hover:shadow-2xl hover:shadow-burdan-red/5 transition-all duration-500 transform hover:-translate-y-2">
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">{feature.icon}</svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-burdan-black mb-3">{feature.title}</h3>
                <p className="text-burdan-darkgray/60 font-body leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Gallery />
    </div>
  );
};

export default Home;
