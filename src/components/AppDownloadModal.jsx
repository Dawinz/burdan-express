import React, { useCallback, useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  APP_STORE_URL,
  APK_DOWNLOAD_URL,
  PLAY_STORE_URL,
  APP_DOWNLOAD_DISMISS_DAYS,
  APP_DOWNLOAD_DISMISS_KEY
} from '../config/appDownload';

const getPlatform = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 'ios';
  if (/android/i.test(userAgent)) return 'android';
  return 'other';
};

const shouldShowModal = () => {
  try {
    const dismissedAt = localStorage.getItem(APP_DOWNLOAD_DISMISS_KEY);
    if (!dismissedAt) return true;
    const dismissedTime = Number(dismissedAt);
    if (Number.isNaN(dismissedTime)) return true;
    const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
    return daysSinceDismissed >= APP_DOWNLOAD_DISMISS_DAYS;
  } catch { return true; }
};

const AppDownloadModal = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const platform = getPlatform();

  const handleDismiss = useCallback(() => {
    try { localStorage.setItem(APP_DOWNLOAD_DISMISS_KEY, String(Date.now())); } catch {}
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!shouldShowModal()) return undefined;
    const timer = window.setTimeout(() => { setIsOpen(true); }, 2500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleEscape = (event) => { if (event.key === 'Escape') handleDismiss(); };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleEscape); document.body.style.overflow = ''; };
  }, [isOpen, handleDismiss]);

  if (!isOpen) return null;

  const storeOptions = [
    {
      id: 'ios', title: t('downloadOnAppStore'), description: t('appStoreDescription'),
      href: APP_STORE_URL, available: Boolean(APP_STORE_URL), highlight: platform === 'ios',
      icon: <svg className="w-7 h-7" viewBox="0 0 24 24" aria-hidden="true"><path fill="#000000" d="M16.365 1.43c0 1.14-.467 2.22-1.177 3.08-.853.99-2.243 1.76-3.48 1.66-.16-1.09.48-2.25 1.22-3.04.84-.97 2.28-1.71 3.44-1.7zM20.8 17.13c-.57 1.31-.85 1.89-1.59 3.04-1.03 1.58-2.48 3.55-4.28 3.57-1.6.02-2.02-1.04-4.2-1.04-2.18 0-2.64 1.06-4.21 1.06-1.8.02-3.17-1.76-4.2-3.34-2.88-4.41-3.18-9.58-1.4-12.32 1.27-1.95 3.28-3.09 5.18-3.09 2.04 0 3.32 1.04 4.21 1.04.87 0 2.5-1.22 4.22-1.04.76.03 2.89.31 4.26 2.34-3.7 2.25-3.1 8.08.61 9.98z"/></svg>
    },
    {
      id: 'apk', title: t('downloadApk'), description: t('apkDescription'),
      href: APK_DOWNLOAD_URL, available: true, download: true, highlight: false,
      icon: <svg className="w-7 h-7" viewBox="0 0 24 24" aria-hidden="true"><path fill="#3DDC84" d="M17.6 9.48l1.84-3.18c.16-.28-.04-.62-.36-.62h-2.08c-.2 0-.39.1-.5.27l-1.86 3.22a7.03 7.03 0 0 0-5.08 0L8.5 5.95a.57.57 0 0 0-.5-.27H5.92c-.32 0-.52.34-.36.62L7.4 9.48A6.97 6.97 0 0 0 3 15.25v1.5c0 .83.67 1.5 1.5 1.5h1v3.25c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V18.25h6v3.25c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V18.25h1c.83 0 1.5-.67 1.5-1.5v-1.5a6.97 6.97 0 0 0-4.4-5.77zM7 13.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>
    },
    {
      id: 'playstore', title: t('downloadOnPlayStore'), description: t('playStoreDescription'),
      href: PLAY_STORE_URL, available: Boolean(PLAY_STORE_URL), highlight: platform === 'android',
      icon: <svg className="w-7 h-7" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M1.5 1.8c-.3.2-.5.6-.5 1v18.4c0 .4.2.8.5 1l10.2-10.2L1.5 1.8z" /><path fill="#34A853" d="M11.7 11.2 14.3 8.6l3.9-2.2c.7-.4 1.4-.1 1.4.7v.1l-2.7 3-5.2-1z" /><path fill="#FBBC04" d="m16.8 12.8-2.7 2.7 2.7 2.7c.7.4.7 1.1 0 1.5l-3.9-2.2 2.6-2.6 1.3-1.4z" /><path fill="#EA4335" d="M3.7 20.2 13.9 10l-2.6-2.6L1.5 18.8c-.3.2-.5.6-.5 1 0 .8.5 1.2 1.2.8l1.5-.9z" /></svg>
    }
  ];

  const sortedOptions = [...storeOptions].sort((a, b) => {
    if (a.highlight === b.highlight) return 0;
    return a.highlight ? -1 : 1;
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="app-download-title">
      <button type="button" className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-label={t('close')} onClick={handleDismiss} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-burdan-lightred">
        <div className="bg-gradient-to-r from-burdan-black via-burdan-darkred to-burdan-red px-5 py-5 text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center">
                <span className="text-burdan-red font-heading font-black text-sm">BE</span>
              </div>
              <div>
                <h2 id="app-download-title" className="text-lg sm:text-xl font-heading font-bold tracking-wide">{t('appDownloadTitle')}</h2>
                <p className="text-sm text-white/90 font-body mt-1">{t('appDownloadSubtitle')}</p>
              </div>
            </div>
            <button type="button" onClick={handleDismiss} className="rounded-full p-1.5 hover:bg-white/15 transition-colors" aria-label={t('close')}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <div className="px-5 py-5 space-y-3">
          {sortedOptions.map((option) => {
            const cardClasses = `w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
              option.available
                ? option.highlight ? 'border-burdan-red bg-burdan-red/5 hover:border-burdan-red hover:shadow-md' : 'border-gray-200 bg-white hover:border-burdan-red hover:shadow-md'
                : 'border-gray-200 bg-gray-50 opacity-80 cursor-not-allowed'
            }`;
            const content = (
              <>
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${option.available ? 'bg-white border border-gray-100 shadow-sm' : 'bg-gray-100 border border-gray-200 opacity-70'}`}>{option.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-heading font-bold text-burdan-darkgray">{option.title}</p>
                    {option.comingSoon && <span className="text-[10px] uppercase tracking-wide font-semibold bg-burdan-gold/20 text-burdan-gold px-2 py-0.5 rounded-full">{t('comingSoon')}</span>}
                  </div>
                  <p className="text-sm text-gray-600 font-body mt-0.5">{option.description}</p>
                </div>
                {option.available && <svg className="w-5 h-5 text-burdan-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
              </>
            );
            if (!option.available) return <div key={option.id} className={cardClasses} aria-disabled="true">{content}</div>;
            if (option.download) return <a key={option.id} href={option.href} download="burdan-express.apk" className={cardClasses} onClick={handleDismiss}>{content}</a>;
            return <a key={option.id} href={option.href} target="_blank" rel="noopener noreferrer" className={cardClasses} onClick={handleDismiss}>{content}</a>;
          })}
          <button type="button" onClick={handleDismiss} className="w-full py-3 text-sm font-body font-semibold text-gray-500 hover:text-burdan-red transition-colors">{t('notNow')}</button>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadModal;
