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

    const checkInterval = setInterval(() => {
      const shell = document.querySelector('safari-shell');
      const container = document.querySelector('.safari-shells-container');
      const blocker = document.querySelector('safari-page-blocking-progress');
      const dialogPresent = Boolean(shell || container || blocker);

      if (dialogPresent) {
        dialogWasSeen = true;
        return;
      }

      // Only reload after the dialog has opened and then been closed
      if (dialogWasSeen) {
        clearInterval(checkInterval);
        document.body.style.overflow = '';
        window.location.reload();
      }
    }, 800);

    return () => clearInterval(checkInterval);
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
