import React, { useState, useEffect } from 'react';
import { useDarRide } from '../services/store';
import {
  Cpu,
  Radio,
  Zap,
  Battery,
  Lock,
  Unlock,
  Play,
  Pause,
  RefreshCw,
  Terminal,
  Activity,
  Send,
  CheckCircle,
} from 'lucide-react';

export const IotSimulator: React.FC = () => {
  const {
    fleet,
    isSimulatingMovement,
    setIsSimulatingMovement,
    simulationSpeedMultiplier,
    setSimulationSpeedMultiplier,
    triggerSimulatedTheft,
    triggerSimulatedPuncture,
    triggerGeofenceBreach,
    language,
  } = useDarRide();

  const [mqttPackets, setMqttPackets] = useState<string[]>([]);
  const [injectedBikeId, setInjectedBikeId] = useState<string>('DAR-000928');
  const [injectedCommand, setInjectedCommand] = useState<string>('CMD_SOLENOID_UNLOCK');

  // Stream simulated MQTT packets
  useEffect(() => {
    if (!isSimulatingMovement) return;

    const interval = setInterval(() => {
      const randomBike = fleet[Math.floor(Math.random() * fleet.length)];
      if (!randomBike) return;

      const packet = JSON.stringify({
        topic: `dar-ride/tz/iot/${randomBike.id}/telemetry`,
        payload: {
          dev_id: randomBike.iotDeviceId,
          lat: randomBike.coordinates.lat,
          lng: randomBike.coordinates.lng,
          spd_kmh: randomBike.speedKmh,
          lock_state: randomBike.isLocked ? 1 : 0,
          bat_pct: randomBike.batteryPercent,
          solar_w: randomBike.solarCharging ? 8.5 : 0.0,
          gsm_rssi: -78,
          tamper_flag: randomBike.tamperDetected ? 1 : 0,
          ts: Math.floor(Date.now() / 1000),
        },
      });

      setMqttPackets((prev) => [packet, ...prev.slice(0, 40)]);
    }, 1200);

    return () => clearInterval(interval);
  }, [isSimulatingMovement, fleet]);

  const handleInjectCommand = () => {
    const injected = JSON.stringify({
      topic: `dar-ride/tz/iot/${injectedBikeId}/commands`,
      payload: {
        cmd: injectedCommand,
        auth_token: 'HMAC_SHA256_SERVER_SIGNED_99382',
        nonce: Math.floor(Math.random() * 1000000),
        ts: Math.floor(Date.now() / 1000),
      },
    });

    setMqttPackets((prev) => [`[COMMAND INJECTED] -> ${injected}`, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
                {language === 'en'
                  ? 'IoT Platform & 1,000-Bicycle Mesh Simulator'
                  : 'Jukwaa la IoT & Kielelezo cha Baiskeli 1,000+ za Majaribio'}
                <span className="text-xs bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-800">
                  MQTT / LTE-M
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Live simulation testing ground before physical factory mass deployment of 100,000 smart bicycles.'
                  : 'Kielelezo cha moja kwa moja kabla ya uzalishaji na usambazaji wa baiskeli janja 100,000 nchini.'}
              </p>
            </div>
          </div>

          {/* Simulation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSimulatingMovement(!isSimulatingMovement)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isSimulatingMovement
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {isSimulatingMovement ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>
                {isSimulatingMovement
                  ? (language === 'en' ? 'Pause Simulation' : 'Simamisha Kielelezo')
                  : (language === 'en' ? 'Start Simulation' : 'Anzisha Kielelezo')}
              </span>
            </button>

            <select
              value={simulationSpeedMultiplier}
              onChange={(e) => setSimulationSpeedMultiplier(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white cursor-pointer"
            >
              <option value="1">{language === 'en' ? '1x Speed (Realtime)' : 'Kasi 1x (Muda Halisi)'}</option>
              <option value="2">{language === 'en' ? '2x Speed' : 'Kasi 2x'}</option>
              <option value="5">{language === 'en' ? '5x Speed' : 'Kasi 5x'}</option>
            </select>
          </div>
        </div>

        {/* Live Simulation Trigger Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={triggerGeofenceBreach}
            className="p-3 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/50 rounded-2xl text-left transition-all text-xs space-y-1 cursor-pointer"
          >
            <div className="font-bold text-rose-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              {language === 'en' ? 'Trigger Geofence Breach' : 'Chochea Kuvuka Mipaka (Geofence)'}
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'en'
                ? 'Pushes a bike outside Dar outer geofence into Coast Region.'
                : 'Inasukuma baiskeli nje ya mipaka ya Dar kuelekea Pwani.'}
            </p>
          </button>

          <button
            onClick={triggerSimulatedTheft}
            className="p-3 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl text-left transition-all text-xs space-y-1 cursor-pointer"
          >
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              {language === 'en' ? 'Trigger Accelerometer Tamper' : 'Chochea Tikisa / Shambulio'}
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'en'
                ? 'Simulates locked bike movement on a transport vehicle.'
                : 'Inaiga mwendo wa baiskeli iliyofungwa ikiwa ndani ya lori/gari.'}
            </p>
          </button>

          <button
            onClick={triggerSimulatedPuncture}
            className="p-3 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl text-left transition-all text-xs space-y-1 cursor-pointer"
          >
            <div className="font-bold text-blue-400 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" />
              {language === 'en' ? 'Trigger Puncture / Maintenance' : 'Chochea Hitilafu / Pampu / Mnyororo'}
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'en'
                ? 'Submits mechanical repair ticket to field technician app.'
                : 'Inapeleka ombi la matengenezo kwa fundi aliye uwanjani.'}
            </p>
          </button>
        </div>
      </div>

      {/* Live MQTT Packet Inspector Terminal */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              {language === 'en'
                ? 'Live MQTT Telemetry Stream (Brokered via EMQX / AWS IoT)'
                : 'Mtiririko wa Moja kwa Moja wa Pakiti za MQTT (EMQX / AWS IoT)'}
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            {mqttPackets.length} {language === 'en' ? 'PACKETS CAPTURED' : 'PAKITI ZILIZOPATA'}
          </span>
        </div>

        {/* Command Injection Bar */}
        <div className="flex flex-wrap gap-2 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
          <input
            type="text"
            value={injectedBikeId}
            onChange={(e) => setInjectedBikeId(e.target.value)}
            placeholder="Target Bike (DAR-000928)"
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
          />

          <select
            value={injectedCommand}
            onChange={(e) => setInjectedCommand(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono cursor-pointer"
          >
            <option value="CMD_SOLENOID_UNLOCK">CMD_SOLENOID_UNLOCK</option>
            <option value="CMD_SAFE_LOCK_ENGAGE">CMD_SAFE_LOCK_ENGAGE</option>
            <option value="CMD_BUZZER_ALARM_ACTIVATE">CMD_BUZZER_ALARM_ACTIVATE</option>
            <option value="CMD_OTA_FIRMWARE_UPDATE">CMD_OTA_FIRMWARE_UPDATE</option>
            <option value="CMD_FORCE_GPS_HIGH_RATE">CMD_FORCE_GPS_HIGH_RATE</option>
          </select>

          <button
            onClick={handleInjectCommand}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Publish MQTT Command' : 'Tuma Amri ya MQTT'}</span>
          </button>
        </div>

        {/* Terminal Screen */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-[11px] text-emerald-400/90 h-80 overflow-y-auto space-y-1.5 leading-relaxed">
          {mqttPackets.length === 0 && (
            <div className="text-slate-500">
              {language === 'en'
                ? 'Waiting for simulated MQTT telemetry broadcast...'
                : 'Inasubiri pakiti za mawasiliano ya MQTT...'}
            </div>
          )}
          {mqttPackets.map((pkt, idx) => (
            <div key={idx} className="hover:bg-slate-900/60 p-1 rounded transition-colors break-all">
              <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> {pkt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
