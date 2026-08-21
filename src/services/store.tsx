import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Bicycle,
  Language,
  MaintenanceTicket,
  PaymentTransaction,
  RecoveryTask,
  Rental,
  RentalPackage,
  SecurityAlert,
  UserRole,
  Zone,
  RebalanceRecommendation,
  MobileMoneyProvider,
} from '../types';
import {
  DAR_ES_SALAAM_ZONES,
  RENTAL_PACKAGES,
  INITIAL_MAINTENANCE_TICKETS,
  INITIAL_SECURITY_ALERTS,
  INITIAL_RECOVERY_TASKS,
  INITIAL_TRANSACTIONS,
  INITIAL_REBALANCE_RECOMMENDATIONS,
  generateSimulatedFleet,
} from '../data/mockData';

interface DarRideContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  
  // Data
  fleet: Bicycle[];
  zones: Zone[];
  packages: RentalPackage[];
  rentals: Rental[];
  activeUserRental: Rental | null;
  transactions: PaymentTransaction[];
  alerts: SecurityAlert[];
  tickets: MaintenanceTicket[];
  recoveryTasks: RecoveryTask[];
  rebalanceRecs: RebalanceRecommendation[];
  
  // Stats
  metrics: {
    totalFleetCapacity: number;
    totalBikes: number;
    availableBikes: number;
    rentedBikes: number;
    maintenanceBikes: number;
    offlineBikes: number;
    suspiciousBikes: number;
    todayRevenueTsh: number;
    totalRidesToday: number;
    averageRideMinutes: number;
    activeGeofenceBreaches: number;
  };
  
  // Actions
  createRental: (
    bikeId: string,
    packageId: string,
    provider: MobileMoneyProvider,
    phoneNumber: string,
    renterName: string,
    channel?: 'APP_QR' | 'OFFLINE_USSD' | 'WEB_PORTAL'
  ) => Promise<{ success: boolean; rental?: Rental; error?: string }>;

  createOfflineUssdRental: (
    paymentNumber: string,
    provider: MobileMoneyProvider,
    phoneNumber: string,
    amountTsh: number,
    renterName?: string
  ) => Promise<{ success: boolean; rental?: Rental; bicycle?: Bicycle; error?: string }>;
  
  endRental: (rentalId: string) => void;
  triggerEmergencyLock: (bikeId: string) => void;
  triggerRemoteUnlock: (bikeId: string) => void;
  submitMaintenanceTicket: (
    bikeId: string,
    issue: MaintenanceTicket['issue'],
    priority: MaintenanceTicket['priority'],
    location: string,
    notes: string,
    photoUrl?: string
  ) => void;
  updateTicketStatus: (ticketId: string, status: MaintenanceTicket['status']) => void;
  resolveSecurityAlert: (alertId: string, resolvedBy: string) => void;
  completeRecoveryTask: (taskId: string, notes?: string) => void;
  
  // Simulation Controls
  isSimulatingMovement: boolean;
  setIsSimulatingMovement: (val: boolean) => void;
  simulationSpeedMultiplier: number;
  setSimulationSpeedMultiplier: (val: number) => void;
  triggerSimulatedTheft: () => void;
  triggerSimulatedPuncture: () => void;
  triggerGeofenceBreach: () => void;
  selectedBike: Bicycle | null;
  setSelectedBike: (bike: Bicycle | null) => void;
}

const DarRideContext = createContext<DarRideContextType | undefined>(undefined);

