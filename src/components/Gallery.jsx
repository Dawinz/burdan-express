import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, src: '/images/burdan-bus-15.png', alt: 'Burdan Express - Yutong Side View', title: 'Premium Fleet' },
    { id: 2, src: '/images/burdan-bus-1.png', alt: 'Burdan Express - Front View', title: 'Modern Buses' },
    { id: 3, src: '/images/burdan-bus-13.png', alt: 'Burdan Express - Fleet on Road', title: 'Reliable Service' },
    { id: 4, src: '/images/burdan-bus-12.png', alt: 'Burdan Express - Night Drive', title: 'Safe Travel' }
  ];

  return (
    <section className="py-20 bg-burdan-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(196,30,36,0.15),transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-block bg-burdan-red/20 text-burdan-red font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              {t('ourFleet')}
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
              {t('fleetDescription')}
            </h2>
          </div>
          <p className="text-white/40 font-body text-sm max-w-xs mt-4 md:mt-0">
            Yutong buses built for long-distance comfort
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3]" onClick={() => setSelectedImage(image)}>
              <img src={image.src} alt={image.alt} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-burdan-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-heading font-bold text-sm md:text-base">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl w-full">
            <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} className="w-full h-auto max-h-[85vh] object-contain rounded-2xl" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
