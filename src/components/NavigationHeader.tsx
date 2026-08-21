import React from 'react';
import { useDarRide } from '../services/store';
import { UserRole, Language } from '../types';
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
  Sun,
  Moon,
  TrendingUp,
  LayoutDashboard,
} from 'lucide-react';

export const NavigationHeader: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    activeRole,
    setActiveRole,
    currentView,
    setCurrentView,
    metrics,
    alerts,
  } = useDarRide();

  const unresolvedAlerts = alerts.filter((a) => !a.resolved).length;

  const views = [
    {
      id: 'landing',
      labelEn: 'Public Portal',
      labelSw: 'Ukurasa Mkuu',
      labelZh: '官方主页',
      icon: Globe,
    },
    {
      id: 'customer',
      labelEn: 'Customer Portal',
      labelSw: 'Programu ya Mteja',
      labelZh: '乘客客户端',
      icon: Smartphone,
    },
    {
      id: 'control-center',
      labelEn: 'Fleet Control (100k)',
      labelSw: 'Ramani ya Baiskeli (100k)',
      labelZh: '10万调度中枢',
      icon: Compass,
    },
    {
      id: 'security',
      labelEn: 'Security & Geofence',
      labelSw: 'Ulinzi na Wizi',
      labelZh: '安防电子围栏',
      icon: ShieldAlert,
      badge: unresolvedAlerts,
    },
    {
      id: 'field',
      labelEn: 'Field Technicians',
      labelSw: 'Mafundi & Karakana',
      labelZh: '现场运维技师',
      icon: Wrench,
    },
    {
      id: 'ceo',
      labelEn: 'Executive Dashboard',
      labelSw: 'Ripoti ya Uongozi',
      labelZh: '决策与财务大屏',
      icon: BarChart3,
    },
    {
      id: 'ai-rebalance',
      labelEn: 'AI Rebalance',
      labelSw: 'Utabiri wa AI',
      labelZh: 'AI 车辆再平衡',
      icon: Sparkles,
    },
    {
      id: 'iot-sim',
      labelEn: 'IoT Telemetry',
      labelSw: 'Kielelezo cha IoT',
      labelZh: '物联网数据流',
      icon: Cpu,
    },
    {
      id: 'architecture',
      labelEn: 'Architecture Specs',
      labelSw: 'Mfumo & Nyaraka',
      labelZh: '系统架构文档',
      icon: FileCode2,
    },
  ];

  const roleTranslations: Record<UserRole, { en: string; sw: string; zh: string }> = {
    Customer: { en: 'Customer / Rider', sw: 'Mteja / Mwendeshaji', zh: '乘客 / 租车客户' },
    'Operations Manager': { en: 'Operations Manager', sw: 'Meneja wa Uendeshaji', zh: '运营总监' },
    'Fleet Manager': { en: 'Fleet Manager', sw: 'Meneja wa Baiskeli', zh: '车队资产经理' },
    'Security Officer': { en: 'Security Officer', sw: 'Afisa Usalama', zh: '安全防盗专员' },
    'Field Agent': { en: 'Field Agent', sw: 'Afisa wa Nje', zh: '现场巡检员' },
    'Maintenance Manager': { en: 'Maintenance Manager', sw: 'Meneja wa Matengenezo', zh: '维修保障经理' },
    Technician: { en: 'Technician', sw: 'Fundi wa Baiskeli', zh: '驻场技师' },
    'Customer Support': { en: 'Customer Support', sw: 'Huduma kwa Wateja', zh: '客服专员' },
    'Finance Manager': { en: 'Finance Manager', sw: 'Meneja wa Fedha', zh: '财务审计经理' },
    CEO: { en: 'CEO / Executive', sw: 'Mkurugenzi Mtendaji (CEO)', zh: '首席执行官 (CEO)' },
    'Super Admin': { en: 'Super Admin', sw: 'Msimamizi Mkuu', zh: '超级系统管理员' },
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

  const getViewLabel = (v: (typeof views)[0]) => {
    if (language === 'zh') return v.labelZh;
    if (language === 'sw') return v.labelSw;
    return v.labelEn;
  };

  const getRoleLabel = (r: UserRole) => {
    if (language === 'zh') return roleTranslations[r].zh;
    if (language === 'sw') return roleTranslations[r].sw;
    return roleTranslations[r].en;
  };

  const isLight = theme === 'light';

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 border-b shadow-xl ${
        isLight
          ? 'bg-white/95 text-slate-900 border-slate-300 backdrop-blur-md'
          : 'bg-slate-900/95 text-slate-100 border-slate-800 backdrop-blur-md'
      }`}
    >
      {/* Top Banner / System Telemetry Bar */}
      <div
        className={`px-4 py-1.5 border-b text-xs flex flex-wrap items-center justify-between gap-2 transition-colors ${
          isLight
            ? 'bg-slate-100 border-slate-300 text-slate-700 font-bold'
            : 'bg-slate-950 border-slate-800 text-slate-400'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 font-mono font-black ${
              isLight ? 'text-emerald-700' : 'text-emerald-400'
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="tracking-tight">
              {language === 'zh'
                ? '达市物联网节点网格: 100,000 辆在线'
                : language === 'sw'
                ? 'MTANDAO WA IOT: BAISKELI 100,000 ZIPO HEWANI'
                : 'DAR IOT MESH: 100,000 BIKES ONLINE'}
            </span>
          </div>

          <span className={isLight ? 'text-slate-400 hidden md:inline' : 'text-slate-700 hidden md:inline'}>|</span>

          <div className="hidden sm:flex items-center gap-2 font-medium">
            <span>
              {language === 'zh'
                ? '中心枢纽:'
                : language === 'sw'
                ? 'Kanda:'
                : 'Hubs:'}{' '}
              <strong className={isLight ? 'text-slate-950 font-bold' : 'text-slate-200'}>
                13 {language === 'zh' ? '个' : ''}
              </strong>
            </span>
            <span className={isLight ? 'text-slate-300' : 'text-slate-700'}>|</span>
            <span>
              {language === 'zh'
                ? '可用单车:'
                : language === 'sw'
                ? 'Zinazopatikana:'
                : 'Available:'}{' '}
              <strong className={isLight ? 'text-emerald-700 font-black font-mono' : 'text-emerald-400 font-bold font-mono'}>
                {metrics.availableBikes}
              </strong>
            </span>
            <span className={isLight ? 'text-slate-300' : 'text-slate-700'}>|</span>
            <span>
              {language === 'zh'
                ? '骑行中:'
                : language === 'sw'
                ? 'Zinazotumika:'
                : 'Active Rides:'}{' '}
              <strong className={isLight ? 'text-blue-700 font-black font-mono' : 'text-blue-400 font-bold font-mono'}>
                {metrics.rentedBikes}
              </strong>
            </span>
            <span className={isLight ? 'text-slate-300' : 'text-slate-700'}>|</span>
            <span>
              {language === 'zh'
                ? '今日营收:'
                : language === 'sw'
                ? 'Mapato ya Leo:'
                : "Today's Revenue:"}{' '}
              <strong className={isLight ? 'text-amber-800 font-black font-mono' : 'text-amber-400 font-bold font-mono'}>
                TSh {metrics.todayRevenueTsh.toLocaleString()}
              </strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Active Role / Portal Selector */}
          <div
            className={`flex items-center gap-1.5 border rounded-lg px-2 py-1 transition-colors ${
              isLight
                ? 'bg-white border-slate-300 shadow-sm'
                : 'bg-slate-900 border-slate-700/70'
            }`}
          >
            <Users className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
            <span className={`text-[11px] font-bold hidden sm:inline ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
              {language === 'zh' ? '门户:' : language === 'sw' ? 'Lango:' : 'Portal:'}
            </span>
            <select
              value={activeRole}
              onChange={(e) => {
                const newRole = e.target.value as UserRole;
                setActiveRole(newRole);
                if (newRole === 'Customer') setCurrentView('customer');
                else if (newRole === 'Technician' || newRole === 'Field Agent') setCurrentView('field');
                else if (newRole === 'Security Officer') setCurrentView('security');
                else if (newRole === 'CEO' || newRole === 'Finance Manager') setCurrentView('ceo');
                else setCurrentView('control-center');
              }}
              className={`bg-transparent text-xs font-black focus:outline-none cursor-pointer ${
                isLight ? 'text-slate-900' : 'text-slate-100'
              }`}
            >
              {roles.map((r) => (
                <option
                  key={r}
                  value={r}
                  className={isLight ? 'bg-white text-slate-900 font-bold' : 'bg-slate-900 text-slate-100'}
                >
                  {getRoleLabel(r)}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Mode Switcher */}
          <div
            className={`flex items-center p-0.5 rounded-lg border transition-colors ${
              isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-slate-900 border-slate-700'
            }`}
          >
            <button
              onClick={() => setTheme('light')}
              title={language === 'zh' ? '亮色主题' : language === 'sw' ? 'Mwangaza' : 'Light Mode'}
              className={`p-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                isLight
                  ? 'bg-amber-500 text-white shadow-sm font-black'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              title={language === 'zh' ? '深色主题' : language === 'sw' ? 'Giza' : 'Dark Mode'}
              className={`p-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                !isLight
                  ? 'bg-slate-800 text-emerald-400 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Languages Switcher: English, Swahili, Chinese */}
          <div
            className={`flex items-center p-0.5 rounded-lg border transition-colors ${
              isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-slate-900 border-slate-700'
            }`}
          >
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-black transition-all flex items-center gap-1 ${
                language === 'en'
                  ? isLight
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-emerald-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-700 hover:text-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
            <button
              onClick={() => setLanguage('sw')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-black transition-all flex items-center gap-1 ${
                language === 'sw'
                  ? isLight
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-emerald-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-700 hover:text-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🇹🇿</span>
              <span>SW</span>
            </button>
            <button
              onClick={() => setLanguage('zh')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-black transition-all flex items-center gap-1 ${
                language === 'zh'
                  ? isLight
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-emerald-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-700 hover:text-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🇨🇳</span>
              <span>中文</span>
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
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-700 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Bike className="w-6 h-6 text-white" />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <Radio className="w-2 h-2 text-white" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span
                className={`font-black text-xl tracking-tight font-mono ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                DAR<span className={isLight ? 'text-emerald-700' : 'text-emerald-400'}>RIDE</span>
              </span>
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded border font-mono ${
                  isLight
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}
              >
                100,000 BIKES
              </span>
            </div>
            <p className={`text-[10px] font-bold tracking-wide ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {language === 'zh'
                ? '达累斯萨拉姆 100,000 辆智能互联单车平台'
                : language === 'sw'
                ? 'Mtandao wa Baiskeli 100,000 Dar es Salaam'
                : 'Dar es Salaam 100,000 Smart Mobility Cloud'}
            </p>
          </div>
        </div>

        {/* Navigation View Switcher Pills */}
        <nav
          className={`hidden lg:flex items-center gap-1 p-1 rounded-xl border transition-colors ${
            isLight
              ? 'bg-slate-100 border-slate-300'
              : 'bg-slate-950/80 border-slate-800/80'
          }`}
        >
          {views.map((v) => {
            const Icon = v.icon;
            const isActive = currentView === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setCurrentView(v.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  isActive
                    ? isLight
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-white' : isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}
                />
                <span>{getViewLabel(v)}</span>
                {v.badge !== undefined && v.badge > 0 && (
                  <span className="bg-rose-600 text-white text-[10px] font-black px-1.5 rounded-full animate-pulse">
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
            className={`border text-xs rounded-lg px-2.5 py-2 font-black focus:outline-none ${
              isLight
                ? 'bg-white text-slate-900 border-slate-300 shadow-sm'
                : 'bg-slate-800 text-slate-100 border-slate-700'
            }`}
          >
            {views.map((v) => (
              <option
                key={v.id}
                value={v.id}
                className={isLight ? 'bg-white text-slate-900 font-bold' : 'bg-slate-900 text-slate-100'}
              >
                {getViewLabel(v)} {v.badge ? `(${v.badge})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
