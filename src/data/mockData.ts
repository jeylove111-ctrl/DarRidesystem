import { Zone, RentalPackage, Bicycle, MaintenanceTicket, SecurityAlert, RecoveryTask, PaymentTransaction, RebalanceRecommendation } from '../types';

export const DAR_ES_SALAAM_ZONES: Zone[] = [
  {
    id: 'zone-mwenge',
    name: 'Mwenge',
    swahiliName: 'Mwenge',
    center: { lat: -6.7725, lng: 39.2244 },
    radiusKm: 1.6,
    type: 'high_demand',
    targetFleet: 120,
    currentFleet: 94,
    demandLevel: 'HIGH',
  },
  {
    id: 'zone-masaki',
    name: 'Masaki',
    swahiliName: 'Masaki',
    center: { lat: -6.7450, lng: 39.2880 },
    radiusKm: 1.8,
    type: 'preferred_parking',
    targetFleet: 90,
    currentFleet: 12,
    demandLevel: 'VERY HIGH',
  },
  {
    id: 'zone-coco-beach',
    name: 'Coco Beach',
    swahiliName: 'Pwani ya Coco',
    center: { lat: -6.7760, lng: 39.2860 },
    radiusKm: 1.2,
    type: 'preferred_parking',
    targetFleet: 80,
    currentFleet: 65,
    demandLevel: 'HIGH',
  },
  {
    id: 'zone-kariakoo',
    name: 'Kariakoo Market',
    swahiliName: 'Soko la Kariakoo',
    center: { lat: -6.8200, lng: 39.2780 },
    radiusKm: 1.5,
    type: 'high_demand',
    targetFleet: 220,
    currentFleet: 5,
    demandLevel: 'EXTREMELY HIGH',
  },
  {
    id: 'zone-posta',
    name: 'Posta / CBD',
    swahiliName: 'Posta / Kati ya Jiji',
    center: { lat: -6.8160, lng: 39.2940 },
    radiusKm: 1.4,
    type: 'service_hub',
    targetFleet: 160,
    currentFleet: 142,
    demandLevel: 'HIGH',
  },
  {
    id: 'zone-msasani',
    name: 'Msasani Peninsula',
    swahiliName: 'Rasi ya Msasani',
    center: { lat: -6.7550, lng: 39.2720 },
    radiusKm: 1.5,
    type: 'preferred_parking',
    targetFleet: 75,
    currentFleet: 58,
    demandLevel: 'NORMAL',
  },
  {
    id: 'zone-oysterbay',
    name: 'Oyster Bay',
    swahiliName: 'Oyster Bay',
    center: { lat: -6.7820, lng: 39.2750 },
    radiusKm: 1.4,
    type: 'preferred_parking',
    targetFleet: 60,
    currentFleet: 49,
    demandLevel: 'NORMAL',
  },
  {
    id: 'zone-mikocheni',
    name: 'Mikocheni',
    swahiliName: 'Mikocheni',
    center: { lat: -6.7640, lng: 39.2430 },
    radiusKm: 1.7,
    type: 'preferred_parking',
    targetFleet: 85,
    currentFleet: 70,
    demandLevel: 'NORMAL',
  },
  {
    id: 'zone-ubungo',
    name: 'Ubungo Bus Terminal',
    swahiliName: 'Kituo cha Ubungo',
    center: { lat: -6.7850, lng: 39.2150 },
    radiusKm: 1.6,
    type: 'high_demand',
    targetFleet: 140,
    currentFleet: 110,
    demandLevel: 'VERY HIGH',
  },
  {
    id: 'zone-sinza',
    name: 'Sinza Commercial',
    swahiliName: 'Sinza',
    center: { lat: -6.7800, lng: 39.2300 },
    radiusKm: 1.3,
    type: 'preferred_parking',
    targetFleet: 95,
    currentFleet: 88,
    demandLevel: 'NORMAL',
  },
  {
    id: 'zone-kinondoni',
    name: 'Kinondoni',
    swahiliName: 'Kinondoni',
    center: { lat: -6.7880, lng: 39.2550 },
    radiusKm: 1.5,
    type: 'preferred_parking',
    targetFleet: 100,
    currentFleet: 78,
    demandLevel: 'NORMAL',
  },
  {
    id: 'zone-kigamboni',
    name: 'Kigamboni Ferry Bridge',
    swahiliName: 'Daraja la Kigamboni',
    center: { lat: -6.8320, lng: 39.3100 },
    radiusKm: 1.8,
    type: 'preferred_parking',
    targetFleet: 70,
    currentFleet: 42,
    demandLevel: 'NORMAL',
  },
  {
    id: 'zone-udsm',
    name: 'UDSM / Mlimani City',
    swahiliName: 'Chuo Kikuu UDSM / Mlimani City',
    center: { lat: -6.7760, lng: 39.2080 },
    radiusKm: 1.6,
    type: 'high_demand',
    targetFleet: 180,
    currentFleet: 165,
    demandLevel: 'VERY HIGH',
  },
];

