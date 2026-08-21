import React, { useState } from 'react';
import { useDarRide } from '../services/store';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Compass,
  Zap,
  Award,
  Globe2,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Calculator,
  Clock,
  CheckCircle2,
  CreditCard,
  Sparkles,
  ArrowRight,
  Repeat,
} from 'lucide-react';

export const CeoDashboard: React.FC = () => {
  const { metrics, fleet, zones, language, theme } = useDarRide();
  const isLight = theme === 'light';

  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month' | 'year'>('today');
  const [targetPhase, setTargetPhase] = useState<number>(7); // Default to Phase 7: 100,000 bikes

  // Interactive 12-Hour Revenue Simulator State
  const [simFleetSize, setSimFleetSize] = useState<number>(100000);
  const [simTurnoverCycles, setSimTurnoverCycles] = useState<number>(2); // 2 rentals in 12 hours (every 6 hours)
  const [simRatePerRental, setSimRatePerRental] = useState<number>(1000); // 1,000 TZS per 6 hours

  // Computed Financial Metrics for 12-Hour Model
  const sim12HrRevenue = simFleetSize * simTurnoverCycles * simRatePerRental;
  const simSingleCycleRevenue = simFleetSize * simRatePerRental;
  const simTotalRides12Hr = simFleetSize * simTurnoverCycles;
  const simMonthlyRevenue = sim12HrRevenue * 30;
  const simAnnualRevenue = sim12HrRevenue * 365;
  const simHardwareCapexTsh = simFleetSize * 360000; // $140 ≈ TSh 360,000 per smart bike
  const simDailyGrossProfitTsh = sim12HrRevenue * 0.684; // 68.4% gross margin
  const simPaybackDays = Math.ceil(simHardwareCapexTsh / (simDailyGrossProfitTsh || 1));

  const phaseData = [
    {
      phase: 1,
      count: 100,
      label:
        language === 'zh'
          ? '第一阶段：核心试点 (100辆)'
          : language === 'sw'
          ? 'Awamu ya 1: Majaribio ya Awali'
          : 'Phase 1: Pilot Core',
      cities: 'Dar es Salaam (Mwenge, Masaki, Kariakoo)',
      status: 'COMPLETED',
    },
    {
      phase: 2,
      count: 500,
      label:
        language === 'zh'
          ? '第二阶段：沿海拓展 (500辆)'
          : language === 'sw'
          ? 'Awamu ya 2: Upanuzi wa Ukanda wa Pwani'
          : 'Phase 2: Coast Expansion',
      cities: 'Dar es Salaam (13 Zones)',
      status: 'COMPLETED',
    },
    {
      phase: 3,
      count: 1000,
      label:
        language === 'zh'
          ? '第三阶段：全城骨干网 (1,000辆)'
          : language === 'sw'
          ? 'Awamu ya 3: Mtandao Hai Uliopo'
          : 'Phase 3: Active Live Network',
      cities: 'Dar es Salaam Metropolis',
      status: 'COMPLETED',
    },
    {
      phase: 4,
      count: 5000,
      label:
        language === 'zh'
          ? '第四阶段：大都市覆盖 (5,000辆)'
          : language === 'sw'
          ? 'Awamu ya 4: Uenezaji Jiji Lote'
          : 'Phase 4: Metro Saturation',
      cities: 'Dar es Salaam + Zanzibar',
      status: 'COMPLETED',
    },
    {
      phase: 5,
      count: 10000,
      label:
        language === 'zh'
          ? '第五阶段：国家级电网枢纽 (10,000辆)'
          : language === 'sw'
          ? 'Awamu ya 5: Mtandao wa Kitaifa'
          : 'Phase 5: National Grid',
      cities: 'Dar, Arusha, Mwanza, Dodoma',
      status: 'ACTIVE',
    },
    {
      phase: 6,
      count: 50000,
      label:
        language === 'zh'
          ? '第六阶段：东非跨国枢纽 (50,000辆)'
          : language === 'sw'
          ? 'Awamu ya 6: Vituo vya Afrika Mashariki'
          : 'Phase 6: East Africa Hubs',
      cities: 'Tanzania + Nairobi + Kigali',
      status: 'PLANNED',
    },
    {
      phase: 7,
      count: 100000,
      label:
        language === 'zh'
          ? '第七阶段：全非洲泛联出行 (100,000辆超级单车)'
          : language === 'sw'
          ? 'Awamu ya 7: Mtandao Mkuu wa Baiskeli 100,000'
          : 'Phase 7: Pan-African Mobility (100,000 Smart Bikes)',
      cities: '10+ African Metropolitan Cities',
      status: 'ACTIVE',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 30-Second Executive Summary Header */}
      <div
        className={`border rounded-3xl p-6 shadow-2xl space-y-4 ${
          isLight
            ? 'bg-white border-slate-300 text-slate-900 shadow-slate-200'
            : 'bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border-slate-800 text-white'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-full border ${
                  isLight
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}
              >
                {language === 'zh'
                  ? '高管决策中心 • 30秒核心简报'
                  : language === 'sw'
                  ? 'RIPOTI YA KIKUU YA KIUTENDAJI • MUHTASARI'
                  : 'EXECUTIVE INTELLIGENCE • 30-SEC BRIEFING'}
              </span>
              <span
                className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-full border ${
                  isLight
                    ? 'bg-blue-100 text-blue-900 border-blue-300'
                    : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                }`}
              >
                100,000 FLEET MODEL
              </span>
            </div>
            <h1 className={`text-2xl font-black mt-1 ${isLight ? 'text-slate-950' : 'text-white'}`}>
              {language === 'zh'
                ? 'DAR RIDE 城市出行云控与营收全景'
                : language === 'sw'
                ? 'Utendaji na Mapato ya DAR RIDE'
                : 'DAR RIDE Mobility Cloud Performance'}
            </h1>
            <p className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {language === 'zh'
                ? '单车经济模型、12小时双循环周转率（每6小时1,000 TZS）及10万辆规模营收推演。'
                : language === 'sw'
                ? 'Uchumi wa kitengo, mzunguko wa mapato wa masaa 12 (kila masaa 6), na mpango wa baiskeli 100,000.'
                : 'Unit economics, 12-hour dual-turnover cycle, revenue streams, and 100,000 bicycle scaling trajectory.'}
            </p>
          </div>

          {/* Timeframe selector */}
          <div
            className={`flex items-center gap-1.5 p-1.5 rounded-2xl border text-xs ${
              isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
            }`}
          >
            {(['today', 'week', 'month', 'year'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTimeframe(t)}
                className={`px-3 py-1.5 rounded-xl font-black uppercase transition-all cursor-pointer ${
                  selectedTimeframe === t
                    ? 'bg-emerald-600 text-white shadow-md'
                    : isLight
                    ? 'text-slate-700 hover:text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t === 'today'
                  ? language === 'zh'
                    ? '12小时今日'
                    : language === 'sw'
                    ? 'Masaa 12 Leo'
                    : '12h Today'
                  : t === 'week'
                  ? language === 'zh'
                    ? '7天'
                    : language === 'sw'
                    ? 'Siku 7'
                    : '7 Days'
                  : t === 'month'
                  ? language === 'zh'
                    ? '30天'
                    : language === 'sw'
                    ? 'Siku 30'
                    : '30 Days'
                  : language === 'zh'
                  ? '全年'
                  : language === 'sw'
                  ? 'Mwaka 1'
                  : '365 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Core Executive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div
            className={`p-4 rounded-2xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800/80'
            }`}
          >
            <span
              className={`text-xs font-bold flex items-center justify-between ${
                isLight ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              <span>{language === 'zh' ? '10万辆总营收' : language === 'sw' ? 'Jumla ya Mapato' : '100,000 Fleet Revenue'}</span>
              <span className="text-emerald-600 font-black flex items-center text-[10px]">
                <ArrowUpRight className="w-3 h-3" /> +100% Active
              </span>
            </span>
            <div className="text-2xl font-black font-mono text-emerald-600 my-1">
              TSh{' '}
              {selectedTimeframe === 'today'
                ? '200,000,000'
                : selectedTimeframe === 'week'
                ? '1,400,000,000'
                : selectedTimeframe === 'month'
                ? '6,000,000,000'
                : '73,000,000,000'}
            </div>
            <div className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
              {selectedTimeframe === 'today'
                ? language === 'zh'
                  ? '12小时骑行2次 @ TSh 1,000 = TSh 2亿'
                  : language === 'sw'
                  ? 'Safari 2 kwa masaa 12 @ TSh 1,000 = TSh 200M'
                  : '2x in 12h @ TSh 1,000 = TSh 200M'
                : selectedTimeframe === 'week'
                ? '7 Days × TSh 200M = TSh 1.4B'
                : selectedTimeframe === 'month'
                ? '30 Days × TSh 200M = TSh 6.0B'
                : '365 Days × TSh 200M = TSh 73.0B'}
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800/80'
            }`}
          >
            <span
              className={`text-xs font-bold flex items-center justify-between ${
                isLight ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              <span>
                {language === 'zh'
                  ? '完成订单量 (12小时)'
                  : language === 'sw'
                  ? 'Safari Zilizofanyika'
                  : 'Completed Rides (12 Hours)'}
              </span>
              <span className="text-blue-600 font-black text-[10px]">
                {language === 'zh' ? '2次循环周转' : '2x Turnover'}
              </span>
            </span>
            <div className="text-2xl font-black font-mono text-blue-600 my-1">
              {selectedTimeframe === 'today'
                ? '200,000'
                : selectedTimeframe === 'week'
                ? '1,400,000'
                : selectedTimeframe === 'month'
                ? '6,000,000'
                : '73,000,000'}
            </div>
            <div className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
              {language === 'zh'
                ? '100,000 辆车 × 12小时内租赁2次'
                : '100,000 bikes × 2 rentals in 12 hrs'}
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800/80'
            }`}
          >
            <span
              className={`text-xs font-bold flex items-center justify-between ${
                isLight ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              <span>
                {language === 'zh'
                  ? '车队硬件回本周期'
                  : language === 'sw'
                  ? 'Muda wa Kurudisha Mtaji'
                  : 'Full Fleet Payback Period'}
              </span>
              <span className="text-emerald-600 font-black text-[10px]">Ultra Fast ROI</span>
            </span>
            <div className={`text-2xl font-black font-mono my-1 ${isLight ? 'text-slate-950' : 'text-white'}`}>
              {language === 'zh' ? '70 天' : language === 'sw' ? 'Siku 70' : '70 Days'}
            </div>
            <div className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
              {language === 'zh'
                ? '仅需约 2.3 个月全额收回硬件成本'
                : 'Only 2.3 Months to recover $14M Capex'}
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800/80'
            }`}
          >
            <span
              className={`text-xs font-bold flex items-center justify-between ${
                isLight ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              <span>{language === 'zh' ? '月度净利润率' : language === 'sw' ? 'Faida Ghafi ya Mwezi' : 'Monthly Gross Margin'}</span>
              <span className="text-emerald-600 font-black text-[10px]">
                {language === 'zh' ? '41亿 TSh 净利润' : 'TSh 4.1B Net'}
              </span>
            </span>
            <div className="text-2xl font-black font-mono text-amber-600 my-1">
              68.4%
            </div>
            <div className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
              {language === 'zh'
                ? '月营收 60亿 TSh → 净现金流 41亿 TSh'
                : 'TSh 6.0B Gross → TSh 4.1B Net Cash/Mo'}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 12-HOUR DUAL-CYCLE REVENUE ENGINE: TZS 200,000,000 REALITY BREAKDOWN */}
      {/* ========================================================================= */}
      <div
        className={`border-2 rounded-3xl p-6 shadow-2xl space-y-6 ${
          isLight
            ? 'bg-white border-emerald-500 shadow-emerald-100 text-slate-900'
            : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-emerald-500/40 text-white'
        }`}
      >
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-black">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className={`text-lg font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {language === 'zh'
                  ? '12小时双周转营收引擎：TZS 200,000,000'
                  : language === 'sw'
                  ? 'Mfumo wa Mapato wa Masaa 12: TZS 200,000,000'
                  : '12-Hour Dual-Turnover Revenue Model: TZS 200,000,000'}
              </h2>
              <span
                className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-full border ${
                  isLight
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                }`}
              >
                TZS 200,000,000 / 12 HRS
              </span>
            </div>
            <p className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {language === 'zh'
                ? '全网 100,000 辆车每 12 小时租赁 2 次（每 6 小时 1,000 TZS）= 每日稳定毛收入 TZS 200,000,000。'
                : language === 'sw'
                ? 'Kila baiskeli inakodiwa mara 2 kwa masaa 12 (TSh 1,000 kila masaa 6) kwa baiskeli 100,000 = sawa na TZS 200,000,000 kila siku.'
                : 'Every bike is rented twice in 12 hours (1,000 TSh every 6 hours) across 100,000 bicycles = exactly TZS 200,000,000 daily gross inflow.'}
            </p>
          </div>

          <div
            className={`px-4 py-2.5 rounded-2xl border flex items-center gap-3 ${
              isLight ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-950 border-emerald-500/30'
            }`}
          >
            <Repeat className="w-5 h-5 text-emerald-600 animate-spin" style={{ animationDuration: '8s' }} />
            <div>
              <div className={`text-[10px] uppercase font-black ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                {language === 'zh' ? '12小时计算流水' : 'Calculated 12h Total'}
              </div>
              <div className="text-xl font-mono font-black text-emerald-600">
                TZS {sim12HrRevenue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* 2-Shift Visual Timeline (06:00-12:00 and 12:00-18:00) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shift 1: Morning Commute */}
          <div
            className={`border rounded-2xl p-5 space-y-3 transition-all relative overflow-hidden ${
              isLight
                ? 'bg-slate-50 border-slate-300 hover:border-emerald-500'
                : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/50'
            }`}
          >
            <div
              className={`absolute top-0 right-0 px-3 py-1 font-mono text-[10px] font-black rounded-bl-xl border-b border-l ${
                isLight
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}
            >
              SHIFT 1 • 06:00 - 12:00 (6 HRS)
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Clock className="w-4 h-4 text-emerald-600" />
              <h3 className={`text-sm font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {language === 'zh'
                  ? '早班通勤周期 (前 6 小时)'
                  : language === 'sw'
                  ? 'Mzunguko wa Asubuhi (Masaa 6 ya Kwanza)'
                  : 'Morning Shift (First 6 Hours)'}
              </h3>
            </div>
            <p className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {language === 'zh'
                ? 'Mwenge、Kariakoo、Posta CBD 和高校学生早高峰租赁，单车全负荷运转。'
                : 'Commuters and students in Mwenge, Kariakoo, Posta CBD, and UDSM unlocking the Half-Day pass.'}
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className={`p-2 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                <span className={`text-[10px] block font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {language === 'zh' ? '投入单车' : 'Bikes Rented'}
                </span>
                <span className={`text-xs font-mono font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>{simFleetSize.toLocaleString()}</span>
              </div>
              <div className={`p-2 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                <span className={`text-[10px] block font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {language === 'zh' ? '单次单价' : 'Rate / 6h'}
                </span>
                <span className="text-xs font-mono font-black text-amber-600">TSh {simRatePerRental.toLocaleString()}</span>
              </div>
              <div className={`p-2 rounded-xl border ${isLight ? 'bg-emerald-100 border-emerald-300' : 'bg-emerald-950/60 border-emerald-800/60'}`}>
                <span className={`text-[10px] block font-bold ${isLight ? 'text-emerald-900' : 'text-emerald-300'}`}>
                  {language === 'zh' ? '早班流入' : 'Shift Inflow'}
                </span>
                <span className="text-xs font-mono font-black text-emerald-700">TZS {simSingleCycleRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shift 2: Afternoon Commute */}
          <div
            className={`border rounded-2xl p-5 space-y-3 transition-all relative overflow-hidden ${
              isLight
                ? 'bg-slate-50 border-slate-300 hover:border-blue-500'
                : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/50'
            }`}
          >
            <div
              className={`absolute top-0 right-0 px-3 py-1 font-mono text-[10px] font-black rounded-bl-xl border-b border-l ${
                isLight
                  ? 'bg-blue-100 border-blue-300 text-blue-900'
                  : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
              }`}
            >
              SHIFT 2 • 12:00 - 18:00 (6 HRS)
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className={`text-sm font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {language === 'zh'
                  ? '午后与晚高峰周期 (后 6 小时)'
                  : language === 'sw'
                  ? 'Mzunguko wa Mchana (Masaa 6 ya Pili)'
                  : 'Afternoon Shift (Second 6 Hours)'}
              </h3>
            </div>
            <p className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {language === 'zh'
                ? '同一批单车下午二次解锁，满足货物配送、沿海游览和晚间返程通勤需求。'
                : 'Afternoon re-rentals for business returns, cargo runs, coastal leisure, and evening home commutes.'}
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className={`p-2 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                <span className={`text-[10px] block font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {language === 'zh' ? '二次周转' : 'Bikes Re-Rented'}
                </span>
                <span className={`text-xs font-mono font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>{simFleetSize.toLocaleString()}</span>
              </div>
              <div className={`p-2 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                <span className={`text-[10px] block font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {language === 'zh' ? '单次单价' : 'Rate / 6h'}
                </span>
                <span className="text-xs font-mono font-black text-amber-600">TSh {simRatePerRental.toLocaleString()}</span>
              </div>
              <div className={`p-2 rounded-xl border ${isLight ? 'bg-blue-100 border-blue-300' : 'bg-emerald-950/60 border-emerald-800/60'}`}>
                <span className={`text-[10px] block font-bold ${isLight ? 'text-blue-900' : 'text-emerald-300'}`}>
                  {language === 'zh' ? '午班流入' : 'Shift Inflow'}
                </span>
                <span className="text-xs font-mono font-black text-blue-700">TZS {simSingleCycleRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Formula Banner */}
        <div
          className={`border rounded-2xl p-4 flex flex-col lg:flex-row items-center justify-between gap-4 font-mono text-xs ${
            isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span
              className={`px-3 py-1.5 rounded-xl border font-black ${
                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
              }`}
            >
              {simFleetSize.toLocaleString()} {language === 'zh' ? '辆单车' : 'Bikes'}
            </span>
            <span className="text-emerald-600 font-black">×</span>
            <span
              className={`px-3 py-1.5 rounded-xl border font-black ${
                isLight ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-slate-900 border-slate-700 text-amber-300'
              }`}
            >
              {simTurnoverCycles} {language === 'zh' ? '次/12小时' : 'Rentals / 12hrs'}
            </span>
            <span className="text-emerald-600 font-black">×</span>
            <span
              className={`px-3 py-1.5 rounded-xl border font-black ${
                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
              }`}
            >
              TSh {simRatePerRental.toLocaleString()} {language === 'zh' ? '/ 6小时' : '/ 6hrs'}
            </span>
            <span className="text-emerald-600 font-black">=</span>
            <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-xl font-black text-sm shadow-lg shadow-emerald-600/30">
              TZS {sim12HrRevenue.toLocaleString()}
            </span>
          </div>

          <div className={`text-right text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
            <span>{language === 'zh' ? '30天月度营收预测：' : '30-Day Monthly Projection:'} </span>
            <strong className="text-emerald-600 font-black">TZS {simMonthlyRevenue.toLocaleString()}</strong>
          </div>
        </div>

        {/* Interactive Parameter Sliders & Scenarios */}
        <div
          className={`border rounded-2xl p-4 space-y-4 ${
            isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-950/60 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              {language === 'zh' ? '交互式 12 小时财务压力测试与参数模拟' : 'Interactive 12-Hour Financial Stress-Test & Simulation'}
            </span>
            <button
              onClick={() => {
                setSimFleetSize(100000);
                setSimTurnoverCycles(2);
                setSimRatePerRental(1000);
              }}
              className="text-[10px] text-emerald-700 hover:text-emerald-600 underline font-mono font-bold cursor-pointer"
            >
              {language === 'zh' ? '重置为 100k 单车 @ 2次/12h (TZS 200M)' : 'Reset to 100k Bikes @ 2x/12h (TZS 200M)'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Slider 1: Fleet Size */}
            <div className="space-y-1.5">
              <div className={`flex justify-between font-bold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                <span>{language === 'zh' ? '运营车队规模:' : 'Active Fleet Size:'}</span>
                <strong className={`font-mono font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>{simFleetSize.toLocaleString()}</strong>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="5000"
                value={simFleetSize}
                onChange={(e) => setSimFleetSize(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                <span>5k</span>
                <span>50k</span>
                <span className="text-emerald-700 font-black">100k Target</span>
                <span>150k</span>
              </div>
            </div>

            {/* Slider 2: Turnover Cycles in 12 Hours */}
            <div className="space-y-1.5">
              <div className={`flex justify-between font-bold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                <span>{language === 'zh' ? '12小时周转频次:' : 'Turnovers in 12h:'}</span>
                <strong className="text-amber-700 font-mono font-black">{simTurnoverCycles}x ({12 / simTurnoverCycles}h/ride)</strong>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={simTurnoverCycles}
                onChange={(e) => setSimTurnoverCycles(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                <span>1x (12h)</span>
                <span className="text-amber-700 font-black">2x (6h)</span>
                <span>3x (4h)</span>
                <span>4x (3h)</span>
              </div>
            </div>

            {/* Slider 3: Price per Rental */}
            <div className="space-y-1.5">
              <div className={`flex justify-between font-bold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                <span>{language === 'zh' ? '单次计费 (TSh):' : 'Rental Fee (TSh):'}</span>
                <strong className="text-emerald-700 font-mono font-black">TSh {simRatePerRental.toLocaleString()}</strong>
              </div>
              <input
                type="range"
                min="500"
                max="4000"
                step="500"
                value={simRatePerRental}
                onChange={(e) => setSimRatePerRental(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                <span>500 (3h)</span>
                <span className="text-emerald-700 font-black">1,000 (6h)</span>
                <span>2,000 (12h)</span>
                <span>4,000 (24h)</span>
              </div>
            </div>
          </div>

          {/* Real-time Projected Outflow & Payback Summary Bar */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs border-t ${isLight ? 'border-slate-300' : 'border-slate-800'}`}>
            <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <span className={`text-[10px] block font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {language === 'zh' ? '12小时总流水' : 'Daily 12h Inflow'}
              </span>
              <span className="text-sm font-mono font-black text-emerald-600">TZS {(sim12HrRevenue / 1000000).toFixed(1)}M</span>
            </div>
            <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <span className={`text-[10px] block font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {language === 'zh' ? '月度规模 (30天)' : 'Monthly Run-Rate'}
              </span>
              <span className={`text-sm font-mono font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>TZS {(simMonthlyRevenue / 1000000000).toFixed(2)}B</span>
            </div>
            <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <span className={`text-[10px] block font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {language === 'zh' ? '年度总产值' : 'Annual Run-Rate'}
              </span>
              <span className="text-sm font-mono font-black text-emerald-600">TZS {(simAnnualRevenue / 1000000000).toFixed(1)}B</span>
            </div>
            <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <span className={`text-[10px] block font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {language === 'zh' ? '全额回本时间' : 'CapEx Payback Time'}
              </span>
              <span className="text-sm font-mono font-black text-amber-600">{simPaybackDays} {language === 'zh' ? '天' : 'Days'}</span>
            </div>
          </div>
        </div>

        {/* Mobile Money Settlement Channels for TZS 200,000,000 */}
        <div className={`pt-2 border-t ${isLight ? 'border-slate-300' : 'border-slate-800'}`}>
          <div className="text-xs font-black mb-3 flex items-center justify-between">
            <span className={`flex items-center gap-1.5 ${isLight ? 'text-slate-950' : 'text-slate-300'}`}>
              <CreditCard className="w-4 h-4 text-emerald-600" />
              {language === 'zh'
                ? '每日 TZS 200,000,000 移动运营商自动清结算通道'
                : 'Daily TZS 200,000,000 Mobile Money Settlement Channels'}
            </span>
            <span className={`text-[11px] font-mono font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Direct Carrier API Settlements
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className={`p-3 rounded-xl border space-y-1 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="flex justify-between items-center">
                <span className="font-black text-red-600">Vodacom M-Pesa</span>
                <span className="text-[10px] font-mono bg-red-100 text-red-800 font-black px-1.5 py-0.5 rounded">68%</span>
              </div>
              <div className={`text-base font-mono font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                TZS {((sim12HrRevenue * 0.68) / 1000000).toFixed(1)}M
              </div>
              <div className="text-[10px] text-slate-500 font-mono font-bold">
                {Math.round(simTotalRides12Hr * 0.68).toLocaleString()} {language === 'zh' ? '笔交易' : 'txns'}
              </div>
            </div>

            <div className={`p-3 rounded-xl border space-y-1 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="flex justify-between items-center">
                <span className="font-black text-red-700">Airtel Money</span>
                <span className="text-[10px] font-mono bg-red-100 text-red-800 font-black px-1.5 py-0.5 rounded">18%</span>
              </div>
              <div className={`text-base font-mono font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                TZS {((sim12HrRevenue * 0.18) / 1000000).toFixed(1)}M
              </div>
              <div className="text-[10px] text-slate-500 font-mono font-bold">
                {Math.round(simTotalRides12Hr * 0.18).toLocaleString()} {language === 'zh' ? '笔交易' : 'txns'}
              </div>
            </div>

            <div className={`p-3 rounded-xl border space-y-1 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="flex justify-between items-center">
                <span className="font-black text-blue-600">Tigo Pesa (Mixx)</span>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-800 font-black px-1.5 py-0.5 rounded">11%</span>
              </div>
              <div className={`text-base font-mono font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                TZS {((sim12HrRevenue * 0.11) / 1000000).toFixed(1)}M
              </div>
              <div className="text-[10px] text-slate-500 font-mono font-bold">
                {Math.round(simTotalRides12Hr * 0.11).toLocaleString()} {language === 'zh' ? '笔交易' : 'txns'}
              </div>
            </div>

            <div className={`p-3 rounded-xl border space-y-1 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="flex justify-between items-center">
                <span className="font-black text-amber-600">HaloPesa</span>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-800 font-black px-1.5 py-0.5 rounded">3%</span>
              </div>
              <div className={`text-base font-mono font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                TZS {((sim12HrRevenue * 0.03) / 1000000).toFixed(1)}M
              </div>
              <div className="text-[10px] text-slate-500 font-mono font-bold">
                {Math.round(simTotalRides12Hr * 0.03).toLocaleString()} {language === 'zh' ? '笔交易' : 'txns'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top vs Underutilized Zones & Scaling Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Performing Zones */}
        <div
          className={`lg:col-span-6 border rounded-3xl p-5 space-y-4 shadow-xl ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
          }`}
        >
          <h3 className={`text-sm font-black flex items-center justify-between ${isLight ? 'text-slate-950' : 'text-white'}`}>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>
                {language === 'zh'
                  ? '达累斯萨拉姆核心营收区域排行'
                  : language === 'sw'
                  ? 'Kanda Zinazoongoza kwa Mapato'
                  : 'Top Revenue Zones in Dar es Salaam'}
              </span>
            </span>
            <span className="text-xs text-emerald-600 font-mono font-bold">
              {language === 'zh' ? '12小时产值' : 'Daily 12h TSh'}
            </span>
          </h3>

          <div className="space-y-3">
            {[
              {
                zone: language === 'zh' ? 'Kariakoo 商业贸易大市场' : 'Kariakoo Commercial Market',
                rides: '42,000 rides/12h',
                revenue: 'TZS 42,000,000',
                util: '100%',
                demand: 'EXTREME',
              },
              {
                zone: language === 'zh' ? 'Posta CBD 与 Kivukoni 渡轮枢纽' : 'Posta CBD & Ferry Kivukoni',
                rides: '38,000 rides/12h',
                revenue: 'TZS 38,000,000',
                util: '98%',
                demand: 'HIGH',
              },
              {
                zone: language === 'zh' ? 'Mwenge / Sinza 交通换乘枢纽' : 'Mwenge / Sinza Hub',
                rides: '32,000 rides/12h',
                revenue: 'TZS 32,000,000',
                util: '95%',
                demand: 'HIGH',
              },
              {
                zone: language === 'zh' ? 'UDSM 大学城 / Mlimani City 商圈' : 'UDSM Campus / Mlimani City',
                rides: '28,000 rides/12h',
                revenue: 'TZS 28,000,000',
                util: '92%',
                demand: 'HIGH',
              },
              {
                zone: language === 'zh' ? 'Masaki 半岛与 Coco Beach 沿海' : 'Masaki Peninsula & Coco Beach',
                rides: '25,000 rides/12h',
                revenue: 'TZS 25,000,000',
                util: '90%',
                demand: 'HIGH',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div>
                  <div className={`font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>{item.zone}</div>
                  <div className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {item.rides} • {item.util}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-black text-emerald-600">{item.revenue}</div>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      isLight ? 'bg-emerald-100 text-emerald-900' : 'bg-emerald-950 text-emerald-300'
                    }`}
                  >
                    {item.demand}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 100,000 Bicycle Phased Scaling Plan */}
        <div
          className={`lg:col-span-6 border rounded-3xl p-5 space-y-4 shadow-xl ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
          }`}
        >
          <h3 className={`text-sm font-black flex items-center justify-between ${isLight ? 'text-slate-950' : 'text-white'}`}>
            <span className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-blue-600" />
              <span>
                {language === 'zh'
                  ? '100,000+ 智能单车全阶段扩张路线图'
                  : '100,000+ Bicycle Phased Scaling Roadmap'}
              </span>
            </span>
            <span className={`text-xs font-mono font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Phases 1 - 7
            </span>
          </h3>

          <div className="space-y-2.5 max-h-[440px] overflow-y-auto">
            {phaseData.map((p) => (
              <div
                key={p.phase}
                onClick={() => setTargetPhase(p.phase)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  targetPhase === p.phase
                    ? isLight
                      ? 'bg-emerald-50 border-emerald-500 shadow-md'
                      : 'bg-emerald-950/40 border-emerald-500 shadow-md'
                    : isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-slate-400'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-black text-sm ${isLight ? 'text-slate-950' : 'text-white'}`}>{p.label}</span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full font-mono ${
                      p.status === 'ACTIVE'
                        ? 'bg-emerald-500 text-slate-950 animate-pulse'
                        : p.status === 'COMPLETED'
                        ? isLight
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-blue-950 text-blue-300'
                        : isLight
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className={`flex justify-between text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  <span>
                    {language === 'zh' ? '目标规模:' : 'Target:'}{' '}
                    <strong className="text-emerald-600 font-mono font-black">
                      {p.count.toLocaleString()} {language === 'zh' ? '辆智能单车' : 'Bikes'}
                    </strong>
                  </span>
                  <span>{p.cities}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
