import React, { useState, useEffect, useRef } from 'react';
import SafariYetuScrollManager from '../utils/safariYetuScrollManager';
import { useLanguage } from '../contexts/LanguageContext';

const Book = () => {
  const { t } = useLanguage();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pickupStation, setPickupStation] = useState('');
  const [dropOffStation, setDropOffStation] = useState('');
  const [, setIsBookingDialogOpen] = useState(false);
  const scrollManagerRef = useRef(null);

  useEffect(() => { return () => { if (scrollManagerRef.current) { scrollManagerRef.current.cleanup(); scrollManagerRef.current = null; } }; }, []);

  const darStations = ['Ubungo Terminal', 'Mbagala Station', 'Temeke Terminal'];
  const lindiStations = ['Lindi Central Station', 'Masasi Terminal', 'Mtwara Station'];

  const generateSeats = () => {
    const seats = [];
    const unavailable = [5, 12, 18, 23, 27, 31];
    for (let i = 1; i <= 40; i++) seats.push({ number: i, isAvailable: !unavailable.includes(i), isSelected: selectedSeats.includes(i) });
    return seats;
  };

  const seats = generateSeats();
  const handleSeatClick = (n) => { const s = seats.find(s => s.number === n); if (!s.isAvailable) return; setSelectedSeats(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]); };

  const handleProceedToPayment = async () => {
    if (!selectedSeats.length) { alert(t('selectSeatAlert')); return; }
    if (!pickupStation) { alert(t('selectPickupAlert')); return; }
    if (!dropOffStation) { alert(t('selectDropoffAlert')); return; }
    if (scrollManagerRef.current) scrollManagerRef.current.cleanup();
    try {
      const bookingData = { operatorId: '2203260042', origin: pickupStation, destination: dropOffStation, departureDate: new Date().toISOString().split('T')[0], passengersCount: selectedSeats.length, selectedSeats, onClose: () => { setIsLoading(false); setIsBookingDialogOpen(false); window.location.reload(); } };
      scrollManagerRef.current = SafariYetuScrollManager.createInstance();
      setIsLoading(true); setIsBookingDialogOpen(true);
      if (typeof window.safariplus === 'undefined') {
        if (process.env.NODE_ENV === 'development') {
          scrollManagerRef.current.disableScroll();
          setTimeout(() => { alert(`Mock Payment:\nSeats: ${selectedSeats.join(', ')}\nPickup: ${pickupStation}\nDrop-off: ${dropOffStation}`); if (scrollManagerRef.current) { scrollManagerRef.current.enableScroll(); scrollManagerRef.current.cleanup(); } setIsLoading(false); setIsBookingDialogOpen(false); }, 2000);
          return;
        } else throw new Error(t('paymentSystemLoading'));
      }
      await scrollManagerRef.current.openBookingDialog(bookingData);
    } catch (error) { alert(error.message || t('paymentSystemError')); if (scrollManagerRef.current) { scrollManagerRef.current.cleanup(); scrollManagerRef.current = null; } setIsLoading(false); setIsBookingDialogOpen(false); }
  };

  const getSeatClass = (seat) => {
    if (!seat.isAvailable) return 'bg-burdan-gray text-burdan-darkgray/30 cursor-not-allowed';
    if (seat.isSelected) return 'bg-burdan-red text-white cursor-pointer shadow-md shadow-burdan-red/20';
    return 'bg-white border-2 border-burdan-gray hover:border-burdan-red/50 cursor-pointer';
  };

  const stationConfig = [
    { key: 'pickup', label: t('pickupLabel'), placeholder: t('selectPickupOption'), val: pickupStation, set: setPickupStation, opts: darStations },
    { key: 'dropoff', label: t('dropOffLabel'), placeholder: t('selectDropoffOption'), val: dropOffStation, set: setDropOffStation, opts: lindiStations }
  ];

  return (
    <div className="min-h-screen bg-burdan-cream pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-burdan-red/10 text-burdan-red font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">{t('bookingBadge')}</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-burdan-black tracking-tight">{t('selectYourSeats')}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 border border-burdan-gray">
              <div className="flex justify-center mb-6"><div className="bg-burdan-black text-white px-6 py-2 rounded-xl font-heading font-bold text-sm">{t('driver')}</div></div>
              <div className="flex justify-center gap-6 mb-8">
                {[{ color: 'bg-white border-2 border-burdan-gray', label: t('available') }, { color: 'bg-burdan-red', label: t('selected') }, { color: 'bg-burdan-gray', label: t('taken') }].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs font-body text-burdan-darkgray/70"><div className={`w-4 h-4 rounded-lg ${color}`} />{label}</div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
                {seats.map((seat) => (
                  <button key={seat.number} onClick={() => handleSeatClick(seat.number)} className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all duration-200 ${getSeatClass(seat)}`} disabled={!seat.isAvailable}>{seat.number}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 border border-burdan-gray">
              <h3 className="text-sm font-heading font-bold text-burdan-black mb-4 uppercase tracking-wider">{t('tripDetails')}</h3>
              <div className="space-y-3 text-sm font-body">
                {[[t('routeLabel'), 'Dar → Lindi'], [t('dateLabel'), t('today')], [t('departureLabel'), '6:00 AM'], [t('arrivalLabel'), '12:00 PM']].map(([k, v]) => (
                  <div key={k} className="flex justify-between"><span className="text-burdan-darkgray/50">{k}</span><span className="font-semibold text-burdan-black">{v}</span></div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-burdan-gray">
              <h3 className="text-sm font-heading font-bold text-burdan-black mb-4 uppercase tracking-wider">{t('selectedSeatsLabel')}</h3>
              {!selectedSeats.length ? <p className="text-burdan-darkgray/40 font-body text-sm">{t('noneSelected')}</p> : selectedSeats.map(n => (
                <div key={n} className="flex justify-between items-center py-1"><span className="font-body text-sm">{t('seatLabel')} {n}</span><span className="font-heading font-bold text-burdan-red text-sm">TSh 35,000</span></div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 border border-burdan-gray">
              <h3 className="text-sm font-heading font-bold text-burdan-black mb-4 uppercase tracking-wider">{t('stationsLabel')}</h3>
              <div className="space-y-3">
                {stationConfig.map(({ key, label, placeholder, val, set, opts }) => (
                  <div key={key}>
                    <label className="block text-xs font-body font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">{label}</label>
                    <select value={val} onChange={(e) => set(e.target.value)} className="w-full p-3 border-2 border-burdan-gray rounded-xl focus:border-burdan-orange focus:outline-none font-body text-sm transition-all">
                      <option value="">{placeholder}</option>
                      {opts.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-burdan-gray">
              <div className="flex justify-between font-heading font-bold text-lg"><span>{t('totalLabel')}</span><span className="text-burdan-red">TSh {(selectedSeats.length * 35000 + (selectedSeats.length ? 2000 : 0)).toLocaleString()}</span></div>
            </div>
            <button onClick={handleProceedToPayment} disabled={!selectedSeats.length || !pickupStation || !dropOffStation || isLoading} className={`w-full font-heading font-bold py-4 rounded-xl transition-all duration-300 text-sm ${!selectedSeats.length || !pickupStation || !dropOffStation || isLoading ? 'bg-burdan-gray text-burdan-darkgray/40 cursor-not-allowed' : 'bg-burdan-red hover:bg-burdan-darkred text-white shadow-lg hover:shadow-burdan-red/30'}`}>
              {isLoading ? t('processing') : t('proceedToPayment')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
