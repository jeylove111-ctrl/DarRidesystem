import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Bicycle, Zone, Coordinates } from '../types';
import { DAR_ES_SALAAM_ZONES } from '../data/mockData';
import { Battery, Lock, Unlock, ShieldAlert, Navigation, Zap, Radio } from 'lucide-react';

interface MapViewProps {
  bicycles: Bicycle[];
  selectedBike?: Bicycle | null;
  onSelectBike?: (bike: Bicycle) => void;
  showGeofences?: boolean;
  highlightBreaches?: boolean;
  userLocation?: Coordinates;
  heightClass?: string;
  focusZone?: string;
}

export const MapView: React.FC<MapViewProps> = ({
  bicycles,
  selectedBike,
  onSelectBike,
  showGeofences = true,
  highlightBreaches = false,
  userLocation,
  heightClass = 'h-[580px]',
  focusZone,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const zonesLayerRef = useRef<L.LayerGroup | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Dar es Salaam
    const map = L.map(mapContainerRef.current, {
      center: [-6.7850, 39.2600],
      zoom: 12,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Dark sleek OpenStreetMap tiles (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a> OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    const zonesGroup = L.layerGroup().addTo(map);
    const markersGroup = L.layerGroup().addTo(map);

    zonesLayerRef.current = zonesGroup;
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update geofence circles
  useEffect(() => {
    const map = mapInstanceRef.current;
    const zonesGroup = zonesLayerRef.current;
    if (!map || !zonesGroup) return;

    zonesGroup.clearLayers();

    if (showGeofences) {
      DAR_ES_SALAAM_ZONES.forEach((zone) => {
        const color =
          zone.type === 'high_demand'
            ? '#3b82f6'
            : zone.type === 'preferred_parking'
            ? '#10b981'
            : zone.type === 'restricted'
            ? '#ef4444'
            : '#8b5cf6';

        const circle = L.circle([zone.center.lat, zone.center.lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.12,
          radius: zone.radiusKm * 1000,
          weight: 1.5,
          dashArray: '4, 4',
        });

        circle.bindTooltip(
          `<div class="text-xs font-bold text-slate-800">${zone.name}</div><div class="text-[10px] text-slate-600">Demand: ${zone.demandLevel} | Target: ${zone.targetFleet} bikes</div>`,
          { permanent: false, direction: 'center', className: 'dar-zone-tooltip' }
        );

        zonesGroup.addLayer(circle);
      });

      // Overall Dar es Salaam Approved Outer Operating Boundary (Geofence)
      const outerBoundary = L.polygon(
        [
          [-6.7000, 39.2200], // North Kunduchi
          [-6.7300, 39.3100], // North East Masaki ocean line
          [-6.8400, 39.3400], // Kigamboni South East
          [-6.8900, 39.2400], // Mbagala South
          [-6.8400, 39.1500], // Tabata / Pugu West
          [-6.7500, 39.1600], // Ubungo / Mbezi North West
        ],
        {
          color: '#10b981',
          fill: false,
          weight: 2,
          dashArray: '6, 6',
        }
      );
      outerBoundary.bindTooltip('DAR RIDE Approved Operating Geofence Perimeter', {
        permanent: false,
      });
      zonesGroup.addLayer(outerBoundary);
    }
  }, [showGeofences]);

  // Update bike markers whenever fleet or filters change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // Add user location if provided
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div class="relative flex items-center justify-center w-7 h-7">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <div class="w-5 h-5 bg-blue-600 border-2 border-white rounded-full shadow-lg flex items-center justify-center">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon });
      userMarker.bindTooltip('Your Location (Dar es Salaam)', { permanent: false });
      markersGroup.addLayer(userMarker);
    }

    const filteredBikes = bicycles.filter((bike) => {
      if (statusFilter === 'ALL') return true;
      if (statusFilter === 'AVAILABLE') return bike.status === 'AVAILABLE';
      if (statusFilter === 'RENTED') return bike.status === 'RENTED' || bike.status === 'EXPIRING_SOON';
      if (statusFilter === 'ALERTS') return bike.status === 'SUSPICIOUS' || bike.status === 'RECOVERY' || bike.tamperDetected;
      if (statusFilter === 'MAINTENANCE') return bike.status === 'MAINTENANCE';
      return true;
    });

    // Render up to 500 top markers for super high frame-rate performance
    const renderLimit = Math.min(filteredBikes.length, 450);

    for (let i = 0; i < renderLimit; i++) {
      const bike = filteredBikes[i];

      let markerColor = 'bg-emerald-500 text-white';
      let borderGlow = 'border-white shadow-emerald-500/40';

      if (bike.status === 'RENTED') {
        markerColor = 'bg-blue-600 text-white';
        borderGlow = 'border-white shadow-blue-500/40';
      } else if (bike.status === 'EXPIRING_SOON' || bike.status === 'PENDING_SAFE_LOCK') {
        markerColor = 'bg-amber-500 text-black animate-pulse';
        borderGlow = 'border-slate-900 shadow-amber-500/50';
      } else if (bike.status === 'SUSPICIOUS' || bike.status === 'RECOVERY' || bike.tamperDetected) {
        markerColor = 'bg-rose-600 text-white animate-bounce';
        borderGlow = 'border-yellow-300 shadow-rose-600/80';
      } else if (bike.status === 'MAINTENANCE') {
        markerColor = 'bg-orange-500 text-white';
        borderGlow = 'border-slate-900 shadow-orange-500/30';
      } else if (bike.status === 'OFFLINE') {
        markerColor = 'bg-slate-600 text-slate-300';
        borderGlow = 'border-slate-800';
      }

      const isSelected = selectedBike?.id === bike.id;
      if (isSelected) {
        borderGlow = 'ring-4 ring-emerald-400 scale-125 z-50';
      }

      const customIcon = L.divIcon({
        className: 'custom-bike-marker',
        html: `
          <div class="relative flex items-center justify-center transition-transform hover:scale-125">
            <div class="w-6 h-6 rounded-full ${markerColor} border-2 ${borderGlow} shadow-md flex items-center justify-center text-[10px] font-bold">
              ${bike.status === 'RENTED' ? '🚴' : bike.tamperDetected ? '⚠️' : '🚲'}
            </div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([bike.coordinates.lat, bike.coordinates.lng], { icon: customIcon });

      marker.on('click', () => {
        if (onSelectBike) {
          onSelectBike(bike);
        }
      });

      marker.bindTooltip(
        `
        <div class="p-1 font-sans">
          <div class="font-bold text-xs text-slate-900 flex items-center justify-between gap-2">
            <span>${bike.id}</span>
            <span class="text-[9px] px-1 py-0.2 rounded font-mono ${
              bike.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
            }">${bike.status}</span>
          </div>
          <div class="text-[11px] text-slate-600 mt-0.5">Zone: <strong>${bike.zone}</strong></div>
          <div class="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
            <span>🔋 ${bike.batteryPercent}%</span>
            <span>Speed: ${bike.speedKmh} km/h</span>
            <span>Lock: ${bike.isLocked ? '🔒' : '🔓'}</span>
          </div>
        </div>
      `,
        { direction: 'top', offset: [0, -10] }
      );

      markersGroup.addLayer(marker);
    }
  }, [bicycles, statusFilter, selectedBike, userLocation, onSelectBike]);

  // Handle focus zone
  useEffect(() => {
    if (!focusZone || !mapInstanceRef.current) return;
    const zone = DAR_ES_SALAAM_ZONES.find((z) => z.id === focusZone || z.name.toLowerCase() === focusZone.toLowerCase());
    if (zone) {
      mapInstanceRef.current.flyTo([zone.center.lat, zone.center.lng], 14, { duration: 1.2 });
    }
  }, [focusZone]);

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950`}>
      {/* Filter Chips Floating Header */}
      <div className="absolute top-3 left-3 z-[400] flex flex-wrap items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/80 shadow-lg text-xs">
        <button
          onClick={() => setStatusFilter('ALL')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
            statusFilter === 'ALL' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          All ({bicycles.length})
        </button>
        <button
          onClick={() => setStatusFilter('AVAILABLE')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
            statusFilter === 'AVAILABLE' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Available ({bicycles.filter((b) => b.status === 'AVAILABLE').length})
        </button>
        <button
          onClick={() => setStatusFilter('RENTED')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
            statusFilter === 'RENTED' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          Rented ({bicycles.filter((b) => b.status === 'RENTED' || b.status === 'EXPIRING_SOON').length})
        </button>
        <button
          onClick={() => setStatusFilter('ALERTS')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
            statusFilter === 'ALERTS' ? 'bg-rose-600 text-white' : 'text-rose-400 hover:bg-slate-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          Alerts ({bicycles.filter((b) => b.status === 'SUSPICIOUS' || b.status === 'RECOVERY' || b.tamperDetected).length})
        </button>
      </div>

      {/* Map Target / Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Mini Legend Footer */}
      <div className="absolute bottom-3 left-3 z-[400] bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center gap-3">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Available
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Active Ride
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Safe Lock Pending
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span> Tamper / Geofence Breach
        </span>
      </div>
    </div>
  );
};
