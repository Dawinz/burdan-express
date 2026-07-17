import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/images/burdan-bus-15.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burdan-black/70 via-burdan-black/40 to-burdan-red/80" />

      <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center text-center px-4 -mt-24">
        <span className="opacity-0 animate-fade-up inline-block bg-burdan-gold/20 backdrop-blur-sm border border-burdan-gold/40 text-burdan-gold font-body font-semibold text-xs uppercase tracking-[0.35em] px-5 py-2 rounded-full mb-6">
          DAR • LINDI • MASASI
        </span>
        <h1 className="opacity-0 animate-fade-up-delay text-white text-5xl lg:text-6xl font-heading font-black tracking-tight max-w-4xl leading-tight drop-shadow-2xl">
          {t('heroTagline')}
        </h1>
        <p className="opacity-0 animate-fade-up-delay-2 text-white/80 font-body text-lg mt-5 max-w-2xl">
          {t('heroSubtitle')}
        </p>
        <div className="opacity-0 animate-fade-up-delay-2 mt-8 flex items-center gap-4">
          <Link to="/routes" className="bg-white text-burdan-red hover:bg-burdan-gold hover:text-white font-heading font-bold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-xl hover:-translate-y-0.5 text-sm">
            {t('exploreRoutes')}
          </Link>
          <span className="text-burdan-gold font-heading font-bold tracking-[0.3em] text-sm uppercase">{t('motto')}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-burdan-cream to-transparent" />
    </div>
  );
};

export default Hero;
