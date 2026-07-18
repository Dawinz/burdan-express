import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const LANGUAGE_STORAGE_KEY = 'burdan-language';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === 'en' || stored === 'sw') return stored;
    } catch {}
    return 'sw';
  });

  useEffect(() => {
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, language); } catch {}
    document.documentElement.lang = language;
  }, [language]);

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
        footerCtaTitle: 'Ready to travel south?',
        footerCtaSubtitle: 'Book your seat or talk to our team today.',
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
        selectPassengersError: 'Please select number of passengers',

        support: 'Support',
        privacyPolicyNav: 'Privacy Policy',
        heroTagline: 'Travel Southern Tanzania in Comfort',
        heroSubtitle: 'Premium buses connecting Dar es Salaam, Lindi and Masasi. Book your seat in seconds.',
        exploreRoutes: 'Explore Routes',

        bookingBadge: 'BOOKING',
        selectYourSeats: 'SELECT YOUR SEATS',
        driver: 'DRIVER',
        available: 'Available',
        selected: 'Selected',
        taken: 'Taken',
        tripDetails: 'Trip Details',
        routeLabel: 'Route',
        dateLabel: 'Date',
        today: 'Today',
        departureLabel: 'Departure',
        arrivalLabel: 'Arrival',
        selectedSeatsLabel: 'Selected Seats',
        noneSelected: 'None selected',
        seatLabel: 'Seat',
        stationsLabel: 'Stations',
        pickupLabel: 'Pickup',
        dropOffLabel: 'Drop-off',
        totalLabel: 'Total',
        processing: 'PROCESSING...',
        proceedToPayment: 'PROCEED TO PAYMENT',
        selectSeatAlert: 'Please select at least one seat',
        selectPickupAlert: 'Please select a pickup station',
        selectDropoffAlert: 'Please select a drop-off station',
        selectPickupOption: 'Select pickup',
        selectDropoffOption: 'Select drop-off',
        paymentSystemLoading: 'SafariYetu payment system is loading.',
        paymentSystemError: 'Unable to load payment system.',

        helpBadge: 'HELP',
        supportCenter: 'SUPPORT CENTER',
        supportIntro: "Need help with booking, trips, or the app? We're here for you.",
        phoneWhatsAppLabel: 'Phone / WhatsApp',
        emailLabel: 'Email',
        hoursLabel: 'Hours',
        dailyHours: 'Daily, 5:00 AM - 10:00 PM',
        quickHelpTopics: 'Quick Help Topics',
        helpTopic1: 'Booking confirmation and ticket reference support.',
        helpTopic2: 'Trip schedule updates and boarding-time assistance.',
        helpTopic3: 'Refund and cancellation guidance.',
        helpTopic4: 'Mobile app install, login, and booking troubleshooting.',

        legalBadge: 'LEGAL',
        privacyPolicyTitle: 'PRIVACY POLICY',
        lastUpdated: 'Last updated: July 15, 2026',
        privacySection1Title: '1. Information We Collect',
        privacySection1Content: 'We may collect booking and contact details including your name, phone number, email address, route, and travel information.',
        privacySection2Title: '2. How We Use Information',
        privacySection2Item1: 'To process and manage bookings.',
        privacySection2Item2: 'To provide travel and support updates.',
        privacySection2Item3: 'To improve customer experience and service quality.',
        privacySection2Item4: 'To comply with legal obligations.',
        privacySection3Title: '3. Data Sharing',
        privacySection3Content: 'We share data only when required for service delivery, legal compliance, or with your consent.',
        privacySection4Title: '4. Contact',
        privacyContactPrefix: 'For privacy requests, email',

        galleryOffice: 'Our Office',
        galleryNightExpress: 'Night Express',
        galleryFleetGroup: 'Our Fleet',
        gallerySideProfile: 'Side Profile',

        whatsappDefaultMessage: 'Hello! I would like to inquire about Burdan Express bus services.'
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
        footerCtaTitle: 'Tayari kusafiri kusini?',
        footerCtaSubtitle: 'Kata tiketi yako au ongea na timu yetu leo.',
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
        selectPassengersError: 'Tafadhali chagua idadi ya abiria',

        support: 'Msaada',
        privacyPolicyNav: 'Sera ya Faragha',
        heroTagline: 'Safiri Kusini mwa Tanzania kwa Ustarehe',
        heroSubtitle: 'Mabasi ya kilasi yanayounganisha Dar es Salaam, Lindi na Masasi. Book kiti chako kwa sekunde chache.',
        exploreRoutes: 'Angalia Njia',

        bookingBadge: 'UHIFADHI',
        selectYourSeats: 'CHAGUA VITI VYAKO',
        driver: 'DEREVA',
        available: 'Vinapatikana',
        selected: 'Vimechaguliwa',
        taken: 'Vimechukuliwa',
        tripDetails: 'Maelezo ya Safari',
        routeLabel: 'Njia',
        dateLabel: 'Tarehe',
        today: 'Leo',
        departureLabel: 'Kuondoka',
        arrivalLabel: 'Kuwasili',
        selectedSeatsLabel: 'Viti Vilivyochaguliwa',
        noneSelected: 'Hakuna kilichochaguliwa',
        seatLabel: 'Kiti',
        stationsLabel: 'Vituo',
        pickupLabel: 'Mahali pa Kupanda',
        dropOffLabel: 'Mahali pa Kushuka',
        totalLabel: 'Jumla',
        processing: 'INAENDELEA...',
        proceedToPayment: 'ENDELEA NA MALIPO',
        selectSeatAlert: 'Tafadhali chagua kiti angalau kimoja',
        selectPickupAlert: 'Tafadhali chagua kituo cha kupanda',
        selectDropoffAlert: 'Tafadhali chagua kituo cha kushuka',
        selectPickupOption: 'Chagua mahali pa kupanda',
        selectDropoffOption: 'Chagua mahali pa kushuka',
        paymentSystemLoading: 'Mfumo wa malipo wa SafariYetu unapakia.',
        paymentSystemError: 'Imeshindwa kupakia mfumo wa malipo.',

        helpBadge: 'MSAADA',
        supportCenter: 'KITUO CHA MSAADA',
        supportIntro: 'Unahitaji msaada wa uhifadhi, safari au app? Tupo hapa kukusaidia.',
        phoneWhatsAppLabel: 'Simu / WhatsApp',
        emailLabel: 'Barua Pepe',
        hoursLabel: 'Masaa',
        dailyHours: 'Kila siku, 5:00 AM - 10:00 PM',
        quickHelpTopics: 'Mada za Msaada wa Haraka',
        helpTopic1: 'Msaada wa uthibitisho wa uhifadhi na kumbukumbu ya tiketi.',
        helpTopic2: 'Masasisho ya ratiba za safari na msaada wa muda wa kupanda.',
        helpTopic3: 'Mwongozo wa marejesho na kughairi.',
        helpTopic4: 'Msaada wa kusakinisha app, kuingia, na matatizo ya uhifadhi.',

        legalBadge: 'KISHERIA',
        privacyPolicyTitle: 'SERA YA FARAGHA',
        lastUpdated: 'Ilisasishwa: Julai 15, 2026',
        privacySection1Title: '1. Taarifa Tunazokusanya',
        privacySection1Content: 'Tunaweza kukusanya maelezo ya uhifadhi na mawasiliano ikiwa ni pamoja na jina lako, namba ya simu, barua pepe, njia, na taarifa za safari.',
        privacySection2Title: '2. Jinsi Tunavyotumia Taarifa',
        privacySection2Item1: 'Kushughulikia na kusimamia uhifadhi.',
        privacySection2Item2: 'Kutoa masasisho ya safari na msaada.',
        privacySection2Item3: 'Kuboresha uzoefu wa wateja na ubora wa huduma.',
        privacySection2Item4: 'Kutii wajibu wa kisheria.',
        privacySection3Title: '3. Kushiriki Data',
        privacySection3Content: 'Tunashiriki data pale tu inapohitajika kwa utoaji wa huduma, utii wa kisheria, au kwa ridhaa yako.',
        privacySection4Title: '4. Mawasiliano',
        privacyContactPrefix: 'Kwa maombi ya faragha, tuma barua pepe',

        galleryOffice: 'Ofisi Yetu',
        galleryNightExpress: 'Safari za Usiku',
        galleryFleetGroup: 'Magari Yetu',
        gallerySideProfile: 'Mwonekano wa Kando',

        whatsappDefaultMessage: 'Habari! Ningependa kuuliza kuhusu huduma za mabasi za Burdan Express.'
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
