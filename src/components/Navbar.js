import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => { setIsMenuOpen(false); }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) setIsMenuOpen(false);
    };
    if (isMenuOpen) document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isMenuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-burdan-black/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-3 group" onClick={() => setIsMenuOpen(false)}>
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${scrolled ? 'bg-burdan-red' : 'bg-burdan-red'}`}>
              <span className="text-white font-heading font-black text-sm tracking-tight">BE</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-heading font-bold tracking-wide transition-colors duration-300 ${scrolled ? 'text-burdan-black' : 'text-white'}`}>
                BURDAN
              </span>
              <span className={`text-[10px] font-heading font-medium tracking-[0.3em] -mt-1 transition-colors duration-300 ${scrolled ? 'text-burdan-orange' : 'text-burdan-gold'}`}>
                EXPRESS
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {[
              { path: '/', label: t('home') },
              { path: '/routes', label: t('routes') },
              { path: '/gallery', label: t('gallery') },
              { path: '/contact', label: t('contact') },
              { path: '/support', label: t('support') },
            ].map(({ path, label }) => (
              <Link key={path} to={path} className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                isActive(path)
                  ? scrolled ? 'bg-burdan-red text-white' : 'bg-white/20 text-white'
                  : scrolled ? 'text-burdan-darkgray hover:bg-burdan-gray' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}>
                {label}
              </Link>
            ))}
            <button onClick={toggleLanguage} className={`ml-2 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-body font-semibold border transition-all duration-200 ${
              scrolled ? 'border-burdan-red/20 text-burdan-red hover:bg-burdan-red hover:text-white' : 'border-white/30 text-white hover:bg-white/10'
            }`} aria-label="Toggle language">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {language === 'en' ? 'SW' : 'EN'}
            </button>
            <a href="https://wa.me/255717009600" target="_blank" rel="noopener noreferrer" className="ml-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-body font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25">
              WhatsApp
            </a>
          </div>

          <div className="md:hidden mobile-menu-container">
            <button onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} className={`p-2 rounded-lg transition-colors duration-200 ${scrolled ? 'text-burdan-black' : 'text-white'}`} aria-label="Toggle menu">
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className={`rounded-2xl p-3 space-y-1 ${scrolled ? 'bg-burdan-gray' : 'bg-white/10 backdrop-blur-md'}`}>
            {[
              { path: '/', label: t('home') },
              { path: '/routes', label: t('routes') },
              { path: '/gallery', label: t('gallery') },
              { path: '/contact', label: t('contact') },
              { path: '/support', label: t('support') },
            ].map(({ path, label }) => (
              <Link key={path} to={path} onClick={() => setIsMenuOpen(false)} className={`block px-4 py-3 rounded-xl text-base font-body font-medium transition-colors duration-200 ${
                isActive(path)
                  ? 'bg-burdan-red text-white'
                  : scrolled ? 'text-burdan-darkgray hover:bg-white' : 'text-white hover:bg-white/10'
              }`}>{label}</Link>
            ))}
            <button onClick={toggleLanguage} className={`block w-full text-left px-4 py-3 rounded-xl text-base font-body font-semibold transition-colors duration-200 ${scrolled ? 'text-burdan-orange hover:bg-white' : 'text-burdan-gold hover:bg-white/10'}`}>
              {language === 'en' ? 'Kiswahili' : 'English'}
            </button>
            <a href="https://wa.me/255717009600" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="block text-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-body font-semibold rounded-xl transition-colors duration-200">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
