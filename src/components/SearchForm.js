import React, { useState, useEffect, useRef, useMemo } from 'react';
import SafariYetuScrollManager from '../utils/safariYetuScrollManager';
import { useLanguage } from '../contexts/LanguageContext';
import { routeDefinitions, allLocations } from '../data/routesData';
import SearchableSelect from './SearchableSelect';
import {
  dateToYmd,
  todayInTanzania,
} from '../utils/travelDate';

const SearchForm = ({ setIsBookingDialogOpen }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const scrollManagerRef = useRef(null);
  const cityOptions = useMemo(() => allLocations, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromParam = urlParams.get('from');
    const toParam = urlParams.get('to');

    if (fromParam || toParam) {
      setFormData(prev => ({
        ...prev,
        from: fromParam || '',
        to: toParam || '',
        date: dateToYmd(todayInTanzania())
      }));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [cityOptions]);

  useEffect(() => {
    return () => {
      if (scrollManagerRef.current) {
        scrollManagerRef.current.cleanup();
        scrollManagerRef.current = null;
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSelectValueChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.from) { setError(t('selectDepartureError')); return false; }
    if (!formData.to) { setError(t('selectDestinationError')); return false; }
    if (formData.from === formData.to) { setError(t('differentCitiesError')); return false; }
    if (!formData.date) { setError(t('selectDateError')); return false; }
    const selected = new Date(formData.date);
    const today = todayInTanzania();
    if (selected < today) { setError(t('pastDateError')); return false; }
    if (!formData.passengers) { setError(t('selectPassengersError')); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    if (scrollManagerRef.current) {
      scrollManagerRef.current.cleanup();
    }

    try {
      const bookingData = {
        operatorId: '2203260042',
        origin: formData.from,
        destination: formData.to,
        departureDate: formData.date,
        passengersCount: parseInt(formData.passengers),
        onClose: () => {
          console.log('SafariYetu dialog closed via callback');
          setIsBookingDialogOpen(false);
          setIsLoading(false);
          setError('');
          window.location.reload();
        }
      };

      scrollManagerRef.current = SafariYetuScrollManager.createInstance();
      setIsLoading(true);
      setIsBookingDialogOpen(true);

      if (typeof window.safariplus === 'undefined') {
        if (process.env.NODE_ENV === 'development') {
          scrollManagerRef.current.disableScroll();

          setTimeout(() => {
            alert(`Mock Booking Dialog:\nFrom: ${formData.from}\nTo: ${formData.to}\nDate: ${formData.date}\nPassengers: ${formData.passengers}\n\nIn production, this would open SafariYetu booking system.`);

            if (scrollManagerRef.current) {
              scrollManagerRef.current.enableScroll();
              scrollManagerRef.current.cleanup();
            }
            setIsLoading(false);
            setIsBookingDialogOpen(false);
          }, 1500);
          return;
        } else {
          throw new Error('SafariYetu booking system is loading. Please try again in a moment.');
        }
      }

      await scrollManagerRef.current.openBookingDialog(bookingData);

    } catch (err) {
      console.error('SafariYetu booking error:', err);
      if (err.message && err.message.includes('loading')) {
        setError(err.message || 'Unable to load booking system. Please try again.');
      } else {
        setError('');
      }

      if (scrollManagerRef.current) {
        scrollManagerRef.current.cleanup();
        scrollManagerRef.current = null;
      }
      setIsLoading(false);
      setIsBookingDialogOpen(false);
    }
  };

  const todayStr = dateToYmd(todayInTanzania());

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mx-2 sm:mx-4 relative z-20 border border-burdan-gray">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-2xl font-heading font-bold text-burdan-black tracking-tight">
            {t('findYourJourney')}
          </h3>
          <p className="text-burdan-darkgray/60 font-body text-xs sm:text-sm mt-1 hidden sm:block">
            {t('searchBookPremium')}
          </p>
          {error && (
            <div className="mt-3 p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl font-body text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-body font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">{t('from')}</label>
              <SearchableSelect
                options={cityOptions}
                value={formData.from}
                onChange={(value) => handleSelectValueChange('from', value)}
                placeholder="Departure"
                isOpen={openDropdown === 'from'}
                onToggle={() => setOpenDropdown((prev) => (prev === 'from' ? null : 'from'))}
                onClose={() => setOpenDropdown(null)}
              />
            </div>
            <div>
              <label className="block text-xs font-body font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">{t('to')}</label>
              <SearchableSelect
                options={cityOptions}
                value={formData.to}
                onChange={(value) => handleSelectValueChange('to', value)}
                placeholder="Destination"
                isOpen={openDropdown === 'to'}
                onToggle={() => setOpenDropdown((prev) => (prev === 'to' ? null : 'to'))}
                onClose={() => setOpenDropdown(null)}
              />
            </div>
            <div>
              <label className="block text-xs font-body font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">{t('travelDate')}</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={todayStr}
                className="w-full p-2.5 sm:p-3 border-2 border-burdan-gray rounded-xl focus:border-burdan-orange focus:outline-none focus:ring-2 focus:ring-burdan-orange/20 font-body text-burdan-darkgray text-sm bg-white transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-body font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">{t('passengers')}</label>
              <select name="passengers" value={formData.passengers} onChange={handleInputChange} className="w-full p-2.5 sm:p-3 border-2 border-burdan-gray rounded-xl focus:border-burdan-orange focus:outline-none focus:ring-2 focus:ring-burdan-orange/20 font-body text-burdan-darkgray bg-white text-sm transition-all duration-200">
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} {num > 1 ? t('passengers') : t('passenger')}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 md:col-span-1 flex items-end">
              <button type="submit" disabled={isLoading} className={`w-full font-heading font-bold py-2.5 sm:py-3 px-4 rounded-xl transition-all duration-300 text-sm shadow-lg ${
                isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-burdan-red hover:bg-burdan-darkred text-white hover:shadow-burdan-red/30 hover:shadow-xl transform hover:-translate-y-0.5'
              }`}>
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    <span>{t('searchSafari')}...</span>
                  </div>
                ) : t('searchSafari')}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center items-center gap-2">
          <span className="text-xs font-body text-burdan-darkgray/50">{t('popularRoutes')}</span>
          {routeDefinitions.slice(0, 4).map(({ from, to, fromValue, toValue }) => (
            <button
              key={`${fromValue}-${toValue}`}
              onClick={() => {
                setFormData(prev => ({ ...prev, from: fromValue, to: toValue, date: todayStr }));
                setError('');
              }}
              disabled={isLoading}
              className="text-xs bg-burdan-cream hover:bg-burdan-red hover:text-white text-burdan-red border border-burdan-red/20 px-3 py-1.5 rounded-full font-body font-medium transition-all duration-200 disabled:opacity-50"
            >
              {from} → {to}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
