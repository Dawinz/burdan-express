import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, src: '/images/burdan-bus-1.png', alt: 'Burdan Express Bus - Front View', title: t('modernFleet') },
    { id: 2, src: '/images/burdan-bus-2.png', alt: 'Burdan Express Bus - Day', title: t('comfortableInterior') },
    { id: 3, src: '/images/burdan-bus-3.png', alt: 'Burdan Express - Rear Night', title: t('professionalService') },
    { id: 4, src: '/images/burdan-bus-4.png', alt: 'Burdan Express Office Sign', title: 'Office' },
    { id: 5, src: '/images/burdan-bus-5.png', alt: 'Burdan Express - LED Rear', title: t('premiumExperience') },
    { id: 6, src: '/images/burdan-bus-7.png', alt: 'Burdan Express - Rear Day', title: t('atTheTerminal') },
    { id: 7, src: '/images/burdan-bus-8.png', alt: 'Burdan Express - On Road', title: t('onTheRoad') },
    { id: 8, src: '/images/burdan-bus-9.png', alt: 'Burdan Express - Another Bus', title: t('fleetOne') },
    { id: 9, src: '/images/burdan-bus-10.png', alt: 'Burdan Express - Night', title: t('fleetTwo') },
    { id: 10, src: '/images/burdan-bus-11.png', alt: 'Burdan Express - Full Night', title: t('fleetThree') },
    { id: 11, src: '/images/burdan-bus-12.png', alt: 'Burdan Express - Neon Night', title: 'Night Express' },
    { id: 12, src: '/images/burdan-bus-13.png', alt: 'Burdan Express Fleet - Road', title: 'Fleet' },
    { id: 13, src: '/images/burdan-bus-14.png', alt: 'Burdan Express - Blue Accent', title: 'AN EXPI' },
    { id: 14, src: '/images/burdan-bus-15.png', alt: 'Burdan Express - Side Profile', title: 'Side Profile' }
  ];

  return (
    <div className="min-h-screen bg-burdan-cream pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-burdan-red/10 text-burdan-red font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">{t('ourGallery')}</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-burdan-black tracking-tight">{t('ourGallery')}</h1>
          <p className="text-lg text-burdan-darkgray/60 font-body max-w-xl mx-auto mt-4">{t('galleryDesc')}</p>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid" onClick={() => { setSelectedImage(image); document.body.style.overflow = 'hidden'; }}>
              <img src={image.src} alt={image.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-burdan-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-heading font-bold text-sm">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setSelectedImage(null); document.body.style.overflow = 'unset'; }}>
          <div className="relative max-w-4xl w-full">
            <button onClick={() => { setSelectedImage(null); document.body.style.overflow = 'unset'; }} className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-full max-h-[85vh] object-contain rounded-2xl mx-auto" />
            <div className="text-center mt-4">
              <h3 className="text-white font-heading font-bold text-xl">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
