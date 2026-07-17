import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); alert(t('messageSentSuccess')); setFormData({ name: '', email: '', phone: '', message: '' }); };

  return (
    <div className="min-h-screen bg-burdan-cream pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-burdan-red/10 text-burdan-red font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">{t('contactUs')}</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-burdan-black tracking-tight">{t('contactUs')}</h1>
          <p className="text-lg text-burdan-darkgray/60 font-body max-w-xl mx-auto mt-4">{t('contactDesc')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white rounded-3xl p-8 border border-burdan-gray">
            <h2 className="text-xl font-heading font-bold text-burdan-black mb-6">{t('sendMessage')}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-body font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">{t('fullName')}</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3.5 border-2 border-burdan-gray rounded-xl focus:border-burdan-orange focus:outline-none focus:ring-2 focus:ring-burdan-orange/20 font-body text-sm transition-all" placeholder={t('enterFullNamePlaceholder')} />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">{t('emailAddress')}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3.5 border-2 border-burdan-gray rounded-xl focus:border-burdan-orange focus:outline-none focus:ring-2 focus:ring-burdan-orange/20 font-body text-sm transition-all" placeholder={t('enterEmailPlaceholder')} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">{t('phoneNumber')}</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3.5 border-2 border-burdan-gray rounded-xl focus:border-burdan-orange focus:outline-none focus:ring-2 focus:ring-burdan-orange/20 font-body text-sm transition-all" placeholder={t('enterPhonePlaceholder')} />
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-burdan-darkgray/70 mb-1.5 uppercase tracking-wider">{t('message')}</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full p-3.5 border-2 border-burdan-gray rounded-xl focus:border-burdan-orange focus:outline-none focus:ring-2 focus:ring-burdan-orange/20 font-body text-sm resize-none transition-all" placeholder={t('enterMessagePlaceholder')} />
              </div>
              <button type="submit" className="w-full bg-burdan-red hover:bg-burdan-darkred text-white font-heading font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-burdan-red/20">{t('sendMessageBtn')}</button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-burdan-gray">
              <h2 className="text-xl font-heading font-bold text-burdan-black mb-6">{t('getInTouch')}</h2>
              <div className="space-y-5">
                {[
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />, title: t('simu'), content: <a href="tel:+255717009600" className="hover:text-burdan-red transition-colors">+255 717 009 600</a> },
                  { icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></>, title: t('email'), content: 'info@burdanexpress.co.tz' },
                  { icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>, title: t('ofisi'), content: 'Dar es Salaam, Tanzania' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-burdan-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-burdan-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-burdan-black text-sm">{item.title}</h3>
                      <p className="text-burdan-darkgray/60 font-body text-sm">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-500 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-heading font-bold mb-3">{t('quickSupport')}</h3>
              <p className="font-body text-sm text-white/80 mb-5">{t('needImmediateAssistance')}</p>
              <a href="https://wa.me/255717009600" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white text-green-600 font-heading font-bold py-3 px-6 rounded-xl hover:bg-green-50 transition-colors text-sm">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                {t('chatOnWhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
