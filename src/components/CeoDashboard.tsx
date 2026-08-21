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
  const { metrics, fleet, zones, language } = useDarRide();
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
      label: language === 'en' ? 'Phase 1: Pilot Core' : 'Awamu ya 1: Majaribio ya Awali',
      cities: language === 'en' ? 'Dar es Salaam (Mwenge, Masaki, Kariakoo)' : 'Dar es Salaam (Mwenge, Masaki, Kariakoo)',
      status: 'COMPLETED',
    },
    {
      phase: 2,
      count: 500,
      label: language === 'en' ? 'Phase 2: Coast Expansion' : 'Awamu ya 2: Upanuzi wa Ukanda wa Pwani',
      cities: language === 'en' ? 'Dar es Salaam (13 Zones)' : 'Dar es Salaam (Kanda 13)',
      status: 'COMPLETED',
    },
    {
      phase: 3,
      count: 1000,
      label: language === 'en' ? 'Phase 3: Active Live Network' : 'Awamu ya 3: Mtandao Hai Uliopo',
      cities: language === 'en' ? 'Dar es Salaam Metropolis' : 'Jiji Kuu la Dar es Salaam',
      status: 'COMPLETED',
    },
    {
      phase: 4,
      count: 5000,
      label: language === 'en' ? 'Phase 4: Metro Saturation' : 'Awamu ya 4: Uenezaji Jiji Lote',
      cities: language === 'en' ? 'Dar es Salaam + Zanzibar' : 'Dar es Salaam + Visiwani Zanzibar',
      status: 'COMPLETED',
    },
    {
      phase: 5,
      count: 10000,
      label: language === 'en' ? 'Phase 5: National Grid' : 'Awamu ya 5: Mtandao wa Kitaifa',
      cities: language === 'en' ? 'Dar, Arusha, Mwanza, Dodoma' : 'Dar, Arusha, Mwanza, Dodoma',
      status: 'ACTIVE',
    },
    {
      phase: 6,
      count: 50000,
      label: language === 'en' ? 'Phase 6: East Africa Hubs' : 'Awamu ya 6: Vituo vya Afrika Mashariki',
      cities: language === 'en' ? 'Tanzania + Nairobi + Kigali' : 'Tanzania + Nairobi + Kigali',
      status: 'PLANNED',
    },
    {
      phase: 7,
      count: 100000,
      label: language === 'en' ? 'Phase 7: Pan-African Mobility (100,000 Smart Bikes)' : 'Awamu ya 7: Mtandao Mkuu wa Baiskeli 100,000',
      cities: language === 'en' ? '10+ African Metropolitan Cities' : 'Miji Mikuu 10+ ya Afrika',
      status: 'ACTIVE',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 30-Second Executive Summary Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                {language === 'en' ? 'EXECUTIVE INTELLIGENCE • 30-SEC BRIEFING' : 'RIPOTI YA KIKUU YA KIUTENDAJI • MUHTASARI'}
              </span>
              <span className="text-xs font-mono bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                100,000 FLEET MODEL
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1">
              {language === 'en' ? 'DAR RIDE Mobility Cloud Performance' : 'Utendaji na Mapato ya DAR RIDE'}
            </h1>
            <p className="text-xs text-slate-400">
              {language === 'en'
                ? 'Unit economics, 12-hour dual-turnover cycle, revenue streams, and 100,000 bicycle scaling trajectory.'
                : 'Uchumi wa kitengo, mzunguko wa mapato wa masaa 12 (kila masaa 6), na mpango wa baiskeli 100,000.'}
            </p>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
            {(['today', 'week', 'month', 'year'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTimeframe(t)}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                  selectedTimeframe === t ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t === 'today'
                  ? (language === 'en' ? '12h Today' : 'Masaa 12 Leo')
                  : t === 'week'
                  ? (language === 'en' ? '7 Days' : 'Siku 7')
                  : t === 'month'
                  ? (language === 'en' ? '30 Days' : 'Siku 30')
                  : (language === 'en' ? '365 Days' : 'Mwaka 1')}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Core Executive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
            <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
              <span>{language === 'en' ? '100,000 Fleet Revenue' : 'Jumla ya Mapato (100k Baiskeli)'}</span>
              <span className="text-emerald-400 font-bold flex items-center text-[10px]">
                <ArrowUpRight className="w-3 h-3" /> +100% Active
              </span>
            </span>
            <div className="text-2xl font-black font-mono text-emerald-400 my-1">
              TSh {selectedTimeframe === 'today'
                ? '200,000,000'
                : selectedTimeframe === 'week'
                ? '1,400,000,000'
                : selectedTimeframe === 'month'
                ? '6,000,000,000'
                : '73,000,000,000'}
            </div>
            <div className="text-[11px] text-slate-500">
              {selectedTimeframe === 'today'
                ? (language === 'en' ? '2x in 12h @ TSh 1,000 = TSh 200M' : 'Safari 2 kwa masaa 12 @ TSh 1,000 = TSh 200M')
                : selectedTimeframe === 'week'
                ? '7 Days × TSh 200M = TSh 1.4B'
                : selectedTimeframe === 'month'
                ? '30 Days × TSh 200M = TSh 6.0B'
                : '365 Days × TSh 200M = TSh 73.0B'}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
            <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
              <span>{language === 'en' ? 'Completed Rides (12 Hours)' : 'Safari Zilizofanyika (Masaa 12)'}</span>
              <span className="text-blue-400 font-bold text-[10px]">
                {language === 'en' ? '2x Turnover' : 'Mizunguko 2'}
              </span>
            </span>
            <div className="text-2xl font-black font-mono text-blue-400 my-1">
              {selectedTimeframe === 'today'
                ? '200,000'
                : selectedTimeframe === 'week'
                ? '1,400,000'
                : selectedTimeframe === 'month'
                ? '6,000,000'
                : '73,000,000'}
            </div>
            <div className="text-[11px] text-slate-500">
              {language === 'en'
                ? '100,000 bikes × 2 rentals in 12 hrs'
                : 'Baiskeli 100,000 zikikodiwa mara 2 kwa masaa 12'}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
            <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
              <span>{language === 'en' ? 'Full Fleet Payback Period' : 'Muda wa Kurudisha Mtaji Wote'}</span>
              <span className="text-emerald-400 font-bold text-[10px]">Ultra Fast ROI</span>
            </span>
            <div className="text-2xl font-black font-mono text-white my-1">
              {language === 'en' ? '70 Days' : 'Siku 70'}
            </div>
            <div className="text-[11px] text-slate-500">
              {language === 'en'
                ? 'Only 2.3 Months to recover $14M Capex'
                : 'Miezi 2.3 pekee kurudisha gharama ya baiskeli zote'}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
            <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
              <span>{language === 'en' ? 'Monthly Gross Margin' : 'Faida Ghafi ya Mwezi'}</span>
              <span className="text-emerald-400 font-bold text-[10px]">
                {language === 'en' ? 'TSh 4.1B Net' : 'TSh Bilioni 4.1 Faida'}
              </span>
            </span>
            <div className="text-2xl font-black font-mono text-amber-400 my-1">
              68.4%
            </div>
            <div className="text-[11px] text-slate-500">
              {language === 'en'
                ? 'TSh 6.0B Gross → TSh 4.1B Net Cash/Mo'
                : 'TSh Bilioni 6.0 Mapato → TSh Bilioni 4.1 Faida'}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 12-HOUR DUAL-CYCLE REVENUE ENGINE: TZS 200,000,000 REALITY BREAKDOWN */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black text-white">
                {language === 'en'
                  ? '12-Hour Dual-Turnover Revenue Model: TZS 200,000,000'
                  : 'Mfumo wa Mapato wa Masaa 12: TZS 200,000,000'}
              </h2>
              <span className="text-xs font-mono bg-emerald-950 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-700">
                TZS 200,000,000 / 12 HRS
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {language === 'en'
                ? 'Every bike is rented twice in 12 hours (1,000 TSh every 6 hours) across 100,000 bicycles = exactly TZS 200,000,000 daily gross inflow.'
                : 'Kila baiskeli inakodiwa mara 2 kwa masaa 12 (TSh 1,000 kila masaa 6) kwa baiskeli 100,000 = sawa na TZS 200,000,000 kila siku.'}
            </p>
          </div>

          <div className="bg-slate-950 px-4 py-2.5 rounded-2xl border border-emerald-500/30 flex items-center gap-3">
            <Repeat className="w-5 h-5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {language === 'en' ? 'Calculated 12h Total' : 'Jumla ya Masaa 12'}
              </div>
              <div className="text-xl font-mono font-black text-emerald-400">
                TZS {sim12HrRevenue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* 2-Shift Visual Timeline (06:00-12:00 and 12:00-18:00) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shift 1: Morning Commute */}
          <div className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 space-y-3 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500/10 border-b border-l border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold rounded-bl-xl">
              SHIFT 1 • 06:00 - 12:00 (6 HRS)
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">
                {language === 'en' ? 'Morning Shift (First 6 Hours)' : 'Mzunguko wa Asubuhi (Masaa 6 ya Kwanza)'}
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'en'
                ? 'Commuters and students in Mwenge, Kariakoo, Posta CBD, and UDSM unlocking the Half-Day pass.'
                : 'Wasafiri wa asubuhi, wanafunzi na wafanyabiashara Mwenge, Kariakoo na Posta wakikodi kifurushi cha masaa 6.'}
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">{language === 'en' ? 'Bikes Rented' : 'Baiskeli'}</span>
                <span className="text-xs font-mono font-bold text-white">{simFleetSize.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">{language === 'en' ? 'Rate / 6h' : 'Kiwango'}</span>
                <span className="text-xs font-mono font-bold text-amber-400">TSh {simRatePerRental.toLocaleString()}</span>
              </div>
              <div className="bg-emerald-950/60 p-2 rounded-xl border border-emerald-800/60">
                <span className="text-[10px] text-emerald-300 block">{language === 'en' ? 'Shift Inflow' : 'Mapato'}</span>
                <span className="text-xs font-mono font-bold text-emerald-400">TZS {simSingleCycleRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shift 2: Afternoon Commute */}
          <div className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 space-y-3 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500/10 border-b border-l border-blue-500/20 text-blue-400 font-mono text-[10px] font-bold rounded-bl-xl">
              SHIFT 2 • 12:00 - 18:00 (6 HRS)
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Clock className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white">
                {language === 'en' ? 'Afternoon Shift (Second 6 Hours)' : 'Mzunguko wa Mchana (Masaa 6 ya Pili)'}
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'en'
                ? 'Afternoon re-rentals for business returns, cargo runs, coastal leisure, and evening home commutes.'
                : 'Kukodisha tena baiskeli zile zile kwa safari za mchana, mizigo, biashara, na kurudi nyumbani jioni.'}
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">{language === 'en' ? 'Bikes Re-Rented' : 'Baiskeli'}</span>
                <span className="text-xs font-mono font-bold text-white">{simFleetSize.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">{language === 'en' ? 'Rate / 6h' : 'Kiwango'}</span>
                <span className="text-xs font-mono font-bold text-amber-400">TSh {simRatePerRental.toLocaleString()}</span>
              </div>
              <div className="bg-emerald-950/60 p-2 rounded-xl border border-emerald-800/60">
                <span className="text-[10px] text-emerald-300 block">{language === 'en' ? 'Shift Inflow' : 'Mapato'}</span>
                <span className="text-xs font-mono font-bold text-emerald-400">TZS {simSingleCycleRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Formula Banner */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-center gap-2 text-slate-300">
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-white font-bold">
              {simFleetSize.toLocaleString()} {language === 'en' ? 'Bikes' : 'Baiskeli'}
            </span>
            <span className="text-emerald-400 font-bold">×</span>
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-amber-300 font-bold">
              {simTurnoverCycles} {language === 'en' ? 'Rentals / 12hrs' : 'Mizunguko / Masaa 12'}
            </span>
            <span className="text-emerald-400 font-bold">×</span>
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-white font-bold">
              TSh {simRatePerRental.toLocaleString()} {language === 'en' ? '/ 6hrs' : '/ Masaa 6'}
            </span>
            <span className="text-emerald-400 font-bold">=</span>
            <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-xl font-black text-sm shadow-lg shadow-emerald-600/30">
              TZS {sim12HrRevenue.toLocaleString()}
            </span>
          </div>

          <div className="text-right text-[11px] text-slate-400">
            <span>{language === 'en' ? '30-Day Monthly Projection:' : 'Makadirio ya Mwezi (Siku 30):'} </span>
            <strong className="text-emerald-400 font-bold">TZS {simMonthlyRevenue.toLocaleString()}</strong>
          </div>
        </div>

        {/* Interactive Parameter Sliders & Scenarios */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'en' ? 'Interactive 12-Hour Financial Stress-Test & Simulation' : 'Kielelezo cha Kujaribu Vigezo vya Mapato'}
            </span>
            <button
              onClick={() => {
                setSimFleetSize(100000);
                setSimTurnoverCycles(2);
                setSimRatePerRental(1000);
              }}
              className="text-[10px] text-emerald-400 hover:text-emerald-300 underline font-mono cursor-pointer"
            >
              {language === 'en' ? 'Reset to 100k Bikes @ 2x/12h (TZS 200M)' : 'Rejesha Baiskeli 100k @ 2x/12h (TZS 200M)'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Slider 1: Fleet Size */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>{language === 'en' ? 'Active Fleet Size:' : 'Ukubwa wa Baiskeli:'}</span>
                <strong className="text-white font-mono">{simFleetSize.toLocaleString()}</strong>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="5000"
                value={simFleetSize}
                onChange={(e) => setSimFleetSize(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5,000</span>
                <span>50,000</span>
                <span>100,000 (Target)</span>
                <span>150,000</span>
              </div>
            </div>

            {/* Slider 2: Turnover Cycles in 12 Hours */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>{language === 'en' ? 'Turnovers in 12h:' : 'Mizunguko kwa masaa 12:'}</span>
                <strong className="text-amber-400 font-mono">{simTurnoverCycles}x ({12 / simTurnoverCycles}h per ride)</strong>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={simTurnoverCycles}
                onChange={(e) => setSimTurnoverCycles(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1x (12h)</span>
                <span>2x (Every 6h)</span>
                <span>3x (Every 4h)</span>
                <span>4x (Every 3h)</span>
              </div>
            </div>

            {/* Slider 3: Price per Rental */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>{language === 'en' ? 'Rental Fee (TSh):' : 'Gharama ya Kukodi:'}</span>
                <strong className="text-emerald-400 font-mono">TSh {simRatePerRental.toLocaleString()}</strong>
              </div>
              <input
                type="range"
                min="500"
                max="4000"
                step="500"
                value={simRatePerRental}
                onChange={(e) => setSimRatePerRental(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>TSh 500 (3h)</span>
                <span>TSh 1,000 (6h)</span>
                <span>TSh 2,000 (12h)</span>
                <span>TSh 4,000 (24h)</span>
              </div>
            </div>
          </div>

          {/* Real-time Projected Outflow & Payback Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs border-t border-slate-800">
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{language === 'en' ? 'Daily 12h Inflow' : 'Mapato ya Masaa 12'}</span>
              <span className="text-sm font-mono font-black text-emerald-400">TZS {(sim12HrRevenue / 1000000).toFixed(1)}M</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{language === 'en' ? 'Monthly Run-Rate' : 'Mapato ya Mwezi (30d)'}</span>
              <span className="text-sm font-mono font-black text-white">TZS {(simMonthlyRevenue / 1000000000).toFixed(2)}B</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{language === 'en' ? 'Annual Run-Rate' : 'Mapato ya Mwaka (365d)'}</span>
              <span className="text-sm font-mono font-black text-emerald-400">TZS {(simAnnualRevenue / 1000000000).toFixed(1)}B</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{language === 'en' ? 'CapEx Payback Time' : 'Muda wa Kurudisha Mtaji'}</span>
              <span className="text-sm font-mono font-black text-amber-400">{simPaybackDays} {language === 'en' ? 'Days' : 'Siku'}</span>
            </div>
          </div>
        </div>

        {/* Mobile Money Settlement Channels for TZS 200,000,000 */}
        <div className="pt-2 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              {language === 'en' ? 'Daily TZS 200,000,000 Mobile Money Settlement Channels' : 'Mgawanyo wa Malipo ya TZS 200,000,000 kwa Mitandao ya Simu'}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {language === 'en' ? 'Direct Carrier API Settlements' : 'Malipo ya Moja kwa Moja ya Mitandao'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-red-400">Vodacom M-Pesa</span>
                <span className="text-[10px] font-mono bg-red-950 text-red-300 px-1.5 py-0.5 rounded">68%</span>
              </div>
              <div className="text-base font-mono font-black text-white">
                TZS {((sim12HrRevenue * 0.68) / 1000000).toFixed(1)}M
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {Math.round(simTotalRides12Hr * 0.68).toLocaleString()} {language === 'en' ? 'txns' : 'miamala'}
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-red-500">Airtel Money</span>
                <span className="text-[10px] font-mono bg-red-950 text-red-300 px-1.5 py-0.5 rounded">18%</span>
              </div>
              <div className="text-base font-mono font-black text-white">
                TZS {((sim12HrRevenue * 0.18) / 1000000).toFixed(1)}M
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {Math.round(simTotalRides12Hr * 0.18).toLocaleString()} {language === 'en' ? 'txns' : 'miamala'}
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-400">Tigo Pesa (Mixx)</span>
                <span className="text-[10px] font-mono bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded">11%</span>
              </div>
              <div className="text-base font-mono font-black text-white">
                TZS {((sim12HrRevenue * 0.11) / 1000000).toFixed(1)}M
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {Math.round(simTotalRides12Hr * 0.11).toLocaleString()} {language === 'en' ? 'txns' : 'miamala'}
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-400">HaloPesa</span>
                <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded">3%</span>
              </div>
              <div className="text-base font-mono font-black text-white">
                TZS {((sim12HrRevenue * 0.03) / 1000000).toFixed(1)}M
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {Math.round(simTotalRides12Hr * 0.03).toLocaleString()} {language === 'en' ? 'txns' : 'miamala'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top vs Underutilized Zones & Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Performing Zones */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'en' ? 'Top Revenue Zones in Dar es Salaam' : 'Kanda Zinazoongoza kwa Mapato Dar es Salaam'}
              </span>
            </span>
            <span className="text-xs text-emerald-400 font-mono">
              {language === 'en' ? 'Daily 12h TSh' : 'TSh / Masaa 12'}
            </span>
          </h3>

          <div className="space-y-3">
            {[
              { zone: language === 'en' ? 'Kariakoo Commercial Market' : 'Soko Kuu la Kariakoo', rides: '42,000 rides/12h', revenue: 'TZS 42,000,000', util: '100%', demand: language === 'en' ? 'EXTREME' : 'KUBWA SANA' },
              { zone: language === 'en' ? 'Posta CBD & Ferry Kivukoni' : 'Posta na Kivukoni Ferry', rides: '38,000 rides/12h', revenue: 'TZS 38,000,000', util: '98%', demand: language === 'en' ? 'HIGH' : 'KUBWA' },
              { zone: language === 'en' ? 'Mwenge / Sinza Hub' : 'Mwenge na Sinza Hub', rides: '32,000 rides/12h', revenue: 'TZS 32,000,000', util: '95%', demand: language === 'en' ? 'HIGH' : 'KUBWA' },
              { zone: language === 'en' ? 'UDSM Campus / Mlimani City' : 'Chuo Kikuu UDSM na Mlimani City', rides: '28,000 rides/12h', revenue: 'TZS 28,000,000', util: '92%', demand: language === 'en' ? 'HIGH' : 'KUBWA' },
              { zone: language === 'en' ? 'Masaki Peninsula & Coco Beach' : 'Rasi ya Masaki na Coco Beach', rides: '25,000 rides/12h', revenue: 'TZS 25,000,000', util: '90%', demand: language === 'en' ? 'HIGH' : 'KUBWA' },
              { zone: language === 'en' ? 'Ubungo, Temeke & Kigamboni Ferry' : 'Ubungo, Temeke na Kigamboni', rides: '35,000 rides/12h', revenue: 'TZS 35,000,000', util: '94%', demand: language === 'en' ? 'HIGH' : 'KUBWA' },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{item.zone}</div>
                  <div className="text-[11px] text-slate-400">
                    {item.rides} • {language === 'en' ? 'Turnover Rate' : 'Kiwango'} {item.util}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-400">{item.revenue}</div>
                  <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                    {item.demand}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 100,000 Bicycle Phased Scaling Plan */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-blue-400" />
              <span>
                {language === 'en' ? '100,000+ Bicycle Phased Scaling Roadmap' : 'Mpango Mkakati wa Kupanua Baiskeli 100,000+'}
              </span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {language === 'en' ? 'Phases 1 - 7' : 'Awamu 1 - 7'}
            </span>
          </h3>

          <div className="space-y-2.5 max-h-[440px] overflow-y-auto">
            {phaseData.map((p) => (
              <div
                key={p.phase}
                onClick={() => setTargetPhase(p.phase)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  targetPhase === p.phase
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm text-white">{p.label}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                      p.status === 'ACTIVE'
                        ? 'bg-emerald-500 text-black animate-pulse'
                        : p.status === 'COMPLETED'
                        ? 'bg-blue-950 text-blue-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {p.status === 'ACTIVE' ? (language === 'en' ? 'ACTIVE' : 'INAFANYA KAZI') : p.status === 'COMPLETED' ? (language === 'en' ? 'COMPLETED' : 'IMEKAMILIKA') : (language === 'en' ? 'PLANNED' : 'INAPANGWA')}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-slate-400">
                  <span>
                    {language === 'en' ? 'Target:' : 'Lengo:'} <strong className="text-emerald-400 font-mono">{p.count.toLocaleString()} {language === 'en' ? 'Connected Bikes' : 'Baiskeli Zilizounganishwa'}</strong>
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


