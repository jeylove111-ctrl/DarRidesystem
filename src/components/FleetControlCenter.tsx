import React, { useState } from 'react';
import { useDarRide } from '../services/store';
import { MapView } from './MapView';
import { Bicycle } from '../types';
import {
  Compass,
  Radio,
  Battery,
  Lock,
  Unlock,
  ShieldAlert,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Eye,
  AlertTriangle,
  Play,
  Pause,
  Zap,
  Phone,
  User,
  Wrench,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const FleetControlCenter: React.FC = () => {
  const {
    language,
    fleet,
    zones,
    metrics,
    alerts,
    tickets,
    transactions,
    selectedBike,
    setSelectedBike,
    triggerRemoteUnlock,
    triggerEmergencyLock,
    submitMaintenanceTicket,
    isSimulatingMovement,
    setIsSimulatingMovement,
    simulationSpeedMultiplier,
    setSimulationSpeedMultiplier,
    triggerSimulatedTheft,
    triggerGeofenceBreach,
  } = useDarRide();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<string>('ALL');
  const [activeBottomTab, setActiveBottomTab] = useState<'rentals' | 'payments' | 'maintenance' | 'alerts'>('rentals');

  // Filtered bikes for sidebar list
  const filteredBikes = fleet.filter((bike) => {
    const matchesSearch =
      bike.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bike.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bike.uniquePaymentNumber && bike.uniquePaymentNumber.includes(searchQuery)) ||
      (bike.currentRenterName && bike.currentRenterName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesZone = selectedZoneFilter === 'ALL' || bike.zone === selectedZoneFilter;
    return matchesSearch && matchesZone;
  });

  const lowBatteryCount = fleet.filter((b) => b.batteryPercent < 25).length;
  const outsideDarCount = fleet.filter((b) => b.status === 'RECOVERY' || b.tamperDetected).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Operations Telemetry Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-extrabold text-white">
                {language === 'en'
                  ? 'DAR RIDE Operations Control Center'
                  : 'Kituo Kikuu cha Uendeshaji - DAR RIDE'}
              </h1>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                {language === 'en' ? '100,000 FLEET LIVE' : 'MTANDAO WA BAISKELI 100,000'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'en'
                ? 'Real-time IoT telemetry, geofence compliance, and live dispatch across Dar es Salaam metropolis.'
                : 'Mawasiliano ya moja kwa moja ya IoT, udhibiti wa maeneo ya GPS, na ufuatiliaji wa baiskeli Dar es Salaam.'}
            </p>
          </div>

          {/* Simulation & Quick Stress-Test Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsSimulatingMovement(!isSimulatingMovement)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                isSimulatingMovement
                  ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {isSimulatingMovement ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>
                {isSimulatingMovement
                  ? (language === 'en' ? 'Live Telemetry Active' : 'Ufuatiliaji Unafanya Kazi')
                  : (language === 'en' ? 'Telemetry Paused' : 'Ufuatiliaji Umesitishwa')}
              </span>
            </button>

            <button
              onClick={triggerGeofenceBreach}
              className="px-3 py-1.5 rounded-xl bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 border border-rose-500/40 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Simulate Geofence Exit' : 'Iga Toka Eneo la GPS'}</span>
            </button>

            <button
              onClick={triggerSimulatedTheft}
              className="px-3 py-1.5 rounded-xl bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 border border-amber-500/40 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Simulate Tamper' : 'Iga Jaribio la Wizi'}</span>
            </button>
          </div>
        </div>

        {/* Real-time KPI Counters Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-4">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'en' ? 'Total Fleet' : 'Jumla ya Baiskeli'}
            </span>
            <div className="text-xl font-mono font-black text-white">{metrics.totalFleetCapacity.toLocaleString()}</div>
            <span className="text-[10px] text-emerald-400">100% IoT Connected</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'en' ? 'Available' : 'Zinazopatikana'}
            </span>
            <div className="text-xl font-mono font-black text-emerald-400">{metrics.availableBikes.toLocaleString()}</div>
            <span className="text-[10px] text-slate-500">
              {language === 'en' ? 'Ready to unlock' : 'Tayari kukodiwa'}
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'en' ? 'Active Rented' : 'Zinazotumiwa Sasa'}
            </span>
            <div className="text-xl font-mono font-black text-blue-400">{metrics.rentedBikes.toLocaleString()}</div>
            <span className="text-[10px] text-blue-300">
              {language === 'en' ? 'Live GPS tracking' : 'Ufuatiliaji wa GPS'}
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'en' ? 'Maintenance' : 'Kwenye Karakana'}
            </span>
            <div className="text-xl font-mono font-black text-orange-400">{metrics.maintenanceBikes.toLocaleString()}</div>
            <span className="text-[10px] text-slate-500">
              {language === 'en' ? 'In depot / workshop' : 'Karakana ya matengenezo'}
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'en' ? 'Security Alerts' : 'Tahadhari za Usalama'}
            </span>
            <div className="text-xl font-mono font-black text-rose-500">{outsideDarCount}</div>
            <span className="text-[10px] text-rose-400">
              {language === 'en' ? 'Incident response' : 'Ufuatiliaji uwanjani'}
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'en' ? '12h Revenue' : 'Mapato (Masaa 12)'}
            </span>
            <div className="text-xl font-mono font-black text-amber-400">
              TZS {(metrics.todayRevenueTsh / 1_000_000).toFixed(0)}M
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">
              2x/12h • {metrics.totalRidesToday.toLocaleString()} {language === 'en' ? 'trips' : 'safari'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Operations Grid: Live Map + Diagnostics Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Map View */}
        <div className="lg:col-span-8 space-y-4">
          <MapView
            bicycles={fleet}
            selectedBike={selectedBike}
            onSelectBike={(b) => setSelectedBike(b)}
            heightClass="h-[540px]"
            showGeofences={true}
          />
        </div>

        {/* Right 4 Cols: Bicycle Deep Diagnostics & Remote Lock Control */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col justify-between h-[540px] overflow-y-auto">
          {selectedBike ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400">
                    {language === 'en' ? 'Selected Telemetry Target:' : 'Baiskeli Iliyochaguliwa:'}
                  </span>
                  <h3 className="text-lg font-mono font-black text-white">{selectedBike.id}</h3>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full font-mono ${
                    selectedBike.status === 'AVAILABLE'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : selectedBike.status === 'RENTED'
                      ? 'bg-blue-950 text-blue-400 border border-blue-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {selectedBike.status}
                </span>
              </div>

              {/* Hardware & Sensor Telemetry Readouts */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">
                    {language === 'en' ? 'Zone:' : 'Kanda:'}
                  </span>
                  <strong className="text-white">{selectedBike.zone}</strong>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">
                    {language === 'en' ? 'Battery & Power:' : 'Betri na Umeme wa Sola:'}
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Battery className="w-3.5 h-3.5" /> {selectedBike.batteryPercent}% (Solar 8.5W)
                  </span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">
                    {language === 'en' ? 'Smart Lock:' : 'Kufuli ya Baiskeli:'}
                  </span>
                  <span className={`font-bold flex items-center gap-1 ${selectedBike.isLocked ? 'text-amber-400' : 'text-blue-400'}`}>
                    {selectedBike.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                    {selectedBike.isLocked ? (language === 'en' ? 'LOCKED' : 'IMEFUNGWA') : (language === 'en' ? 'UNLOCKED' : 'IMEFUNGULIWA')}
                  </span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">
                    {language === 'en' ? 'Speed & Motion:' : 'Mwendo & Mwendokasi:'}
                  </span>
                  <span className="text-white font-mono">
                    {selectedBike.speedKmh} km/h • {selectedBike.isMoving ? (language === 'en' ? 'Moving' : 'Inasafiri') : (language === 'en' ? 'Stationary' : 'Imesimama')}
                  </span>
                </div>
              </div>

              {/* Renter Details (RBAC Authorized View) */}
              {selectedBike.currentRenterName && (
                <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-2xl space-y-1 text-xs">
                  <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1 text-blue-400">
                    <User className="w-3 h-3" /> {language === 'en' ? 'Active Renter Info' : 'Taarifa za Mkodishaji'}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{language === 'en' ? 'Name:' : 'Jina:'}</span>
                    <strong className="text-slate-200">{selectedBike.currentRenterName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{language === 'en' ? 'Phone:' : 'Simu:'}</span>
                    <strong className="text-emerald-400 font-mono">{selectedBike.currentRenterPhone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{language === 'en' ? 'Rental ID:' : 'Namba ya Safari:'}</span>
                    <span className="font-mono text-slate-300">{selectedBike.currentRentalId}</span>
                  </div>
                </div>
              )}

              {/* Immutable Digital Identity Registry */}
              <div className="text-[11px] text-slate-400 space-y-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono">
                <div className="flex justify-between items-center text-amber-300 font-bold border-b border-slate-800 pb-1 mb-1">
                  <span>Lipa Namba (USSD):</span>
                  <span>{selectedBike.uniquePaymentNumber}</span>
                </div>
                <div>IoT Device: <span className="text-slate-200">{selectedBike.iotDeviceId}</span></div>
                <div>Frame Stamp: <span className="text-slate-200">{selectedBike.hardware.frameNumber}</span></div>
                <div>Lock Hardware: <span className="text-slate-200">{selectedBike.lockId}</span></div>
                <div>
                  {language === 'en' ? 'Total Trips:' : 'Jumla ya Safari:'}{' '}
                  <span className="text-slate-200">
                    {selectedBike.totalTrips} {language === 'en' ? 'rides' : 'safari'} ({selectedBike.totalDistanceKm.toFixed(1)} km)
                  </span>
                </div>
              </div>

              {/* Operator Command Actions */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {language === 'en' ? 'Remote Operations Command' : 'Amri za Masafa ya Mbali'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => triggerRemoteUnlock(selectedBike.id)}
                    className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Authorize Unlock' : 'Fungua Kufuli'}</span>
                  </button>

                  <button
                    onClick={() => triggerEmergencyLock(selectedBike.id)}
                    className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Safe Auto-Lock' : 'Funga kwa Usalama'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">
                {language === 'en' ? 'Select Any Bicycle' : 'Chagua Baiskeli Yoyote'}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {language === 'en'
                  ? 'Click any bike marker on the Dar es Salaam live map or select from the fleet list to view real-time diagnostics, renter info, and remote lock controls.'
                  : 'Bofya baiskeli yoyote kwenye ramani ya Dar es Salaam kuona hali ya betri, eneo la GPS, na amri za kufungua au kufunga.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Multi-Tab Panel: Rentals, Payments, Maintenance, Security Alerts */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveBottomTab('rentals')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeBottomTab === 'rentals' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'en' ? 'Fleet Directory' : 'Orodha ya Baiskeli'} ({fleet.length})
            </button>
            <button
              onClick={() => setActiveBottomTab('payments')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeBottomTab === 'payments' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'en' ? 'Live Payments' : 'Malipo ya Moja kwa Moja'} ({transactions.length})
            </button>
            <button
              onClick={() => setActiveBottomTab('maintenance')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeBottomTab === 'maintenance' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'en' ? 'Maintenance Tickets' : 'Tiketi za Matengenezo'} ({tickets.length})
            </button>
            <button
              onClick={() => setActiveBottomTab('alerts')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeBottomTab === 'alerts' ? 'bg-rose-600 text-white' : 'text-rose-400 hover:text-rose-300'
              }`}
            >
              <span>{language === 'en' ? 'Security Incidents' : 'Matukio ya Usalama'}</span>
              <span className="bg-rose-950 text-rose-300 text-[10px] px-1.5 rounded-full font-mono">
                {alerts.filter((a) => !a.resolved).length}
              </span>
            </button>
          </div>

          {/* Quick Search in List */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search bike ID, zone, or renter...' : 'Tafuta namba ya baiskeli au eneo...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 w-52 sm:w-64"
              />
            </div>

            <select
              value={selectedZoneFilter}
              onChange={(e) => setSelectedZoneFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="ALL">{language === 'en' ? 'All Dar Zones' : 'Kanda Zote za Dar'}</option>
              {zones.map((z) => (
                <option key={z.id} value={z.name}>
                  {z.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Contents */}
        {activeBottomTab === 'rentals' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">{language === 'en' ? 'Bicycle ID' : 'Namba ya Baiskeli'}</th>
                  <th className="py-2.5 px-3">{language === 'en' ? 'Lipa Namba (USSD)' : 'Lipa Namba (USSD)'}</th>
                  <th className="py-2.5 px-3">{language === 'en' ? 'Status' : 'Hali'}</th>
                  <th className="py-2.5 px-3">{language === 'en' ? 'Zone / Location' : 'Kanda / Eneo'}</th>
                  <th className="py-2.5 px-3">{language === 'en' ? 'Battery' : 'Betri'}</th>
                  <th className="py-2.5 px-3">{language === 'en' ? 'Lock State' : 'Kufuli'}</th>
                  <th className="py-2.5 px-3">{language === 'en' ? 'Renter' : 'Mkodishaji'}</th>
                  <th className="py-2.5 px-3 text-right">{language === 'en' ? 'Actions' : 'Kitendo'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredBikes.slice(0, 15).map((bike) => (
                  <tr
                    key={bike.id}
                    onClick={() => setSelectedBike(bike)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-white">{bike.id}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-300">{bike.uniquePaymentNumber}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          bike.status === 'AVAILABLE'
                            ? 'bg-emerald-950 text-emerald-400'
                            : bike.status === 'RENTED'
                            ? 'bg-blue-950 text-blue-400'
                            : bike.status === 'MAINTENANCE'
                            ? 'bg-orange-950 text-orange-400'
                            : 'bg-rose-950 text-rose-400'
                        }`}
                      >
                        {bike.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">{bike.zone}</td>
                    <td className="py-2.5 px-3">
                      <span className="flex items-center gap-1 text-emerald-400 font-mono">
                        <Battery className="w-3.5 h-3.5" /> {bike.batteryPercent}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={bike.isLocked ? 'text-amber-400' : 'text-blue-400 font-bold'}>
                        {bike.isLocked
                          ? (language === 'en' ? '🔒 LOCKED' : '🔒 IMEFUNGWA')
                          : (language === 'en' ? '🔓 UNLOCKED' : '🔓 IMEFUNGULIWA')}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {bike.currentRenterName ? (
                        <span className="text-slate-200">{bike.currentRenterName}</span>
                      ) : (
                        <span className="text-slate-600">{language === 'en' ? 'None (Idle)' : 'Haipo Safarini'}</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBike(bike);
                        }}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-medium cursor-pointer"
                      >
                        {language === 'en' ? 'Inspect' : 'Kagua'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeBottomTab === 'payments' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {transactions.map((txn) => (
              <div key={txn.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-emerald-400 font-bold">{txn.id}</span>
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                        txn.paymentChannel === 'OFFLINE_USSD'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {txn.paymentChannel === 'OFFLINE_USSD' ? 'OFFLINE USSD' : 'APP QR'}
                    </span>
                    <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded-full border border-emerald-800">
                      {language === 'en' ? 'PAID' : 'IMELIPWA'}
                    </span>
                  </div>
                </div>
                <div className="text-base font-black text-white font-mono">
                  TSh {txn.amountTsh.toLocaleString()}
                </div>
                <div className="text-slate-400 flex justify-between">
                  <span>{txn.provider}</span>
                  <span className="text-slate-300 font-mono">{txn.phone}</span>
                </div>
                <div className="text-[10px] text-slate-500 border-t border-slate-800/80 pt-1.5 flex justify-between">
                  <span>Baiskeli: {txn.bicycleId}</span>
                  <span>{txn.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeBottomTab === 'maintenance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-amber-400">{ticket.id}</span>
                  <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                    {ticket.status}
                  </span>
                </div>
                <div className="font-bold text-slate-100">{ticket.issue}</div>
                <div className="text-slate-400 text-[11px]">{ticket.location}</div>
                <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-1.5 flex justify-between">
                  <span>{language === 'en' ? 'Target:' : 'Baiskeli:'} <strong className="text-slate-300 font-mono">{ticket.bicycleId}</strong></span>
                  <span className="text-rose-400 font-bold">{ticket.priority}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeBottomTab === 'alerts' && (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-slate-950 p-4 rounded-2xl border border-rose-900/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-rose-600 text-white font-black text-[10px] px-2 py-0.5 rounded font-mono">
                      {alert.priority}
                    </span>
                    <span className="font-mono font-bold text-rose-300">{alert.bicycleId}</span>
                    <span className="text-slate-400">• {alert.type}</span>
                    <span className="text-slate-500 font-mono">{alert.timestamp}</span>
                  </div>
                  <p className="text-slate-300 text-xs">{alert.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const bike = fleet.find((b) => b.id === alert.bicycleId);
                      if (bike) setSelectedBike(bike);
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-xs cursor-pointer"
                  >
                    {language === 'en' ? 'View Map' : 'Ona Kwenye Ramani'}
                  </button>
                  <button
                    onClick={() => triggerEmergencyLock(alert.bicycleId)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs shadow-md cursor-pointer"
                  >
                    {language === 'en' ? 'Lock Shackle' : 'Funga Baiskeli'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

