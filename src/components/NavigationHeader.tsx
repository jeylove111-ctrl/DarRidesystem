import React from 'react';
import { useDarRide } from '../services/store';
import { UserRole } from '../types';
import { getTranslation } from '../translations';
import {
  Bike,
  ShieldAlert,
  Wrench,
  BarChart3,
  Sparkles,
  Cpu,
  FileCode2,
  Globe,
  Radio,
  Smartphone,
  CheckCircle2,
  Users,
  Compass,
  Languages,
} from 'lucide-react';

export const NavigationHeader: React.FC = () => {
  const {
    language,
    setLanguage,
    activeRole,
    setActiveRole,
    currentView,
    setCurrentView,
    metrics,
    alerts,
  } = useDarRide();

  const unresolvedAlerts = alerts.filter((a) => !a.resolved).length;

  const views = [
    { id: 'landing', labelEn: 'Public Portal', labelSw: 'Ukurasa Mkuu', icon: Globe },
    { id: 'customer', labelEn: 'Customer Mobile App', labelSw: 'Programu ya Mteja', icon: Smartphone },
    { id: 'control-center', labelEn: 'Operations Map (100k)', labelSw: 'Ramani ya Baiskeli (100k)', icon: Compass },
    { id: 'security', labelEn: 'Security & Geofence', labelSw: 'Ulinzi na Wizi', icon: ShieldAlert, badge: unresolvedAlerts },
    { id: 'field', labelEn: 'Field Technicians', labelSw: 'Mafundi & Karakana', icon: Wrench },
    { id: 'ceo', labelEn: 'Executive Dashboard', labelSw: 'Ripoti ya Uongozi', icon: BarChart3 },
    { id: 'ai-rebalance', labelEn: 'AI Demand & Rebalance', labelSw: 'Utabiri wa Mahitaji (AI)', icon: Sparkles },
    { id: 'iot-sim', labelEn: 'IoT Fleet Telemetry', labelSw: 'Kielelezo cha IoT', icon: Cpu },
    { id: 'architecture', labelEn: 'Architecture Specs', labelSw: 'Mfumo & Nyaraka', icon: FileCode2 },
  ];

  const roleTranslations: Record<UserRole, { en: string; sw: string }> = {
    'Customer': { en: 'Customer / Rider', sw: 'Mteja / Mwendeshaji' },
    'Operations Manager': { en: 'Operations Manager', sw: 'Meneja wa Uendeshaji' },
    'Fleet Manager': { en: 'Fleet Manager', sw: 'Meneja wa Baiskeli' },
    'Security Officer': { en: 'Security Officer', sw: 'Afisa Usalama' },
    'Field Agent': { en: 'Field Agent', sw: 'Afisa wa Nje' },
    'Maintenance Manager': { en: 'Maintenance Manager', sw: 'Meneja wa Matengenezo' },
    'Technician': { en: 'Technician', sw: 'Fundi wa Baiskeli' },
    'Customer Support': { en: 'Customer Support', sw: 'Huduma kwa Wateja' },
    'Finance Manager': { en: 'Finance Manager', sw: 'Meneja wa Fedha' },
    'CEO': { en: 'CEO / Executive', sw: 'Mkurugenzi Mtendaji (CEO)' },
    'Super Admin': { en: 'Super Admin', sw: 'Msimamizi Mkuu' },
  };

  const roles: UserRole[] = [
    'Customer',
    'Operations Manager',
    'Fleet Manager',
    'Security Officer',
    'Field Agent',
    'Maintenance Manager',
    'Technician',
    'Customer Support',
    'Finance Manager',
    'CEO',
    'Super Admin',
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-2xl">
      {/* Top Banner / System Telemetry Bar */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800/80 text-xs flex flex-wrap items-center justify-between gap-2 text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              {language === 'en'
                ? 'DAR IOT MESH: 100,000 BIKES ONLINE'
                : 'MTANDAO WA IOT: BAISKELI 100,000 ZIPO HEWANI'}
            </span>
          </div>
          <span className="hidden md:inline text-slate-600">|</span>
          <div className="hidden sm:flex items-center gap-2">
            <span>
              {language === 'en' ? 'Dar es Salaam Zones:' : 'Kanda za Dar es Salaam:'}{' '}
              <strong className="text-slate-200">13 {language === 'en' ? 'Active' : 'Zinazofanya Kazi'}</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span>
              {language === 'en' ? 'Available:' : 'Zinazopatikana:'}{' '}
              <strong className="text-emerald-400">{metrics.availableBikes}</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span>
              {language === 'en' ? 'Active Rides:' : 'Zinazotumika:'}{' '}
              <strong className="text-blue-400">{metrics.rentedBikes}</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span>
              {language === 'en' ? 'Today Revenue:' : 'Mapato ya Leo:'}{' '}
              <strong className="text-amber-400">TSh {metrics.todayRevenueTsh.toLocaleString()}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Role Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/70 rounded-lg px-2 py-1">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              {language === 'en' ? 'Role:' : 'Jukumu:'}
            </span>
            <select
              value={activeRole}
              onChange={(e) => {
                const newRole = e.target.value as UserRole;
                setActiveRole(newRole);
                if (newRole === 'Customer') setCurrentView('customer');
                else if (newRole === 'Technician' || newRole === 'Field Agent') setCurrentView('field');
                else if (newRole === 'Security Officer') setCurrentView('security');
                else if (newRole === 'CEO') setCurrentView('ceo');
                else setCurrentView('control-center');
              }}
              className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r} value={r} className="bg-slate-900 text-slate-100">
                  {language === 'en' ? roleTranslations[r].en : roleTranslations[r].sw}
                </option>
              ))}
            </select>
          </div>

          {/* Bilingual Language Switcher with Direct Buttons */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all flex items-center gap-1 ${
                language === 'en'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
            <button
              onClick={() => setLanguage('sw')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all flex items-center gap-1 ${
                language === 'sw'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🇹🇿</span>
              <span>SW</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Brand Logo */}
        <div
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Bike className="w-6 h-6 text-white" />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <Radio className="w-2 h-2 text-white" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white font-mono">
                DAR<span className="text-emerald-400">RIDE</span>
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/30 font-mono">
                100,000 BIKES
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              {language === 'en'
                ? 'Dar es Salaam 100,000 Smart Mobility Cloud'
                : 'Mtandao wa Baiskeli 100,000 Dar es Salaam'}
            </p>
          </div>
        </div>

        {/* Navigation View Switcher Pills */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
          {views.map((v) => {
            const Icon = v.icon;
            const isActive = currentView === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setCurrentView(v.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{language === 'en' ? v.labelEn : v.labelSw}</span>
                {v.badge !== undefined && v.badge > 0 && (
                  <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 rounded-full animate-pulse">
                    {v.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile View Dropdown Switcher */}
        <div className="flex lg:hidden items-center gap-2">
          <select
            value={currentView}
            onChange={(e) => setCurrentView(e.target.value)}
            className="bg-slate-800 text-slate-100 border border-slate-700 text-xs rounded-lg px-2.5 py-2 font-medium focus:outline-none"
          >
            {views.map((v) => (
              <option key={v.id} value={v.id}>
                {language === 'en' ? v.labelEn : v.labelSw} {v.badge ? `(${v.badge})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

