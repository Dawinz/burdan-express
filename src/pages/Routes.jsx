import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { routeDefinitions } from '../data/routesData';

const Routes = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const routes = routeDefinitions.map((route) => ({ ...route, duration: t(route.durationKey) }));

  const handleBookRoute = (route) => navigate(`/?from=${route.fromValue}&to=${route.toValue}`);

  return (
    <div className="min-h-screen bg-burdan-cream pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-burdan-red/10 text-burdan-red font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">{t('ourRoutes')}</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-burdan-black tracking-tight">{t('ourRoutes')}</h1>
          <p className="text-lg text-burdan-darkgray/60 font-body max-w-xl mx-auto mt-4">{t('routesDesc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {routes.map((route, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-burdan-gray hover:border-burdan-red/20 hover:shadow-xl hover:shadow-burdan-red/5 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                <span className="font-heading font-semibold text-burdan-black text-sm">{route.from}</span>
                <div className="flex-1 border-t-2 border-dashed border-burdan-gray" />
                <span className="font-heading font-semibold text-burdan-black text-sm">{route.to}</span>
                <div className="w-2.5 h-2.5 bg-burdan-red rounded-full" />
              </div>
              <div className="flex justify-between items-center mb-5">
                <div>
                  <p className="text-xs font-body text-burdan-darkgray/50 uppercase tracking-wider">{t('price')}</p>
                  <p className="text-xl font-heading font-bold text-burdan-red">{route.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-body text-burdan-darkgray/50 uppercase tracking-wider">{t('duration')}</p>
                  <p className="text-sm font-body font-semibold text-burdan-darkgray">{route.duration}</p>
                </div>
              </div>
              <button onClick={() => handleBookRoute(route)} className="w-full bg-burdan-black group-hover:bg-burdan-red text-white font-heading font-semibold py-3 rounded-xl transition-all duration-300 text-sm">
                {t('bookThisRoute')}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 md:p-10 border border-burdan-gray">
          <h2 className="text-2xl font-heading font-bold text-burdan-black mb-8 text-center tracking-tight">{t('routeInformation')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-sm font-heading font-bold text-burdan-red mb-4 uppercase tracking-widest">{t('departureTimes')}</h3>
              <ul className="space-y-3 font-body text-burdan-darkgray/70 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burdan-orange" />{t('morningTime')}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burdan-orange" />{t('afternoonTime')}</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burdan-orange" />{t('eveningTime')}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-heading font-bold text-burdan-red mb-4 uppercase tracking-widest">{t('amenities')}</h3>
              <ul className="space-y-3 font-body text-burdan-darkgray/70 text-sm">
                {[t('airConditioning'), t('comfortableSeats'), t('freeWifi'), t('chargingPorts'), t('entertainmentSystem')].map((a,i) => (
                  <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burdan-red" />{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routes;
