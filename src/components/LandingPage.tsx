import React from 'react';
import { useDarRide } from '../services/store';
import {
  Bike,
  QrCode,
  Smartphone,
  ShieldCheck,
  CreditCard,
  Zap,
  MapPin,
  Leaf,
  Users,
  GraduationCap,
  Briefcase,
  Palmtree,
  ArrowRight,
  CheckCircle2,
  Lock,
  Radio,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { language, packages, zones, setCurrentView } = useDarRide();

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>
              {language === 'en'
                ? 'AFRICA’S LARGEST CONNECTED MOBILITY NETWORK • 100,000 SMART BICYCLES'
                : 'MTANDAO MKUBWA ZAIDI WA USAFIRI AFRIKA • BAISKELI ZA KISASA 100,000'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
            {language === 'en' ? (
              <>
                Move Smarter. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500">
                  Ride Dar es Salaam.
                </span>
              </>
            ) : (
              <>
                Songa Kijanja. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500">
                  Endesha Dar es Salaam.
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Unlock 100,000 smart connected solar bicycles anywhere in Dar es Salaam via M-Pesa, Airtel Money, Tigo Pesa or HaloPesa. Fast, healthy, eco-friendly transit starting at only TSh 500.'
              : 'Fungua baiskeli 100,000 za kisasa zenye nguvu ya jua na GPS kote jijini Dar es Salaam kupitia M-Pesa, Airtel Money, Tigo Pesa au HaloPesa kuanzia TSh 500 tu.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('customer')}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>{language === 'en' ? 'Launch Customer Mobile App' : 'Fungua Programu ya Mteja'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentView('control-center')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'en'
                  ? '100,000 Fleet Control Center'
                  : 'Kituo cha Ramani (Baiskeli 100,000)'}
              </span>
            </button>
          </div>

          {/* Supported Mobile Money Brands Bar */}
          <div className="pt-8 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-3 font-medium">
              {language === 'en'
                ? 'INSTANT TANZANIAN MOBILE MONEY INTEGRATION'
                : 'MALIPO YA PAPO HAPO KUPITIA MITANDAO YA SIMU TANZANIA'}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-slate-300">
              <span className="flex items-center gap-1.5 text-red-400">
                <CreditCard className="w-4 h-4" /> Vodacom M-Pesa
              </span>
              <span className="flex items-center gap-1.5 text-red-500">
                <CreditCard className="w-4 h-4" /> Airtel Money
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <CreditCard className="w-4 h-4" /> Tigo Pesa
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <CreditCard className="w-4 h-4" /> HaloPesa
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
            {language === 'en' ? 'Seamless Mobility Flow' : 'Hatua Rahisi za Usafiri'}
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            {language === 'en' ? 'How DAR RIDE Works in 4 Steps' : 'Jinsi DAR RIDE Inavyofanya Kazi kwa Hatua 4'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              titleEn: 'Find a Bicycle',
              titleSw: 'Tafuta Baiskeli',
              descEn: 'Open the live map to locate nearby connected bikes in Mwenge, Posta, Kariakoo, Masaki & more.',
              descSw: 'Fungua ramani kupata baiskeli iliyo karibu nawe Mwenge, Posta, Kariakoo, Masaki na kwingineko.',
              icon: MapPin,
            },
            {
              step: '02',
              titleEn: 'Scan QR Code',
              titleSw: 'Changanua QR Code',
              descEn: 'Point your camera at the optical QR code on the handlebar stem or Manganese steel frame.',
              descSw: 'Elekeza kamera ya simu yako kwenye QR Code iliyopo kwenye usukani au fremu ya chuma.',
              icon: QrCode,
            },
            {
              step: '03',
              titleEn: 'Pay with Mobile Money',
              titleSw: 'Lipa kwa Pesa ya Simu',
              descEn: 'Select 3h, 6h, 12h or 24h pass and confirm PIN on your M-Pesa, Airtel, Tigo or HaloPesa.',
              descSw: 'Chagua muda (masaa 3, 6, 12 au 24) kisha weka namba yako ya siri kwenye simu yako kuthibitisha.',
              icon: Smartphone,
            },
            {
              step: '04',
              titleEn: 'Safe Auto-Lock',
              titleSw: 'Kufuli Kujifunga Salama',
              descEn: 'Ride anywhere. When done, park safely in any zone. The lock engages safely only when fully stationary.',
              descSw: 'Endesha popote. Ukimaliza egesha eneo salama. Kufuli itajifunga salama baada ya kusimama kabisa.',
              icon: Lock,
            },
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl hover:border-emerald-500/40 transition-all"
              >
                <div className="text-4xl font-black font-mono text-slate-800 absolute top-4 right-4">
                  {s.step}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {language === 'en' ? s.titleEn : s.titleSw}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'en' ? s.descEn : s.descSw}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
            {language === 'en' ? 'Transparent & Accessible Pricing' : 'Bei Nafuu na Wazi'}
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            {language === 'en' ? 'Rental Packages & Subscriptions' : 'Vifurushi vya Kukodi & Kujiunga'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'en'
              ? 'Standard municipal tariffs across Dar es Salaam metropolis'
              : 'Viwango rasmi vya manispaa kote jijini Dar es Salaam'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {packages.slice(0, 4).map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 border flex flex-col justify-between transition-all ${
                pkg.popular
                  ? 'bg-gradient-to-b from-slate-900 to-emerald-950/40 border-emerald-500 shadow-2xl shadow-emerald-500/10 ring-1 ring-emerald-500'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-white">
                    {language === 'en' ? pkg.nameEn : pkg.nameSw}
                  </h3>
                  {pkg.popular && (
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
                      {language === 'en' ? 'POPULAR' : 'INAPENDWA'}
                    </span>
                  )}
                </div>

                <div className="my-4">
                  <span className="text-3xl font-black font-mono text-emerald-400">
                    TSh {pkg.priceTsh.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">/ {pkg.durationHours}h</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'en' ? pkg.descriptionEn : pkg.descriptionSw}
                </p>
              </div>

              <button
                onClick={() => setCurrentView('customer')}
                className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                {language === 'en' ? 'Choose Plan & Unlock' : 'Chagua Kifurushi & Fungua'}
              </button>
            </div>
          ))}
        </div>

        {/* 100,000 Bikes 12-Hour Revenue Showcase Callout */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                100,000 BIKES • 12-HOUR DUAL TURNOVER
              </span>
            </div>
            <h3 className="text-lg font-black text-white">
              {language === 'en'
                ? 'High-Velocity Transit Velocity: TZS 200,000,000 / 12 Hours'
                : 'Uwezo Mkubwa wa Kiuchumi: TZS 200,000,000 kwa Masaa 12'}
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              {language === 'en'
                ? 'When all 100,000 smart solar bicycles are rented twice in 12 hours at TSh 1,000 per 6-hour cycle (200,000 completed rides), the network generates TZS 200,000,000 gross revenue daily (TZS 6.0 Billion monthly).'
                : 'Baiskeli 100,000 zikikodiwa mara 2 kwa masaa 12 kwa TSh 1,000 kila masaa 6 (safari 200,000), mtandao unaingiza TZS 200,000,000 kila siku (TZS Bilioni 6.0 kila mwezi).'}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-mono uppercase">
                {language === 'en' ? '12-Hour Gross Total' : 'Jumla ya Masaa 12'}
              </div>
              <div className="text-2xl font-black font-mono text-emerald-400">
                TZS 200M
              </div>
            </div>
            <button
              onClick={() => setCurrentView('ceo-dashboard')}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{language === 'en' ? 'Explore CEO Model' : 'Tazama Ripoti ya Mapato'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* STRATEGIC LOCATIONS IN DAR ES SALAAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
                {language === 'en' ? 'Active City Geofence' : 'Mipaka Rasmi ya Jiji'}
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                {language === 'en'
                  ? 'Deployed Across 13 Strategic Hubs in Dar es Salaam'
                  : 'Ipo Katika Vituo Vikuu 13 vya Kimkakati Dar es Salaam'}
              </h2>
            </div>

            <button
              onClick={() => setCurrentView('control-center')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2 cursor-pointer"
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'en'
                  ? 'Explore 100,000 Live Fleet Map'
                  : 'Tazama Ramani ya Baiskeli 100,000'}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {zones.map((z) => (
              <div
                key={z.id}
                className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1 text-xs"
              >
                <div className="font-bold text-white">
                  {language === 'en' ? z.name : z.swahiliName || z.name}
                </div>
                <div className="text-[10px] text-slate-400">
                  {language === 'en' ? 'Demand:' : 'Mahitaji:'}{' '}
                  <strong className="text-emerald-400">{z.demandLevel}</strong>
                </div>
                <div className="text-[10px] text-slate-500">
                  {z.currentFleet} {language === 'en' ? 'Bikes Stationed' : 'Baiskeli Zilizopo'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TAILORED MOBILITY SOLUTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {language === 'en' ? 'For Universities & Students' : 'Kwa Vyuo Vikuu & Wanachuo'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Affordable student weekly and semester passes for UDSM, IFM, CBE, and Ardhi University. Zero fuel costs, no traffic delay.'
                : 'Vifurushi nafuu vya wiki na muhula kwa wanafunzi wa UDSM, IFM, CBE, na Ardhi. Wahi vipindi bila kucheleweshwa na foleni.'}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {language === 'en' ? 'For Businesses & Corporate' : 'Kwa Makampuni & Biashara'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Corporate fleet accounts, branded office hubs, and rapid transit for delivery messengers navigating busy city streets.'
                : 'Akaunti za wafanyakazi wa makampuni, vituo maalum vya ofisi, na usafiri wa haraka kwa watoa huduma wa vifurushi jijini.'}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Palmtree className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {language === 'en' ? 'For Tourists & Coastal Exploring' : 'Kwa Watalii & Matembezi ya Pwani'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Scenic exploration across Coco Beach, Masaki Peninsula, Oyster Bay, and historic Kivukoni fish markets with 24-hour passes.'
                : 'Tembelea mandhari nzuri za Pwani ya Coco, Rasi ya Msasani, Oyster Bay, na soko la samaki Kivukoni kwa vifurushi vya masaa 24.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

