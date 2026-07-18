import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative h-[72vh] min-h-[500px] max-h-[760px] flex items-end overflow-hidden bg-burdan-black">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[center_25%] sm:bg-center"
        style={{ backgroundImage: "url('/images/burdan-bus-15.png')" }}
      />
      {/* Bottom-up gradient keeps text legible while leaving the bus visible up top */}
      <div className="absolute inset-0 bg-gradient-to-t from-burdan-black via-burdan-black/55 to-burdan-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-burdan-black/60 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-16 sm:pb-24 md:pb-28 pt-24">
        <p className="opacity-0 animate-fade-up text-burdan-orange font-body font-semibold text-[11px] sm:text-xs tracking-[0.24em] sm:tracking-[0.28em] uppercase mb-3 sm:mb-4">
          DAR · LINDI · MASASI
        </p>
        <h1 className="opacity-0 animate-fade-up-delay text-white text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight max-w-3xl sm:leading-[1.05]">
          {t('heroTagline')}
        </h1>
        <p className="opacity-0 animate-fade-up-delay-2 text-white/80 font-body text-sm sm:text-lg mt-3 sm:mt-4 max-w-xl leading-relaxed">
          {t('heroSubtitle')}
        </p>
        <div className="opacity-0 animate-fade-up-delay-2 mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            to="/routes"
            className="bg-burdan-red hover:bg-burdan-darkred text-white font-heading font-semibold px-5 sm:px-6 py-2.5 sm:py-3 text-sm transition-colors duration-200"
          >
            {t('exploreRoutes')}
          </Link>
          <span className="text-white/60 font-heading font-semibold tracking-[0.18em] sm:tracking-[0.2em] text-[10px] sm:text-xs uppercase">
            {t('motto')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
