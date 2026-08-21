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
  DollarSign,
  TrendingUp,
  BarChart3,
  Globe2,
} from 'lucide-react';

export const CustomerApp: React.FC = () => {
  const {
    language,
    theme,
    fleet,
    packages,
    activeUserRental,
    createRental,
    createOfflineUssdRental,
    endRental,
    submitMaintenanceTicket,
    selectedBike,
    setSelectedBike,
    metrics,
    transactions,
  } = useDarRide();

  const isLight = theme === 'light';

  // Customer UI Tabs
  const [activeTab, setActiveTab] = useState<'map' | 'scan' | 'offline_ussd' | 'revenue' | 'active_ride' | 'history'>(
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
      bg: isLight ? 'bg-red-50' : 'bg-red-600/20',
      border: isLight ? 'border-red-300' : 'border-red-500',
      text: isLight ? 'text-red-700 font-bold' : 'text-red-400',
    },
    {
      name: 'Airtel Money',
      prefix: 'Airtel (068/069/078)',
      ussdRoot: '*150*60#',
      ussdFullPattern: (num, amt) => `*150*60*1*${num}*${amt}#`,
      bg: isLight ? 'bg-red-50' : 'bg-red-700/20',
      border: isLight ? 'border-red-400' : 'border-red-600',
      text: isLight ? 'text-red-800 font-bold' : 'text-red-400',
    },
    {
      name: 'Tigo Pesa',
      prefix: 'Tigo / Mixx (065/067/071)',
      ussdRoot: '*150*01#',
      ussdFullPattern: (num, amt) => `*150*01*1*${num}*${amt}#`,
      bg: isLight ? 'bg-blue-50' : 'bg-blue-600/20',
      border: isLight ? 'border-blue-300' : 'border-blue-500',
      text: isLight ? 'text-blue-700 font-bold' : 'text-blue-400',
    },
    {
      name: 'HaloPesa',
      prefix: 'Halotel (062)',
      ussdRoot: '*150*88#',
      ussdFullPattern: (num, amt) => `*150*88*1*${num}*${amt}#`,
      bg: isLight ? 'bg-amber-50' : 'bg-amber-600/20',
      border: isLight ? 'border-amber-300' : 'border-amber-500',
      text: isLight ? 'text-amber-800 font-bold' : 'text-amber-400',
    },
  ];

  // Initiate verified App payment flow
  const handleInitiatePayment = async () => {
    setIsProcessingPayment(true);
    setPaymentStepText(
      language === 'zh'
        ? `正在向 ${selectedProvider} (${phoneNumber}) 发送 USSD 扣款推送...`
        : language === 'sw'
        ? `Inatuma ombi la malipo kwa ${selectedProvider} (${phoneNumber})...`
        : `Pushing STK prompt to ${selectedProvider} (${phoneNumber})...`
    );

    await new Promise((r) => setTimeout(r, 1200));

    setPaymentStepText(
      language === 'zh'
        ? '用户输入 PIN 码已通过 256 位银行级网关验证...'
        : language === 'sw'
        ? 'Namba ya siri imeingizwa. Inathibitisha salio benki...'
        : 'PIN confirmed. Verifying carrier ledger settlement...'
    );

    await new Promise((r) => setTimeout(r, 1200));

    setPaymentStepText(
      language === 'zh'
        ? `正在通过 4G LTE-M 向单车 ${chosenBike.id} 发送 MQTT 远程开锁指令...`
        : language === 'sw'
        ? `Inatuma amri ya MQTT kupitia 4G LTE-M kufungua baiskeli ${chosenBike.id}...`
        : `Publishing MQTT unlock message to smart lock on ${chosenBike.id}...`
    );

    const res = await createRental(
      chosenBike.id,
      chosenPackage.id,
      selectedProvider,
      phoneNumber,
      userName
    );

    setIsProcessingPayment(false);

    if (res.success) {
      setStep('SUCCESS');
      setActiveTab('active_ride');
    } else {
      alert(res.error || 'Payment failed');
    }
  };

  // Simulate Offline USSD Workflow
  const handleRunUssdSimulation = async () => {
    setIsSimulatingUssd(true);
    setUssdLogs([]);

    const logMsg = (msg: string) => {
      setUssdLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    const matchedBike = fleet.find((b) => b.uniquePaymentNumber === offlineBikeNumber);

    logMsg(
      language === 'zh'
        ? `1. 用户使用按键功能机拨打 USSD: *150*00#，输入专属付款号 ${offlineBikeNumber}...`
        : language === 'sw'
        ? `1. Mtumiaji anapiga USSD (*150*00#) kutoka simu ya tochi akiingiza Lipa Namba ${offlineBikeNumber}...`
        : `1. User dials carrier USSD (*150*00#) on feature phone with Lipa Namba ${offlineBikeNumber}...`
    );

    await new Promise((r) => setTimeout(r, 900));
    logMsg(
      language === 'zh'
        ? `2. 运营商 ${offlineProvider} 提示确认支付 TSh ${offlineAmount.toLocaleString()}...`
        : language === 'sw'
        ? `2. Mtandao wa ${offlineProvider} unaomba idhini ya kulipa TSh ${offlineAmount.toLocaleString()}...`
        : `2. Carrier ${offlineProvider} prompts for payment of TSh ${offlineAmount.toLocaleString()}...`
    );

    await new Promise((r) => setTimeout(r, 1100));
    logMsg(
      language === 'zh'
        ? `3. 用户在功能机键盘输入密码。运营商核验扣款并向 DAR RIDE 云端发送 Webhook...`
        : language === 'sw'
        ? `3. Mtumiaji anaweka namba ya siri. Mtandao unatuma Webhook kwenye Mfumo Mkuu wa DAR RIDE...`
        : `3. User enters PIN on keypad. Carrier validates balance and sends Webhook to DAR RIDE Cloud Core...`
    );

    await new Promise((r) => setTimeout(r, 1000));
    logMsg(
      language === 'zh'
        ? `4. 云端匹配付款号 -> 单车 ${matchedBike?.id || 'DAR-000928'} 并通过 4G LTE-M 下发开锁...`
        : language === 'sw'
        ? `4. Mfumo wa DAR RIDE unalinganisha Lipa Namba -> Baiskeli ${matchedBike?.id || 'DAR-000928'} na kutuma amri ya MQTT...`
        : `4. DAR RIDE Cloud matches Lipa Namba -> Bicycle ${matchedBike?.id || 'DAR-000928'} & publishes MQTT unlock command via 4G LTE-M...`
    );

    await new Promise((r) => setTimeout(r, 1100));
    logMsg(
      language === 'zh'
        ? `5. 🔔 蜂鸣提示！单车 IoT 模块确认响应，电磁物理锁舌瞬间弹开！开锁短信已发至 ${offlinePhone}`
        : language === 'sw'
        ? `5. 🔔 BEEP-BEEP! Kufuli ya baiskeli imefunguka mara moja! Ujumbe mfupi wa stakabadhi umetumwa kwa ${offlinePhone}.`
        : `5. 🔔 BEEP-BEEP! Bicycle IoT module acknowledges. Physical solenoid shackle UNLOCKED! SMS receipt sent to ${offlinePhone}.`
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
      }, 1600);
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
        language === 'zh'
          ? `未找到编号或专属付款号为 "${targetBikeId}" 的单车。`
          : language === 'sw'
          ? `Baiskeli yenye namba "${targetBikeId}" haipatikani.`
          : `Bicycle with ID or Lipa Namba "${targetBikeId}" not found.`
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
      language === 'zh'
        ? `已为 ${bikeToReport} 创建维修工单。驻场技师将即刻前往排查。`
        : language === 'sw'
        ? `Tiketi imetengenezwa kwa ${bikeToReport}. Fundi atafika haraka kuikagua.`
        : `Ticket created for ${bikeToReport}. Our technician will inspect it promptly.`
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
      {/* Mobile Device Frame / App Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Customer App Interface */}
        <div
          className={`lg:col-span-8 rounded-3xl p-4 sm:p-6 shadow-2xl border transition-colors ${
            isLight
              ? 'bg-white border-slate-300 text-slate-900 shadow-slate-200'
              : 'bg-slate-900 border-slate-800 text-slate-100 shadow-2xl'
          }`}
        >
          {/* Header of Customer App */}
          <div
            className={`flex items-center justify-between pb-4 border-b mb-6 ${
              isLight ? 'border-slate-200' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  isLight
                    ? 'bg-emerald-100 border border-emerald-300 text-emerald-800'
                    : 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400'
                }`}
              >
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-lg font-black flex items-center gap-2 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  DAR RIDE Client
                  <span
                    className={`text-[10px] font-black font-mono px-2 py-0.5 rounded-full border ${
                      isLight
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    100,000 FLEET
                  </span>
                </h2>
                <p className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {language === 'zh'
                    ? '双通道解锁: App 扫码 + 离线按键机 USSD 付款码'
                    : language === 'sw'
                    ? 'Njia mbili: App QR au Lipa Namba ya USSD bila intaneti'
                    : 'Dual-channel: Online App QR + Offline USSD Lipa Namba'}
                </p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowReportModal(true)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100 font-black'
                    : 'bg-slate-800 hover:bg-slate-700 text-rose-400 border-slate-700'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>
                  {language === 'zh' ? '故障报修' : language === 'sw' ? 'Ripoti Hitilafu' : 'Report Issue'}
                </span>
              </button>
            </div>
          </div>

          {/* Customer Navigation Tabs */}
          <div
            className={`flex items-center gap-1.5 mb-6 p-1.5 rounded-2xl border overflow-x-auto ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}
          >
            <button
              onClick={() => setActiveTab('map')}
              className={`flex-1 min-w-[90px] py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'map'
                  ? isLight
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-emerald-600 text-white shadow-md'
                  : isLight
                  ? 'text-slate-700 hover:text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'zh' ? '找车' : language === 'sw' ? 'Tafuta' : 'Find Bike'}</span>
            </button>

            <button
              onClick={() => setActiveTab('scan')}
              className={`flex-1 min-w-[90px] py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'scan'
                  ? isLight
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-emerald-600 text-white shadow-md'
                  : isLight
                  ? 'text-slate-700 hover:text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'zh' ? '扫码租车' : language === 'sw' ? 'Piga Picha QR' : 'Scan QR'}</span>
            </button>

            <button
              onClick={() => setActiveTab('offline_ussd')}
              className={`flex-1 min-w-[130px] py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'offline_ussd'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : isLight
                  ? 'text-amber-800 hover:text-amber-950'
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <WifiOff className="w-3.5 h-3.5 shrink-0" />
              <span>
                {language === 'zh' ? '离线 USSD 支付' : language === 'sw' ? 'Lipa USSD / Tochi' : 'Offline USSD Lipa'}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('revenue')}
              className={`flex-1 min-w-[120px] py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'revenue'
                  ? isLight
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-blue-600 text-white shadow-md'
                  : isLight
                  ? 'text-blue-800 hover:text-blue-950'
                  : 'text-blue-400 hover:text-blue-300'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 shrink-0" />
              <span>
                {language === 'zh' ? '平台营收看板' : language === 'sw' ? 'Mapato ya Mfumo' : 'Site Revenue'}
              </span>
            </button>

            {activeUserRental && (
              <button
                onClick={() => setActiveTab('active_ride')}
                className={`flex-1 min-w-[100px] py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'active_ride'
                    ? 'bg-emerald-600 text-white shadow-md animate-pulse'
                    : 'text-emerald-500 hover:text-emerald-400'
                }`}
              >
                <Flame className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {language === 'zh' ? '当前行程' : language === 'sw' ? 'Safari ya Sasa' : 'Active Ride'}
                </span>
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
              <div
                className={`border rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isLight
                    ? 'bg-amber-50 border-amber-300 text-slate-900'
                    : 'bg-gradient-to-r from-amber-950/60 via-slate-950 to-slate-950 border-amber-500/30 text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      isLight ? 'bg-amber-200 text-amber-900' : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-black flex items-center gap-2 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {language === 'zh'
                        ? '没有智能手机或流量？离线拨号即刻开锁！'
                        : language === 'sw'
                        ? 'Huna Bando au Smartphone? Lipa Bila Mtandao!'
                        : 'No Internet or Smartphone? Pay Offline!'}
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-black ${
                          isLight
                            ? 'bg-amber-200 text-amber-900 border-amber-400'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        USSD
                      </span>
                    </h4>
                    <p className={`text-xs font-medium ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                      {language === 'zh'
                        ? '每辆单车均配有专属 6 位数字付款号（如 550928）。任何按键手机拨打 *150*00# 即可完成支付并自动开锁。'
                        : language === 'sw'
                        ? 'Kila baiskeli ina Lipa Namba yake ya kipekee yenye tarakimu 6 (mfano 550928). Piga *150*00# kufungua papo hapo.'
                        : 'Every bike has a unique 6-digit payment number (e.g. 550928). Dial *150*00# on any phone to unlock.'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('offline_ussd')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-black text-xs rounded-xl transition-all shadow-md shadow-amber-600/30 whitespace-nowrap cursor-pointer"
                >
                  {language === 'zh'
                    ? '进入离线支付中心'
                    : language === 'sw'
                    ? 'Fungua Mfumo wa USSD'
                    : 'Open Offline USSD Hub'}
                </button>
              </div>

              {/* Nearby Available Bikes List */}
              <div>
                <h3 className={`text-sm font-black mb-3 flex items-center justify-between ${isLight ? 'text-slate-950' : 'text-slate-200'}`}>
                  <span>
                    {language === 'zh'
                      ? '附近可用智能单车'
                      : language === 'sw'
                      ? 'Baiskeli Zilizopo Karibu Nawe'
                      : 'Nearby Smart Bicycles'}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      isLight ? 'text-emerald-700 font-black' : 'text-emerald-400'
                    }`}
                  >
                    {fleet.filter((b) => b.status === 'AVAILABLE').length}{' '}
                    {language === 'zh'
                      ? '辆在达市随时待命'
                      : language === 'sw'
                      ? 'Zinazopatikana Dar'
                      : 'Available in Dar es Salaam'}
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableBikes.map((bike) => (
                    <div
                      key={bike.id}
                      className={`border rounded-2xl p-3.5 flex flex-col justify-between gap-3 transition-all ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 hover:border-emerald-600 shadow-sm'
                          : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs ${
                              isLight
                                ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            }`}
                          >
                            🚲
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-mono font-black text-sm ${isLight ? 'text-slate-950' : 'text-white'}`}>
                                {bike.id}
                              </span>
                              <span
                                className={`text-[10px] font-black px-1.5 py-0.2 rounded border ${
                                  isLight
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                    : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                                }`}
                              >
                                {bike.zone}
                              </span>
                            </div>
                            <div className={`text-xs font-semibold flex items-center gap-2 mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                              <span className="flex items-center gap-1">
                                <Battery className={`w-3 h-3 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} /> {bike.batteryPercent}%
                              </span>
                              <span>•</span>
                              <span>
                                {bike.hardware.tireType.includes('Solid')
                                  ? (language === 'zh' ? '实心防爆防扎' : language === 'sw' ? 'Tairi Imara Isiyotoboka' : 'Solid Anti-Puncture')
                                  : (language === 'zh' ? '加固防刺' : language === 'sw' ? 'Iliyoimarishwa' : 'Reinforced')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Unique Lipa Namba Tag on Bike */}
                      <div
                        className={`rounded-xl px-2.5 py-1.5 flex items-center justify-between text-xs font-mono border ${
                          isLight
                            ? 'bg-white border-slate-200 text-slate-800'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-1 text-[11px] font-bold">
                          <Hash className={`w-3 h-3 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                          <span>{language === 'zh' ? '专属付款码:' : 'Lipa Namba:'}</span>
                        </span>
                        <span className={`font-black tracking-wider ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>
                          {bike.uniquePaymentNumber}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setTargetBikeId(bike.id);
                            setSelectedBike(bike);
                            setStep('SELECT_PACKAGE');
                            setActiveTab('scan');
                          }}
                          className={`flex-1 px-3 py-1.5 font-black text-xs rounded-xl transition-all shadow-md cursor-pointer ${
                            isLight
                              ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                          }`}
                        >
                          {language === 'zh' ? 'App 扫码租' : language === 'sw' ? 'Kodi kwa App' : 'Rent via App'}
                        </button>
                        <button
                          onClick={() => {
                            setOfflineBikeNumber(bike.uniquePaymentNumber);
                            setSelectedBike(bike);
                            setActiveTab('offline_ussd');
                          }}
                          className={`flex-1 px-3 py-1.5 border font-black text-xs rounded-xl transition-all cursor-pointer ${
                            isLight
                              ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
                              : 'bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          {language === 'zh' ? '离线 USSD 租' : language === 'sw' ? 'Lipa USSD' : 'Pay USSD'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PUBLIC & CLIENT SITE REVENUE TRANSPARENCY PORTAL */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              {/* Top Banner: Big System Revenue Overview */}
              <div
                className={`rounded-3xl p-6 border shadow-xl ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900'
                    : 'bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40 border-blue-500/30 text-white'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-black font-mono px-2.5 py-0.5 rounded-full border ${
                          isLight
                            ? 'bg-blue-100 text-blue-900 border-blue-300'
                            : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                        }`}
                      >
                        {language === 'zh'
                          ? '客户与公众透明营收中枢'
                          : language === 'sw'
                          ? 'MAPATO YA WAZI KWA WATEJA'
                          : 'PUBLIC & CLIENT REVENUE TRANSPARENCY'}
                      </span>
                      <span
                        className={`text-[10px] font-black font-mono px-2 py-0.5 rounded-full border ${
                          isLight
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        TZS 200,000,000 / 12 HRS
                      </span>
                    </div>
                    <h3 className={`text-xl font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {language === 'zh'
                        ? '100,000 辆智能单车运营与实时营收大屏'
                        : language === 'sw'
                        ? 'Uchumi & Mapato ya Baiskeli 100,000 Dar es Salaam'
                        : '100,000 Smart Bike Fleet Economics & Live Ledger'}
                    </h3>
                    <p className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {language === 'zh'
                        ? '每辆单车每 12 小时租赁 2 次（每 6 小时 1,000 TZS），全网每 12 小时总产值达 TZS 200,000,000。'
                        : language === 'sw'
                        ? 'Kila baiskeli ikikodishwa mara 2 kwa masaa 12 (kila masaa 6 kwa TSh 1,000), mapato ni TSh 200,000,000 kila masaa 12.'
                        : 'Every bike rented twice in 12 hours (every 6 hrs @ TZS 1,000) generates TZS 200,000,000 every 12 hours.'}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-bold block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {language === 'zh' ? '12小时基础总营收' : language === 'sw' ? 'Mapato ya Masaa 12:' : '12-Hour Cycle Revenue:'}
                    </span>
                    <div
                      className={`text-2xl sm:text-3xl font-black font-mono ${
                        isLight ? 'text-emerald-800' : 'text-emerald-400'
                      }`}
                    >
                      TZS 200,000,000
                    </div>
                  </div>
                </div>

                {/* 4 Big Formula Pillars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  <div
                    className={`p-3.5 rounded-2xl border ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
                    }`}
                  >
                    <span className={`text-[10px] font-bold block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {language === 'zh' ? '组网单车总量' : language === 'sw' ? 'Idadi ya Baiskeli' : 'Total Fleet Size'}
                    </span>
                    <div className={`text-lg font-black font-mono ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      100,000
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold">100% 4G IoT Nodes</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl border ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
                    }`}
                  >
                    <span className={`text-[10px] font-bold block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {language === 'zh' ? '12小时周转频次' : language === 'sw' ? 'Mizunguko (Masaa 12)' : '12-Hr Turnover'}
                    </span>
                    <div className={`text-lg font-black font-mono ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
                      2.0x
                    </div>
                    <span className="text-[10px] text-blue-600 font-bold">
                      {language === 'zh' ? '每 6 小时 1 次' : 'Every 6 Hours'}
                    </span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl border ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
                    }`}
                  >
                    <span className={`text-[10px] font-bold block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {language === 'zh' ? '单次租金价格' : language === 'sw' ? 'Kodi kwa Safari' : 'Avg Fare (6h)'}
                    </span>
                    <div className={`text-lg font-black font-mono ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                      TZS 1,000
                    </div>
                    <span className="text-[10px] text-amber-600 font-bold">Affordable Transit</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl border ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
                    }`}
                  >
                    <span className={`text-[10px] font-bold block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {language === 'zh' ? '月度预估规模' : language === 'sw' ? 'Mapato ya Mwezi' : 'Monthly Projected'}
                    </span>
                    <div className={`text-lg font-black font-mono ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                      TZS 6.0B
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold">TSh 6,000,000,000</span>
                  </div>
                </div>
              </div>

              {/* Real-time Transparent Transaction Stream */}
              <div>
                <h4 className={`text-sm font-black mb-3 flex items-center justify-between ${isLight ? 'text-slate-950' : 'text-slate-200'}`}>
                  <span className="flex items-center gap-2">
                    <BarChart3 className={`w-4 h-4 ${isLight ? 'text-blue-700' : 'text-blue-400'}`} />
                    <span>
                      {language === 'zh'
                        ? '实时结算流水 (运营商专线回传)'
                        : language === 'sw'
                        ? 'Miamala ya Moja kwa Moja ya Malipo'
                        : 'Live Verified Transaction Settlement Feed'}
                    </span>
                  </span>
                  <span className={`text-xs font-mono font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                    100% On-Chain & Webhook Validated
                  </span>
                </h4>

                <div className="space-y-2">
                  {transactions.slice(0, 7).map((txn) => (
                    <div
                      key={txn.id}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-4 transition-colors ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-900'
                          : 'bg-slate-950 border-slate-800 hover:bg-slate-900 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                            txn.provider === 'M-Pesa'
                              ? isLight
                                ? 'bg-red-100 text-red-800'
                                : 'bg-red-500/20 text-red-400'
                              : txn.provider === 'Tigo Pesa'
                              ? isLight
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-blue-500/20 text-blue-400'
                              : isLight
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {txn.provider === 'M-Pesa' ? 'V' : txn.provider === 'Tigo Pesa' ? 'T' : 'A'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xs">{txn.id}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                              txn.isOfflineUssd
                                ? isLight ? 'bg-amber-100 text-amber-900' : 'bg-amber-950 text-amber-300'
                                : isLight ? 'bg-emerald-100 text-emerald-900' : 'bg-emerald-950 text-emerald-300'
                            }`}>
                              {txn.isOfflineUssd ? 'USSD Offline' : 'App QR'}
                            </span>
                          </div>
                          <div className={`text-[11px] font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            {txn.bicycleId} • {txn.provider} • {new Date(txn.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`font-mono font-black text-sm ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                          +TSh {txn.amountTsh.toLocaleString()}
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center justify-end gap-1">
                          <CheckCircle className="w-3 h-3" /> SETTLED
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OFFLINE USSD LIPA NAMBA */}
          {activeTab === 'offline_ussd' && (
            <div className="space-y-6">
              {/* Educational Highlight Card */}
              <div
                className={`border rounded-3xl p-6 shadow-xl space-y-4 ${
                  isLight
                    ? 'bg-amber-50 border-amber-300 text-slate-900'
                    : 'bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 border-amber-500/40 text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                      isLight ? 'bg-amber-200 text-amber-900' : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    <WifiOff className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-base font-black flex items-center gap-2 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {language === 'zh'
                        ? '离线 USSD 付款码与蜂窝物联网即时开锁'
                        : language === 'sw'
                        ? 'Malipo ya USSD Bila Mtandao & Kufunguka Papo Hapo'
                        : 'Offline USSD Payment & Automated Cellular Unlock'}
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-black ${
                          isLight
                            ? 'bg-amber-200 text-amber-900 border-amber-400'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        100% OFFLINE
                      </span>
                    </h3>
                    <p className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {language === 'zh'
                        ? '达累斯萨拉姆每辆单车车身均印有专属 6 位数字付款号。使用任何基础按键功能机即可完成支付开锁，无需摄像头、二维码或网络流量。'
                        : language === 'sw'
                        ? 'Kila baiskeli jijini Dar es Salaam ina Lipa Namba yake ya kipekee yenye tarakimu 6. Mtu yeyote mwenye simu ya kawaida (tochi) anaweza kulipia na kuifungua papo hapo.'
                        : 'Every bicycle has its own dedicated 6-digit payment number stamped on the frame. Anyone with a feature phone can unlock it instantly without camera or data.'}
                    </p>
                  </div>
                </div>

                {/* 3 Step Process Graphic */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div
                    className={`p-3.5 rounded-2xl border space-y-1.5 ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className={`font-mono font-black text-xs flex items-center gap-1.5 ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[11px]">1</span>
                      {language === 'zh' ? '1. 读取专属付款码' : language === 'sw' ? 'Soma Lipa Namba' : 'Read Lipa Namba'}
                    </div>
                    <p className={`text-[11px] font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {language === 'zh'
                        ? '查看车把或智能锁外壳上的 6 位数字（如 550928）。'
                        : language === 'sw'
                        ? 'Tazama namba ya tarakimu 6 iliyoandikwa kwenye usukani (mfano 550928).'
                        : 'Find the 6-digit number printed on handlebars (e.g. 550928).'}
                    </p>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl border space-y-1.5 ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className={`font-mono font-black text-xs flex items-center gap-1.5 ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">2</span>
                      {language === 'zh' ? '2. 拨打 USSD 扣款' : language === 'sw' ? 'Piga Namba ya USSD' : 'Dial USSD Code'}
                    </div>
                    <p className={`text-[11px] font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {language === 'zh'
                        ? '拨打 *150*00# (Vodacom) 或 *150*01# (Tigo) 输入付款号与金额。'
                        : language === 'sw'
                        ? 'Piga *150*00# (Vodacom) au *150*01# (Tigo) kuweka namba na kiasi.'
                        : 'Dial *150*00# (Vodacom) or *150*01# (Tigo) to enter payment.'}
                    </p>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl border space-y-1.5 ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className={`font-mono font-black text-xs flex items-center gap-1.5 ${isLight ? 'text-blue-800' : 'text-blue-400'}`}>
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[11px]">3</span>
                      {language === 'zh' ? '3. 自动开锁骑行' : language === 'sw' ? 'Kufuli Inafunguka' : 'Auto-Unlock & Ride'}
                    </div>
                    <p className={`text-[11px] font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {language === 'zh'
                        ? '云端在 2 秒内下发 4G LTE-M 指令，物理电磁锁舌瞬间弹开！'
                        : language === 'sw'
                        ? 'Ndani ya sekunde 2, mfumo unatuma 4G LTE-M na kufuli inafunguka!'
                        : 'Within 2s, cloud sends LTE-M command and solenoid clicks open!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive USSD Dial & Lock Simulator Form */}
              <div
                className={`border rounded-3xl p-6 space-y-6 ${
                  isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                  <h4 className={`text-sm font-black flex items-center gap-2 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    <Phone className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                    <span>
                      {language === 'zh'
                        ? '测试 USSD 离线付款与自动开锁'
                        : language === 'sw'
                        ? 'Jaribu Malipo ya USSD & Kufungua Baiskeli'
                        : 'Test USSD Payment & Automated Release'}
                    </span>
                  </h4>
                  <span className={`text-xs font-mono font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {language === 'zh' ? '实时蜂窝网关在线' : 'Live Cellular Gateway'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Input Lipa Namba */}
                  <div className="space-y-3">
                    <div>
                      <label className={`block text-xs font-black mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                        {language === 'zh' ? '单车专属付款号 (6 位数字)' : 'Bicycle Lipa Namba (6 Digits)'}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={offlineBikeNumber}
                          onChange={(e) => setOfflineBikeNumber(e.target.value)}
                          placeholder="e.g. 550928"
                          className={`w-full border rounded-xl px-4 py-2.5 text-base font-mono font-black tracking-wider focus:outline-none ${
                            isLight
                              ? 'bg-slate-50 border-slate-300 text-amber-800 focus:border-amber-600'
                              : 'bg-slate-900 border-slate-700 text-amber-300 focus:border-amber-500'
                          }`}
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono font-bold">
                          {chosenBike.id}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-black mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                        {language === 'zh' ? '选择移动运营商网络' : 'Select Mobile Network'}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {providers.map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => setOfflineProvider(p.name)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              offlineProvider === p.name
                                ? `${p.bg} ${p.border} ring-2 ring-amber-500/50 ${isLight ? 'text-slate-950 font-black' : 'text-white font-bold'}`
                                : isLight
                                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <div className="text-xs font-black">{p.name}</div>
                            <div className="text-[10px] opacity-80 font-mono font-bold">{p.ussdRoot}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-black mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                        {language === 'zh' ? '租赁时长与金额' : 'Rental Tier & Amount'}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { amt: 500, labelEn: '3 Hours', labelSw: 'Masaa 3', labelZh: '3 小时' },
                          { amt: 1000, labelEn: '6 Hours (1/2 Day)', labelSw: 'Masaa 6 (Nusu Siku)', labelZh: '6 小时 (半天)' },
                          { amt: 2000, labelEn: '12 Hours (Day)', labelSw: 'Masaa 12 (Siku)', labelZh: '12 小时 (全天)' },
                          { amt: 4000, labelEn: '24 Hours (Full)', labelSw: 'Masaa 24 (Kamili)', labelZh: '24 小时 (整日)' },
                        ].map((tier) => (
                          <button
                            key={tier.amt}
                            type="button"
                            onClick={() => setOfflineAmount(tier.amt)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              offlineAmount === tier.amt
                                ? isLight
                                  ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-black ring-2 ring-emerald-500/40'
                                  : 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold ring-2 ring-emerald-500/40'
                                : isLight
                                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <div className="text-xs font-black font-mono">TSh {tier.amt.toLocaleString()}</div>
                            <div className="text-[10px] opacity-80">
                              {language === 'zh' ? tier.labelZh : language === 'sw' ? tier.labelSw : tier.labelEn}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Phone & Simulator Box */}
                  <div className="space-y-3">
                    <div>
                      <label className={`block text-xs font-black mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                        {language === 'zh' ? '骑行者手机号 (用于接收开锁短信)' : 'Rider Phone (SMS Confirmation)'}
                      </label>
                      <input
                        type="text"
                        value={offlinePhone}
                        onChange={(e) => setOfflinePhone(e.target.value)}
                        className={`w-full border rounded-xl px-4 py-2.5 text-xs font-mono font-bold ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                            : 'bg-slate-900 border-slate-700 text-white focus:border-amber-500'
                        }`}
                      />
                    </div>

                    {/* USSD Quick Dial Command Box */}
                    <div
                      className={`p-3.5 rounded-2xl border space-y-2 ${
                        isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                          {language === 'zh' ? '完整快速拨号串' : 'Full USSD Dial String:'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(generatedUssdString);
                            setCopiedUssd(true);
                            setTimeout(() => setCopiedUssd(false), 1500);
                          }}
                          className={`text-[10px] flex items-center gap-1 font-bold ${
                            isLight ? 'text-emerald-800 hover:text-emerald-950' : 'text-emerald-400 hover:text-emerald-300'
                          }`}
                        >
                          {copiedUssd ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedUssd ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className={`font-mono text-sm font-black tracking-wide ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                        {generatedUssdString}
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isSimulatingUssd}
                      onClick={handleRunUssdSimulation}
                      className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-black text-xs rounded-xl shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Zap className="w-4 h-4" />
                      <span>
                        {isSimulatingUssd
                          ? (language === 'zh' ? '正在处理离线 USSD 支付...' : 'Simulating Cellular Gateway...')
                          : (language === 'zh'
                              ? `模拟在按键机上拨打 ${generatedUssdString} 并开锁`
                              : `Simulate USSD Payment & Automated Unlock`)}
                      </span>
                    </button>

                    {/* Terminal Logs */}
                    {ussdLogs.length > 0 && (
                      <div
                        className={`rounded-xl p-3 text-[11px] font-mono space-y-1 max-h-36 overflow-y-auto border ${
                          isLight
                            ? 'bg-slate-900 text-emerald-400 border-slate-800'
                            : 'bg-black/90 text-emerald-400 border-slate-800'
                        }`}
                      >
                        {ussdLogs.map((log, idx) => (
                          <div key={idx} className="leading-tight">
                            {log}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SCAN QR RENTAL FLOW */}
          {activeTab === 'scan' && (
            <div className="space-y-6">
              {/* Step 1: Bike Selector */}
              {step === 'SELECT_BIKE' && (
                <div className="space-y-4">
                  <div
                    className={`border rounded-2xl p-4 text-center space-y-3 ${
                      isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${
                        isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      <QrCode className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className={`text-base font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                        {language === 'zh' ? '输入单车编号或扫描二维码' : 'Enter Bicycle ID or Scan QR'}
                      </h3>
                      <p className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {language === 'zh'
                          ? '输入车把或智能锁上的编号（例如 DAR-000928 或 550928）'
                          : 'Enter the bike number on handlebars (e.g. DAR-000928 or Lipa Namba 550928)'}
                      </p>
                    </div>

                    <div className="flex gap-2 max-w-sm mx-auto">
                      <input
                        type="text"
                        value={targetBikeId}
                        onChange={(e) => setTargetBikeId(e.target.value)}
                        placeholder="e.g. DAR-000928"
                        className={`flex-1 border rounded-xl px-4 py-2.5 text-sm font-mono font-black ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600'
                            : 'bg-slate-900 border-slate-700 text-white focus:border-emerald-500'
                        }`}
                      />
                      <button
                        onClick={handleManualScan}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
                      >
                        {language === 'zh' ? '确定' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Select Package */}
              {step === 'SELECT_PACKAGE' && (
                <div className="space-y-5">
                  <div
                    className={`border rounded-2xl p-4 flex items-center justify-between ${
                      isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div>
                      <span className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {language === 'zh' ? '已选单车:' : 'Selected Bicycle:'}
                      </span>
                      <h3 className={`text-base font-black font-mono ${isLight ? 'text-slate-950' : 'text-white'}`}>
                        {targetBikeId}
                      </h3>
                      <p className={`text-xs font-bold ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                        {chosenBike.zone} • {language === 'zh' ? '电量' : 'Battery'} {chosenBike.batteryPercent}% •{' '}
                        {language === 'zh' ? '智能电磁锁' : 'Smart Solenoid Lock'}
                      </p>
                    </div>
                    <button
                      onClick={() => setStep('SELECT_BIKE')}
                      className={`text-xs underline font-bold cursor-pointer ${
                        isLight ? 'text-slate-700 hover:text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {language === 'zh' ? '更换单车' : 'Change Bike'}
                    </button>
                  </div>

                  <div>
                    <h3 className={`text-sm font-black mb-3 ${isLight ? 'text-slate-950' : 'text-slate-200'}`}>
                      {language === 'zh' ? '选择您的租赁套餐' : 'Choose Your Rental Package'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackageId(pkg.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            selectedPackageId === pkg.id
                              ? isLight
                                ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/40'
                                : 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10'
                              : isLight
                              ? 'bg-white border-slate-200 hover:border-slate-300'
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-black text-sm ${isLight ? 'text-slate-950' : 'text-white'}`}>
                              {language === 'zh' ? pkg.nameEn : language === 'sw' ? pkg.nameSw : pkg.nameEn}
                            </span>
                            {pkg.popular && (
                              <span
                                className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                                  isLight
                                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                }`}
                              >
                                {language === 'zh' ? '热门推荐' : 'POPULAR'}
                              </span>
                            )}
                          </div>
                          <div
                            className={`text-xl font-black font-mono my-1 ${
                              isLight ? 'text-emerald-800' : 'text-emerald-400'
                            }`}
                          >
                            TSh {pkg.priceTsh.toLocaleString()}
                          </div>
                          <p className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            {language === 'zh' ? pkg.descriptionEn : language === 'sw' ? pkg.descriptionSw : pkg.descriptionEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('PAYMENT')}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-2xl transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      {language === 'zh'
                        ? '前往移动货币结算'
                        : language === 'sw'
                        ? 'Endelea na Malipo ya Simu'
                        : 'Proceed to Mobile Money Payment'}
                    </span>
                  </button>
                </div>
              )}

              {/* Step 3: Payment via Tanzania Mobile Money */}
              {step === 'PAYMENT' && (
                <div className="space-y-6">
                  <div
                    className={`border rounded-2xl p-4 ${
                      isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className={`flex items-center justify-between border-b pb-3 mb-3 ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
                      <div>
                        <span className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          {language === 'zh' ? '租赁摘要:' : 'Rental Summary:'}
                        </span>
                        <div className={`font-black text-sm ${isLight ? 'text-slate-950' : 'text-white'}`}>
                          {chosenPackage.nameEn}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          {language === 'zh' ? '应付金额:' : 'Amount Due:'}
                        </span>
                        <div
                          className={`text-lg font-mono font-black ${
                            isLight ? 'text-emerald-800' : 'text-emerald-400'
                          }`}
                        >
                          TSh {chosenPackage.priceTsh.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className={`text-xs font-semibold flex items-center justify-between ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                      <span>
                        {language === 'zh' ? '单车编号:' : 'Bicycle ID:'}{' '}
                        <strong className={`font-mono font-black ${isLight ? 'text-slate-950' : 'text-slate-200'}`}>
                          {targetBikeId}
                        </strong>
                      </span>
                      <span>
                        {language === 'zh' ? '骑行时长:' : 'Duration:'}{' '}
                        <strong className={isLight ? 'text-slate-950 font-black' : 'text-slate-200 font-bold'}>
                          {chosenPackage.durationHours} {language === 'zh' ? '小时' : 'Hours'}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-black mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                      {language === 'zh' ? '选择坦桑尼亚移动货币网络' : 'Select Tanzanian Mobile Money Network'}
                    </label>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {providers.map((p) => (
                        <div
                          key={p.name}
                          onClick={() => setSelectedProvider(p.name)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                            selectedProvider === p.name
                              ? `${p.bg} ${p.border} ring-2 ring-emerald-500/50`
                              : isLight
                              ? 'bg-white border-slate-200 hover:border-slate-300'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className={`font-black text-sm ${isLight ? 'text-slate-950' : 'text-white'}`}>
                            {p.name}
                          </div>
                          <div className={`text-[10px] font-bold mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            {p.prefix}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className={`block text-xs font-black mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                          {language === 'zh' ? '用户姓名' : 'Your Name'}
                        </label>
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className={`w-full border rounded-xl px-4 py-2.5 text-sm font-bold ${
                            isLight
                              ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600'
                              : 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`block text-xs font-black mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                          {language === 'zh' ? '手机支付号码' : 'Mobile Money Phone Number'}
                        </label>
                        <input
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+255 754 000 000"
                          className={`w-full border rounded-xl px-4 py-2.5 text-sm font-mono font-bold ${
                            isLight
                              ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600'
                              : 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {isProcessingPayment ? (
                    <div
                      className={`border rounded-2xl p-4 text-center space-y-3 ${
                        isLight
                          ? 'bg-emerald-50 border-emerald-300'
                          : 'bg-slate-950 border-emerald-500/40'
                      }`}
                    >
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
                      <div className={`text-sm font-black ${isLight ? 'text-emerald-900' : 'text-emerald-400'}`}>
                        {paymentStepText}
                      </div>
                      <p className={`text-[11px] font-semibold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                        {language === 'zh'
                          ? '正在核验 M-Pesa / Tigo 网关响应并下发 MQTT 物理开锁指令...'
                          : 'Checking carrier gateway response & validating backend transaction...'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={handleInitiatePayment}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-2xl transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Lock className="w-4 h-4" />
                        <span>
                          {language === 'zh'
                            ? `支付 TSh ${chosenPackage.priceTsh.toLocaleString()} 并解锁 ${targetBikeId}`
                            : `Pay TSh ${chosenPackage.priceTsh.toLocaleString()} & Unlock ${targetBikeId}`}
                        </span>
                      </button>

                      <div className={`flex items-center justify-center gap-1.5 text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <ShieldCheck className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                        <span>
                          {language === 'zh'
                            ? '银行级 256 位加密移动货币安全核验协议'
                            : 'Bank-grade 256-bit encrypted mobile money verification'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ACTIVE RIDE MODE */}
          {activeTab === 'active_ride' && (
            <div className="space-y-6">
              {activeUserRental ? (
                <div className="space-y-6">
                  {/* Live Status Card */}
                  <div
                    className={`border rounded-3xl p-6 shadow-2xl relative overflow-hidden ${
                      isLight
                        ? 'bg-slate-50 border-emerald-400 text-slate-900'
                        : 'bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border-emerald-500/30 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                        <span className={`font-mono font-black text-sm ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                          {language === 'zh' ? '行程正在进行中' : 'RIDE IN PROGRESS'}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-mono font-black px-2.5 py-1 rounded-full border ${
                          isLight
                            ? 'bg-white text-slate-800 border-slate-300'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {activeUserRental.id}
                      </span>
                    </div>

                    {/* Bike Specs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                      <div
                        className={`p-3 rounded-2xl border ${
                          isLight ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
                        }`}
                      >
                        <span className={`text-[10px] font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          {language === 'zh' ? '单车编号' : 'Bicycle ID'}
                        </span>
                        <div className={`font-mono font-black text-base ${isLight ? 'text-slate-950' : 'text-white'}`}>
                          {activeUserRental.bicycleId}
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-2xl border ${
                          isLight ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
                        }`}
                      >
                        <span className={`text-[10px] font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          {language === 'zh' ? '套餐类型' : 'Package'}
                        </span>
                        <div className={`font-black text-sm ${isLight ? 'text-slate-950' : 'text-white'}`}>
                          {activeUserRental.packageName}
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-2xl border ${
                          isLight ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
                        }`}
                      >
                        <span className={`text-[10px] font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          GPS Tracker
                        </span>
                        <div className={`font-black text-sm flex items-center gap-1 ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                          <Navigation className="w-3.5 h-3.5" /> LIVE
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-2xl border ${
                          isLight ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
                        }`}
                      >
                        <span className={`text-[10px] font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          {language === 'zh' ? '智能锁状态' : 'Smart Lock'}
                        </span>
                        <div className={`font-black text-sm flex items-center gap-1 ${isLight ? 'text-blue-800' : 'text-blue-400'}`}>
                          <Unlock className="w-3.5 h-3.5" /> {language === 'zh' ? '已解锁' : 'UNLOCKED'}
                        </div>
                      </div>
                    </div>

                    {/* Live Timer Countdown */}
                    <div
                      className={`my-6 text-center py-4 rounded-2xl border ${
                        isLight ? 'bg-white border-slate-200' : 'bg-slate-950/90 border-slate-800'
                      }`}
                    >
                      <span className={`text-xs font-black uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                        {language === 'zh'
                          ? '安全骑行剩余时间倒计时'
                          : 'Time Remaining Until Safe Expiration'}
                      </span>
                      <div
                        className={`text-4xl sm:text-5xl font-black font-mono my-2 tracking-tight ${
                          isLight ? 'text-emerald-800' : 'text-emerald-400'
                        }`}
                      >
                        {(() => {
                          const diff = Math.max(
                            0,
                            Math.floor(
                              (new Date(activeUserRental.expiresAt).getTime() - Date.now()) / 1000
                            )
                          );
                          const h = Math.floor(diff / 3600);
                          const m = Math.floor((diff % 3600) / 60);
                          const s = diff % 60;
                          return `${String(h).padStart(2, '0')}:${String(m).padStart(
                            2,
                            '0'
                          )}:${String(s).padStart(2, '0')}`;
                        })()}
                      </div>
                      <div className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {language === 'zh' ? '开始时间:' : 'Started:'}{' '}
                        {new Date(activeUserRental.startTime).toLocaleTimeString()} •{' '}
                        {language === 'zh' ? '预计到期:' : 'Expires:'}{' '}
                        {new Date(activeUserRental.expiresAt).toLocaleTimeString()}
                      </div>
                    </div>

                    {/* Safety Alert Notice */}
                    <div
                      className={`border rounded-2xl p-3.5 flex items-start gap-3 text-xs ${
                        isLight
                          ? 'bg-amber-50 border-amber-300 text-amber-950'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                      }`}
                    >
                      <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                      <div>
                        <strong className={`font-black block ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
                          {language === 'zh'
                            ? '安全驻车防锁保护机制已启用'
                            : 'Safe Auto-Lock Protocol Active'}
                        </strong>
                        <span className="font-semibold">
                          {language === 'zh'
                            ? '到期时系统绝不会在骑行途中锁车，只有在检测到车辆静止停放超过 2-3 分钟后才会安全上锁。'
                            : 'The system will NEVER lock the wheel while you are riding—it waits for 2-3 minutes of confirmed stationary parking.'}
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
                        className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-sm rounded-2xl transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Lock className="w-4 h-4" />
                        <span>{language === 'zh' ? '结束骑行并安全关锁' : 'End Ride & Lock Safely'}</span>
                      </button>

                      <button
                        onClick={() => setShowReportModal(true)}
                        className={`px-5 py-3.5 text-sm font-black rounded-2xl border transition-colors cursor-pointer ${
                          isLight
                            ? 'bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-300'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                        }`}
                      >
                        {language === 'zh' ? '报修故障' : 'Report Issue'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`text-center py-12 rounded-3xl border p-6 space-y-4 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto text-2xl ${
                      isLight ? 'bg-white border-slate-300 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    🚲
                  </div>
                  <h3 className={`text-base font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    {language === 'zh' ? '暂无进行中的行程' : 'No Active Rental'}
                  </h3>
                  <p className={`text-xs font-semibold max-w-sm mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {language === 'zh'
                      ? '在地图上寻找附近的智能单车或直接扫码/输入专属付款码开启您的达市绿色畅行之旅。'
                      : 'Find a bicycle on the live map or scan a QR code to start your ride across Dar es Salaam.'}
                  </p>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {language === 'zh' ? '浏览达市单车地图' : 'Browse Bikes in Dar'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Col: Smart Bike Specs & Live Digital Pass Widget */}
        <div className="lg:col-span-4 space-y-6">
          {/* Smart Bicycle Hardware Identity Card */}
          <div
            className={`border rounded-3xl p-5 shadow-xl space-y-4 ${
              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-black flex items-center gap-2 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                <span>
                  {language === 'zh' ? '智能硬件系统架构' : 'Smart Bicycle Architecture'}
                </span>
              </h3>
              <span
                className={`text-[10px] font-mono font-black px-2 py-0.5 rounded ${
                  isLight ? 'bg-slate-100 text-slate-800' : 'bg-slate-800 text-slate-400'
                }`}
              >
                GEN-3 URBAN
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={isLight ? 'text-slate-600 font-bold' : 'text-slate-400'}>
                  {language === 'zh' ? '车架材质:' : 'Frame:'}
                </span>
                <span className={`font-black ${isLight ? 'text-slate-950' : 'text-slate-200'}`}>
                  {language === 'zh' ? '航空级防腐蚀铝合金' : 'Aircraft Anti-Corrosion Alloy'}
                </span>
              </div>
              <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={isLight ? 'text-slate-600 font-bold' : 'text-slate-400'}>
                  {language === 'zh' ? '车胎配置:' : 'Tires:'}
                </span>
                <span className={`font-black ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                  {language === 'zh' ? '实心防穿刺免充气' : 'Puncture-Resistant Solid-Core'}
                </span>
              </div>
              <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={isLight ? 'text-slate-600 font-bold' : 'text-slate-400'}>
                  {language === 'zh' ? '物联网主控:' : 'IoT Controller:'}
                </span>
                <span className={`font-black ${isLight ? 'text-slate-950' : 'text-slate-200'}`}>
                  4G LTE-M / GPS / BLE / Solenoid
                </span>
              </div>
              <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={isLight ? 'text-slate-600 font-bold' : 'text-slate-400'}>
                  {language === 'zh' ? '能源供给:' : 'Power:'}
                </span>
                <span className={`font-black ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                  {language === 'zh' ? '太阳能光伏车架 + 锂离子电池' : 'Solar Frame Charging + Li-Ion'}
                </span>
              </div>
              <div className={`flex justify-between py-1 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={isLight ? 'text-slate-600 font-bold' : 'text-slate-400'}>
                  {language === 'zh' ? '安全锁舌机制:' : 'Safe Lock Mechanism:'}
                </span>
                <span className={`font-black ${isLight ? 'text-blue-800' : 'text-blue-400'}`}>
                  {language === 'zh' ? '双重静止检测防误锁' : '2-Stage Stationary Verification'}
                </span>
              </div>
            </div>
          </div>

          {/* Sustainable Impact Tracker */}
          <div
            className={`border rounded-3xl p-5 shadow-xl space-y-3 ${
              isLight
                ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                : 'bg-gradient-to-br from-slate-900 to-emerald-950/40 border-slate-800 text-white'
            }`}
          >
            <h3 className={`text-sm font-black flex items-center gap-2 ${isLight ? 'text-slate-950' : 'text-white'}`}>
              <Leaf className={`w-4 h-4 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
              <span>
                {language === 'zh' ? '达市绿色环保减排' : 'Dar es Salaam Eco-Impact'}
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`p-3 rounded-2xl border ${
                  isLight ? 'bg-white border-emerald-200' : 'bg-slate-950/80 border-slate-800/80'
                }`}
              >
                <div className={`text-xl font-black font-mono ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                  2.4 kg
                </div>
                <div className={`text-[10px] font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {language === 'zh' ? '本单减少碳排放 (CO₂)' : 'CO₂ Saved this ride'}
                </div>
              </div>
              <div
                className={`p-3 rounded-2xl border ${
                  isLight ? 'bg-white border-emerald-200' : 'bg-slate-950/80 border-slate-800/80'
                }`}
              >
                <div className={`text-xl font-black font-mono ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                  180 kcal
                </div>
                <div className={`text-[10px] font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {language === 'zh' ? '消耗热量卡路里' : 'Calories Burned'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: REPORT DAMAGE / MECHANICAL ISSUE */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 relative ${
              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
            }`}
          >
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-base font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  {language === 'zh' ? '报修单车故障' : language === 'sw' ? 'Ripoti Hitilafu ya Baiskeli' : 'Report Bicycle Issue'}
                </h3>
                <p className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {language === 'zh'
                    ? '工单将即刻同步至流动现场维修技师工作台'
                    : 'Instant digital ticket for our mobile field technician'}
                </p>
              </div>
            </div>

            {reportSuccessMsg ? (
              <div className="bg-emerald-100 border border-emerald-300 p-4 rounded-2xl text-emerald-900 text-xs text-center font-black">
                {reportSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleSubmitDamage} className="space-y-4">
                <div>
                  <label className={`block text-xs font-black mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                    {language === 'zh' ? '单车编号' : 'Bicycle ID'}
                  </label>
                  <input
                    type="text"
                    value={reportBikeId || activeUserRental?.bicycleId || 'DAR-000928'}
                    onChange={(e) => setReportBikeId(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-2 text-sm font-mono font-bold ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-xs font-black mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                    {language === 'zh' ? '故障类别' : 'Issue Category'}
                  </label>
                  <select
                    value={reportIssue}
                    onChange={(e) => setReportIssue(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-2 text-xs font-bold ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  >
                    <option value="Puncture / Flat Tire">{language === 'zh' ? '车胎漏气/爆胎' : 'Puncture / Flat Tire'}</option>
                    <option value="Brake Failure">{language === 'zh' ? '刹车故障' : 'Brake Failure'}</option>
                    <option value="Broken Chain">{language === 'zh' ? '链条脱落/断裂' : 'Broken Chain'}</option>
                    <option value="Damaged Wheel">{language === 'zh' ? '车轮变形' : 'Damaged Wheel'}</option>
                    <option value="Seat Problem">{language === 'zh' ? '车座松动' : 'Seat Problem'}</option>
                    <option value="Lock Problem">{language === 'zh' ? '智能锁无法开启/关闭' : 'Lock Problem'}</option>
                    <option value="GPS / IoT Issue">{language === 'zh' ? 'GPS/通信模块离线' : 'GPS / IoT Issue'}</option>
                    <option value="Other">{language === 'zh' ? '其他异常' : 'Other'}</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-black mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                    {language === 'zh' ? '详细说明' : 'Description'}
                  </label>
                  <textarea
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder={language === 'zh' ? '请简述损坏细节或具体停靠位置...' : 'Provide details about the issue...'}
                    rows={3}
                    className={`w-full border rounded-xl px-4 py-2 text-xs font-semibold ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {language === 'zh' ? '提交维修工单' : 'Submit Maintenance Ticket'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: DIGITAL RECEIPT */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 relative ${
              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
            }`}
          >
            <button
              onClick={() => setShowReceipt(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {language === 'zh' ? '行程已完成并安全关锁' : 'Ride Completed & Locked Safely'}
              </h3>
              <p className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                DAR RIDE Tanzania Digital Receipt
              </p>
            </div>

            <div
              className={`rounded-2xl p-4 border space-y-2 text-xs ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={isLight ? 'text-slate-600 font-bold' : 'text-slate-400'}>
                  {language === 'zh' ? '交易流水号:' : 'Transaction ID:'}
                </span>
                <span className={`font-mono font-black ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                  TXN-MPESA-8849201
                </span>
              </div>
              <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={isLight ? 'text-slate-600 font-bold' : 'text-slate-400'}>
                  {language === 'zh' ? '支付总额:' : 'Total Paid:'}
                </span>
                <span className={`font-mono font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  TSh 1,000
                </span>
              </div>
              <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={isLight ? 'text-slate-600 font-bold' : 'text-slate-400'}>
                  {language === 'zh' ? '支付运营商:' : 'Payment Provider:'}
                </span>
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                  Vodacom M-Pesa
                </span>
              </div>
              <div className={`flex justify-between py-1 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className={isLight ? 'text-slate-600 font-bold' : 'text-slate-400'}>
                  {language === 'zh' ? '还车指定区域:' : 'Zone Returned:'}
                </span>
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                  Coco Beach / Masaki
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className={isLight ? 'text-slate-600 font-bold' : 'text-slate-400'}>
                  {language === 'zh' ? '安全锁闭验证:' : 'Safe Lock Status:'}
                </span>
                <span className="text-emerald-600 font-black">
                  Confirmed & Verified
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowReceipt(false)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              {language === 'zh' ? '完成' : 'Done'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