export const RENTAL_PACKAGES: RentalPackage[] = [
  {
    id: 'pkg-3h',
    nameEn: 'Quick Ride (3 Hours)',
    nameSw: 'Safari ya Haraka (Masaa 3)',
    durationHours: 3,
    priceTsh: 500,
    popular: true,
    category: 'standard',
    descriptionEn: 'Perfect for short errands, market runs, or quick campus commutes.',
    descriptionSw: 'Inafaa kwa safari fupi, masoko, au mwendo wa chuo.',
  },
  {
    id: 'pkg-6h',
    nameEn: 'Half-Day Commuter (6 Hours)',
    nameSw: 'Nusu Siku (Masaa 6)',
    durationHours: 6,
    priceTsh: 1000,
    popular: true,
    category: 'commuter',
    descriptionEn: 'Ideal for work shifts, multi-stop business trips in CBD or Kariakoo.',
    descriptionSw: 'Inafaa kwa safari za kikazi, Posta, au mizunguko ya Kariakoo.',
  },
  {
    id: 'pkg-12h',
    nameEn: 'Full Day Explorer (12 Hours)',
    nameSw: 'Mchana Kutwa (Masaa 12)',
    durationHours: 12,
    priceTsh: 2000,
    category: 'standard',
    descriptionEn: 'Great for coastal touring, Coco Beach, Masaki dining, or daily commerce.',
    descriptionSw: 'Bora kwa kutembelea fukwe za Coco, Masaki, na shughuli za siku nzima.',
  },
  {
    id: 'pkg-24h',
    nameEn: '24-Hour Pass (Full Day & Night)',
    nameSw: 'Tiketi ya Masaa 24 (Mchana na Usiku)',
    durationHours: 24,
    priceTsh: 4000,
    category: 'tourist',
    descriptionEn: 'Full 24-hour flexibility with overnight secure smart locking anywhere in Dar.',
    descriptionSw: 'Uhuru kamili wa masaa 24 na ulinzi wa kufuli ya kidijitali usiku kucha.',
  },
  {
    id: 'pkg-student-weekly',
    nameEn: 'Student Weekly Pass (7 Days)',
    nameSw: 'Kifurushi cha Wanafunzi (Siku 7)',
    durationHours: 168,
    priceTsh: 2500,
    category: 'student',
    descriptionEn: 'Subsidized rate for UDSM, IFM, CBE, and Ardhi University students.',
    descriptionSw: 'Bei nafuu kwa wanafunzi wa vyuo vikuu vya Dar es Salaam.',
  },
  {
    id: 'pkg-monthly-unlimited',
    nameEn: 'Dar Commuter Monthly (30 Days)',
    nameSw: 'Mwezi Mzima wa Kusafiri (Siku 30)',
    durationHours: 720,
    priceTsh: 9500,
    category: 'corporate',
    descriptionEn: 'Unlimited rides up to 3 hours each per session for regular Dar commuters.',
    descriptionSw: 'Safari zisizo na kikomo kwa wasafiri wa kila siku jijini Dar.',
  },
];

// Helper to generate realistic Dar es Salaam coordinates with slight jitter around zones
function getRandomCoordsInZone(zone: Zone): { lat: number; lng: number } {
  const r = (zone.radiusKm / 111) * Math.sqrt(Math.random()) * 0.8;
  const theta = Math.random() * 2 * Math.PI;
  return {
    lat: Number((zone.center.lat + r * Math.cos(theta)).toFixed(6)),
    lng: Number((zone.center.lng + (r * Math.sin(theta)) / Math.cos(zone.center.lat * (Math.PI / 180))).toFixed(6)),
  };
}

