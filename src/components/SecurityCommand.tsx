import React, { useState } from 'react';
import { useDarRide } from '../services/store';
import { MapView } from './MapView';
import {
  ShieldAlert,
  Lock,
  Unlock,
  AlertTriangle,
  Radio,
  Clock,
  Compass,
  CheckCircle2,
  XCircle,
  Truck,
  Eye,
  Camera,
  Cpu,
  Fingerprint,
} from 'lucide-react';

export const SecurityCommand: React.FC = () => {
  const {
    language,
    fleet,
    alerts,
    recoveryTasks,
    resolveSecurityAlert,
    completeRecoveryTask,
    triggerEmergencyLock,
    triggerGeofenceBreach,
    triggerSimulatedTheft,
  } = useDarRide();

  const [activeSubTab, setActiveSubTab] = useState<'alerts' | 'recovery' | 'inactivity' | 'safe_lock_demo'>('alerts');

  // Inactive bikes analysis (24h, 48h, 72h)
  const inactive24h = fleet.filter((b) => b.hoursInactive >= 24 && b.hoursInactive < 48);
  const inactive48h = fleet.filter((b) => b.hoursInactive >= 48 && b.hoursInactive < 72);
  const inactive72h = fleet.filter((b) => b.hoursInactive >= 72);

  // Safe lock interactive simulator state
  const [safeLockSimStep, setSafeLockSimStep] = useState<number>(0);
  const [simIsMoving, setSimIsMoving] = useState<boolean>(true);
  const [simTimerSeconds, setSimTimerSeconds] = useState<number>(180);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Security Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
                {language === 'en' ? 'Security & Anti-Theft Command' : 'Kitengo cha Usalama na Kuzuia Wizi'}
                <span className="text-xs bg-rose-950 text-rose-300 font-mono px-2 py-0.5 rounded-full border border-rose-800">
                  {language === 'en' ? 'DEFENSE LEVEL 4' : 'ULINZI WA NGAZI YA 4'}
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Multi-layer GPS geofence enforcement, accelerometer tamper triggers, and digital frame identity protection across 100,000 bicycles.'
                  : 'Ulinzi wa GPS, vizuizi vya kijiografia (geofencing), vihisi mtikisiko, na utambulisho wa kidijitali wa baiskeli 100,000.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerGeofenceBreach}
              className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Simulate Geofence Exit' : 'Iga Toka Eneo la GPS'}</span>
            </button>

            <button
              onClick={triggerSimulatedTheft}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Simulate Tamper' : 'Iga Jaribio la Wizi'}</span>
            </button>
          </div>
        </div>

        {/* Security Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'en' ? 'Active Tamper Alerts' : 'Tahadhari za Wizi'}
            </span>
            <div className="text-xl font-mono font-black text-rose-400">
              {alerts.filter((a) => !a.resolved).length}
            </div>
            <span className="text-[10px] text-rose-300">
              {language === 'en' ? 'Requires triage' : 'Zinazofanyiwa kazi'}
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'en' ? 'Recovery Tasks' : 'Kazi za Urejeshaji'}
            </span>
            <div className="text-xl font-mono font-black text-amber-400">
              {recoveryTasks.filter((r) => r.status !== 'DEPOT_STORED').length}
            </div>
            <span className="text-[10px] text-amber-300">
              {language === 'en' ? 'Field units deployed' : 'Maafisa uwanjani'}
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'en' ? '48h+ Inactivity' : 'Zisizotumika Saa 48+'}
            </span>
            <div className="text-xl font-mono font-black text-blue-400">
              {inactive48h.length + inactive72h.length}
            </div>
            <span className="text-[10px] text-slate-500">
              {language === 'en' ? 'Under investigation' : 'Zinachunguzwa'}
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'en' ? 'Tamper Resistance' : 'Kiwango cha Ulinzi'}
            </span>
            <div className="text-xl font-mono font-black text-emerald-400">99.8%</div>
            <span className="text-[10px] text-emerald-300">Cryptographic IoT ID</span>
          </div>
        </div>
      </div>

      {/* Security Navigation Sub-tabs */}
      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveSubTab('alerts')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'alerts' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Active Incidents' : 'Matukio ya Usalama'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('recovery')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'recovery' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Field Recovery Operations' : 'Uokoaji wa Baiskeli Uwanjani'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('inactivity')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'inactivity' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Inactivity Monitoring' : 'Ufuatiliaji wa Kutotumika'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('safe_lock_demo')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'safe_lock_demo' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Safe Auto-Lock Protocol' : 'Mfumo wa Kufunga kwa Usalama'}</span>
        </button>
      </div>

      {/* SUB-TAB 1: ACTIVE ALERTS */}
      {activeSubTab === 'alerts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-5 rounded-3xl border transition-all ${
                    alert.resolved
                      ? 'bg-slate-950/60 border-slate-800 opacity-60'
                      : 'bg-slate-900 border-rose-500/50 shadow-xl'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black font-mono px-2.5 py-0.5 rounded-full ${
                          alert.priority === 'CRITICAL'
                            ? 'bg-rose-600 text-white animate-pulse'
                            : 'bg-amber-600 text-white'
                        }`}
                      >
                        {alert.priority}
                      </span>
                      <h3 className="font-mono font-bold text-base text-white">{alert.bicycleId}</h3>
                      <span className="text-xs text-slate-400">• {alert.type}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{alert.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-300 my-2">{alert.description}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                    <span className="text-slate-400">
                      {language === 'en' ? 'Zone:' : 'Kanda:'} <strong className="text-white">{alert.zoneName}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      {!alert.resolved && (
                        <>
                          <button
                            onClick={() => triggerEmergencyLock(alert.bicycleId)}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs cursor-pointer"
                          >
                            {language === 'en' ? 'Lock Shackle' : 'Funga Kufuli'}
                          </button>
                          <button
                            onClick={() => resolveSecurityAlert(alert.id, 'Security Officer Salum')}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold rounded-xl text-xs cursor-pointer"
                          >
                            {language === 'en' ? 'Mark Resolved' : 'Weka Imetatuliwa'}
                          </button>
                        </>
                      )}
                      {alert.resolved && (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />{' '}
                          {language === 'en' ? `Resolved by ${alert.resolvedBy}` : `Imetatuliwa na ${alert.resolvedBy}`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            {/* Tamper Protection / Cryptographic Anti-Repainting Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Fingerprint className="w-4 h-4 text-emerald-400" />
                <span>
                  {language === 'en'
                    ? 'Anti-Repainting & Digital Frame Identity'
                    : 'Ulinzi Dhidi ya Kupakwa Rangi & Utambulisho wa Kidijitali'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'en'
                  ? 'Even if unauthorized actors repaint a DAR RIDE bicycle, change stickers, or scratch markings, the internal tamper-proof hardware identity remains locked in the DAR RIDE Mobility Cloud.'
                  : 'Hata kama mtu atapaka rangi baiskeli au kubadilisha vibandiko, namba ya siri ya kidijitali (IoT Crypto ID) ndani ya fremu inaitambulisha baiskeli moja kwa moja kwenye mtandao.'}
              </p>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-emerald-400 font-bold text-[10px]">
                  {language === 'en' ? 'DIGITAL ASSET BINDING:' : 'UTAMBULISHO WA KIDIITALI:'}
                </div>
                <div className="text-slate-300">Frame: TZ-DAR-FRM-99210</div>
                <div className="text-slate-300">IoT Secure MCU: IOT-TZ-884920</div>
                <div className="text-slate-300">Hardware Certificate: ECC-256 P-256</div>
                <div className="text-slate-300">Tamper Sensor: Dual-Chassis Reed + Accelerometer</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: RECOVERY OPERATIONS */}
      {activeSubTab === 'recovery' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recoveryTasks.map((task) => (
            <div key={task.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-rose-400">{task.id}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    task.status === 'DEPOT_STORED'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div>
                <h4 className="font-mono font-black text-white text-base">{task.bicycleId}</h4>
                <p className="text-slate-400 mt-1">{task.reason}</p>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1 font-mono text-[11px] text-slate-300">
                <div>{language === 'en' ? 'Battery:' : 'Betri:'} <strong className="text-emerald-400">{task.batteryPercent}%</strong></div>
                <div>{language === 'en' ? 'Lock:' : 'Kufuli:'} <strong className={task.lockStatus === 'LOCKED' ? 'text-amber-400' : 'text-blue-400'}>{task.lockStatus}</strong></div>
                <div>{language === 'en' ? 'Assigned Unit:' : 'Afisa Aliyepangiwa:'} <span className="text-slate-200">{task.assignedAgent || (language === 'en' ? 'Unassigned' : 'Bado')}</span></div>
              </div>

              {task.status !== 'DEPOT_STORED' && (
                <button
                  onClick={() => completeRecoveryTask(task.id, 'Recovered to Posta Depot')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  {language === 'en' ? 'Mark Recovered & Secured in Depot' : 'Weka Imepatikana & Imehifadhiwa'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 3: INACTIVITY MONITORING */}
      {activeSubTab === 'inactivity' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">
                {language === 'en' ? '24 Hours Inactive' : 'Saa 24 Bila Kutumika'}
              </h3>
              <span className="bg-blue-950 text-blue-400 font-mono text-xs px-2 py-0.5 rounded">
                {inactive24h.length} {language === 'en' ? 'Bikes' : 'Baiskeli'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'Low/Medium Priority. Routine depot rebalancing candidate.' : 'Kipaumbele cha kawaida. Mgombea wa kuhamishwa kanda nyingine.'}
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {inactive24h.slice(0, 5).map((b) => (
                <div key={b.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs flex justify-between">
                  <span className="font-mono font-bold text-white">{b.id}</span>
                  <span className="text-slate-400">{b.zone}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">
                {language === 'en' ? '48 Hours Inactive' : 'Saa 48 Bila Kutumika'}
              </h3>
              <span className="bg-amber-950 text-amber-300 font-mono text-xs px-2 py-0.5 rounded border border-amber-800">
                {inactive48h.length} {language === 'en' ? 'Bikes' : 'Baiskeli'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'High Priority Alert. Field agent dispatched for visual check.' : 'Kipaumbele cha juu. Afisa ametumwa kukagua eneo.'}
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {inactive48h.slice(0, 5).map((b) => (
                <div key={b.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs flex justify-between">
                  <span className="font-mono font-bold text-amber-400">{b.id}</span>
                  <span className="text-slate-400">{b.zone}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">
                {language === 'en' ? '72+ Hours Inactive' : 'Saa 72+ Bila Kutumika'}
              </h3>
              <span className="bg-rose-950 text-rose-300 font-mono text-xs px-2 py-0.5 rounded border border-rose-800">
                {inactive72h.length} {language === 'en' ? 'Bikes' : 'Baiskeli'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'en' ? 'Critical Review. Suspected stolen or concealed off-grid.' : 'Kikao cha dharura. Inashukiwa kufichwa au kuibiwa.'}
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {inactive72h.slice(0, 5).map((b) => (
                <div key={b.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs flex justify-between">
                  <span className="font-mono font-bold text-rose-400">{b.id}</span>
                  <span className="text-slate-400">{b.zone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SAFE AUTO-LOCK DEMONSTRATION */}
      {activeSubTab === 'safe_lock_demo' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <span className="bg-emerald-500/10 text-emerald-400 font-mono text-xs px-3 py-1 rounded-full border border-emerald-500/30">
              {language === 'en' ? 'SAFETY-CRITICAL ARCHITECTURE' : 'MUUNDO WA USALAMA WA HALI YA JUU'}
            </span>
            <h2 className="text-xl font-bold text-white">
              {language === 'en'
                ? 'Safe Expiration & Anti-Accident Auto-Lock Flow'
                : 'Mfumo wa Kufunga kwa Usalama Kuzuia Ajali Baada ya Muda Kuisha'}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'en'
                ? 'A rental expiry NEVER locks a moving bicycle suddenly. Our IoT controller checks 3 independent motion signals (GPS velocity, wheel rotation sensor, 3-axis accelerometer) and requires 2–3 minutes of confirmed stationary parking before engaging the physical wheel lock.'
                : 'Muda wa safari ukiisha, baiskeli HAIWEZI kufungwa ghafla ikiwa bado inasafiri ili kuzuia ajali. Vihisi vitatu (GPS, mzunguko wa gurudumu, na kipima mtikisiko) lazima vithibitishe baiskeli imesimama kwa dakika 2-3 kabla ya kufuli kufunga.'}
            </p>
          </div>

          {/* Interactive Simulation Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                {language === 'en' ? 'STAGE 1' : 'HATUA YA 1'}
              </span>
              <div className="text-xs font-bold text-white">
                {language === 'en' ? 'Rental Expires (18:00)' : 'Muda Unakwisha (18:00)'}
              </div>
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? 'Countdown reaches 0. Customer notified via push & SMS.' : 'Muda unaisha. Mteja anapewa ujumbe mfupi wa SMS na programu.'}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-[10px] font-mono text-blue-400 font-bold">
                {language === 'en' ? 'STAGE 2' : 'HATUA YA 2'}
              </span>
              <div className="text-xs font-bold text-white">
                {language === 'en' ? 'Check Motion Sensors' : 'Kukagua Mwendo'}
              </div>
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? (
                  <>Is rider still moving? <strong>DO NOT LOCK</strong>. Continue monitoring.</>
                ) : (
                  <>Baiskeli inasafiri bado? <strong>USIFUNGE</strong>. Endelea kufuatilia.</>
                )}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-[10px] font-mono text-amber-400 font-bold">
                {language === 'en' ? 'STAGE 3' : 'HATUA YA 3'}
              </span>
              <div className="text-xs font-bold text-white">
                {language === 'en' ? 'Stationary Timer' : 'Kipima Kusimama'}
              </div>
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? 'Bicycle comes to complete stop. 180s countdown starts.' : 'Baiskeli inasimama kabisa. Hesabu ya sekunde 180 inaanza.'}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-[10px] font-mono text-purple-400 font-bold">
                {language === 'en' ? 'STAGE 4' : 'HATUA YA 4'}
              </span>
              <div className="text-xs font-bold text-white">
                {language === 'en' ? 'Lock Wheel Solenoid' : 'Kufunga Kufuli'}
              </div>
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? '2-3 mins stationary confirmed. Motor pulses lock ring.' : 'Uthibitisho wa dakika 2-3 umekamilika. Kufuli inafunga.'}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                {language === 'en' ? 'STAGE 5' : 'HATUA YA 5'}
              </span>
              <div className="text-xs font-bold text-white">
                {language === 'en' ? 'Server Confirmation' : 'Uthibitisho wa Seva'}
              </div>
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? 'Lock sensor validates shackle. Bike becomes AVAILABLE.' : 'Seva inathibitisha kufuli imefunga. Baiskeli inakuwa tayari kukodiwa.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

