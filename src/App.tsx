/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DarRideProvider, useDarRide } from './services/store';
import { NavigationHeader } from './components/NavigationHeader';
import { LandingPage } from './components/LandingPage';
import { CustomerApp } from './components/CustomerApp';
import { FleetControlCenter } from './components/FleetControlCenter';
import { SecurityCommand } from './components/SecurityCommand';
import { FieldWorkerApp } from './components/FieldWorkerApp';
import { CeoDashboard } from './components/CeoDashboard';
import { AiDemandPredictor } from './components/AiDemandPredictor';
import { IotSimulator } from './components/IotSimulator';
import { ArchitectureDocs } from './components/ArchitectureDocs';

function MainAppContent() {
  const { currentView, theme, language } = useDarRide();
  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-emerald-500 selection:text-slate-950 ${
        isLight
          ? 'bg-slate-100 text-slate-900 font-medium'
          : 'bg-slate-950 text-slate-100'
      }`}
    >
      <NavigationHeader />

      <main className="flex-1">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'customer' && <CustomerApp />}
        {currentView === 'control-center' && <FleetControlCenter />}
        {currentView === 'security' && <SecurityCommand />}
        {currentView === 'field' && <FieldWorkerApp />}
        {currentView === 'ceo' && <CeoDashboard />}
        {currentView === 'ai-rebalance' && <AiDemandPredictor />}
        {currentView === 'iot-sim' && <IotSimulator />}
        {currentView === 'architecture' && <ArchitectureDocs />}
      </main>

      {/* Persistent Global Footer */}
      <footer
        className={`border-t py-6 text-center text-xs transition-colors ${
          isLight
            ? 'border-slate-300 bg-white text-slate-700 font-bold'
            : 'border-slate-900 bg-slate-950 text-slate-500'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`font-mono font-black ${isLight ? 'text-slate-950' : 'text-slate-200'}`}>
              DAR RIDE TANZANIA
            </span>
            <span>
              {language === 'zh'
                ? '• 非洲最大规模物联网智能共享单车基础设施'
                : language === 'sw'
                ? '• Miundombinu ya Baiskeli za Kisasa Afrika'
                : "• Africa's Connected Smart Mobility Infrastructure"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className={isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}>
              Mwenge • Masaki • Posta • Kariakoo • Coco Beach • Ubungo
            </span>
            <span>|</span>
            <span className={`font-mono font-black ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
              100,000 {language === 'zh' ? '辆单车已组网' : 'IoT Nodes Online'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <DarRideProvider>
      <MainAppContent />
    </DarRideProvider>
  );
}
