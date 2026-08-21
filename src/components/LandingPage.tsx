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
  TrendingUp,
  DollarSign,
  WifiOff,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { language, theme, packages, zones, setCurrentView } = useDarRide();
  const isLight = theme === 'light';

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Ambient Glows */}
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isLight ? 'bg-emerald-400/10' : 'bg-emerald-500/15'
          }`}
        ></div>
        <div
          className={`absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
            isLight ? 'bg-blue-400/10' : 'bg-blue-500/10'
          }`}
        ></div>

        <div className="relative space-y-6 max-w-4xl mx-auto">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-black tracking-wide shadow-inner ${
              isLight
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-slate-900 border-emerald-500/30 text-emerald-400'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>
              {language === 'zh'
                ? '非洲最大规模智能物联网交通网络 • 100,000 辆智能单车'
                : language === 'sw'
                ? 'MTANDAO MKUBWA ZAIDI WA USAFIRI AFRIKA • BAISKELI ZA KISASA 100,000'
                : 'AFRICA’S LARGEST CONNECTED MOBILITY NETWORK • 100,000 SMART BICYCLES'}
            </span>
          </div>

          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            {language === 'zh' ? (
              <>
                智慧畅行达市 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600">
                  开启全新绿色出行
                </span>
              </>
            ) : language === 'sw' ? (
              <>
                Songa Kijanja. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500">
                  Endesha Dar es Salaam.
                </span>
              </>
            ) : (
              <>
                Move Smarter. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500">
                  Ride Dar es Salaam.
                </span>
              </>
            )}
          </h1>

          <p
            className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-semibold ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {language === 'zh'
              ? '使用 M-Pesa、Airtel Money、Tigo Pesa 或 HaloPesa，随时随地解锁达累斯萨拉姆 100,000 辆太阳能智能互联单车。支持按键机离线拨号支付。起价仅需 TSh 500。'
              : language === 'sw'
              ? 'Fungua baiskeli 100,000 za kisasa zenye nguvu ya jua na GPS kote jijini Dar es Salaam kupitia M-Pesa, Airtel Money, Tigo Pesa au HaloPesa kuanzia TSh 500 tu.'
              : 'Unlock 100,000 smart connected solar bicycles anywhere in Dar es Salaam via M-Pesa, Airtel Money, Tigo Pesa or HaloPesa. Fast, healthy, eco-friendly transit starting at only TSh 500.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('customer')}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>
                {language === 'zh'
                  ? '启动乘客端 (支持扫码 & 离线)'
                  : language === 'sw'
                  ? 'Fungua Programu ya Mteja'
                  : 'Launch Customer Mobile App'}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentView('control-center')}
              className={`w-full sm:w-auto px-8 py-4 font-black text-sm rounded-2xl border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700'
              }`}
            >
              <Radio className="w-4 h-4 text-emerald-500" />
              <span>
                {language === 'zh'
                  ? '100,000 调度指挥中枢'
                  : language === 'sw'
                  ? 'Kituo cha Ramani (Baiskeli 100,000)'
                  : '100,000 Fleet Control Center'}
              </span>
            </button>

            <button
              onClick={() => setCurrentView('ceo')}
              className={`w-full sm:w-auto px-8 py-4 font-black text-sm rounded-2xl border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isLight
                  ? 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200 shadow-sm'
                  : 'bg-blue-950/40 hover:bg-blue-900/50 text-blue-300 border-blue-800/80'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span>
                {language === 'zh'
                  ? '平台营收大屏 (2亿/12h)'
                  : language === 'sw'
                  ? 'Ripoti ya Mapato (200M/12h)'
                  : 'Revenue Portal (200M/12h)'}
              </span>
            </button>
          </div>

          {/* Supported Mobile Money Brands Bar */}
          <div className={`pt-8 border-t ${isLight ? 'border-slate-300' : 'border-slate-800/80'}`}>
            <span
              className={`text-xs block mb-3 font-black ${
                isLight ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              {language === 'zh'
                ? '支持坦桑尼亚全部主流移动运营商全天候结算'
                : language === 'sw'
                ? 'MALIPO YA PAPO HAPO KUPITIA MITANDAO YA SIMU TANZANIA'
                : 'INSTANT TANZANIAN MOBILE MONEY INTEGRATION'}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-black">
              <span className="flex items-center gap-1.5 text-red-600">
                <CreditCard className="w-4 h-4" /> Vodacom M-Pesa
              </span>
              <span className="flex items-center gap-1.5 text-red-700">
                <CreditCard className="w-4 h-4" /> Airtel Money
              </span>
              <span className="flex items-center gap-1.5 text-blue-600">
                <CreditCard className="w-4 h-4" /> Tigo Pesa
              </span>
              <span className="flex items-center gap-1.5 text-amber-600">
                <CreditCard className="w-4 h-4" /> HaloPesa
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className={`text-xs font-mono uppercase font-black tracking-wider ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
            {language === 'zh' ? '极简开锁流程' : language === 'sw' ? 'Hatua Rahisi za Usafiri' : 'Seamless Mobility Flow'}
          </span>
          <h2 className={`text-3xl font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
            {language === 'zh'
              ? '4 步轻松开启 DAR RIDE'
              : language === 'sw'
              ? 'Jinsi DAR RIDE Inavyofanya Kazi kwa Hatua 4'
              : 'How DAR RIDE Works in 4 Steps'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              titleEn: 'Find a Bicycle',
              titleSw: 'Tafuta Baiskeli',
              titleZh: '寻找附近单车',
              descEn: 'Open the live map to locate nearby connected bikes in Mwenge, Posta, Kariakoo, Masaki & more.',
              descSw: 'Fungua ramani kupata baiskeli iliyo karibu nawe Mwenge, Posta, Kariakoo, Masaki na kwingineko.',
              descZh: '打开实时地图，查看 Mwenge、Posta、Kariakoo、Masaki 等 13 个区域的在线单车。',
              icon: MapPin,
            },
            {
              step: '02',
              titleEn: 'Scan or Enter Lipa Namba',
              titleSw: 'Changanua QR / Lipa Namba',
              titleZh: '扫码或输入专属付款码',
              descEn: 'Point your camera at the QR code, or read the 6-digit payment number on the frame for offline USSD.',
              descSw: 'Elekeza kamera kwenye QR Code, au soma namba ya tarakimu 6 kwenye fremu kulipa bila mtandao.',
              descZh: '使用手机相机扫码，或在按键机上直接读取车架上的 6 位专属付款号码。',
              icon: QrCode,
            },
            {
              step: '03',
              titleEn: 'Pay via Mobile Money',
              titleSw: 'Lipa kwa Pesa ya Simu',
              titleZh: '移动货币快捷扣款',
              descEn: 'Select 3h, 6h, 12h or 24h pass and confirm PIN on your M-Pesa, Airtel, Tigo or HaloPesa.',
              descSw: 'Chagua muda (masaa 3, 6, 12 au 24) kisha weka namba yako ya siri kwenye simu kuthibitisha.',
              descZh: '选择 3h、6h、12h 或 24h 套餐并在手机运营商端输入 PIN 密码完成支付。',
              icon: Smartphone,
            },
            {
              step: '04',
              titleEn: 'Safe Auto-Lock',
              titleSw: 'Kufuli Kujifunga Salama',
              titleZh: '智能安全驻车上锁',
              descEn: 'Ride anywhere. When done, park safely in any zone. The lock engages safely only when fully stationary.',
              descSw: 'Endesha popote. Ukimaliza egesha eneo salama. Kufuli itajifunga salama baada ya kusimama kabisa.',
              descZh: '畅行全城。结束时在指定区域停好，系统在检测到车辆静止停靠后安全闭锁。',
              icon: Lock,
            },
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className={`border rounded-3xl p-6 relative overflow-hidden shadow-xl transition-all ${
                  isLight
                    ? 'bg-white border-slate-300 hover:border-emerald-600'
                    : 'bg-slate-900 border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <div
                  className={`text-4xl font-black font-mono absolute top-4 right-4 ${
                    isLight ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {s.step}
                </div>
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 ${
                    isLight
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className={`text-base font-black mb-2 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  {language === 'zh' ? s.titleZh : language === 'sw' ? s.titleSw : s.titleEn}
                </h3>
                <p className={`text-xs font-semibold leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {language === 'zh' ? s.descZh : language === 'sw' ? s.descSw : s.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 100,000 BIKES 12-HOUR REVENUE CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`border rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 ${
            isLight
              ? 'bg-emerald-50 border-emerald-300 text-slate-900'
              : 'bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border-emerald-500/30 text-white'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-full border ${
                  isLight
                    ? 'bg-emerald-200 text-emerald-900 border-emerald-400'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                100,000 BIKES • 12-HOUR DUAL TURNOVER
              </span>
            </div>
            <h3 className={`text-2xl font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
              {language === 'zh'
                ? '全网 12 小时基础总营收: TZS 200,000,000'
                : language === 'sw'
                ? 'Uwezo Mkubwa wa Kiuchumi: TZS 200,000,000 kwa Masaa 12'
                : 'High-Velocity Transit Velocity: TZS 200,000,000 / 12 Hours'}
            </h3>
            <p className={`text-xs font-semibold max-w-2xl ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {language === 'zh'
                ? '全城 100,000 辆智能太阳能单车每 12 小时租赁 2 次（每 6 小时 1,000 TZS），全网每 12 小时稳定产生 2 亿坦桑尼亚先令总流水，月度总规模达 60 亿先令。'
                : language === 'sw'
                ? 'Baiskeli 100,000 zikikodiwa mara 2 kwa masaa 12 kwa TSh 1,000 kila masaa 6 (safari 200,000), mtandao unaingiza TZS 200,000,000 kila masaa 12 (TZS Bilioni 6.0 kila mwezi).'
                : 'When all 100,000 smart solar bicycles are rented twice in 12 hours at TSh 1,000 per 6-hour cycle (200,000 rides), the network generates TZS 200,000,000 every 12 hours (TZS 6.0 Billion monthly).'}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className={`text-[10px] font-mono uppercase font-black ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {language === 'zh' ? '12小时总产值' : '12-Hour Gross Total'}
              </div>
              <div
                className={`text-3xl font-black font-mono ${
                  isLight ? 'text-emerald-900' : 'text-emerald-400'
                }`}
              >
                TZS 200M
              </div>
            </div>
            <button
              onClick={() => setCurrentView('ceo')}
              className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{language === 'zh' ? '查看决策与财务大屏' : 'Explore CEO Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* STRATEGIC LOCATIONS IN DAR ES SALAAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`border rounded-3xl p-8 shadow-2xl space-y-6 ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className={`text-xs font-mono uppercase font-black tracking-wider ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                {language === 'zh' ? '达累斯萨拉姆运营网格' : 'Active City Geofence'}
              </span>
              <h2 className={`text-2xl font-black mt-1 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {language === 'zh'
                  ? '覆盖达市 13 大战略交通枢纽与高校半岛'
                  : 'Deployed Across 13 Strategic Hubs in Dar es Salaam'}
              </h2>
            </div>

            <button
              onClick={() => setCurrentView('control-center')}
              className={`px-5 py-2.5 font-black text-xs rounded-xl border flex items-center gap-2 cursor-pointer ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
              }`}
            >
              <Radio className="w-4 h-4 text-emerald-500" />
              <span>
                {language === 'zh'
                  ? '打开 100,000 实时调度地图'
                  : 'Explore 100,000 Live Fleet Map'}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {zones.map((z) => (
              <div
                key={z.id}
                className={`p-3.5 rounded-2xl border space-y-1 text-xs ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className={`font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  {language === 'sw' ? z.swahiliName || z.name : z.name}
                </div>
                <div className={`text-[10px] font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {language === 'zh' ? '需求热度:' : 'Demand:'}{' '}
                  <strong className={isLight ? 'text-emerald-800' : 'text-emerald-400'}>{z.demandLevel}</strong>
                </div>
                <div className={`text-[10px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                  {z.currentFleet} {language === 'zh' ? '辆单车驻留' : 'Bikes Stationed'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