export function generateSimulatedFleet(total: number = 1000): Bicycle[] {
  const fleet: Bicycle[] = [];
  const statusPool: { status: Bicycle['status']; weight: number }[] = [
    { status: 'AVAILABLE', weight: 580 },
    { status: 'RENTED', weight: 310 },
    { status: 'EXPIRING_SOON', weight: 35 },
    { status: 'PENDING_SAFE_LOCK', weight: 15 },
    { status: 'MAINTENANCE', weight: 30 },
    { status: 'SUSPICIOUS', weight: 12 },
    { status: 'RECOVERY', weight: 8 },
    { status: 'OFFLINE', weight: 10 },
  ];

  const tanzanianNames = [
    'Juma Rashid', 'Amina Bakari', 'Baraka Mwangi', 'Neema Kavishe', 'Emmanuel Mushi',
    'Fatma Ally', 'Josephat Tarimo', 'Zawadi Mtei', 'Kelvin Massawe', 'Rehema Hassan',
    'Godfrey Shirima', 'Saida Mwinyi', 'Hassan Said', 'Zainab Salim', 'David Mrema',
    'Farida Athuman', 'Innocent Kimaro', 'Grace Temu', 'Shabani Kibwana', 'Agnes Lyimo'
  ];

  let idCounter = 1;

  for (const zone of DAR_ES_SALAAM_ZONES) {
    const bikesInZoneCount = Math.floor((zone.targetFleet / 1500) * total) + Math.floor(Math.random() * 15);

    for (let i = 0; i < bikesInZoneCount && fleet.length < total; i++) {
      const formattedId = `DAR-${String(idCounter).padStart(6, '0')}`;
      const randVal = Math.random() * 1000;
      let cumulative = 0;
      let chosenStatus: Bicycle['status'] = 'AVAILABLE';

      for (const item of statusPool) {
        cumulative += item.weight;
        if (randVal <= cumulative) {
          chosenStatus = item.status;
          break;
        }
      }

      // If Kariakoo, force high rental
      if (zone.id === 'zone-kariakoo' && Math.random() > 0.15) {
        chosenStatus = 'RENTED';
      }

      const isRented = chosenStatus === 'RENTED' || chosenStatus === 'EXPIRING_SOON' || chosenStatus === 'PENDING_SAFE_LOCK';
      const isMoving = isRented ? Math.random() > 0.35 : false;
      const speed = isMoving ? Math.floor(Math.random() * 16 + 6) : 0;
      const battery = chosenStatus === 'MAINTENANCE' && Math.random() > 0.5 ? Math.floor(Math.random() * 15) : Math.floor(Math.random() * 60 + 40);
      const isTampered = chosenStatus === 'SUSPICIOUS' || chosenStatus === 'RECOVERY';

      const renterName = isRented ? tanzanianNames[Math.floor(Math.random() * tanzanianNames.length)] : undefined;
      const renterPhone = isRented ? `+255 7${Math.floor(10000000 + Math.random() * 89999999)}` : undefined;

      const paymentNum = `55${String(idCounter).padStart(4, '0')}`;
      const ussdCode = `*150*00*${paymentNum}#`;

      fleet.push({
        id: formattedId,
        uniquePaymentNumber: paymentNum,
        ussdQuickCode: ussdCode,
        iotDeviceId: `IOT-TZ-${Math.floor(100000 + Math.random() * 900000)}`,
        lockId: `LCK-${Math.floor(1000 + Math.random() * 9000)}`,
        macAddress: `4A:8B:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}`,
        firmwareVersion: 'v2.4.1-dar-iot',
        coordinates: getRandomCoordsInZone(zone),
        zone: zone.name,
        status: chosenStatus,
        batteryPercent: battery,
        solarCharging: Math.random() > 0.3,
        speedKmh: speed,
        headingDeg: Math.floor(Math.random() * 360),
        isMoving: isMoving,
        isLocked: !isRented,
        gpsSignalQuality: Math.random() > 0.1 ? 'EXCELLENT' : (Math.random() > 0.5 ? 'GOOD' : 'FAIR'),
        tamperDetected: isTampered,
        tamperReason: isTampered ? (Math.random() > 0.5 ? 'GEOFENCE_BREACH_COASTAL' : 'ACCELEROMETER_HIGH_IMPACT_LOCKED') : undefined,
        lastCommunicationTime: new Date(Date.now() - Math.floor(Math.random() * 180000)).toISOString(),
        lastMovementTime: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString(),
        hoursInactive: chosenStatus === 'AVAILABLE' ? Math.floor(Math.random() * 30) : 0,
        currentRentalId: isRented ? `RNT-${Math.floor(100000 + Math.random() * 900000)}` : undefined,
        currentRenterName: renterName,
        currentRenterPhone: renterPhone,
        totalTrips: Math.floor(Math.random() * 120 + 20),
        totalDistanceKm: Math.floor(Math.random() * 850 + 120),
        hardware: {
          frameNumber: `TZ-DAR-FRM-${Math.floor(100000 + Math.random() * 900000)}`,
          tireType: Math.random() > 0.4 ? 'Puncture-Resistant Solid-Core' : 'Reinforced Urban Pneumatic',
          brakeHealth: Math.floor(Math.random() * 35 + 65),
          chainHealth: Math.floor(Math.random() * 30 + 70),
          solarPanelWatts: 8.5,
        },
      });

      idCounter++;
    }
  }

  // Fill up to total with general Dar city center bikes if needed
  while (fleet.length < total) {
    const zone = DAR_ES_SALAAM_ZONES[fleet.length % DAR_ES_SALAAM_ZONES.length];
    const formattedId = `DAR-${String(idCounter).padStart(6, '0')}`;
    const paymentNum = `55${String(idCounter).padStart(4, '0')}`;
    const ussdCode = `*150*00*${paymentNum}#`;

    fleet.push({
      id: formattedId,
      uniquePaymentNumber: paymentNum,
      ussdQuickCode: ussdCode,
      iotDeviceId: `IOT-TZ-${Math.floor(100000 + Math.random() * 900000)}`,
      lockId: `LCK-${Math.floor(1000 + Math.random() * 9000)}`,
      macAddress: `4A:8B:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}`,
      firmwareVersion: 'v2.4.1-dar-iot',
      coordinates: getRandomCoordsInZone(zone),
      zone: zone.name,
      status: 'AVAILABLE',
      batteryPercent: 88,
      solarCharging: true,
      speedKmh: 0,
      headingDeg: 0,
      isMoving: false,
      isLocked: true,
      gpsSignalQuality: 'EXCELLENT',
      tamperDetected: false,
      lastCommunicationTime: new Date().toISOString(),
      lastMovementTime: new Date(Date.now() - 3600000).toISOString(),
      hoursInactive: 2,
      totalTrips: 45,
      totalDistanceKm: 280,
      hardware: {
        frameNumber: `TZ-DAR-FRM-${Math.floor(100000 + Math.random() * 900000)}`,
        tireType: 'Puncture-Resistant Solid-Core',
        brakeHealth: 92,
        chainHealth: 88,
        solarPanelWatts: 8.5,
      },
    });
    idCounter++;
  }

  return fleet;
}

