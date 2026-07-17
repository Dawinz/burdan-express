import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('sw');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'sw' : 'en');
  };

  const t = (key) => {
    const translations = {
      en: {
        home: 'Home',
        routes: 'Routes',
        gallery: 'Gallery',
        contact: 'Contact',
        whatsapp: 'WhatsApp',

        findYourJourney: 'FIND YOUR JOURNEY',
        searchBookPremium: 'Search and book your premium bus travel',
        bookYourJourney: 'BOOK YOUR JOURNEY',

        from: 'FROM',
        to: 'TO',
        travelDate: 'TRAVEL DATE',
        passengers: 'PASSENGERS',
        searchSafari: 'SEARCH TRIP',
        selectDeparture: 'Select departure',
        selectDestination: 'Select destination',
        passenger: 'Passenger',

        popularRoutes: 'Popular Routes:',

        whyChoose: 'WHY CHOOSE BURDAN EXPRESS',
        motto: 'CHAPATIKAVU',
        premiumComfort: 'PREMIUM COMFORT',
        comfortDesc: 'Luxury Yutong buses with air conditioning, reclining seats, and spacious interiors',
        onTimeDeparture: 'ON-TIME DEPARTURE',
        onTimeDesc: 'Reliable schedules and punctual service connecting Dar, Lindi, and Masasi',
        safeTravel: 'SAFE TRAVEL',
        safeTravelDesc: 'Professional drivers and well-maintained Yutong vehicles for your safety',

        ourRoutes: 'OUR ROUTES',
        routesDesc: 'Discover all the destinations we serve with our premium bus services',
        price: 'Price:',
        duration: 'Duration:',
        bookThisRoute: 'Book This Route',
        routeInformation: 'ROUTE INFORMATION',
        departureTimes: 'DEPARTURE TIMES',
        morningTime: 'Morning: 5:00 AM - 7:00 AM',
        afternoonTime: 'Afternoon: 12:00 PM - 2:00 PM',
        eveningTime: 'Evening: 6:00 PM - 8:00 PM',

        airConditioning: 'Air Conditioning',
        comfortableSeats: 'Comfortable Reclining Seats',
        freeWifi: 'Free WiFi',
        chargingPorts: 'Charging Ports',
        entertainmentSystem: 'Entertainment System',

        threeHours: '3 hours',
        fourHours: '4 hours',
        fiveHours: '5 hours',
        sixHours: '6 hours',
        sevenHours: '7 hours',
        eightHours: '8 hours',
        nineHours: '9 hours',
        tenHours: '10 hours',
        twelveHours: '12 hours',

        ourGallery: 'OUR GALLERY',
        galleryDesc: 'Take a look at our modern fleet of Yutong buses and experience the comfort of traveling with Burdan Express',
        ourFleet: 'OUR FLEET',
        fleetDescription: 'Experience comfort and reliability with our modern Yutong fleet',
        modernFleet: 'Modern Fleet',
        comfortableInterior: 'Comfortable Interior',
        professionalService: 'Professional Service',
        premiumExperience: 'Premium Experience',
        onTheRoad: 'On the Road',
        atTheTerminal: 'At the Terminal',

        contactUs: 'CONTACT US',
        contactDesc: 'Get in touch with us for any inquiries, bookings, or support',
        sendMessage: 'SEND US A MESSAGE',
        fullName: 'Full Name *',
        emailAddress: 'Email Address *',
        phoneNumber: 'Phone Number',
        message: 'Message *',
        sendMessageBtn: 'SEND MESSAGE',
        messageSentSuccess: 'Thank you for your message! We will get back to you soon.',
        getInTouch: 'GET IN TOUCH',
        phone: 'PHONE',
        email: 'EMAIL',
        office: 'OFFICE',
        serviceHours: 'SERVICE HOURS',
        availableDaily: 'AVAILABLE DAILY',
        customerSupport: 'CUSTOMER SUPPORT',
        available24_7: 'Available 24/7 via WhatsApp',
        quickSupport: 'QUICK SUPPORT',
        needImmediateAssistance: 'Need immediate assistance? Chat with us on WhatsApp for instant support!',
        chatOnWhatsApp: 'Chat on WhatsApp',

        fleetOne: 'Fleet One',
        fleetTwo: 'Fleet Two',
        fleetThree: 'Fleet Three',
        fleetFour: 'Fleet Four',
        mobileView: 'Mobile View',
        whyChooseBurdanExpress: 'WHY CHOOSE BURDAN EXPRESS',
        premiumComfortDesc: 'Luxury Yutong buses with air conditioning and spacious interiors',
        onTimeDepartureDesc: 'Reliable schedules connecting Dar es Salaam, Lindi, and Masasi',

        simu: 'PHONE',
        ofisi: 'OFFICE',
        mainTerminal: 'Dar es Salaam',
        region: 'Tanzania',
        wakatiWaHuduma: 'SERVICE HOURS',
        tunapaikanaKilaSiku: 'AVAILABLE DAILY',
        customerSupportDesc: 'CUSTOMER SUPPORT',
        timeRange: '5:00am – 10:00pm',

        enterFullNamePlaceholder: 'Enter your full name',
        enterEmailPlaceholder: 'Enter your email address',
        enterPhonePlaceholder: 'Enter your phone number',
        enterMessagePlaceholder: 'Tell us how we can help you...',

        experienceDifference: 'Experience the difference with our premium bus services',

        amenities: 'AMENITIES',

        footerTagline: 'Chapatikavu - Always Available',
        footerDescription: 'Burdan Express is a dedicated passenger transportation company operating modern Yutong buses on the Dar es Salaam - Lindi - Masasi route. We are committed to providing safe, comfortable, and reliable travel services across southern Tanzania.',
        quickLinks: 'QUICK LINKS',
        contactInfo: 'CONTACT INFO',
        headOffice: 'Head Office',
        headOfficeLocation: 'Dar es Salaam',
        followUs: 'Follow Us',
        allRightsReserved: 'All rights reserved',
        bookNow: 'Book Now',

        appDownloadTitle: 'Get the Burdan Express App',
        appDownloadSubtitle: 'Book trips faster, browse routes, and travel with ease on your phone.',
        downloadOnAppStore: 'Download on App Store',
        appStoreDescription: 'Available for iPhone and iPad',
        downloadApk: 'Download Android APK',
        apkDescription: 'Install directly on Android devices',
        downloadOnPlayStore: 'Google Play Store',
        playStoreDescription: 'Get the app from Google Play',
        comingSoon: 'Coming soon',
        notNow: 'Not now',
        close: 'Close',

        selectDepartureError: 'Please select departure city',
        selectDestinationError: 'Please select destination city',
        differentCitiesError: 'Departure and destination cities must be different',
        selectDateError: 'Please select travel date',
        invalidDateError: 'Please enter a valid date (DD/MM/YYYY)',
        pastDateError: 'Travel date cannot be in the past',
        selectPassengersError: 'Please select number of passengers'
      },
      sw: {
        home: 'Nyumbani',
        routes: 'Njia',
        gallery: 'Picha',
        contact: 'Wasiliana',
        whatsapp: 'WhatsApp',

        findYourJourney: 'TAFUTA SAFARI YAKO',
        searchBookPremium: 'Tafuta na book safari yako ya kilasi',
        bookYourJourney: 'BOOK SAFARI YAKO',

        from: 'KUTOKA',
        to: 'KWENDA',
        travelDate: 'TAREHE YA SAFARI',
        passengers: 'ABIRIA',
        searchSafari: 'TAFUTA SAFARI',
        selectDeparture: 'Chagua mahali pa kuondoka',
        selectDestination: 'Chagua mahali pa kwenda',
        passenger: 'Mtu',

        popularRoutes: 'Njia Maarufu:',

        whyChoose: 'KWA NINI UCHAGUE BURDAN EXPRESS',
        motto: 'CHAPATIKAVU',
        premiumComfort: 'USTAREHE WA KILASI',
        comfortDesc: 'Mabasi ya Yutong ya kifahari yenye hewa baridi, viti vya ustarehe, na mazingira mapana',
        onTimeDeparture: 'KUONDOKA KWA WAKATI',
        onTimeDesc: 'Ratiba za kuaminika zinazounganisha Dar, Lindi, na Masasi',
        safeTravel: 'USAFIRI SALAMA',
        safeTravelDesc: 'Madereva wataalam na magari ya Yutong yaliyotunzwa vizuri kwa usalama wako',

        ourRoutes: 'NJIA ZETU',
        routesDesc: 'Gundua maeneo yote tunayohudumia kwa huduma zetu za kilasi za mabasi',
        price: 'Bei:',
        duration: 'Muda:',
        bookThisRoute: 'Wekesha njia hii',
        routeInformation: 'TAARIFA ZA SAFARI',
        departureTimes: 'MUDA WA KUONDOKA',
        morningTime: 'Asubuhi: 5:00 AM - 7:00 AM',
        afternoonTime: 'Mchana: 12:00 PM - 2:00 PM',
        eveningTime: 'Jioni: 6:00 PM - 8:00 PM',

        airConditioning: 'Hewa Baridi',
        comfortableSeats: 'Viti Vyenye Ustarehe',
        freeWifi: 'WiFi Bure',
        chargingPorts: 'Mahali pa Kuchaji',
        entertainmentSystem: 'Mfumo wa Burudani',

        threeHours: 'Masaa 3',
        fourHours: 'Masaa 4',
        fiveHours: 'Masaa 5',
        sixHours: 'Masaa 6',
        sevenHours: 'Masaa 7',
        eightHours: 'Masaa 8',
        nineHours: 'Masaa 9',
        tenHours: 'Masaa 10',
        twelveHours: 'Masaa 12',

        ourGallery: 'PICHA ZETU',
        galleryDesc: 'Angalia gari zetu za kisasa za Yutong na ujaribu ustarehe wa kusafiri na Burdan Express',
        ourFleet: 'MAGARI YETU',
        fleetDescription: 'Furahia ustarehe na kuaminika na magari yetu ya kisasa ya Yutong',
        modernFleet: 'Magari ya Kisasa',
        comfortableInterior: 'Ndani Yenye Ustarehe',
        professionalService: 'Huduma ya Kitaalam',
        premiumExperience: 'Uzoefu wa Kilasi',
        onTheRoad: 'Barabarani',
        atTheTerminal: 'Kwenye Kituo',

        contactUs: 'WASILIANA NASI',
        contactDesc: 'Wasiliana nasi kwa maswali yoyote, uhifadhi au msaada',
        sendMessage: 'TUTUMIE UJUMBE',
        fullName: 'Jina Kamili *',
        emailAddress: 'Barua Pepe *',
        phoneNumber: 'Namba ya Simu',
        message: 'Ujumbe *',
        sendMessageBtn: 'TUMA UJUMBE',
        messageSentSuccess: 'Asante kwa ujumbe wako! Tutawasiliana nawe hivi karibuni.',
        getInTouch: 'WASILIANA',
        phone: 'SIMU',
        email: 'BARUA PEPE',
        office: 'OFISI',
        serviceHours: 'MUDA WA HUDUMA',
        availableDaily: 'TUNAPATIKANA KILA SIKU',
        customerSupport: 'MSAADA WA WATEJA',
        available24_7: 'Tunapatikana saa 24/7 kupitia WhatsApp',
        quickSupport: 'MSAADA WA HARAKA',
        needImmediateAssistance: 'Unahitaji msaada wa haraka? Ongea nasi WhatsApp kwa msaada wa mara moja!',
        chatOnWhatsApp: 'Ongea WhatsApp',

        fleetOne: 'Gari la Kwanza',
        fleetTwo: 'Gari la Pili',
        fleetThree: 'Gari la Tatu',
        fleetFour: 'Gari la Nne',
        mobileView: 'Mwonekano wa Simu',
        whyChooseBurdanExpress: 'KWA NINI UCHAGUE BURDAN EXPRESS',
        premiumComfortDesc: 'Mabasi ya Yutong ya kifahari yenye hewa baridi na mazingira mapana',
        onTimeDepartureDesc: 'Ratiba za kuaminika zinazounganisha Dar es Salaam, Lindi, na Masasi',

        simu: 'SIMU',
        ofisi: 'OFISI',
        mainTerminal: 'Dar es Salaam',
        region: 'Tanzania',
        wakatiWaHuduma: 'WAKATI WA HUDUMA',
        tunapaikanaKilaSiku: 'TUNAPATIKANA KILA SIKU',
        customerSupportDesc: 'MSAADA WA WATEJA',
        timeRange: '5:00am – 10:00pm',

        enterFullNamePlaceholder: 'Ingiza jina lako kamili',
        enterEmailPlaceholder: 'Ingiza barua pepe yako',
        enterPhonePlaceholder: 'Ingiza namba yako ya simu',
        enterMessagePlaceholder: 'Tuambie jinsi tuweza kukusaidia...',

        experienceDifference: 'Furahia tofauti na huduma zetu za kilasi za mabasi',

        amenities: 'VIFAA',

        footerTagline: 'Chapatikavu - Tunapatikana Kila Wakati',
        footerDescription: 'Burdan Express ni kampuni inayojitolea kusafirisha abiria kwa kutumia mabasi ya kisasa ya Yutong kwenye njia ya Dar es Salaam - Lindi - Masasi. Tumejitolea kutoa huduma salama, za ustarehe, na za kuaminika katika kusini mwa Tanzania.',
        quickLinks: 'VIUNGO VYA HARAKA',
        contactInfo: 'MAELEZO YA MAWASILIANO',
        headOffice: 'Makao Makuu',
        headOfficeLocation: 'Dar es Salaam',
        followUs: 'Tufuate',
        allRightsReserved: 'Haki zote zimehifadhiwa',
        bookNow: 'Book Sasa',

        appDownloadTitle: 'Pakua App ya Burdan Express',
        appDownloadSubtitle: 'Book safari haraka, angalia njia, na safiri kwa urahisi kupitia simu yako.',
        downloadOnAppStore: 'Pakua kwenye App Store',
        appStoreDescription: 'Inapatikana kwa iPhone na iPad',
        downloadApk: 'Pakua APK ya Android',
        apkDescription: 'Sakinisha moja kwa moja kwenye simu za Android',
        downloadOnPlayStore: 'Google Play Store',
        playStoreDescription: 'Pakua app kutoka Google Play',
        comingSoon: 'Inakuja hivi karibuni',
        notNow: 'Si sasa',
        close: 'Funga',

        selectDepartureError: 'Tafadhali chagua jiji la kuondoka',
        selectDestinationError: 'Tafadhali chagua jiji la kwenda',
        differentCitiesError: 'Miji ya kuondoka na kwenda lazima iwe tofauti',
        selectDateError: 'Tafadhali chagua tarehe ya safari',
        invalidDateError: 'Tafadhali weka tarehe sahihi (DD/MM/YYYY)',
        pastDateError: 'Tarehe ya safari haiwezi kuwa ya zamani',
        selectPassengersError: 'Tafadhali chagua idadi ya abiria'
      }
    };

    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
