import React, { useState } from 'react';
import { useDarRide } from '../services/store';
import { MaintenanceTicket, RecoveryTask } from '../types';
import {
  Wrench,
  Truck,
  QrCode,
  CheckCircle2,
  Navigation,
  Camera,
  AlertTriangle,
  Battery,
  Lock,
  Unlock,
  Upload,
  Clock,
  MapPin,
} from 'lucide-react';

export const FieldWorkerApp: React.FC = () => {
  const {
    tickets,
    recoveryTasks,
    fleet,
    updateTicketStatus,
    completeRecoveryTask,
    submitMaintenanceTicket,
    language,
  } = useDarRide();

  const [activeTab, setActiveTab] = useState<'repairs' | 'recovery' | 'rebalance'>('repairs');
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceTicket | null>(tickets[0] || null);
  const [scannedBikeId, setScannedBikeId] = useState<string>('');
  const [isVerifyingQr, setIsVerifyingQr] = useState<boolean>(false);
  const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false);
  const [repairNotes, setRepairNotes] = useState<string>('');
  const technicianName = language === 'en' ? 'Technician Salum (Mwenge Depot)' : 'Fundi Salum (Karakana ya Mwenge)';

  const handleVerifyScan = () => {
    if (!selectedTicket) return;
    setIsVerifyingQr(true);
    setTimeout(() => {
      setIsVerifyingQr(false);
      setVerificationSuccess(true);
    }, 1000);
  };

  const handleProgressTicket = (status: MaintenanceTicket['status']) => {
    if (!selectedTicket) return;
    updateTicketStatus(selectedTicket.id, status);
    setSelectedTicket((prev) => (prev ? { ...prev, status } : null));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Field Top Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">
              {language === 'en'
                ? 'DAR RIDE Field Operations & Technician App'
                : 'Mfumo wa Mafundi Uwanjani - DAR RIDE'}
            </h1>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'Active Agent:' : 'Afisa Aliyepo:'} <strong className="text-slate-200">{technicianName}</strong> • Mwenge Mobile Van 03
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('repairs')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'repairs' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>
              {language === 'en' ? 'Repairs' : 'Matengenezo'} ({tickets.filter((t) => t.status !== 'CLOSED').length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('recovery')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'recovery' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>
              {language === 'en' ? 'Recovery' : 'Uokoaji'} ({recoveryTasks.filter((r) => r.status !== 'DEPOT_STORED').length})
            </span>
          </button>
        </div>
      </div>

      {/* Main Field Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Job Queue */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center justify-between">
            <span>{language === 'en' ? 'Assigned Tasks' : 'Kazi Zilizopangwa'}</span>
            <span className="text-xs text-slate-400 font-mono">Dar es Salaam Hub</span>
          </h3>

          {activeTab === 'repairs' && (
            <div className="space-y-3">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTicket(t);
                    setVerificationSuccess(false);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedTicket?.id === t.id
                      ? 'bg-amber-950/40 border-amber-500 shadow-lg'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono font-bold text-xs text-amber-400">{t.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                        t.priority === 'CRITICAL'
                          ? 'bg-rose-950 text-rose-300'
                          : 'bg-amber-950 text-amber-300'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </div>

                  <div className="font-bold text-sm text-white">{t.issue}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{t.location}</span>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-800/80 text-[11px]">
                    <span className="text-slate-400">
                      {language === 'en' ? 'Target:' : 'Baiskeli:'} <strong className="text-white font-mono">{t.bicycleId}</strong>
                    </span>
                    <span className="text-amber-400 font-bold">{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'recovery' && (
            <div className="space-y-3">
              {recoveryTasks.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-rose-400">{r.id}</span>
                    <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded font-mono">
                      {r.status}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-white font-mono">{r.bicycleId}</div>
                  <p className="text-slate-400">{r.reason}</p>
                  <button
                    onClick={() => completeRecoveryTask(r.id)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all text-xs cursor-pointer"
                  >
                    {language === 'en' ? 'Confirm Secure Retrieval to Depot' : 'Thibitisha Baiskeli Imehifadhiwa'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Active Job Execution Workflow */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
          {selectedTicket ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-400">
                    {language === 'en' ? 'ACTIVE WORK ORDER' : 'AGIZO LA KAZI'}
                  </span>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {selectedTicket.id} - {selectedTicket.issue}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {language === 'en' ? 'Bicycle:' : 'Baiskeli:'} <strong className="text-white font-mono">{selectedTicket.bicycleId}</strong> • {language === 'en' ? 'Location:' : 'Eneo:'} {selectedTicket.location}
                  </p>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-950 text-amber-300 rounded-full border border-amber-800">
                  {selectedTicket.status}
                </span>
              </div>

              {/* Step 1: GPS Navigation */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-emerald-400" />
                    {language === 'en' ? '1. Turn-by-Turn GPS Navigation' : '1. Urambazaji wa GPS Uwanjani'}
                  </span>
                  <span className="text-xs font-mono text-emerald-400">0.8 km</span>
                </div>
                <p className="text-xs text-slate-400">
                  {language === 'en' ? 'Coordinates:' : 'Majira ya GPS:'} {selectedTicket.coordinates.lat.toFixed(4)}, {selectedTicket.coordinates.lng.toFixed(4)} ({selectedTicket.location})
                </p>
              </div>

              {/* Step 2: Physical Verification via QR Scanner */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-blue-400" />
                  {language === 'en' ? '2. On-Site Physical QR Scan Verification' : '2. Kuthibitisha Baiskeli kwa Kuchanganua QR'}
                </span>

                {verificationSuccess ? (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>
                      {language === 'en'
                        ? 'Hardware Match Verified! Frame: TZ-DAR-FRM-9921 • IoT Device Online'
                        : 'Baiskeli Imethibitishwa! Fremu: TZ-DAR-FRM-9921 • Kifaa cha IoT Kipo Hewani'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleVerifyScan}
                      disabled={isVerifyingQr}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>
                        {isVerifyingQr
                          ? (language === 'en' ? 'Scanning QR Code...' : 'Inachanganua QR...')
                          : (language === 'en' ? `Scan ${selectedTicket.bicycleId}` : `Changanua ${selectedTicket.bicycleId}`)}
                      </span>
                    </button>
                    <span className="text-[11px] text-slate-400">
                      {language === 'en' ? 'Confirms technician physical presence.' : 'Inathibitisha fundi yupo eneo la baiskeli.'}
                    </span>
                  </div>
                )}
              </div>

              {/* Step 3: Repair Actions & Status Progression */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300">
                  {language === 'en' ? '3. Update Job Progression' : '3. Sasisha Hali ya Matengenezo'}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleProgressTicket('IN_PROGRESS')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedTicket.status === 'IN_PROGRESS'
                        ? 'bg-amber-600 text-white border-amber-500'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {language === 'en' ? 'In Progress' : 'Inatengenezwa'}
                  </button>

                  <button
                    onClick={() => handleProgressTicket('REPAIRED')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedTicket.status === 'REPAIRED'
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {language === 'en' ? 'Repaired' : 'Imetengenezwa'}
                  </button>

                  <button
                    onClick={() => handleProgressTicket('VERIFIED')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedTicket.status === 'VERIFIED'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {language === 'en' ? 'Verified' : 'Imethibitishwa'}
                  </button>

                  <button
                    onClick={() => handleProgressTicket('CLOSED')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedTicket.status === 'CLOSED'
                        ? 'bg-slate-700 text-white border-slate-600'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {language === 'en' ? 'Close Ticket' : 'Funga Kazi'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500">
              {language === 'en'
                ? 'Select a work order from the left column to begin diagnostics.'
                : 'Chagua kazi kutoka upande wa kushoto kuanza ukaguzi.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