export const INITIAL_MAINTENANCE_TICKETS: MaintenanceTicket[] = [
  {
    id: 'MT-000928',
    bicycleId: 'DAR-000928',
    reportedBy: 'Customer (Via App QR Scan)',
    reportedTime: '10 mins ago',
    issue: 'Puncture / Flat Tire',
    priority: 'HIGH',
    status: 'ASSIGNED',
    assignedTechnician: 'Technician 17 (Mwenge Hub)',
    location: 'Masaki, Haile Selassie Rd',
    coordinates: { lat: -6.7462, lng: 39.2845 },
    notes: 'Tire hit sharp debris near roundabout. Puncture-resistant lining held air temporarily.',
  },
  {
    id: 'MT-000921',
    bicycleId: 'DAR-009821',
    reportedBy: 'IoT Automated Self-Diagnostic',
    reportedTime: '35 mins ago',
    issue: 'Lock Problem',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    assignedTechnician: 'Technician 04 (Kariakoo)',
    location: 'Kariakoo Market Gate 3',
    coordinates: { lat: -6.8205, lng: 39.2778 },
    notes: 'Electronic solenoid reported lock resistance. Field agent dispatching to inspect mechanical shackle.',
  },
  {
    id: 'MT-000894',
    bicycleId: 'DAR-000312',
    reportedBy: 'Field Agent Juma',
    reportedTime: '1 hour ago',
    issue: 'Brake Failure',
    priority: 'CRITICAL',
    status: 'OPEN',
    assignedTechnician: 'Technician 09 (Posta Depot)',
    location: 'Posta Kivukoni Ferry',
    coordinates: { lat: -6.8155, lng: 39.2938 },
    notes: 'Front drum brake cable tension low. Locked remotely to prevent new rentals.',
  },
  {
    id: 'MT-000880',
    bicycleId: 'DAR-000104',
    reportedBy: 'Customer App',
    reportedTime: '2 hours ago',
    issue: 'GPS / IoT Issue',
    priority: 'MEDIUM',
    status: 'REPAIRED',
    assignedTechnician: 'Technician 02 (Sinza)',
    location: 'Sinza Kumekucha',
    coordinates: { lat: -6.7795, lng: 39.2312 },
    notes: 'Antenna connector re-seated and firmware re-flashed. GPS signal telemetry normal at -120dBm.',
    resolvedAt: '15 mins ago',
  },
];

