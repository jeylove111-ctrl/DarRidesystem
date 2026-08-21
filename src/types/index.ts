export type Language = 'en' | 'sw' | 'zh';
export type ThemeMode = 'dark' | 'light';

export type BicycleState =
  | 'AVAILABLE'
  | 'RESERVED'
  | 'PAYMENT_PENDING'
  | 'RENTED'
  | 'EXPIRING_SOON'
  | 'EXPIRED'
  | 'PENDING_SAFE_LOCK'
  | 'LOCKED'
  | 'MAINTENANCE'
  | 'OFFLINE'
  | 'SUSPICIOUS'
  | 'RECOVERY'
  | 'RETIRED';

export type MobileMoneyProvider = 'M-Pesa' | 'Airtel Money' | 'Tigo Pesa' | 'HaloPesa';

export type UserRole =
  | 'Operations Manager'
  | 'Fleet Manager'
  | 'Security Officer'
  | 'Field Agent'
  | 'Maintenance Manager'
  | 'Technician'
  | 'Customer Support'
  | 'Finance Manager'
  | 'CEO'
  | 'Super Admin'
  | 'Customer';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Zone {
  id: string;
  name: string;
  swahiliName: string;
  center: Coordinates;
  radiusKm: number;
  type: 'preferred_parking' | 'high_demand' | 'restricted' | 'service_hub' | 'no_parking';
  targetFleet: number;
  currentFleet: number;
  demandLevel: 'LOW' | 'NORMAL' | 'HIGH' | 'VERY HIGH' | 'EXTREMELY HIGH';
}

export interface Bicycle {
  id: string; // e.g. DAR-000928
  uniquePaymentNumber: string; // e.g. 550928 (Unique 6-digit Lipa Namba for offline USSD payment)
  ussdQuickCode: string; // e.g. *150*00*550928#
  iotDeviceId: string; // e.g. IOT-TZ-88492
  lockId: string; // e.g. LCK-2091
  macAddress: string;
  firmwareVersion: string;
  coordinates: Coordinates;
  zone: string;
  status: BicycleState;
  batteryPercent: number;
  solarCharging: boolean;
  speedKmh: number;
  headingDeg: number;
  isMoving: boolean;
  isLocked: boolean;
  gpsSignalQuality: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'LOST';
  tamperDetected: boolean;
  tamperReason?: string;
  lastCommunicationTime: string;
  lastMovementTime: string;
  hoursInactive: number;
  currentRentalId?: string;
  currentRenterName?: string;
  currentRenterPhone?: string;
  totalTrips: number;
  totalDistanceKm: number;
  hardware: {
    frameNumber: string;
    tireType: 'Puncture-Resistant Solid-Core' | 'Reinforced Urban Pneumatic';
    brakeHealth: number; // 0-100%
    chainHealth: number;
    solarPanelWatts: number;
  };
}

export interface RentalPackage {
  id: string;
  nameEn: string;
  nameSw: string;
  durationHours: number;
  priceTsh: number;
  popular?: boolean;
  category: 'standard' | 'student' | 'commuter' | 'tourist' | 'corporate';
  descriptionEn: string;
  descriptionSw: string;
}

export interface Rental {
  id: string; // e.g. RNT-94821
  bicycleId: string;
  uniquePaymentNumber?: string;
  userId: string;
  userName: string;
  userPhone: string;
  packageId: string;
  packageName: string;
  startTime: string; // ISO string
  durationHours: number;
  expiresAt: string; // ISO string
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'COMPLETED' | 'SAFE_LOCK_PENDING';
  totalPriceTsh: number;
  paymentMethod: MobileMoneyProvider;
  paymentChannel?: 'APP_QR' | 'OFFLINE_USSD' | 'WEB_PORTAL';
  transactionId: string;
  paymentVerified: boolean;
  startLocation: Coordinates;
  currentLocation: Coordinates;
  endLocation?: Coordinates;
  distanceCoveredKm: number;
  safeLockCountdownSeconds?: number;
}

export interface PaymentTransaction {
  id: string; // e.g. TXN-MPESA-9938210
  rentalId?: string;
  bicycleId?: string;
  uniquePaymentNumber?: string;
  paymentChannel?: 'APP_QR' | 'OFFLINE_USSD' | 'WEB_PORTAL';
  userId: string;
  userName: string;
  phone: string;
  provider: MobileMoneyProvider;
  amountTsh: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  reference: string;
  timestamp: string;
  gatewayResponseCode: string;
  isBackendVerified: boolean;
}

export interface SecurityAlert {
  id: string;
  bicycleId: string;
  type:
    | 'GEOFENCE_EXIT'
    | 'TAMPER_SENSOR'
    | 'SUSPICIOUS_MOVEMENT_LOCKED'
    | 'OFFLINE_UNEXPECTED'
    | 'PROLONGED_INACTIVITY'
    | 'SMART_LOCK_FAILURE'
    | 'UNAUTHORIZED_DISASSEMBLY';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: string;
  location: Coordinates;
  zoneName: string;
  description: string;
  resolved: boolean;
  resolvedBy?: string;
  recoveryTaskId?: string;
}

export interface MaintenanceTicket {
  id: string; // e.g. MT-000928
  bicycleId: string;
  reportedBy: string;
  reportedTime: string;
  issue:
    | 'Puncture / Flat Tire'
    | 'Brake Failure'
    | 'Broken Chain'
    | 'Damaged Wheel'
    | 'Seat Problem'
    | 'Lock Problem'
    | 'GPS / IoT Issue'
    | 'Battery Issue'
    | 'Accident'
    | 'Other';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'REPAIRED' | 'VERIFIED' | 'CLOSED';
  assignedTechnician?: string;
  location: string;
  coordinates: Coordinates;
  notes?: string;
  photoUrl?: string;
  resolvedAt?: string;
}

export interface RecoveryTask {
  id: string; // e.g. REC-392
  bicycleId: string;
  reason: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'PENDING' | 'ASSIGNED' | 'EN_ROUTE' | 'RECOVERED' | 'DEPOT_STORED';
  assignedAgent?: string;
  lastKnownCoordinates: Coordinates;
  batteryPercent: number;
  lockStatus: 'LOCKED' | 'UNLOCKED' | 'UNKNOWN';
  createdAt: string;
}

export interface RebalanceRecommendation {
  id: string;
  sourceZone: string;
  targetZone: string;
  bikesToMove: number;
  priority: 'HIGH' | 'EXTREME' | 'NORMAL';
  reason: string;
  estimatedDemandSurge: string;
}
