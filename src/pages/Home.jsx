import React from 'react';
import Hero from '../components/Hero';
import SearchForm from '../components/SearchForm';
import Gallery from '../components/Gallery';
import { useLanguage } from '../contexts/LanguageContext';

const Home = ({ setIsBookingDialogOpen }) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white">
      <section className="relative">
        <Hero />
        <div className="absolute inset-x-0 bottom-0 translate-y-1/2 md:translate-y-[40%] z-20 px-3 sm:px-6 pointer-events-none">
          <div className="max-w-5xl mx-auto pointer-events-auto hidden md:block">
            <SearchForm setIsBookingDialogOpen={setIsBookingDialogOpen} />
          </div>
        </div>
        <div className="md:hidden absolute inset-0 flex items-center justify-center z-10 px-3 pt-16">
          <div className="w-full max-w-sm">
            <SearchForm setIsBookingDialogOpen={setIsBookingDialogOpen} />
          </div>
        </div>
      </section>

      <section className="pt-28 md:pt-40 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-burdan-red font-body font-semibold text-xs tracking-[0.2em] uppercase mb-3">
              {t('motto')}
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-burdan-black tracking-tight">
              {t('whyChoose')}
            </h2>
            <p className="text-burdan-darkgray/70 font-body mt-3 leading-relaxed">
              {t('experienceDifference')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-burdan-gray divide-y md:divide-y-0 md:divide-x divide-burdan-gray">
            {[
              {
                title: t('premiumComfort'),
                desc: t('comfortDesc'),
              },
              {
                title: t('onTimeDeparture'),
                desc: t('onTimeDesc'),
              },
              {
                title: t('safeTravel'),
                desc: t('safeTravelDesc'),
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-white hover:bg-burdan-cream/80 transition-colors duration-200">
                <span className="text-burdan-red font-heading font-bold text-sm tracking-widest">0{i + 1}</span>
                <h3 className="text-lg font-heading font-bold text-burdan-black mt-4 mb-2">{feature.title}</h3>
                <p className="text-burdan-darkgray/65 font-body text-sm leading-relaxed">{feature.desc}</p>
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
