import React, { useState } from 'react';
import { useDarRide } from '../services/store';
import { MapView } from './MapView';
import { Bicycle, MobileMoneyProvider, RentalPackage } from '../types';
import {
  QrCode,
  Smartphone,
  Navigation,
  Battery,
  Lock,
  Unlock,
  ShieldCheck,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Clock,
  Send,
  Camera,
  Flame,
  Leaf,
  History,
  X,
  Share2,
  FileText,
  Sparkles,
  Phone,
  Hash,
  Radio,
  Copy,
  Check,
  Zap,
  WifiOff,
  Volume2,
} from 'lucide-react';

export const CustomerApp: React.FC = () => {
  const {
    language,
    fleet,
    packages,
    activeUserRental,
    createRental,
    createOfflineUssdRental,
    endRental,
    submitMaintenanceTicket,
    selectedBike,
    setSelectedBike,
  } = useDarRide();

  // Customer UI Tabs
  const [activeTab, setActiveTab] = useState<'map' | 'scan' | 'offline_ussd' | 'active_ride' | 'history' | 'support'>(
    activeUserRental ? 'active_ride' : 'map'
  );

  // Rental Flow State
  const [step, setStep] = useState<'SELECT_BIKE' | 'SELECT_PACKAGE' | 'PAYMENT' | 'PROCESSING' | 'SUCCESS'>('SELECT_BIKE');
  const [targetBikeId, setTargetBikeId] = useState<string>('DAR-000928');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pkg-3h');
  const [selectedProvider, setSelectedProvider] = useState<MobileMoneyProvider>('M-Pesa');
  const [phoneNumber, setPhoneNumber] = useState<string>('+255 754 892 104');
  const [userName, setUserName] = useState<string>('Amina Bakari');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentStepText, setPaymentStepText] = useState<string>('');

  // Offline USSD Lipa Namba State
  const [offlineBikeNumber, setOfflineBikeNumber] = useState<string>('550928');
  const [offlineProvider, setOfflineProvider] = useState<MobileMoneyProvider>('M-Pesa');
  const [offlinePhone, setOfflinePhone] = useState<string>('+255 754 892 104');
  const [offlineAmount, setOfflineAmount] = useState<number>(1000);
  const [offlineRenterName, setOfflineRenterName] = useState<string>('Juma Rashid (Tochi Phone)');
  const [isSimulatingUssd, setIsSimulatingUssd] = useState<boolean>(false);
  const [ussdStepText, setUssdStepText] = useState<string>('');
  const [ussdLogs, setUssdLogs] = useState<string[]>([]);
  const [copiedUssd, setCopiedUssd] = useState<boolean>(false);

  // Support / Report Damage state
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportIssue, setReportIssue] = useState<string>('Puncture / Flat Tire');
  const [reportNotes, setReportNotes] = useState<string>('');
  const [reportBikeId, setReportBikeId] = useState<string>('');
  const [reportSuccessMsg, setReportSuccessMsg] = useState<string>('');

  // Receipt Modal
  const [showReceipt, setShowReceipt] = useState<boolean>(false);

  // Filter available bikes nearby
  const availableBikes = fleet.filter((b) => b.status === 'AVAILABLE').slice(0, 8);

  const chosenBike = fleet.find((b) => b.id === targetBikeId || b.uniquePaymentNumber === targetBikeId) || fleet[0];
  const chosenPackage = packages.find((p) => p.id === selectedPackageId) || packages[0];

  // Tanzania Mobile Money Providers with their official USSD prefixes and colors
  const providers: {
    name: MobileMoneyProvider;
    prefix: string;
    ussdRoot: string;
    ussdFullPattern: (bikeNum: string, amt: number) => string;
    bg: string;
    border: string;
    text: string;
  }[] = [
    {
      name: 'M-Pesa',
      prefix: 'Vodacom (074/075/076)',
      ussdRoot: '*150*00#',
      ussdFullPattern: (num, amt) => `*150*00*1*${num}*${amt}#`,
      bg: 'bg-red-600/20',
      border: 'border-red-500',
      text: 'text-red-400',
    },
    {
      name: 'Airtel Money',
      prefix: 'Airtel (068/069/078)',
      ussdRoot: '*150*60#',
      ussdFullPattern: (num, amt) => `*150*60*1*${num}*${amt}#`,
      bg: 'bg-red-700/20',
      border: 'border-red-600',
      text: 'text-red-400',
    },
    {
      name: 'Tigo Pesa',
      prefix: 'Tigo / Mixx (065/067/071)',
      ussdRoot: '*150*01#',
      ussdFullPattern: (num, amt) => `*150*01*1*${num}*${amt}#`,
      bg: 'bg-blue-600/20',
      border: 'border-blue-500',
      text: 'text-blue-400',
    },
    {
      name: 'HaloPesa',
      prefix: 'Halotel (062)',
      ussdRoot: '*150*88#',
      ussdFullPattern: (num, amt) => `*150*88*1*${num}*${amt}#`,
      bg: 'bg-amber-600/20',
      border: 'border-amber-500',
      text: 'text-amber-400',
    },
  ];

  // Initiate verified App payment flow
  const handleInitiatePayment = async () => {
    setIsProcessingPayment(true);
    setPaymentStepText(
      language === 'en'
        ? `Sending STK Push prompt to ${phoneNumber}...`
        : `Inatuma ombi la STK Push kwenye ${phoneNumber}...`
    );

    await new Promise((res) => setTimeout(res, 1200));
    setPaymentStepText(
      language === 'en'
        ? 'Waiting for PIN confirmation on user handset...'
        : 'Inasubiri namba yako ya siri kwenye simu...'
    );

    await new Promise((res) => setTimeout(res, 1400));
    setPaymentStepText(
      language === 'en'
        ? 'Backend verifying Mobile Money transaction ID...'
        : 'Inathibitisha muamala wa malipo na mtandao wa simu...'
    );

    await new Promise((res) => setTimeout(res, 1000));
    setPaymentStepText(
      language === 'en'
        ? 'Payment verified! Authorizing Smart Lock shackle release...'
        : 'Malipo yamethibitishwa! Inafungua kufuli ya baiskeli...'
    );

    const res = await createRental(chosenBike.id, selectedPackageId, selectedProvider, phoneNumber, userName, 'APP_QR');
    setIsProcessingPayment(false);

    if (res.success) {
      setStep('SUCCESS');
      setActiveTab('active_ride');
    }
  };

  // Initiate Offline USSD Payment Simulation
  const handleOfflineUssdSimulate = async () => {
    setIsSimulatingUssd(true);
    setUssdLogs([]);

    const logMsg = (msg: string) => {
      setUssdLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
      setUssdStepText(msg);
    };

    const cleanNum = offlineBikeNumber.replace(/\D/g, '');
    const matchedBike = fleet.find(
      (b) =>
        b.uniquePaymentNumber === cleanNum ||
        b.uniquePaymentNumber === offlineBikeNumber ||
        b.id.toUpperCase() === offlineBikeNumber.toUpperCase()
    );

    logMsg(
      language === 'en'
        ? `1. User dials USSD code (*150*00#) from basic phone with Lipa Namba ${offlineBikeNumber}...`
        : `1. Mtumiaji anapiga USSD (*150*00#) kutoka simu ya tochi akiingiza Lipa Namba ${offlineBikeNumber}...`
    );

    await new Promise((r) => setTimeout(r, 1000));
    logMsg(
      language === 'en'
        ? `2. Carrier ${offlineProvider} prompts for payment of TSh ${offlineAmount.toLocaleString()}...`
        : `2. Mtandao wa ${offlineProvider} unaomba idhini ya kulipa TSh ${offlineAmount.toLocaleString()}...`
    );

    await new Promise((r) => setTimeout(r, 1200));
    logMsg(
      language === 'en'
        ? `3. User enters PIN on keypad. Carrier validates balance and sends Webhook to DAR RIDE Cloud Core...`
        : `3. Mtumiaji anaweka namba ya siri. Mtandao unatuma Webhook kwenye Mfumo Mkuu wa DAR RIDE...`
    );

    await new Promise((r) => setTimeout(r, 1100));
    logMsg(
      language === 'en'
        ? `4. DAR RIDE Cloud matches Lipa Namba -> Bicycle ${matchedBike?.id || 'DAR-000928'} & publishes MQTT unlock command via 4G LTE-M...`
        : `4. Mfumo wa DAR RIDE unalinganisha Lipa Namba -> Baiskeli ${matchedBike?.id || 'DAR-000928'} na kutuma amri ya MQTT kupitia 4G LTE-M...`
    );

    await new Promise((r) => setTimeout(r, 1200));
    logMsg(
      language === 'en'
        ? `5. 🔔 BEEP-BEEP! Bicycle IoT module acknowledges. Physical solenoid shackle UNLOCKED! SMS receipt sent to ${offlinePhone}.`
        : `5. 🔔 BEEP-BEEP! Kufuli ya baiskeli imefunguka mara moja! Ujumbe mfupi wa stakabadhi umetumwa kwa ${offlinePhone}.`
    );

    const res = await createOfflineUssdRental(
      offlineBikeNumber,
      offlineProvider,
      offlinePhone,
      offlineAmount,
      offlineRenterName
    );

    setIsSimulatingUssd(false);

    if (res.success) {
      setTimeout(() => {
        setActiveTab('active_ride');
      }, 1800);
    } else {
      alert(res.error || 'Payment failed');
    }
  };

  const handleManualScan = () => {
    const clean = targetBikeId.trim().toUpperCase();
    const found = fleet.find(
      (b) => b.id.toUpperCase() === clean || b.uniquePaymentNumber === clean
    );
    if (found) {
      setSelectedBike(found);
      setTargetBikeId(found.id);
      setStep('SELECT_PACKAGE');
    } else {
      alert(
        language === 'en'
          ? `Bicycle with ID or Lipa Namba "${targetBikeId}" not found.`
          : `Baiskeli yenye namba "${targetBikeId}" haipatikani.`
      );
    }
  };

  const handleSubmitDamage = (e: React.FormEvent) => {
    e.preventDefault();
    const bikeToReport = reportBikeId || activeUserRental?.bicycleId || 'DAR-000928';
    submitMaintenanceTicket(
      bikeToReport,
      reportIssue as any,
      'HIGH',
      'Masaki / Coco Beach Zone',
      reportNotes || 'Reported via customer app with photo confirmation.',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop'
    );
    setReportSuccessMsg(
      language === 'en'
        ? `Ticket created for ${bikeToReport}. Our technician will inspect it promptly.`
        : `Tiketi imetengenezwa kwa ${bikeToReport}. Fundi atafika haraka kuikagua.`
    );
    setTimeout(() => {
      setShowReportModal(false);
      setReportSuccessMsg('');
      setReportNotes('');
    }, 2000);
  };

  const currentProviderObj = providers.find((p) => p.name === offlineProvider) || providers[0];
  const generatedUssdString = currentProviderObj.ussdFullPattern(offlineBikeNumber, offlineAmount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Mobile Device Mockup Frame / App Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Customer App Interface */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl">
          {/* Header of Customer App */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  DAR RIDE Mobile
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                    100,000 Fleet
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  {language === 'en'
                    ? 'Dual-channel: Online App QR + Offline USSD Lipa Namba'
                    : 'Njia mbili: App QR au Lipa Namba ya USSD bila intaneti'}
                </p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowReportModal(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Report Issue' : 'Ripoti Hitilafu'}</span>
              </button>
            </div>
          </div>

          {/* Customer Navigation Tabs */}
          <div className="flex items-center gap-1.5 mb-6 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex-1 min-w-[100px] py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'map'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'en' ? 'Find Bicycle' : 'Tafuta Baiskeli'}</span>
            </button>

            <button
              onClick={() => setActiveTab('scan')}
              className={`flex-1 min-w-[100px] py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'scan'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'en' ? 'Scan QR' : 'Piga Picha QR'}</span>
            </button>

            <button
              onClick={() => setActiveTab('offline_ussd')}
              className={`flex-1 min-w-[140px] py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'offline_ussd'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <WifiOff className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'en' ? 'Offline USSD / Lipa Namba' : 'Lipa USSD / Tochi'}</span>
            </button>

            {activeUserRental && (
              <button
                onClick={() => setActiveTab('active_ride')}
                className={`flex-1 min-w-[100px] py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'active_ride'
                    ? 'bg-blue-600 text-white shadow-md animate-pulse'
                    : 'text-blue-400 hover:text-blue-300'
                }`}
              >
                <Flame className="w-3.5 h-3.5 shrink-0" />
                <span>{language === 'en' ? 'Active Ride' : 'Safari ya Sasa'}</span>
              </button>
            )}
          </div>

          {/* TAB 1: FIND BICYCLE / MAP VIEW */}
          {activeTab === 'map' && (
            <div className="space-y-6">
              <MapView
                bicycles={fleet}
                selectedBike={selectedBike}
                onSelectBike={(b) => {
                  setSelectedBike(b);
                  setTargetBikeId(b.id);
                  setOfflineBikeNumber(b.uniquePaymentNumber);
                  setStep('SELECT_PACKAGE');
                  setActiveTab('scan');
                }}
                heightClass="h-[420px]"
              />

              {/* Offline Payment Banner */}
              <div className="bg-gradient-to-r from-amber-950/60 via-slate-950 to-slate-950 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {language === 'en' ? 'No Internet or Smartphone? Pay Offline!' : 'Huna Bando au Smartphone? Lipa Bila Mtandao!'}
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded-full border border-amber-500/30">
                        USSD
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      {language === 'en'
                        ? 'Every bike has a unique 6-digit payment number (e.g. 550928). Dial *150*00# on any phone to unlock.'
                        : 'Kila baiskeli ina Lipa Namba yake ya kipekee yenye tarakimu 6 (mfano 550928). Piga *150*00# kufungua papo hapo.'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('offline_ussd')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-600/30 whitespace-nowrap cursor-pointer"
                >
                  {language === 'en' ? 'Open Offline USSD Hub' : 'Fungua Mfumo wa USSD'}
                </button>
              </div>

              {/* Nearby Available Bikes List */}
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center justify-between">
                  <span>{language === 'en' ? 'Nearby Smart Bicycles' : 'Baiskeli Zilizopo Karibu Nawe'}</span>
                  <span className="text-xs text-emerald-400 font-mono font-normal">
                    {fleet.filter((b) => b.status === 'AVAILABLE').length}{' '}
                    {language === 'en' ? 'Available in Dar es Salaam' : 'Zinazopatikana Dar'}
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableBikes.map((bike) => (
                    <div
                      key={bike.id}
                      className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3.5 flex flex-col justify-between gap-3 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                            🚲
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-white">{bike.id}</span>
                              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-800">
                                {bike.zone}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1">
                                <Battery className="w-3 h-3 text-emerald-400" /> {bike.batteryPercent}%
                              </span>
                              <span>•</span>
                              <span>
                                {bike.hardware.tireType.includes('Solid')
                                  ? (language === 'en' ? 'Solid Anti-Puncture' : 'Tairi Imara Isiyotoboka')
                                  : (language === 'en' ? 'Reinforced' : 'Iliyoimarishwa')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Unique Lipa Namba Tag on Bike */}
                      <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                          <Hash className="w-3 h-3 text-amber-400" />
                          <span>{language === 'en' ? 'Lipa Namba:' : 'Lipa Namba:'}</span>
                        </span>
                        <span className="text-amber-300 font-bold tracking-wider">{bike.uniquePaymentNumber}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setTargetBikeId(bike.id);
                            setSelectedBike(bike);
                            setStep('SELECT_PACKAGE');
                            setActiveTab('scan');
                          }}
                          className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
                        >
                          {language === 'en' ? 'Rent via App' : 'Kodi kwa App'}
                        </button>
                        <button
                          onClick={() => {
                            setOfflineBikeNumber(bike.uniquePaymentNumber);
                            setSelectedBike(bike);
                            setActiveTab('offline_ussd');
                          }}
                          className="flex-1 px-3 py-1.5 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40 font-bold text-xs rounded-xl transition-all cursor-pointer"
                        >
                          {language === 'en' ? 'Pay USSD' : 'Lipa USSD'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: OFFLINE USSD LIPA NAMBA (NO QR CODE NEEDED) */}
          {activeTab === 'offline_ussd' && (
            <div className="space-y-6">
              {/* Educational Highlight Card */}
              <div className="bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 border border-amber-500/40 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <WifiOff className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      {language === 'en'
                        ? 'Offline USSD Payment & Automated Cellular Unlock'
                        : 'Malipo ya USSD Bila Mtandao & Kufunguka kwa Moja kwa Moja'}
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded-full border border-amber-500/30">
                        100% Offline
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      {language === 'en'
                        ? 'Every single bicycle in Dar es Salaam has its own dedicated 6-digit payment number stamped on the frame. Anyone with a feature phone (simu ya tochi) can unlock it instantly without camera, QR code, or data bundles.'
                        : 'Kila baiskeli jijini Dar es Salaam ina Lipa Namba yake ya kipekee yenye tarakimu 6 iliyochongwa kwenye fremu na usukani. Mtu yeyote mwenye simu ya kawaida (tochi) anaweza kulipia na kuifungua papo hapo bila kamera wala bando.'}
                    </p>
                  </div>
                </div>

                {/* 3 Step Process Graphic */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="text-amber-400 font-mono font-bold text-xs flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[11px]">1</span>
                      {language === 'en' ? 'Read Lipa Namba' : 'Soma Lipa Namba'}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {language === 'en'
                        ? 'Find the 6-digit number printed on the handlebars or lock housing (e.g. 550928).'
                        : 'Tazama namba ya tarakimu 6 iliyoandikwa kwenye usukani au kufuli (mfano 550928).'}
                    </p>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="text-emerald-400 font-mono font-bold text-xs flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">2</span>
                      {language === 'en' ? 'Dial USSD Code' : 'Piga Namba ya USSD'}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {language === 'en'
                        ? 'Dial *150*00# (Vodacom), *150*60# (Airtel), or *150*01# (Tigo) and enter the bike amount.'
                        : 'Piga *150*00# (Vodacom), *150*60# (Airtel), au *150*01# (Tigo) kisha weka kiasi cha safari.'}
                    </p>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                    <div className="text-blue-400 font-mono font-bold text-xs flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[11px]">3</span>
                      {language === 'en' ? 'Auto-Unlock & Ride' : 'Kufuli Inafunguka'}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {language === 'en'
                        ? 'Within 2 seconds, cloud triggers IoT LTE-M signal. Solenoid clicks open automatically!'
                        : 'Ndani ya sekunde 2, mfumo unatuma amri ya 4G LTE-M. Kufuli inalia BEEP na kufunguka!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive USSD Dial & Lock Simulator Form */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'en' ? 'Test USSD Payment & Automated Release' : 'Jaribu Malipo ya USSD & Kufungua Baiskeli'}</span>
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">
                    {language === 'en' ? 'Live Cellular Gateway' : 'Lango la Mawasiliano ya Simu'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Input Lipa Namba */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {language === 'en' ? 'Bicycle Lipa Namba (6 Digits)' : 'Lipa Namba ya Baiskeli (Tarakimu 6)'}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={offlineBikeNumber}
                          onChange={(e) => setOfflineBikeNumber(e.target.value)}
                          placeholder="e.g. 550928"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-base font-mono font-bold text-amber-300 tracking-wider focus:outline-none focus:border-amber-500"
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">
                          {chosenBike.id}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {language === 'en' ? 'Select Mobile Network' : 'Chagua Mtandao wa Simu'}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {providers.map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => setOfflineProvider(p.name)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              offlineProvider === p.name
                                ? `${p.bg} ${p.border} ring-2 ring-amber-500/50 text-white font-bold`
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <div className="text-xs">{p.name}</div>
                            <div className="text-[10px] opacity-70 font-mono">{p.ussdRoot}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {language === 'en' ? 'Rental Amount / Tier' : 'Kiasi cha Kukodi / Kifurushi'}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { amt: 500, labelEn: '3 Hours', labelSw: 'Masaa 3' },
                          { amt: 1000, labelEn: '6 Hours (1/2 Day)', labelSw: 'Masaa 6 (Nusu Siku)' },
                          { amt: 2000, labelEn: '12 Hours (Day)', labelSw: 'Masaa 12 (Siku)' },
                          { amt: 4000, labelEn: '24 Hours (Full)', labelSw: 'Masaa 24 (Kamili)' },
                        ].map((tier) => (
                          <button
                            key={tier.amt}
                            type="button"
                            onClick={() => setOfflineAmount(tier.amt)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              offlineAmount === tier.amt
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold ring-2 ring-emerald-500/40'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <div className="text-xs font-mono font-bold">TSh {tier.amt.toLocaleString()}</div>
                            <div className="text-[10px] text-slate-400">
                              {language === 'en' ? tier.labelEn : tier.labelSw}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {language === 'en' ? 'Renter Phone Number (Feature Phone)' : 'Namba ya Simu ya Mkodishaji'}
                      </label>
                      <input
                        type="text"
                        value={offlinePhone}
                        onChange={(e) => setOfflinePhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Right: USSD Quick String & Interactive Terminal */}
                  <div className="space-y-3 flex flex-col justify-between">
                    {/* Generated USSD String Display */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                        {language === 'en' ? 'Direct USSD String for Mobile Handsets' : 'Msimbo wa Moja kwa Moja wa USSD'}
                      </span>
                      <div className="p-3 bg-slate-950 border border-amber-500/30 rounded-xl flex items-center justify-between font-mono text-base font-bold text-amber-300">
                        <span>{generatedUssdString}</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(generatedUssdString);
                            setCopiedUssd(true);
                            setTimeout(() => setCopiedUssd(false), 1500);
                          }}
                          className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                        >
                          {copiedUssd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {language === 'en'
                          ? 'On a real phone, typing this code and entering your PIN sends mobile money to DAR RIDE with the bike reference, unlocking it instantly.'
                          : 'Kwenye simu ya kawaida, kupiga msimbo huu na kuweka PIN kunatuma malipo kwa DAR RIDE na kufungua baiskeli mara moja.'}
                      </p>
                    </div>

                    {/* Simulation Logs or Live State */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 flex-1 min-h-[140px]">
                      <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Radio className="w-3.5 h-3.5 text-emerald-400" />
                          {language === 'en' ? 'Carrier & IoT MQTT Log' : 'Mtiririko wa Mawasiliano ya IoT'}
                        </span>
                        {isSimulatingUssd && (
                          <span className="text-amber-400 animate-pulse text-[10px]">
                            {language === 'en' ? 'CONNECTING...' : 'INAUNGANISHA...'}
                          </span>
                        )}
                      </div>

                      <div className="font-mono text-[11px] text-slate-300 space-y-1 h-28 overflow-y-auto bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                        {ussdLogs.length === 0 ? (
                          <span className="text-slate-500 italic">
                            {language === 'en'
                              ? 'Ready. Click "Simulate USSD Payment & Auto-Unlock" below to test...'
                              : 'Tayari. Bonyeza kitufe hapa chini kujaribu...'}
                          </span>
                        ) : (
                          ussdLogs.map((log, i) => (
                            <div key={i} className="text-emerald-400/90 leading-tight">
                              {log}
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Test Button */}
                    <button
                      type="button"
                      disabled={isSimulatingUssd}
                      onClick={handleOfflineUssdSimulate}
                      className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                        isSimulatingUssd
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>
                        {isSimulatingUssd
                          ? (language === 'en' ? 'Processing USSD & Unlocking...' : 'Inafanya Kazi & Kufungua...')
                          : (language === 'en'
                              ? `Simulate USSD Payment (TSh ${offlineAmount.toLocaleString()}) & Auto-Unlock`
                              : `Jaribu Malipo ya USSD (TSh ${offlineAmount.toLocaleString()}) & Fungua Kufuli`)}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCAN QR & UNLOCK FLOW */}
          {activeTab === 'scan' && (
            <div className="space-y-6">
              {step === 'SELECT_BIKE' && (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-6">
                  {/* Simulated Camera QR Scanner Viewfinder */}
                  <div className="relative mx-auto w-64 h-64 rounded-3xl bg-slate-900 border-2 border-dashed border-emerald-500/60 overflow-hidden flex flex-col items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent animate-pulse"></div>
                    <Camera className="w-12 h-12 text-emerald-400 mb-2 opacity-60" />
                    <span className="text-xs font-semibold text-emerald-300">
                      {language === 'en' ? 'Point camera at QR Code on bike' : 'Elekeza kamera kwenye QR Code ya baiskeli'}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1">
                      {language === 'en' ? 'Smart Optical / BLE Reader Active' : 'Kitambuzi cha QR kipo tayari'}
                    </span>

                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
                  </div>

                  {/* Manual Entry Fallback */}
                  <div className="max-w-md mx-auto space-y-3">
                    <label className="block text-xs font-semibold text-slate-300 text-left">
                      {language === 'en' ? 'Or enter 6-digit Bicycle ID' : 'Au ingiza namba ya baiskeli'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={targetBikeId}
                        onChange={(e) => setTargetBikeId(e.target.value)}
                        placeholder="e.g. DAR-000928"
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        onClick={handleManualScan}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
                      >
                        {language === 'en' ? 'Select' : 'Chagua'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Select Package */}
              {step === 'SELECT_PACKAGE' && (
                <div className="space-y-5">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400">
                        {language === 'en' ? 'Selected Bicycle:' : 'Baiskeli Iliyochaguliwa:'}
                      </span>
                      <h3 className="text-base font-bold text-white font-mono">{targetBikeId}</h3>
                      <p className="text-xs text-emerald-400">
                        {chosenBike.zone} • {language === 'en' ? 'Battery' : 'Betri'} {chosenBike.batteryPercent}% • {language === 'en' ? 'Smart Solenoid Lock' : 'Kufuli ya Kidijitali'}
                      </p>
                    </div>
                    <button
                      onClick={() => setStep('SELECT_BIKE')}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      {language === 'en' ? 'Change Bike' : 'Badili Baiskeli'}
                    </button>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-200 mb-3">
                      {language === 'en' ? 'Choose Your Rental Package' : 'Chagua Kifurushi cha Safari Yako'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackageId(pkg.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            selectedPackageId === pkg.id
                              ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10'
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-white">
                              {language === 'en' ? pkg.nameEn : pkg.nameSw}
                            </span>
                            {pkg.popular && (
                              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
                                {language === 'en' ? 'POPULAR' : 'INAPENDWA'}
                              </span>
                            )}
                          </div>
                          <div className="text-xl font-extrabold text-emerald-400 font-mono my-1">
                            TSh {pkg.priceTsh.toLocaleString()}
                          </div>
                          <p className="text-xs text-slate-400">
                            {language === 'en' ? pkg.descriptionEn : pkg.descriptionSw}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('PAYMENT')}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Proceed to Mobile Money Payment' : 'Endelea na Malipo ya Simu'}</span>
                  </button>
                </div>
              )}

              {/* Step 3: Payment via Tanzania Mobile Money */}
              {step === 'PAYMENT' && (
                <div className="space-y-6">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                      <div>
                        <span className="text-xs text-slate-400">
                          {language === 'en' ? 'Rental Summary:' : 'Muhtasari wa Kukodi:'}
                        </span>
                        <div className="font-bold text-white text-sm">
                          {language === 'en' ? chosenPackage.nameEn : chosenPackage.nameSw}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400">
                          {language === 'en' ? 'Amount Due:' : 'Kiasi cha Kulipa:'}
                        </span>
                        <div className="text-lg font-mono font-black text-emerald-400">
                          TSh {chosenPackage.priceTsh.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>
                        {language === 'en' ? 'Bicycle ID:' : 'Nambari ya Baiskeli:'}{' '}
                        <strong className="text-slate-200 font-mono">{targetBikeId}</strong>
                      </span>
                      <span>
                        {language === 'en' ? 'Duration:' : 'Muda:'}{' '}
                        <strong className="text-slate-200">
                          {chosenPackage.durationHours} {language === 'en' ? 'Hours' : 'Masaa'}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      {language === 'en' ? 'Select Tanzanian Mobile Money Network' : 'Chagua Mtandao wa Malipo'}
                    </label>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {providers.map((p) => (
                        <div
                          key={p.name}
                          onClick={() => setSelectedProvider(p.name)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                            selectedProvider === p.name
                              ? `${p.bg} ${p.border} ring-2 ring-emerald-500/50`
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="font-bold text-sm text-white">{p.name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{p.prefix}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          {language === 'en' ? 'Your Name' : 'Jina Lako'}
                        </label>
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          {language === 'en' ? 'Mobile Money Phone Number' : 'Namba ya Simu ya Malipo'}
                        </label>
                        <input
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+255 754 000 000"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  {isProcessingPayment ? (
                    <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-4 text-center space-y-3">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div>
                      <div className="text-sm font-bold text-emerald-400">{paymentStepText}</div>
                      <p className="text-[11px] text-slate-400">
                        {language === 'en'
                          ? 'Checking M-Pesa / Tigo gateway response & validating backend transaction...'
                          : 'Inathibitisha malipo na kufungua kufuli ya baiskeli...'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={handleInitiatePayment}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Lock className="w-4 h-4" />
                        <span>
                          {language === 'en'
                            ? `Pay TSh ${chosenPackage.priceTsh.toLocaleString()} & Unlock ${targetBikeId}`
                            : `Lipa TSh ${chosenPackage.priceTsh.toLocaleString()} na Ufungue ${targetBikeId}`}
                        </span>
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>
                          {language === 'en'
                            ? 'Bank-grade 256-bit encrypted mobile money verification'
                            : 'Uthibitishaji salama wa kibenki wa njia za malipo ya simu'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ACTIVE RIDE MODE & LIVE COUNTDOWN */}
          {activeTab === 'active_ride' && (
            <div className="space-y-6">
              {activeUserRental ? (
                <div className="space-y-6">
                  {/* Live Status Card */}
                  <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="font-mono font-bold text-sm text-emerald-400">
                          {activeUserRental.status === 'SAFE_LOCK_PENDING'
                            ? (language === 'en' ? 'PENDING SAFE AUTO-LOCK' : 'INASUBIRI KUFUNGA KWA USALAMA')
                            : (language === 'en' ? 'RIDE IN PROGRESS' : 'SAFARI INAENDELEA')}
                        </span>
                      </div>
                      <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2.5 py-1 rounded-full border border-slate-700">
                        {activeUserRental.id}
                      </span>
                    </div>

                    {/* Bike Specs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                      <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                        <span className="text-[10px] text-slate-400">
                          {language === 'en' ? 'Bicycle ID' : 'Namba ya Baiskeli'}
                        </span>
                        <div className="font-mono font-bold text-base text-white">{activeUserRental.bicycleId}</div>
                      </div>
                      <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                        <span className="text-[10px] text-slate-400">
                          {language === 'en' ? 'Package' : 'Kifurushi'}
                        </span>
                        <div className="font-bold text-sm text-white">{activeUserRental.packageName}</div>
                      </div>
                      <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                        <span className="text-[10px] text-slate-400">GPS Tracker</span>
                        <div className="font-bold text-sm text-emerald-400 flex items-center gap-1">
                          <Navigation className="w-3.5 h-3.5" /> LIVE
                        </div>
                      </div>
                      <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                        <span className="text-[10px] text-slate-400">
                          {language === 'en' ? 'Smart Lock' : 'Kufuli ya Baiskeli'}
                        </span>
                        <div className="font-bold text-sm text-blue-400 flex items-center gap-1">
                          <Unlock className="w-3.5 h-3.5" /> {language === 'en' ? 'UNLOCKED' : 'IMEFUNGULIWA'}
                        </div>
                      </div>
                    </div>

                    {/* Live Timer Countdown */}
                    <div className="my-6 text-center py-4 bg-slate-950/90 rounded-2xl border border-slate-800">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {language === 'en' ? 'Time Remaining Until Safe Expiration' : 'Muda Uliobaki wa Safari'}
                      </span>
                      <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 my-2 tracking-tight">
                        {(() => {
                          const diff = Math.max(0, Math.floor((new Date(activeUserRental.expiresAt).getTime() - Date.now()) / 1000));
                          const h = Math.floor(diff / 3600);
                          const m = Math.floor((diff % 3600) / 60);
                          const s = diff % 60;
                          return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
                        })()}
                      </div>
                      <div className="text-xs text-slate-400">
                        {language === 'en' ? 'Started:' : 'Ilianza:'}{' '}
                        {new Date(activeUserRental.startTime).toLocaleTimeString()} •{' '}
                        {language === 'en' ? 'Expires:' : 'Inaisha:'}{' '}
                        {new Date(activeUserRental.expiresAt).toLocaleTimeString()}
                      </div>
                    </div>

                    {/* Safety Alert Notice */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-amber-200">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold block text-amber-300">
                          {language === 'en' ? 'Safe Auto-Lock Protocol Active' : 'Ulinzi wa Kufunga Salama'}
                        </strong>
                        <span>
                          {language === 'en'
                            ? 'Please park safely in any designated zone before your time expires. The system will NEVER lock the wheel while you are riding—it waits for 2-3 minutes of confirmed stationary parking.'
                            : 'Tafadhali egesha salama eneo lililoruhusiwa. Baiskeli haitafungwa ukiwa bado unatembea, inasubiri isimame kwa dakika 2-3.'}
                        </span>
                      </div>
                    </div>

                    {/* Action End Ride Button */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          endRental(activeUserRental.id);
                          setShowReceipt(true);
                        }}
                        className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Lock className="w-4 h-4" />
                        <span>{language === 'en' ? 'End Ride & Lock Safely' : 'Kamilisha Safari na Ufunge'}</span>
                      </button>

                      <button
                        onClick={() => setShowReportModal(true)}
                        className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-2xl border border-slate-700 transition-colors cursor-pointer"
                      >
                        {language === 'en' ? 'Report Issue' : 'Ripoti Hitilafu'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                    🚲
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {language === 'en' ? 'No Active Rental' : 'Huna Safari Inayoendelea'}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    {language === 'en'
                      ? 'Find a bicycle on the live map or scan a QR code to start your ride across Dar es Salaam.'
                      : 'Tafuta baiskeli kwenye ramani au piga picha QR kuanza safari yako.'}
                  </p>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {language === 'en' ? 'Browse Bikes in Dar' : 'Tazama Baiskeli Dar'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Col: Smart Bike Specs & Live Digital Pass Widget */}
        <div className="lg:col-span-4 space-y-6">
          {/* Smart Bicycle Hardware Identity Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  {language === 'en' ? 'Smart Bicycle Architecture' : 'Vipengele vya Baiskeli ya Kisasa'}
                </span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                GEN-3 URBAN
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">{language === 'en' ? 'Frame:' : 'Fremu:'}</span>
                <span className="font-semibold text-slate-200">
                  {language === 'en' ? 'Aircraft Anti-Corrosion Alloy' : 'Chuma cha Ndege Kisisicho Kutu'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">{language === 'en' ? 'Tires:' : 'Matairi:'}</span>
                <span className="font-semibold text-emerald-400">
                  {language === 'en' ? 'Puncture-Resistant Solid-Core' : 'Imara Yasiyopata Panja'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">{language === 'en' ? 'IoT Controller:' : 'Kifaa cha IoT:'}</span>
                <span className="font-semibold text-slate-200">4G LTE-M / GPS / BLE / Solenoid</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">{language === 'en' ? 'Power:' : 'Umeme:'}</span>
                <span className="font-semibold text-amber-400">
                  {language === 'en' ? 'Solar Frame Charging + Li-Ion' : 'Umeme wa Sola + Betri ya Li-Ion'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">{language === 'en' ? 'Safe Lock Mechanism:' : 'Mfumo wa Kufuli Salama:'}</span>
                <span className="font-semibold text-blue-400">
                  {language === 'en' ? '2-Stage Stationary Verification' : 'Uhakiki wa Kusimama Kabla ya Kufunga'}
                </span>
              </div>
            </div>
          </div>

          {/* Sustainable Impact Tracker */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'en' ? 'Dar es Salaam Eco-Impact' : 'Mchango kwa Mazingira Dar'}
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
                <div className="text-xl font-bold font-mono text-emerald-400">2.4 kg</div>
                <div className="text-[10px] text-slate-400">
                  {language === 'en' ? 'CO₂ Saved this ride' : 'Hewa Chafu (CO₂) Iliyookolewa'}
                </div>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
                <div className="text-xl font-bold font-mono text-amber-400">180 kcal</div>
                <div className="text-[10px] text-slate-400">
                  {language === 'en' ? 'Calories Burned' : 'Kalori Zilizochomwa'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: REPORT DAMAGE / MECHANICAL ISSUE */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 relative">
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {language === 'en' ? 'Report Bicycle Issue' : 'Ripoti Hitilafu ya Baiskeli'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'en'
                    ? 'Instant digital ticket for our mobile field technician'
                    : 'Tiketi ya moja kwa moja kwa fundi wetu wa baiskeli'}
                </p>
              </div>
            </div>

            {reportSuccessMsg ? (
              <div className="bg-emerald-950 border border-emerald-500/50 p-4 rounded-2xl text-emerald-300 text-xs text-center font-bold">
                {reportSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleSubmitDamage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'en' ? 'Bicycle ID' : 'Nambari ya Baiskeli'}
                  </label>
                  <input
                    type="text"
                    value={reportBikeId || activeUserRental?.bicycleId || 'DAR-000928'}
                    onChange={(e) => setReportBikeId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'en' ? 'Issue Category' : 'Aina ya Hitilafu'}
                  </label>
                  <select
                    value={reportIssue}
                    onChange={(e) => setReportIssue(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                  >
                    <option value="Puncture / Flat Tire">{language === 'en' ? 'Puncture / Flat Tire' : 'Tairi Kupasuka / Panja'}</option>
                    <option value="Brake Failure">{language === 'en' ? 'Brake Failure' : 'Hitilafu ya Breki'}</option>
                    <option value="Broken Chain">{language === 'en' ? 'Broken Chain' : 'Mnyororo Kukatika'}</option>
                    <option value="Damaged Wheel">{language === 'en' ? 'Damaged Wheel' : 'Gurudumu Kupinda'}</option>
                    <option value="Seat Problem">{language === 'en' ? 'Seat Problem' : 'Siti Kulegea'}</option>
                    <option value="Lock Problem">{language === 'en' ? 'Lock Problem' : 'Kufuli Kugoma Kufunguka'}</option>
                    <option value="GPS / IoT Issue">{language === 'en' ? 'GPS / IoT Issue' : 'Hitilafu ya GPS'}</option>
                    <option value="Accident">{language === 'en' ? 'Accident' : 'Ajali'}</option>
                    <option value="Other">{language === 'en' ? 'Other' : 'Hitilafu Nyingine'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'en' ? 'Description' : 'Maelezo Zaidi'}
                  </label>
                  <textarea
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder={language === 'en' ? 'Provide details about the issue or location...' : 'Eleza kwa kifupi hitilafu ilipo...'}
                    rows={3}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {language === 'en' ? 'Submit Maintenance Ticket' : 'Tuma Tiketi ya Matengenezo'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: DIGITAL RECEIPT */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowReceipt(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {language === 'en' ? 'Ride Completed & Locked Safely' : 'Safari Imekamilika & Imefungwa Salama'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'DAR RIDE Tanzania Digital Receipt' : 'Stakabadhi ya Malipo ya Kidijitali'}
              </p>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">
                  {language === 'en' ? 'Transaction ID:' : 'Nambari ya Muamala:'}
                </span>
                <span className="font-mono text-emerald-400 font-bold">TXN-MPESA-8849201</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">
                  {language === 'en' ? 'Total Paid:' : 'Jumla Iliyolipwa:'}
                </span>
                <span className="font-mono text-white font-bold">TSh 1,000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">
                  {language === 'en' ? 'Payment Provider:' : 'Mtandao wa Malipo:'}
                </span>
                <span className="text-slate-200">Vodacom M-Pesa</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">
                  {language === 'en' ? 'Zone Returned:' : 'Kanda Iliyorejeshwa:'}
                </span>
                <span className="text-slate-200">Coco Beach / Masaki</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">
                  {language === 'en' ? 'Safe Lock Status:' : 'Hali ya Kufuli:'}
                </span>
                <span className="text-emerald-400 font-bold">
                  {language === 'en' ? 'Confirmed Verified' : 'Imethibitishwa Kufungwa'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowReceipt(false)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              {language === 'en' ? 'Done' : 'Nimemaliza'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