export const INITIAL_SECURITY_ALERTS: SecurityAlert[] = [
  {
    id: 'SEC-8821',
    bicycleId: 'DAR-002891',
    type: 'GEOFENCE_EXIT',
    priority: 'CRITICAL',
    timestamp: 'Just now (18:42)',
    location: { lat: -6.8720, lng: 39.1820 },
    zoneName: 'Outside Dar Operating Zone (Mbagala Boundary)',
    description: 'Bicycle DAR-002891 has crossed outer Dar es Salaam geofence boundary heading south-west. Active rental session. Customer notified via SMS & In-app voice prompt.',
    resolved: false,
    recoveryTaskId: 'REC-392',
  },
  {
    id: 'SEC-8819',
    bicycleId: 'DAR-000412',
    type: 'SUSPICIOUS_MOVEMENT_LOCKED',
    priority: 'HIGH',
    timestamp: '8 mins ago',
    location: { lat: -6.7410, lng: 39.2910 },
    zoneName: 'Masaki Waterfront',
    description: 'Accelerometer detected 22 km/h movement while smart lock is in state LOCKED (vehicle transport suspected). High decibel internal anti-theft buzzer triggered.',
    resolved: false,
  },
  {
    id: 'SEC-8812',
    bicycleId: 'DAR-001092',
    type: 'TAMPER_SENSOR',
    priority: 'HIGH',
    timestamp: '25 mins ago',
    location: { lat: -6.7910, lng: 39.2290 },
    zoneName: 'Manzese Bakhresa',
    description: 'IoT secure chassis compartment switch opened. Tamper seal broken alert broadcasted to Control Center.',
    resolved: false,
  },
  {
    id: 'SEC-8790',
    bicycleId: 'DAR-000780',
    type: 'PROLONGED_INACTIVITY',
    priority: 'MEDIUM',
    timestamp: '4 hours ago',
    location: { lat: -6.7740, lng: 39.2210 },
    zoneName: 'Mwenge Alley 4',
    description: 'Bicycle has been stationary for 48+ hours in an irregular parking alley. Field worker task created for visual inspection.',
    resolved: true,
    resolvedBy: 'Agent Baraka',
  },
];

