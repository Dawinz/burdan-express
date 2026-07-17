import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import AppDownloadModal from './components/AppDownloadModal';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import RoutesPage from './pages/Routes';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Book from './pages/Book';
import Support from './pages/Support';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  useEffect(() => {
    if (!isBookingDialogOpen) return;

    let dialogWasSeen = false;
    let reloading = false;

    const reloadPage = () => {
      if (reloading) return;
      reloading = true;
      document.body.style.overflow = '';
      window.location.reload();
    };

    const isSafariDialogOpen = () => {
      try {
        const Shell = customElements.get('safari-shell');
        if (Shell && Array.isArray(Shell.activeShells) && Shell.activeShells.length > 0) {
          return true;
        }
      } catch {}
      return Boolean(document.querySelector('safari-page-blocking-progress'));
    };

    const onDialogClosed = () => reloadPage();
    document.addEventListener('safariplus:dialog-closed', onDialogClosed);
    document.addEventListener('safariplus:booking-cancelled', onDialogClosed);
    window.addEventListener('safariplus:dialog-closed', onDialogClosed);
    window.addEventListener('safariplus:booking-cancelled', onDialogClosed);

    const checkInterval = setInterval(() => {
      if (isSafariDialogOpen()) {
        dialogWasSeen = true;
        return;
      }
      if (dialogWasSeen) {
        clearInterval(checkInterval);
        reloadPage();
      }
    }, 500);

    return () => {
      clearInterval(checkInterval);
      document.removeEventListener('safariplus:dialog-closed', onDialogClosed);
      document.removeEventListener('safariplus:booking-cancelled', onDialogClosed);
      window.removeEventListener('safariplus:dialog-closed', onDialogClosed);
      window.removeEventListener('safariplus:booking-cancelled', onDialogClosed);
    };
  }, [isBookingDialogOpen]);

  return (
    <LanguageProvider>
      <div className={`min-h-screen font-body${isBookingDialogOpen ? ' blur-sm pointer-events-none select-none' : ''}`}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home setIsBookingDialogOpen={setIsBookingDialogOpen} />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
        <AppDownloadModal />
      </div>
    </LanguageProvider>
  );
}

export default App;
