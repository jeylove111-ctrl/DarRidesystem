import { Language } from '../types';

export const translations = {
  en: {
    heroTagline: 'Africa’s Connected Urban Mobility Infrastructure',
    heroTitle: 'Move Smarter. Ride Dar es Salaam.',
    heroSubtitle: 'Connected smart bicycles across Mwenge, Masaki, Posta, Kariakoo, Coco Beach & all Dar es Salaam. Unlock in 5 seconds via M-Pesa, Airtel Money, Tigo Pesa or HaloPesa from just TSh 500.',
    findBike: 'Find a Bicycle',
    howItWorks: 'How It Works',
    pricing: 'Pricing',
    locations: 'Locations & Zones',
    technology: 'Smart Tech & Safety',
    support: 'Customer Support',
    controlCenter: 'Operations Control Center',
    customerApp: 'Customer Mobile App',
    fieldApp: 'Field Worker App',
    ceoDashboard: 'Executive Intelligence',
    aiDemand: 'AI Demand Prediction',
    iotSimulator: 'IoT Fleet Simulator',
    archDocs: 'Production Architecture & Docs',
    switchLang: 'Kiswahili',
    role: 'Active Role',
    
    // Customer App
    scanQrToRide: 'Scan QR to Unlock',
    enterBikeId: 'Or enter 6-digit Bicycle ID (e.g. DAR-000928)',
    selectPackage: 'Select Rental Package',
    selectPayment: 'Tanzanian Mobile Money Payment',
    payAndUnlock: 'Authorize Payment & Unlock Smart Lock',
    activeRide: 'Active Rental in Progress',
    timeRemaining: 'Remaining Ride Time',
    parkSafelyNotice: 'Please park in an authorized zone before your rental expires.',
    safeAutoLockNotice: 'Safe Auto-Lock: When time expires, our IoT system waits 2-3 mins of verified stationary parking before engaging the wheel lock to ensure rider safety.',
    lockBikeNow: 'End Ride & Lock Safely',
    reportIssue: 'Report Damage / Mechanical Issue',
    rentalReceipt: 'Digital Receipt',
    
    // Stats & Metrics
    totalBicycles: 'Total Connected Fleet',
    activeRentals: 'Active Rentals',
    availableFleet: 'Available Bicycles',
    maintenanceUnits: 'In Maintenance',
    securityAlerts: 'Security & Tamper Alerts',
    todayRevenue: "Today's Revenue",
    safeLockPending: 'Safe Lock Pending',
    
    // Pricing
    rate3h: 'TSh 500 / 3 Hours',
    rate6h: 'TSh 1,000 / 6 Hours',
    rate12h: 'TSh 2,000 / 12 Hours',
    rate24h: 'TSh 4,000 / 24 Hours',
  },
  sw: {
    heroTagline: 'Miundombinu ya Kisasa ya Usafiri wa Mijini Afrika',
    heroTitle: 'Songa Kijanja. Endesha Dar es Salaam.',
    heroSubtitle: 'Baiskeli za kisasa zenye intaneti na GPS kote Mwenge, Masaki, Posta, Kariakoo, Coco Beach na Dar nzima. Fungua kwa sekunde 5 kupitia M-Pesa, Airtel Money, Tigo Pesa au HaloPesa kuanzia TSh 500 tu.',
    findBike: 'Tafuta Baiskeli',
    howItWorks: 'Jinsi Inavyofanya Kazi',
    pricing: 'Vifurushi na Bei',
    locations: 'Maeneo na Vituo',
    technology: 'Teknolojia na Usalama',
    support: 'Huduma kwa Wateja',
    controlCenter: 'Kituo Kikuu cha Uendeshaji',
    customerApp: 'Programu ya Mteja',
    fieldApp: 'Programu ya Mafundi na Walinzi',
    ceoDashboard: 'Ripoti Kuu ya Uongozi (CEO)',
    aiDemand: 'Utabiri wa Mahitaji (AI)',
    iotSimulator: 'Kielelezo cha IoT & Baiskeli 1,000',
    archDocs: 'Nyaraka za Mfumo Kamili',
    switchLang: 'English',
    role: 'Nafasi ya Mfumo',
    
    // Customer App
    scanQrToRide: 'Piga Picha QR Kufungua',
    enterBikeId: 'Au ingiza namba ya baiskeli (mfano: DAR-000928)',
    selectPackage: 'Chagua Kifurushi cha Safari',
    selectPayment: 'Malipo ya Simu (Mitandao ya Tanzania)',
    payAndUnlock: 'Lipa na Ufungue Baiskeli',
    activeRide: 'Safari Inaendelea',
    timeRemaining: 'Muda Uliobaki',
    parkSafelyNotice: 'Tafadhali egesha vizuri eneo lililoruhusiwa kabla muda wako haujaisha.',
    safeAutoLockNotice: 'Ulinzi wa Kufunga Salama: Muda ukiisha, mfumo unasubiri baiskeli isimame kwa dakika 2-3 ndipo ufunge kufuli ili kulinda usalama wa mwendeshaji.',
    lockBikeNow: 'Kamilisha Safari na Funga',
    reportIssue: 'Ripoti Tatizo / Uharibifu',
    rentalReceipt: 'Stakabadhi ya Kidijitali',
    
    // Stats & Metrics
    totalBicycles: 'Jumla ya Baiskeli Zote',
    activeRentals: 'Baiskeli Zilizokodishwa',
    availableFleet: 'Baiskeli Zilizopo Huru',
    maintenanceUnits: 'Zinazofanyiwa Matengenezo',
    securityAlerts: 'Tahadhari za Usalama & Wizi',
    todayRevenue: 'Mapato ya Leo',
    safeLockPending: 'Zinazosubiri Kufungwa Salama',
    
    // Pricing
    rate3h: 'TSh 500 / Masaa 3',
    rate6h: 'TSh 1,000 / Masaa 6',
    rate12h: 'TSh 2,000 / Masaa 12',
    rate24h: 'TSh 4,000 / Masaa 24',
  },
};

export function t(key: keyof typeof translations['en'], lang: Language): string {
  return translations[lang][key] || translations['en'][key];
}
