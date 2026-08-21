import React, { useState } from 'react';
import { useDarRide } from '../services/store';
import {
  Sparkles,
  Truck,
  TrendingUp,
  Clock,
  Sun,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Zap,
} from 'lucide-react';

export const AiDemandPredictor: React.FC = () => {
  const { rebalanceRecs, zones, fleet, language } = useDarRide();
  const [dispatchedTasks, setDispatchedTasks] = useState<string[]>([]);

  const handleDispatch = (recId: string) => {
    setDispatchedTasks((prev) => [...prev, recId]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* AI Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
                {language === 'en'
                  ? 'AI Demand Prediction & Autonomous Fleet Rebalancing'
                  : 'Utabiri wa Akili Bandia (AI) & Usawazishaji wa Baiskeli'}
                <span className="text-xs bg-purple-950 text-purple-300 font-mono px-2 py-0.5 rounded-full border border-purple-800">
                  ML ENGINE V3
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Predictive neural forecasting correlated with Dar es Salaam commuter flows, Kariakoo market hours, weather, and university schedules.'
                  : 'Utabiri wa mitandao ya neva kulingana na misururu ya wasafiri Dar es Salaam, masaa ya soko la Kariakoo, hali ya hewa na vyuo vikuu.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <Sun className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">
              {language === 'en' ? 'Dar es Salaam: 31°C Sunny • Ideal Cycling Conditions' : 'Dar es Salaam: 31°C Jua • Hali Nzuri ya Kuendesha'}
            </span>
          </div>
        </div>

        {/* Real-time Demand Hotspots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-rose-900/40">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-white">
                {language === 'en' ? 'Kariakoo Market Hub' : 'Kituo cha Soko la Kariakoo'}
              </span>
              <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full font-mono font-bold">
                {language === 'en' ? 'EXTREMELY HIGH' : 'JUU SANA'}
              </span>
            </div>
            <div className="text-2xl font-black font-mono text-rose-400">
              5 {language === 'en' ? 'Available' : 'Zilizopo'}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {language === 'en'
                ? 'Surge demand from traders & shoppers. Recommend: Deploy +150 bikes immediately.'
                : 'Uhitaji mkubwa kutoka kwa wafanyabiashara na wanunuzi. Pendekezo: Peleka baiskeli +150 mara moja.'}
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-amber-900/40">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-white">
                {language === 'en' ? 'Masaki & Coco Beach' : 'Masaki na Coco Beach'}
              </span>
              <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full font-mono font-bold">
                {language === 'en' ? 'VERY HIGH' : 'UHI TAJI MKUBWA'}
              </span>
            </div>
            <div className="text-2xl font-black font-mono text-amber-400">
              12 {language === 'en' ? 'Available' : 'Zilizopo'}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {language === 'en'
                ? 'Sunset leisure & evening dining rush. Recommend: Deploy +80 bikes.'
                : 'Muda wa mapumziko ya machweo na matembezi. Pendekezo: Peleka baiskeli +80.'}
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-blue-900/40">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-white">
                {language === 'en' ? 'Posta / CBD Kivukoni' : 'Posta na Kivukoni CBD'}
              </span>
              <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full font-mono font-bold">
                {language === 'en' ? 'SURPLUS ZONE' : 'ZINAZIDIA'}
              </span>
            </div>
            <div className="text-2xl font-black font-mono text-blue-400">
              142 {language === 'en' ? 'Available' : 'Zilizopo'}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {language === 'en'
                ? 'Morning commuter destination. Ready for redistribution dispatch van loading.'
                : 'Wafanyakazi wamemaliza safari za asubuhi. Tayari kubebwa na gari la uhamishaji.'}
            </p>
          </div>
        </div>
      </div>

      {/* Automated Redistribution Action Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Truck className="w-5 h-5 text-emerald-400" />
          <span>
            {language === 'en' ? 'Active AI Rebalancing Dispatch Orders' : 'Maagizo ya Usafirishaji na Usawazishaji wa AI'}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rebalanceRecs.map((rec) => {
            const isDispatched = dispatchedTasks.includes(rec.id);
            return (
              <div
                key={rec.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-purple-400 font-bold">{rec.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                        rec.priority === 'EXTREME'
                          ? 'bg-rose-950 text-rose-300'
                          : 'bg-amber-950 text-amber-300'
                      }`}
                    >
                      {rec.priority} {language === 'en' ? 'SURGE' : 'UHI TAJI'}
                    </span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="text-slate-500">{language === 'en' ? 'From:' : 'Kutoka:'}</span>
                      <strong className="text-white">{rec.sourceZone}</strong>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="text-slate-500">{language === 'en' ? 'To:' : 'Kwenda:'}</span>
                      <strong className="text-emerald-400">{rec.targetZone}</strong>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 pt-1 border-t border-slate-800">
                      <span className="text-slate-500">{language === 'en' ? 'Transfer Count:' : 'Idadi ya Kuhamisha:'}</span>
                      <strong className="text-amber-400 font-mono text-sm">
                        +{rec.bikesToMove} {language === 'en' ? 'Bicycles' : 'Baiskeli'}
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{rec.reason}</p>
                </div>

                <div>
                  {isDispatched ? (
                    <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center justify-center gap-2 font-bold">
                      <CheckCircle className="w-4 h-4" />
                      <span>
                        {language === 'en' ? 'Van Dispatched to Field Crew' : 'Gari Limeshatumwa Uwanjani'}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDispatch(rec.id)}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Truck className="w-4 h-4" />
                      <span>
                        {language === 'en' ? 'Dispatch Rebalance Task' : 'Tuma Gari la Usawazishaji'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

