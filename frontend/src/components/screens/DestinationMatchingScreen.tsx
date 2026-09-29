import React, { useState } from 'react';
import { 
  Share2, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  ArrowRight, 
  Sliders, 
  Building2, 
  ShieldCheck, 
  Navigation,
  CheckSquare,
  Square,
  Crosshair,
  RotateCw
} from 'lucide-react';
import { ScreenId, WasteStream, OfftakeDestination } from '../../types';
import { DESTINATIONS } from '../../data/mockData';

interface DestinationMatchingScreenProps {
  onNavigate: (screen: ScreenId) => void;
  activeStream: WasteStream;
}

export const DestinationMatchingScreen: React.FC<DestinationMatchingScreenProps> = ({
  onNavigate,
  activeStream,
}) => {
  const [selectedRadius, setSelectedRadius] = useState<number>(150);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Cement' | 'Infrastructure' | 'Precast'>('All');
  const [destinations, setDestinations] = useState<OfftakeDestination[]>(DESTINATIONS);
  const [hoveredDestId, setHoveredDestId] = useState<string | null>(null);

  const toggleAllocation = (id: string) => {
    setDestinations(prev => prev.map(d => {
      if (d.id === id) {
        const newStatus = d.status === 'Allocated' ? 'Standby' : 'Allocated';
        return {
          ...d,
          status: newStatus,
          allocatedQuantity: newStatus === 'Allocated' ? d.intakeCapacityTonnes : 0,
        };
      }
      return d;
    }));
  };

  const filteredDests = destinations.filter(d => {
    if (d.transitDistanceKm > selectedRadius) return false;
    if (categoryFilter === 'All') return true;
    return d.category === categoryFilter;
  });

  const allocatedDests = destinations.filter(d => d.status === 'Allocated');
  const allocatedTonnage = allocatedDests.reduce((sum, d) => sum + d.allocatedQuantity, 0);

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto pb-24">
      {/* Top Header & Tariffs */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#CBD5E1] pb-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 bg-[#DC2626]" />
          <h1 className="font-headline text-2xl font-bold text-slate-900 tracking-tight">
            Destination Matching
          </h1>
          <span className="font-mono-code text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded">
            STAGE 05 / 08
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code">
          <div className="flex items-center gap-1.5 rounded border border-[#CBD5E1] bg-white px-3 py-1 text-slate-700 shadow-2xs">
            <Truck className="h-3.5 w-3.5 text-slate-500" />
            <span>DIESEL BENCHMARK TARIFF: <strong className="text-slate-900">₹4.80 / tonne·km</strong> (Bulk Tanker)</span>
          </div>
          <div className="flex items-center gap-1.5 rounded border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>INTAKE BUFFER: <strong className="text-emerald-950">4,800 t Fly Ash</strong></span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-600 -mt-2">
        Geospatial freight calculation and receiving facility capacity matching.
      </p>

      {/* Filter Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded border border-[#CBD5E1] bg-white p-2.5 text-xs font-mono-code">
        {/* Category Tabs */}
        <div className="flex items-center gap-1">
          {(['All', 'Cement', 'Infrastructure', 'Precast'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Destinations (4)' : `${cat} (1)`}
            </button>
          ))}
        </div>

        {/* Radius Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 uppercase font-bold">RADIUS FILTER:</span>
          <div className="flex items-center gap-1 bg-[#F1F3F5] p-1 rounded">
            {[50, 100, 150, 200].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRadius(r)}
                className={`rounded px-2.5 py-0.5 text-xs transition-colors ${
                  selectedRadius === r
                    ? 'bg-[#DC2626] text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r}km
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Map Radar Canvas + Right Matched List */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (7 cols): Map Canvas & Haul KPIs */}
        <div className="space-y-4 lg:col-span-7">
          <div className="relative rounded border border-slate-800 bg-[#0F172A] p-4 text-white overflow-hidden shadow-md min-h-[460px] flex flex-col justify-between">
            {/* Map Header Overlay */}
            <div className="flex items-start justify-between z-10">
              <div className="bg-slate-900/80 backdrop-blur-xs border border-slate-700 px-3 py-1.5 rounded">
                <span className="text-[10px] font-mono-code text-slate-400 block uppercase">ORIGIN HUB [SOURCE]</span>
                <span className="font-bold text-white text-xs">Chandrapur STPS (CSTPS)</span>
                <span className="font-mono-code text-[11px] text-emerald-400 block">4,800 t Fly Ash Available</span>
              </div>

              {/* Taxonomy Legend */}
              <div className="bg-slate-900/80 backdrop-blur-xs border border-slate-700 p-2 rounded text-[10px] font-mono-code space-y-1">
                <span className="text-slate-400 font-bold block uppercase mb-1">NETWORK TAXONOMY</span>
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#DC2626]" /> Generator Hub (Origin)</div>
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Certified Offtaker (Valorized)</div>
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-400" /> Civic Infrastructure Corridor</div>
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-500" /> Non-valorized Void Landfill</div>
              </div>
            </div>

            {/* Tactical Radar SVG Map Visualization */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 600 460">
                {/* Concentric Distance Rings around CSTPS (center: 300, 260) */}
                <circle cx="300" cy="260" r="70" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <text x="375" y="265" fill="#64748B" fontSize="9" fontFamily="monospace">50 KM</text>

                <circle cx="300" cy="260" r="140" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <text x="445" y="265" fill="#64748B" fontSize="9" fontFamily="monospace">100 KM</text>

                <circle cx="300" cy="260" r="210" fill="none" stroke={selectedRadius >= 150 ? '#475569' : '#1E293B'} strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="515" y="265" fill="#64748B" fontSize="9" fontFamily="monospace">150 KM</text>

                {/* Route: CSTPS to DEST 1 (UltraTech, 340, 110) */}
                <line x1="300" y1="260" x2="340" y2="110" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
                <rect x="310" y="175" width="85" height="16" rx="2" fill="#0F172A" stroke="#10B981" strokeWidth="0.5" />
                <text x="315" y="186" fill="#A7F3D0" fontSize="8" fontFamily="monospace">NH 353B · 86 km</text>

                {/* Route: CSTPS to DEST 2 (NHAI, 270, 320) */}
                <line x1="300" y1="260" x2="270" y2="320" stroke="#38BDF8" strokeWidth="2" />
                <rect x="235" y="285" width="60" height="14" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="0.5" />
                <text x="238" y="295" fill="#BAE6FD" fontSize="8" fontFamily="monospace">42 km (Short)</text>

                {/* Route: CSTPS to DEST 3 (Vidarbha Precast, 410, 310) */}
                <line x1="300" y1="260" x2="410" y2="310" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />

                {/* Route: CSTPS to DEST 4 (WCL Void, 190, 220) */}
                <line x1="300" y1="260" x2="190" y2="220" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
                <text x="145" y="210" fill="#94A3B8" fontSize="8" fontFamily="monospace">WCL Void B (Fallback)</text>
                <text x="145" y="222" fill="#64748B" fontSize="7" fontFamily="monospace">10,000+ t · Zero Value</text>
              </svg>
            </div>

            {/* Interactive Pin Nodes on Map */}
            {/* Origin Pin */}
            <div className="absolute top-[242px] left-[282px] z-20 flex flex-col items-center">
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-5 w-5 bg-[#DC2626] border-2 border-white items-center justify-center text-white text-[10px] font-bold">
                  ●
                </span>
              </span>
            </div>

            {/* DEST 1 Pin: UltraTech */}
            <div 
              onMouseEnter={() => setHoveredDestId('dest-01')}
              onMouseLeave={() => setHoveredDestId(null)}
              className="absolute top-[90px] left-[325px] z-20 bg-slate-900/90 border border-emerald-500 rounded p-1.5 text-[10px] font-mono-code cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>UltraTech Cement</span>
              </div>
              <div className="text-slate-300">Cap: 2,400 t · ₹412/t Freight</div>
            </div>

            {/* DEST 2 Pin: NHAI */}
            <div 
              onMouseEnter={() => setHoveredDestId('dest-02')}
              onMouseLeave={() => setHoveredDestId(null)}
              className="absolute top-[310px] left-[245px] z-20 bg-slate-900/90 border border-blue-400 rounded p-1.5 text-[10px] font-mono-code cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-1 text-blue-400 font-bold">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span>NHAI Expressway Pkg 4</span>
              </div>
              <div className="text-slate-300">Req: 1,500 t · 42 km (Shortest)</div>
            </div>

            {/* DEST 3 Pin: Vidarbha Precast */}
            <div 
              onMouseEnter={() => setHoveredDestId('dest-03')}
              onMouseLeave={() => setHoveredDestId(null)}
              className="absolute top-[300px] left-[400px] z-20 bg-slate-900/90 border border-amber-400 rounded p-1.5 text-[10px] font-mono-code cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>Vidarbha Precast</span>
              </div>
              <div className="text-slate-300">Cap: 900 t · ₹566/t Freight</div>
            </div>

            {/* Map Footer Overlay */}
            <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 z-10 pt-4">
              <span>GRID ANCHOR: 19.9615° N, 79.2961° E</span>
              <span>SPATIAL PROJECTION: EPSG:3857 · WGS84</span>
            </div>
          </div>

          {/* 3 KPI Summary Tiles under Map */}
          <div className="grid grid-cols-3 gap-3 font-mono-code text-xs">
            <div className="rounded border border-[#CBD5E1] bg-white p-3 text-center shadow-2xs">
              <span className="text-[10px] text-slate-400 block uppercase">WEIGHTED AVERAGE HAUL</span>
              <span className="text-xl font-bold text-slate-900">78.2 km</span>
            </div>
            <div className="rounded border border-[#CBD5E1] bg-white p-3 text-center shadow-2xs">
              <span className="text-[10px] text-slate-400 block uppercase">FLEET CARBON FOOTPRINT</span>
              <span className="text-xl font-bold text-emerald-700">38.4 t CO₂e</span>
            </div>
            <div className="rounded border border-[#CBD5E1] bg-white p-3 text-center shadow-2xs">
              <span className="text-[10px] text-slate-400 block uppercase">OPTIMAL ROUTE COVERAGE</span>
              <span className="text-xl font-bold text-slate-900">100.0%</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Matched Offtake Facilities List */}
        <div className="space-y-3 lg:col-span-5">
          <div className="flex items-center justify-between font-mono-code text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <h2 className="font-headline font-bold text-slate-900 text-sm">
                Matched Offtake Facilities
              </h2>
              <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                3 QUALIFIED
              </span>
            </div>
            <span className="text-[11px] text-slate-500">Sort: Net Margin</span>
          </div>

          <p className="text-[11px] text-slate-500 font-mono-code">
            Within verified {selectedRadius} km economic radius
          </p>

          {/* Cards List */}
          <div className="space-y-3">
            {destinations.map((dest) => {
              const isAllocated = dest.status === 'Allocated';
              return (
                <div
                  key={dest.id}
                  className={`rounded border p-3 text-xs transition-colors ${
                    isAllocated
                      ? 'border-emerald-300 bg-white shadow-2xs'
                      : 'border-[#CBD5E1] bg-slate-50/70 opacity-80'
                  }`}
                >
                  {/* Top line */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[10px] font-bold text-slate-400">
                          {dest.code}
                        </span>
                        <h3 className="font-headline font-bold text-slate-900 text-xs">
                          {dest.name}
                        </h3>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {dest.cluster}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleAllocation(dest.id)}
                      className={`flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold font-mono-code transition-colors ${
                        isAllocated
                          ? 'bg-[#DC2626] text-white'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                    >
                      {isAllocated ? <CheckSquare className="h-3 w-3" /> : <Square className="h-3 w-3" />}
                      <span>{isAllocated ? 'ALLOCATED' : 'STANDBY'}</span>
                    </button>
                  </div>

                  {/* 4 Metrics Grid */}
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-2 font-mono-code text-[11px]">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">TRANSIT DISTANCE</span>
                      <strong className="text-slate-800">{dest.transitDistanceKm} km</strong>
                      <span className="text-slate-500 ml-1">({dest.transitTime})</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">INTAKE CAPACITY</span>
                      <strong className="text-slate-800">{dest.intakeCapacityTonnes.toLocaleString()} t</strong>
                      <span className="text-slate-500 ml-1">/ batch</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">CHEMISTRY FIT</span>
                      <strong className={dest.chemistryFit >= 90 ? 'text-emerald-700' : 'text-slate-800'}>
                        {dest.chemistryFit}% ({dest.chemistryFitLabel})
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">DISCHARGE MODE</span>
                      <strong className="text-slate-800">{dest.dischargeMode}</strong>
                    </div>
                  </div>

                  {/* Freight and Credit Bottom Row */}
                  <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 font-mono-code text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-600">Freight: <strong>₹{dest.freightPerTonne}/t</strong></span>
                      <span className="text-slate-300">|</span>
                      <span className="text-emerald-700">Credit: <strong>+₹{dest.offtakeCreditPerTonne}/t</strong></span>
                    </div>

                    <div>
                      {dest.netBatchValueLakhs >= 0 ? (
                        <span className="font-bold text-emerald-700">
                          Net Batch Value: +₹{dest.netBatchValueLakhs} Lakhs
                        </span>
                      ) : (
                        <span className="font-bold text-[#DC2626]">
                          Net Outlay: {dest.netBatchValueLakhs} Lakhs
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-56 right-0 z-30 flex items-center justify-between border-t border-[#CBD5E1] bg-white px-6 py-3 shadow-lg">
        <div className="flex items-center gap-5 text-xs font-mono-code">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <div>
              <strong className="text-slate-900 font-sans">{allocatedDests.length} Facilities Selected</strong>
              <span className="text-slate-500 block text-[11px]">
                Allocating: <strong>{allocatedTonnage.toLocaleString()} t</strong> (100% Demand Absorption)
              </span>
            </div>
          </div>

          <div className="border-l border-slate-200 pl-4">
            <span className="text-[10px] text-slate-400 block uppercase">GROSS FREIGHT COMMITMENT</span>
            <span className="font-bold text-slate-900">₹18.0 Lakhs</span>
          </div>

          <div className="border-l border-slate-200 pl-4">
            <span className="text-[10px] text-slate-400 block uppercase">OFFTAKER GATE VALORIZATION</span>
            <span className="font-bold text-emerald-700">+₹16.7 Lakhs</span>
          </div>

          <div className="border-l border-slate-200 pl-4">
            <span className="text-[10px] text-slate-400 block uppercase">NET LANDFILL DISPOSAL AVOIDANCE</span>
            <span className="font-bold text-[#DC2626]">₹14.2 Lakhs Saved</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('scenario-comparison')}
            className="flex items-center gap-1.5 rounded border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Sliders className="h-3.5 w-3.5 text-slate-500" />
            <span>Adjust Weight Constraints</span>
          </button>
          <button
            onClick={() => onNavigate('allocation-optimization')}
            className="flex items-center gap-2 rounded bg-[#DC2626] px-5 py-2 font-headline font-bold text-xs text-white shadow-xs hover:bg-[#B91C1C] active:translate-y-px"
          >
            <span>Allocation (Run Multi-Objective)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
