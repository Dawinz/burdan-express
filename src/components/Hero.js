import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative h-[85vh] min-h-[520px] max-h-[780px] flex items-end md:items-center overflow-hidden bg-burdan-black">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/burdan-bus-15.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-burdan-black/90 via-burdan-black/55 to-burdan-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-burdan-black/80 via-transparent to-burdan-black/30" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 md:pb-24 pt-28">
        <p className="opacity-0 animate-fade-up text-burdan-orange font-body font-semibold text-xs tracking-[0.28em] uppercase mb-4">
          DAR · LINDI · MASASI
        </p>
        <h1 className="opacity-0 animate-fade-up-delay text-white text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight max-w-3xl leading-[1.05]">
          {t('heroTagline')}
        </h1>
        <p className="opacity-0 animate-fade-up-delay-2 text-white/75 font-body text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
          {t('heroSubtitle')}
        </p>
        <div className="opacity-0 animate-fade-up-delay-2 mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/routes"
            className="bg-burdan-red hover:bg-burdan-darkred text-white font-heading font-semibold px-6 py-3 text-sm transition-colors duration-200"
          >
            {t('exploreRoutes')}
          </Link>
          <span className="text-white/50 font-heading font-semibold tracking-[0.2em] text-xs uppercase">
            {t('motto')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
