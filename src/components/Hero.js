import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative h-[42vh] min-h-[300px] max-h-[420px] sm:h-[58vh] sm:max-h-[560px] md:h-[68vh] md:max-h-[720px] flex items-end overflow-hidden bg-burdan-black">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[center_25%] sm:bg-center"
        style={{ backgroundImage: "url('/images/burdan-bus-15.png')" }}
      />
      {/* Bottom-up gradient keeps text legible while leaving the bus visible up top */}
      <div className="absolute inset-0 bg-gradient-to-t from-burdan-black via-burdan-black/45 to-burdan-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-burdan-black/55 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-10 sm:pb-16 md:pb-20 pt-20">
        <p className="opacity-0 animate-fade-up text-burdan-orange font-body font-semibold text-[11px] sm:text-xs tracking-[0.24em] sm:tracking-[0.28em] uppercase mb-2 sm:mb-3">
          DAR · LINDI · MASASI
        </p>
        <h1 className="opacity-0 animate-fade-up-delay text-white text-[1.75rem] leading-[1.1] sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight max-w-3xl sm:leading-[1.05]">
          {t('heroTagline')}
        </h1>
      </div>
    </div>
  );
};

export default Hero;