export const INITIAL_RECOVERY_TASKS: RecoveryTask[] = [
  {
    id: 'REC-392',
    bicycleId: 'DAR-002891',
    reason: 'Geofence Breach past outer zone boundary',
    priority: 'CRITICAL',
    status: 'EN_ROUTE',
    assignedAgent: 'Recovery Unit Alpha (Officer Salum)',
    lastKnownCoordinates: { lat: -6.8720, lng: 39.1820 },
    batteryPercent: 78,
    lockStatus: 'UNLOCKED',
    createdAt: '12 mins ago',
  },
  {
    id: 'REC-391',
    bicycleId: 'DAR-000412',
    reason: 'Moving while in LOCKED state (Vehicle loading)',
    priority: 'HIGH',
    status: 'ASSIGNED',
    assignedAgent: 'Field Agent Baraka (Masaki)',
    lastKnownCoordinates: { lat: -6.7410, lng: 39.2910 },
    batteryPercent: 64,
    lockStatus: 'LOCKED',
    createdAt: '8 mins ago',
  },
  {
    id: 'REC-389',
    bicycleId: 'DAR-000088',
    reason: '72-Hour Inactivity in low-light alley',
    priority: 'LOW',
    status: 'PENDING',
    lastKnownCoordinates: { lat: -6.7840, lng: 39.2610 },
    batteryPercent: 82,
    lockStatus: 'LOCKED',
    createdAt: '3 hours ago',
  },
];

export const INITIAL_REBALANCE_RECOMMENDATIONS: RebalanceRecommendation[] = [
  {
    id: 'REB-101',
    sourceZone: 'Posta / CBD (Surplus: 142 bikes)',
    targetZone: 'Kariakoo Market (Critical: only 5 bikes)',
    bikesToMove: 150,
    priority: 'EXTREME',
    reason: 'Kariakoo peak trading hour (11:00-16:00). High commuter demand from market traders & shoppers.',
    estimatedDemandSurge: '+320% unmet ride requests',
  },
  {
    id: 'REB-102',
    sourceZone: 'Mwenge Depot / Sinza',
    targetZone: 'Masaki Peninsula & Coco Beach',
    bikesToMove: 80,
    priority: 'HIGH',
    reason: 'Sunset beachfront and evening dining rush at Coco Beach & Masaki (16:30-21:00).',
    estimatedDemandSurge: '+190% weekend leisure rides',
  },
  {
    id: 'REB-103',
    sourceZone: 'Ubungo Bus Terminal Hub',
    targetZone: 'UDSM / Mlimani City Campus',
    bikesToMove: 45,
    priority: 'NORMAL',
    reason: 'Class dismissal peak at University of Dar es Salaam Main Campus.',
    estimatedDemandSurge: '+85% student commuter volume',
  },
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'TXN-MPESA-8849201',
    rentalId: 'RNT-94821',
    bicycleId: 'DAR-000928',
    userId: 'USR-8821',
    userName: 'Amina Bakari',
    phone: '+255 754 883 921',
    provider: 'M-Pesa',
    amountTsh: 1000,
    status: 'SUCCESS',
    reference: 'DAR-MPESA-99238',
    timestamp: '12:30:15',
    gatewayResponseCode: 'VODA_00_SUCCESS',
    isBackendVerified: true,
  },
  {
    id: 'TXN-AIRTEL-8849202',
    rentalId: 'RNT-94822',
    bicycleId: 'DAR-000104',
    userId: 'USR-8822',
    userName: 'Juma Rashid',
    phone: '+255 784 102 944',
    provider: 'Airtel Money',
    amountTsh: 500,
    status: 'SUCCESS',
    reference: 'AIRTEL-TZ-5519',
    timestamp: '12:45:02',
    gatewayResponseCode: 'AIRTEL_SUCCESS_0',
    isBackendVerified: true,
  },
  {
    id: 'TXN-TIGO-8849203',
    rentalId: 'RNT-94823',
    bicycleId: 'DAR-000552',
    userId: 'USR-8823',
    userName: 'Neema Kavishe',
    phone: '+255 713 409 118',
    provider: 'Tigo Pesa',
    amountTsh: 2000,
    status: 'SUCCESS',
    reference: 'TIGO-PESA-8821',
    timestamp: '13:02:44',
    gatewayResponseCode: 'TIGO_AUTH_VALID',
    isBackendVerified: true,
  },
  {
    id: 'TXN-HALO-8849204',
    rentalId: 'RNT-94824',
    bicycleId: 'DAR-000881',
    userId: 'USR-8824',
    userName: 'Emmanuel Mushi',
    phone: '+255 622 994 012',
    provider: 'HaloPesa',
    amountTsh: 500,
    status: 'SUCCESS',
    reference: 'HALO-PAY-4412',
    timestamp: '13:14:10',
    gatewayResponseCode: 'HALO_CONFIRM_OK',
    isBackendVerified: true,
  },
];