export const DarRideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeRole, setActiveRole] = useState<UserRole>('Customer');
  const [currentView, setCurrentView] = useState<string>('landing'); // landing, customer, control-center, security, field, ceo, ai-rebalance, iot-sim, architecture
  
  // Core state
  const [fleet, setFleet] = useState<Bicycle[]>(() => generateSimulatedFleet(1000));
  const [zones] = useState<Zone[]>(DAR_ES_SALAAM_ZONES);
  const [packages] = useState<RentalPackage[]>(RENTAL_PACKAGES);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_MAINTENANCE_TICKETS);
  const [alerts, setAlerts] = useState<SecurityAlert[]>(INITIAL_SECURITY_ALERTS);
  const [recoveryTasks, setRecoveryTasks] = useState<RecoveryTask[]>(INITIAL_RECOVERY_TASKS);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [rebalanceRecs, setRebalanceRecs] = useState<RebalanceRecommendation[]>(INITIAL_REBALANCE_RECOMMENDATIONS);
  
  // Customer active rental session
  const [activeUserRental, setActiveUserRental] = useState<Rental | null>(null);
  const [selectedBike, setSelectedBike] = useState<Bicycle | null>(null);
  
  // Simulation params
  const [isSimulatingMovement, setIsSimulatingMovement] = useState<boolean>(true);
  const [simulationSpeedMultiplier, setSimulationSpeedMultiplier] = useState<number>(1);

  // Background GPS & State Engine Simulation Tick (every 3 seconds)
  useEffect(() => {
    if (!isSimulatingMovement) return;

    const interval = setInterval(() => {
      setFleet((prevFleet) =>
        prevFleet.map((bike) => {
          if (bike.status === 'RENTED' || bike.status === 'EXPIRING_SOON') {
            // Jitter/move coordinate slightly
            const deltaLat = (Math.random() - 0.5) * 0.0003 * simulationSpeedMultiplier;
            const deltaLng = (Math.random() - 0.5) * 0.0003 * simulationSpeedMultiplier;
            const isNowMoving = Math.random() > 0.2;
            const speed = isNowMoving ? Math.floor(Math.random() * 14 + 8) : 0;
            const batteryDrain = Math.random() > 0.7 ? 1 : 0;

            return {
              ...bike,
              coordinates: {
                lat: Number((bike.coordinates.lat + deltaLat).toFixed(6)),
                lng: Number((bike.coordinates.lng + deltaLng).toFixed(6)),
              },
              speedKmh: speed,
              isMoving: isNowMoving,
              batteryPercent: Math.max(5, bike.batteryPercent - batteryDrain),
              lastCommunicationTime: new Date().toISOString(),
              totalDistanceKm: bike.totalDistanceKm + (isNowMoving ? 0.02 : 0),
            };
          }

          if (bike.status === 'PENDING_SAFE_LOCK') {
            // Check if stationary for safe auto-lock
            if (!bike.isMoving) {
              // Lock it safely!
              return {
                ...bike,
                status: 'LOCKED',
                isLocked: true,
                speedKmh: 0,
                lastCommunicationTime: new Date().toISOString(),
              };
            }
          }

          // Ambient solar charge during daytime
          if (bike.solarCharging && bike.batteryPercent < 98 && Math.random() > 0.8) {
            return {
              ...bike,
              batteryPercent: Math.min(100, bike.batteryPercent + 1),
            };
          }

          return bike;
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [isSimulatingMovement, simulationSpeedMultiplier]);

  // Handle active user rental countdown
  useEffect(() => {
    if (!activeUserRental) return;

    const interval = setInterval(() => {
      const expires = new Date(activeUserRental.expiresAt).getTime();
      const now = Date.now();
      const remainingSeconds = Math.max(0, Math.floor((expires - now) / 1000));

      if (remainingSeconds <= 0 && activeUserRental.status === 'ACTIVE') {
        // Mark as expiring / pending safe lock
        setActiveUserRental((prev) => (prev ? { ...prev, status: 'SAFE_LOCK_PENDING' } : null));
        
        // Update bike status in fleet
        setFleet((prev) =>
          prev.map((b) => (b.id === activeUserRental.bicycleId ? { ...b, status: 'PENDING_SAFE_LOCK' } : b))
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeUserRental]);

  // Derived Metrics
  const metrics = {
    totalFleetCapacity: 100000,
    totalBikes: fleet.length,
    availableBikes: fleet.filter((b) => b.status === 'AVAILABLE').length,
    rentedBikes: fleet.filter((b) => b.status === 'RENTED' || b.status === 'EXPIRING_SOON').length,
    maintenanceBikes: fleet.filter((b) => b.status === 'MAINTENANCE').length,
    offlineBikes: fleet.filter((b) => b.status === 'OFFLINE').length,
    suspiciousBikes: fleet.filter((b) => b.status === 'SUSPICIOUS' || b.status === 'RECOVERY').length,
    todayRevenueTsh: transactions
      .filter((t) => t.status === 'SUCCESS')
      .reduce((sum, t) => sum + t.amountTsh, 200000000), // TZS 200,000,000 base (100,000 bikes × 2 rentals in 12hrs @ TSh 1,000/6hrs) + live txns
    totalRidesToday: 200000 + transactions.length, // 200,000 completed rides in 12-hour operational window
    averageRideMinutes: 44,
    activeGeofenceBreaches: alerts.filter((a) => a.type === 'GEOFENCE_EXIT' && !a.resolved).length,
  };

  // Actions
  const createRental = async (
    bikeId: string,
    packageId: string,
    provider: MobileMoneyProvider,
    phoneNumber: string,
    renterName: string,
    channel: 'APP_QR' | 'OFFLINE_USSD' | 'WEB_PORTAL' = 'APP_QR'
  ): Promise<{ success: boolean; rental?: Rental; error?: string }> => {
    const pkg = packages.find((p) => p.id === packageId) || packages[0];
    const bike = fleet.find((b) => b.id === bikeId || b.uniquePaymentNumber === bikeId);

    if (!bike) {
      return { success: false, error: 'Bicycle not found.' };
    }

    if (bike.status !== 'AVAILABLE') {
      return { success: false, error: `Bicycle ${bike.id} is currently ${bike.status}.` };
    }

    // Backend verification simulation:
    // Create payment transaction
    const txnId = `TXN-${provider.toUpperCase().replace(/\s+/g, '')}-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const newTxn: PaymentTransaction = {
      id: txnId,
      bicycleId: bike.id,
      uniquePaymentNumber: bike.uniquePaymentNumber,
      paymentChannel: channel,
      userId: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      userName: renterName || 'Dar Rider',
      phone: phoneNumber,
      provider: provider,
      amountTsh: pkg.priceTsh,
      status: 'SUCCESS',
      reference: `DAR-REF-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleTimeString(),
      gatewayResponseCode: 'GATEWAY_SUCCESS_VERIFIED',
      isBackendVerified: true,
    };

    setTransactions((prev) => [newTxn, ...prev]);

    // Create rental
    const startTime = new Date();
    const expiresAt = new Date(startTime.getTime() + pkg.durationHours * 3600 * 1000);
    const rentalId = `RNT-${Math.floor(100000 + Math.random() * 900000)}`;

    const newRental: Rental = {
      id: rentalId,
      bicycleId: bike.id,
      uniquePaymentNumber: bike.uniquePaymentNumber,
      userId: newTxn.userId,
      userName: newTxn.userName,
      userPhone: phoneNumber,
      packageId: pkg.id,
      packageName: pkg.nameEn,
      startTime: startTime.toISOString(),
      durationHours: pkg.durationHours,
      expiresAt: expiresAt.toISOString(),
      status: 'ACTIVE',
      totalPriceTsh: pkg.priceTsh,
      paymentMethod: provider,
      paymentChannel: channel,
      transactionId: txnId,
      paymentVerified: true,
      startLocation: bike.coordinates,
      currentLocation: bike.coordinates,
      distanceCoveredKm: 0.1,
    };

    setActiveUserRental(newRental);

    // Update bike in fleet
    setFleet((prev) =>
      prev.map((b) =>
        b.id === bike.id
          ? {
              ...b,
              status: 'RENTED',
              isLocked: false,
              currentRentalId: rentalId,
              currentRenterName: newTxn.userName,
              currentRenterPhone: phoneNumber,
              totalTrips: b.totalTrips + 1,
            }
          : b
      )
    );

    return { success: true, rental: newRental };
  };

  // Offline USSD Payment Handler (Direct dial from simple tochi phones or mobile money USSD menu)
  const createOfflineUssdRental = async (
    paymentNumber: string,
    provider: MobileMoneyProvider,
    phoneNumber: string,
    amountTsh: number,
    renterName?: string
  ): Promise<{ success: boolean; rental?: Rental; bicycle?: Bicycle; error?: string }> => {
    // Find bicycle by uniquePaymentNumber or ID
    const cleanNum = paymentNumber.replace(/\D/g, '');
    const bike = fleet.find(
      (b) =>
        b.uniquePaymentNumber === cleanNum ||
        b.uniquePaymentNumber === paymentNumber ||
        b.id.toUpperCase() === paymentNumber.toUpperCase()
    );

    if (!bike) {
      return { success: false, error: `No bicycle registered with unique Lipa Namba ${paymentNumber}.` };
    }

    if (bike.status !== 'AVAILABLE') {
      return {
        success: false,
        error: `Bicycle ${bike.id} (Lipa Namba ${bike.uniquePaymentNumber}) is currently ${bike.status}.`,
        bicycle: bike,
      };
    }

    // Determine package from amount:
    // TSh 500 = 3h, TSh 1000 = 6h, TSh 2000 = 12h, TSh 4000 = 24h
    let matchedPkg = packages.find((p) => p.priceTsh === amountTsh);
    if (!matchedPkg) {
      matchedPkg =
        amountTsh <= 500
          ? packages.find((p) => p.id === 'pkg-3h')
          : amountTsh <= 1000
          ? packages.find((p) => p.id === 'pkg-6h')
          : amountTsh <= 2000
          ? packages.find((p) => p.id === 'pkg-12h')
          : packages.find((p) => p.id === 'pkg-24h') || packages[0];
    }

    return createRental(
      bike.id,
      matchedPkg?.id || 'pkg-6h',
      provider,
      phoneNumber,
      renterName || `USSD Rider (${phoneNumber.slice(-4)})`,
      'OFFLINE_USSD'
    ).then((res) => ({
      ...res,
      bicycle: bike,
    }));
  };

  const endRental = (rentalId: string) => {
    if (activeUserRental && activeUserRental.id === rentalId) {
      const bikeId = activeUserRental.bicycleId;
      setActiveUserRental(null);

      setFleet((prev) =>
        prev.map((b) =>
          b.id === bikeId
            ? {
                ...b,
                status: 'AVAILABLE',
                isLocked: true,
                isMoving: false,
                speedKmh: 0,
                currentRentalId: undefined,
                currentRenterName: undefined,
                currentRenterPhone: undefined,
              }
            : b
        )
      );
    }
  };

  const triggerEmergencyLock = (bikeId: string) => {
    setFleet((prev) =>
      prev.map((b) =>
        b.id === bikeId
          ? {
              ...b,
              status: 'LOCKED',
              isLocked: true,
              isMoving: false,
              speedKmh: 0,
            }
          : b
      )
    );
  };

  const triggerRemoteUnlock = (bikeId: string) => {
    setFleet((prev) =>
      prev.map((b) =>
        b.id === bikeId
          ? {
              ...b,
              isLocked: false,
            }
          : b
      )
    );
  };

  const submitMaintenanceTicket = (
    bikeId: string,
    issue: MaintenanceTicket['issue'],
    priority: MaintenanceTicket['priority'],
    location: string,
    notes: string,
    photoUrl?: string
  ) => {
    const newTicket: MaintenanceTicket = {
      id: `MT-${String(Math.floor(1000 + Math.random() * 9000))}`,
      bicycleId: bikeId,
      reportedBy: activeRole === 'Customer' ? 'Customer App' : `${activeRole} Report`,
      reportedTime: 'Just now',
      issue,
      priority,
      status: 'OPEN',
      location: location || 'Dar es Salaam Zone',
      coordinates: fleet.find((b) => b.id === bikeId)?.coordinates || { lat: -6.7725, lng: 39.2244 },
      notes,
      photoUrl,
    };

    setTickets((prev) => [newTicket, ...prev]);

    // Update bike status to MAINTENANCE
    setFleet((prev) =>
      prev.map((b) => (b.id === bikeId ? { ...b, status: 'MAINTENANCE', isLocked: true } : b))
    );
  };

  const updateTicketStatus = (ticketId: string, status: MaintenanceTicket['status']) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const updated = { ...t, status };
          if (status === 'VERIFIED' || status === 'CLOSED') {
            // Restore bike to available if repaired
            setFleet((fleetPrev) =>
              fleetPrev.map((b) => (b.id === t.bicycleId ? { ...b, status: 'AVAILABLE' } : b))
            );
          }
          return updated;
        }
        return t;
      })
    );
  };

  const resolveSecurityAlert = (alertId: string, resolvedBy: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, resolved: true, resolvedBy } : a))
    );
  };

  const completeRecoveryTask = (taskId: string, notes?: string) => {
    setRecoveryTasks((prev) =>
      prev.map((r) => {
        if (r.id === taskId) {
          // Restore bike
          setFleet((fleetPrev) =>
            fleetPrev.map((b) =>
              b.id === r.bicycleId
                ? {
                    ...b,
                    status: 'AVAILABLE',
                    tamperDetected: false,
                    tamperReason: undefined,
                    isLocked: true,
                  }
                : b
            )
          );
          return { ...r, status: 'DEPOT_STORED' };
        }
        return r;
      })
    );
  };

  // Simulators for live testing
  const triggerSimulatedTheft = () => {
    const available = fleet.find((b) => b.status === 'AVAILABLE') || fleet[0];
    if (!available) return;

    const alertId = `SEC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAlert: SecurityAlert = {
      id: alertId,
      bicycleId: available.id,
      type: 'SUSPICIOUS_MOVEMENT_LOCKED',
      priority: 'HIGH',
      timestamp: 'Just now',
      location: available.coordinates,
      zoneName: available.zone,
      description: `High-velocity movement detected on locked bicycle ${available.id}. Accelerometer sensor triggered tamper alarm.`,
      resolved: false,
    };

    setAlerts((prev) => [newAlert, ...prev]);
    setFleet((prev) =>
      prev.map((b) =>
        b.id === available.id
          ? {
              ...b,
              status: 'SUSPICIOUS',
              tamperDetected: true,
              tamperReason: 'ACCELEROMETER_HIGH_IMPACT_LOCKED',
            }
          : b
      )
    );
  };

  const triggerSimulatedPuncture = () => {
    const bike = fleet.find((b) => b.status === 'RENTED' || b.status === 'AVAILABLE') || fleet[5];
    if (!bike) return;

    submitMaintenanceTicket(
      bike.id,
      'Puncture / Flat Tire',
      'HIGH',
      `${bike.zone} Main Road`,
      'Customer reported sharp nail puncture near roundabout. Smart tire warning registered.'
    );
  };

  const triggerGeofenceBreach = () => {
    const bike = fleet.find((b) => b.status === 'RENTED') || fleet[10];
    if (!bike) return;

    const alertId = `SEC-${Math.floor(1000 + Math.random() * 9000)}`;
    const taskId = `REC-${Math.floor(100 + Math.random() * 900)}`;

    const newAlert: SecurityAlert = {
      id: alertId,
      bicycleId: bike.id,
      type: 'GEOFENCE_EXIT',
      priority: 'CRITICAL',
      timestamp: 'Just now',
      location: { lat: -6.8950, lng: 39.1550 },
      zoneName: 'Beyond Dar es Salaam Perimeter (Coast Region Boundary)',
      description: `Bicycle ${bike.id} has departed the approved Dar es Salaam operating boundary. Operations notified. Rider SMS sent.`,
      resolved: false,
      recoveryTaskId: taskId,
    };

    const newRecovery: RecoveryTask = {
      id: taskId,
      bicycleId: bike.id,
      reason: 'Geofence Breach past outer zone boundary',
      priority: 'CRITICAL',
      status: 'ASSIGNED',
      assignedAgent: 'Recovery Patrol Delta',
      lastKnownCoordinates: { lat: -6.8950, lng: 39.1550 },
      batteryPercent: bike.batteryPercent,
      lockStatus: bike.isLocked ? 'LOCKED' : 'UNLOCKED',
      createdAt: 'Just now',
    };

    setAlerts((prev) => [newAlert, ...prev]);
    setRecoveryTasks((prev) => [newRecovery, ...prev]);
    setFleet((prev) =>
      prev.map((b) =>
        b.id === bike.id
          ? {
              ...b,
              status: 'RECOVERY',
              tamperDetected: true,
              tamperReason: 'GEOFENCE_BREACH_OUTER_ZONE',
              coordinates: { lat: -6.8950, lng: 39.1550 },
            }
          : b
      )
    );
  };

  return (
    <DarRideContext.Provider
      value={{
        language,
        setLanguage,
        activeRole,
        setActiveRole,
        currentView,
        setCurrentView,
        fleet,
        zones,
        packages,
        rentals: activeUserRental ? [activeUserRental] : [],
        activeUserRental,
        transactions,
        alerts,
        tickets,
        recoveryTasks,
        rebalanceRecs,
        metrics,
        createRental,
        createOfflineUssdRental,
        endRental,
        triggerEmergencyLock,
        triggerRemoteUnlock,
        submitMaintenanceTicket,
        updateTicketStatus,
        resolveSecurityAlert,
        completeRecoveryTask,
        isSimulatingMovement,
        setIsSimulatingMovement,
        simulationSpeedMultiplier,
        setSimulationSpeedMultiplier,
        triggerSimulatedTheft,
        triggerSimulatedPuncture,
        triggerGeofenceBreach,
        selectedBike,
        setSelectedBike,
      }}
    >
      {children}
    </DarRideContext.Provider>
  );
};

export function useDarRide() {
  const context = useContext(DarRideContext);
  if (!context) {
    throw new Error('useDarRide must be used within a DarRideProvider');
  }
  return context;
}
