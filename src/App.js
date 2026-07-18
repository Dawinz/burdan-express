import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import AppDownloadModal from './components/AppDownloadModal';
import React, { useState, useEffect, useCallback } from 'react';
import Home from './pages/Home';
import RoutesPage from './pages/Routes';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Book from './pages/Book';
import Support from './pages/Support';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { LanguageProvider } from './contexts/LanguageContext';

/**
 * SafariPlus lifecycle (official docs):
 * - safariplus:dialog-opened
 * - safariplus:booking-completed
 * - safariplus:booking-cancelled
 * - safariplus:dialog-closed
 * See: https://demo.safariyetu.com/safariplus/v1/examples/embed.html
 */
function App() {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const closeBooking = useCallback(() => {
    document.body.style.overflow = '';
    document.body.classList.remove('booking-active');
    setIsBookingDialogOpen(false);
  }, []);

  useEffect(() => {
    if (isBookingDialogOpen) {
      document.body.classList.add('booking-active');
    } else {
      document.body.classList.remove('booking-active');
    }
  }, [isBookingDialogOpen]);

  useEffect(() => {
    const onOpened = () => {
      setIsBookingDialogOpen(true);
      document.body.style.overflow = 'hidden';
      document.body.classList.add('booking-active');
    };

    const onClosed = () => {
      closeBooking();
    };

    document.addEventListener('safariplus:dialog-opened', onOpened);
    document.addEventListener('safariplus:dialog-closed', onClosed);
    document.addEventListener('safariplus:booking-cancelled', onClosed);
    document.addEventListener('safariplus:booking-completed', onClosed);

    return () => {
      document.removeEventListener('safariplus:dialog-opened', onOpened);
      document.removeEventListener('safariplus:dialog-closed', onClosed);
      document.removeEventListener('safariplus:booking-cancelled', onClosed);
      document.removeEventListener('safariplus:booking-completed', onClosed);
    };
  }, [closeBooking]);

  // Fallback: SafariPlus mounts shells in a closed shadow root.
  // If lifecycle events miss, detect via activeShells then restore on close.
  useEffect(() => {
    if (!isBookingDialogOpen) return;

    let seen = false;
    const timer = setInterval(() => {
      try {
        const Shell = customElements.get('safari-shell');
        const open = Shell && Array.isArray(Shell.activeShells) && Shell.activeShells.length > 0;
        if (open) {
          seen = true;
          return;
        }
        if (seen) {
          clearInterval(timer);
          closeBooking();
        }
      } catch {}
    }, 600);

    return () => clearInterval(timer);
  }, [isBookingDialogOpen, closeBooking]);

  return (
    <LanguageProvider>
      <div className={`app-shell min-h-screen font-body${isBookingDialogOpen ? ' pointer-events-none select-none' : ''}`}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home setIsBookingDialogOpen={setIsBookingDialogOpen} isBookingDialogOpen={isBookingDialogOpen} />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
        {!isBookingDialogOpen && <WhatsAppFloat />}
        {!isBookingDialogOpen && <AppDownloadModal />}
      </div>
    </LanguageProvider>
  );
}

export default App;
