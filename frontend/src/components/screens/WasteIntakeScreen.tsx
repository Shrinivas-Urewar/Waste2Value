import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Upload, 
  FileCheck2, 
  FlaskConical, 
  Truck, 
  Sliders, 
  ShieldCheck, 
  Check, 
  X, 
  Calendar, 
  Info, 
  ArrowRight, 
  AlertCircle,
  Hash,
  Sparkles
} from 'lucide-react';
import { ScreenId, WasteStream } from '../../types';
import { ASSETS } from '../../data/mockData';

interface WasteIntakeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  activeStream: WasteStream;
  onUpdateStream: (stream: WasteStream) => void;
}

export const WasteIntakeScreen: React.FC<WasteIntakeScreenProps> = ({
  onNavigate,
  activeStream,
  onUpdateStream,
}) => {
  const [ingestionMode, setIngestionMode] = useState<'manual' | 'bulk' | 'scada' | 'lims'>('manual');
  const [quantity, setQuantity] = useState(activeStream.quantity);
  const [moistureState, setMoistureState] = useState(activeStream.moistureState);
  const [cadence, setCadence] = useState<'continuous' | 'single' | 'intermittent'>('continuous');
  const [batchCode, setBatchCode] = useState(activeStream.code + '-B2');
  const [isSavedDraft, setIsSavedDraft] = useState(false);
  const [isReportVerified, setIsReportVerified] = useState(true);

  const handleGenerateCode = () => {
    const randomSuffix = Math.floor(10 + Math.random() * 90);
    setBatchCode(`FA-2024-09-B${randomSuffix}`);
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto pb-24">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#CBD5E1] pb-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono-code text-[11px] font-bold text-[#DC2626] uppercase">
            WASTE INTAKE / NEW BATCH INGESTION
          </span>
          <span className="text-slate-300">·</span>
          <span className="font-mono-code text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-[#CBD5E1]">
            PORTAL STAGE 1
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono-code">
          <div className="flex items-center gap-1.5 text-slate-700 border border-[#CBD5E1] bg-white px-2.5 py-1 rounded">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>FRAMEWORK STANDARD: <strong className="text-slate-900">ASTM C618 / IS 3812-1</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 border border-[#CBD5E1] bg-white px-2.5 py-1 rounded">
            <Hash className="h-3.5 w-3.5 text-[#DC2626]" />
            <span>STREAM LEDGER HASH: <strong className="text-slate-900">#7F9A..E201</strong></span>
          </div>
        </div>
      </div>

      {/* Main Title */}
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-[#0F172A]">
          Add Waste Stream
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Record batch origin, verify chemical composition parameters, and initiate AI pathway matching.
        </p>
      </div>

      {/* 4-Step Stepper */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        {/* Step 1 */}
        <div className="rounded border-2 border-[#DC2626] bg-red-50/20 p-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-code text-[10px] font-bold text-[#DC2626] uppercase tracking-wider">
              STEP 01 · IN PROGRESS
            </span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#DC2626] ring-4 ring-red-100" />
          </div>
          <div className="mt-1.5 font-headline font-bold text-slate-900 text-sm">
            Waste Origin
          </div>
        </div>

        {/* Step 2 */}
        <div 
          onClick={() => onNavigate('waste-analysis')}
          className="cursor-pointer rounded border border-[#CBD5E1] bg-white p-3 hover:border-slate-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono-code text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              STEP 02 · SYNCHRONIZED
            </span>
            <FlaskConical className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <div className="mt-1.5 font-headline font-bold text-slate-700 text-sm">
            Lab Assay
          </div>
        </div>

        {/* Step 3 */}
        <div 
          onClick={() => onNavigate('destination-matching')}
          className="cursor-pointer rounded border border-[#CBD5E1] bg-white p-3 hover:border-slate-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono-code text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              STEP 03 · QUEUED
            </span>
            <Truck className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <div className="mt-1.5 font-headline font-bold text-slate-700 text-sm">
            Logistics & Freight
          </div>
        </div>

        {/* Step 4 */}
        <div 
          onClick={() => onNavigate('allocation-optimization')}
          className="cursor-pointer rounded border border-[#CBD5E1] bg-white p-3 hover:border-slate-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono-code text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              STEP 04 · PENDING
            </span>
            <Sparkles className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <div className="mt-1.5 font-headline font-bold text-slate-700 text-sm">
            Optimization Run
          </div>
        </div>
      </div>

      {/* Ingestion Mode Segmented Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded border border-[#CBD5E1] bg-white p-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono-code text-[10px] font-bold text-slate-500 uppercase px-2">
            INGESTION MODE:
          </span>
          <div className="flex items-center gap-1 rounded bg-[#F1F3F5] p-1">
            <button
              onClick={() => setIngestionMode('manual')}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                ingestionMode === 'manual'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Manual Verified Entry
            </button>
            <button
              onClick={() => setIngestionMode('bulk')}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                ingestionMode === 'bulk'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upload Bulk CSV / Batch Ledger
            </button>
            <button
              onClick={() => setIngestionMode('scada')}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                ingestionMode === 'scada'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Plant SCADA / ERP Hook
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 px-2 font-mono-code text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            LIMS Bridge Online
          </span>
          <span>Auto-Save: Active (00:12s ago)</span>
        </div>
      </div>

      {/* Section 01: Manifest Core */}
      <div className="rounded border border-[#CBD5E1] bg-white p-5 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold text-[#DC2626]">
              SECTION 01 · MANIFEST CORE
            </span>
            <h2 className="font-headline font-bold text-slate-900 text-base">
              Waste Information & Origin
            </h2>
          </div>
          <span className="font-mono-code text-[10px] font-bold text-[#DC2626] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
            MANDATORY
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Classification */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              WASTE BYPRODUCT CLASSIFICATION <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={activeStream.classification}
              onChange={(e) => onUpdateStream({ ...activeStream, classification: e.target.value })}
              className="w-full h-9 rounded border border-[#CBD5E1] bg-white px-3 text-xs text-slate-900 font-medium focus:border-[#DC2626] focus:outline-none"
            >
              <option value="Fly Ash (Pulverized Coal Combustion)">Fly Ash (Pulverized Coal Combustion)</option>
              <option value="BF Slag (Iron Smelting Slag)">BF Slag (Granulated Blast Furnace Slag)</option>
              <option value="Mine Waste (Open Cast Overburden)">Mine Waste (Open Cast Overburden)</option>
              <option value="Bauxite Residue (Alumina Extraction)">Bauxite Residue (Red Mud)</option>
            </select>
            <div className="mt-1 text-[11px] text-slate-500 font-mono-code">
              Hazard category: Non-hazardous Class III
            </div>
          </div>

          {/* Consignment Code */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              BATCH / CONSIGNMENT CODE <span className="text-[#DC2626]">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={batchCode}
                onChange={(e) => setBatchCode(e.target.value)}
                className="flex-1 h-9 rounded border border-[#CBD5E1] bg-white px-3 font-mono-code text-xs font-semibold text-slate-900 focus:border-[#DC2626] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleGenerateCode}
                className="rounded border border-[#CBD5E1] bg-slate-50 px-3 text-xs font-mono-code font-bold text-slate-700 hover:bg-slate-100"
              >
                GEN
              </button>
            </div>
            <div className="mt-1 text-[11px] text-slate-500 font-mono-code">
              Unique trace identifier on state chain
            </div>
          </div>

          {/* Total Quantity */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              TOTAL AVAILABLE QUANTITY <span className="text-[#DC2626]">*</span>
            </label>
            <div className="flex">
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setQuantity(val);
                  onUpdateStream({ ...activeStream, quantity: val });
                }}
                className="flex-1 h-9 rounded-l border border-[#CBD5E1] bg-white px-3 font-mono-code text-sm font-bold text-slate-900 focus:border-[#DC2626] focus:outline-none"
              />
              <span className="flex items-center rounded-r border border-l-0 border-[#CBD5E1] bg-[#F1F3F5] px-3 font-mono-code text-xs text-slate-600">
                Tonnes (t) / Metric
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
              <span>Equivalent: {(quantity * 1000).toLocaleString()} kg</span>
              <span className="font-semibold text-emerald-700">Silo Vol: 82%</span>
            </div>
          </div>

          {/* Moisture Condition */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              MOISTURE CONDITION STATE <span className="text-[#DC2626]">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2 h-9">
              {(['Dry Bulk (Powder)', 'Slurry (Pond)', 'Filter Cake'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setMoistureState(st)}
                  className={`rounded border text-xs font-medium transition-colors ${
                    moistureState === st
                      ? 'border-[#DC2626] bg-[#DC2626] text-white font-bold'
                      : 'border-[#CBD5E1] bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {st.split(' ')[0]} {st.includes('(') ? `(${st.split('(')[1]}` : ''}
                </button>
              ))}
            </div>
            <div className="mt-1 text-[11px] text-slate-500 font-mono-code">
              Direct pneumatic discharge compatible
            </div>
          </div>
        </div>

        {/* Source Facility & Location */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              SOURCE / GENERATING FACILITY <span className="text-[#DC2626]">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-[#CBD5E1] bg-[#F8F9FA] px-3 py-2 text-xs">
              <Building2 className="h-4 w-4 text-slate-500 shrink-0" />
              <div className="font-medium text-slate-800 truncate">
                Chandrapur Super Thermal Power Station (CSTPS ID: CSTPS-MAH-01)
              </div>
            </div>
            <div className="mt-1 text-[11px] text-slate-500 font-mono-code">
              Unit 5-7 Electrostatic Precipitator bank output
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                FACILITY GEOSPATIAL COORDINATES <span className="text-[#DC2626]">*</span>
              </label>
              <button 
                onClick={() => alert('Haul radius updated from current GPS anchor.')}
                className="text-[11px] font-semibold text-[#DC2626] hover:underline"
              >
                Recalculate Haul Radius
              </button>
            </div>
            <div className="flex items-center justify-between rounded border border-[#CBD5E1] bg-[#F8F9FA] px-3 py-2 text-xs">
              <div className="flex items-center gap-2 truncate">
                <MapPin className="h-4 w-4 text-[#DC2626] shrink-0" />
                <span className="font-mono-code text-slate-800">
                  Chandrapur, Maharashtra (20.0063° N, 79.2961° E)
                </span>
              </div>
              <button 
                onClick={() => onNavigate('destination-matching')}
                className="font-mono-code text-[11px] font-bold text-slate-700 hover:text-slate-900 border border-[#CBD5E1] bg-white px-2 py-0.5 rounded shrink-0 ml-2"
              >
                Verify Pin
              </button>
            </div>
            <div className="mt-1 flex justify-between text-[11px] text-slate-500 font-mono-code">
              <span className="text-emerald-700 font-semibold">● Western Grid Rail Yard Siding: 1.4 km</span>
              <span>Zone: Vidarbha Industrial Corridor</span>
            </div>
          </div>
        </div>

        {/* Windows and Cadence */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              DISPATCH WINDOW: FROM / UNTIL
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5 rounded border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-mono-code text-slate-800">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Oct 01, 2024</span>
              </div>
              <div className="flex items-center gap-1.5 rounded border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-mono-code text-slate-800">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Oct 30, 2024</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              GENERATION CADENCE & FREQUENCY
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCadence('continuous')}
                className={`p-2 rounded border text-left text-xs ${
                  cadence === 'continuous'
                    ? 'border-[#DC2626] bg-red-50/40 text-slate-900 font-medium'
                    : 'border-[#CBD5E1] bg-white text-slate-600'
                }`}
              >
                <div className="font-bold flex items-center gap-1">
                  <span className={`h-2 w-2 rounded-full ${cadence === 'continuous' ? 'bg-[#DC2626]' : 'bg-slate-300'}`} />
                  Continuous
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Monthly baseload</div>
              </button>

              <button
                type="button"
                onClick={() => setCadence('single')}
                className={`p-2 rounded border text-left text-xs ${
                  cadence === 'single'
                    ? 'border-[#DC2626] bg-red-50/40 text-slate-900 font-medium'
                    : 'border-[#CBD5E1] bg-white text-slate-600'
                }`}
              >
                <div className="font-bold flex items-center gap-1">
                  <span className={`h-2 w-2 rounded-full ${cadence === 'single' ? 'bg-[#DC2626]' : 'bg-slate-300'}`} />
                  Single Batch
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Spot inventory</div>
              </button>

              <button
                type="button"
                onClick={() => setCadence('intermittent')}
                className={`p-2 rounded border text-left text-xs ${
                  cadence === 'intermittent'
                    ? 'border-[#DC2626] bg-red-50/40 text-slate-900 font-medium'
                    : 'border-[#CBD5E1] bg-white text-slate-600'
                }`}
              >
                <div className="font-bold flex items-center gap-1">
                  <span className={`h-2 w-2 rounded-full ${cadence === 'intermittent' ? 'bg-[#DC2626]' : 'bg-slate-300'}`} />
                  Intermittent
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Periodic campaign</div>
              </button>
            </div>
          </div>
        </div>

        {/* Silo Protocol & Telemetry with Photo */}
        <div className="rounded border border-[#CBD5E1] bg-[#F8F9FA] p-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={ASSETS.siloDischarge} 
              alt="Silo Discharge Bay CSTPS" 
              className="h-14 w-20 rounded object-cover border border-[#CBD5E1] shadow-2xs"
            />
            <div>
              <div className="font-mono-code text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                SILO DISCHARGE TELEMETRY
              </div>
              <div className="font-headline font-bold text-slate-900 text-sm">
                CSTPS Rail Head Bay #2B
              </div>
              <div className="flex items-center gap-2 font-mono-code text-[11px] text-slate-600 mt-0.5">
                <span className="text-emerald-700 font-semibold">● Pneumatic rate: 140 MT/hr</span>
                <span>· Tare scales calibrated</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert('Bay configuration options: Spout 2B active, 25 bar pressure, dust baghouse online.')}
            className="rounded border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Configure Bay
          </button>
        </div>
      </div>

      {/* Section 02: Spectroscopic Profile & Material Assay */}
      <div className="rounded border border-[#CBD5E1] bg-white p-5 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-emerald-600" />
            <span className="font-mono-code text-xs font-bold text-emerald-700">
              SECTION 02 · SPECTROSCOPIC PROFILE
            </span>
            <h2 className="font-headline font-bold text-slate-900 text-base">
              Material Assay & Chemical Indices
            </h2>
          </div>
          <span className="font-mono-code text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            VALIDATED
          </span>
        </div>

        {/* Pozzolanic Index Horizontal Stacked Bar */}
        <div className="rounded border border-[#CBD5E1] bg-slate-50 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">
              CLASS F POZZOLANIC INDEX (SiO₂ + Al₂O₃ + Fe₂O₃)
            </span>
            <span className="font-mono-code font-bold text-emerald-700">
              88.7% <span className="font-normal text-slate-500">(Threshold ≥ 70.0%)</span>
            </span>
          </div>

          <div className="h-4 w-full rounded overflow-hidden flex bg-slate-200 shadow-2xs">
            <div className="h-full bg-red-700 w-[58.4%]" title="SiO2 (58.4%)" />
            <div className="h-full bg-amber-600 w-[24.1%]" title="Al2O3 (24.1%)" />
            <div className="h-full bg-slate-700 w-[6.2%]" title="Fe2O3 (6.2%)" />
            <div className="h-full bg-emerald-600 w-[3.8%]" title="CaO (3.8%)" />
            <div className="h-full bg-slate-400 w-[7.5%]" title="Other (7.5%)" />
          </div>

          <div className="flex flex-wrap gap-4 pt-1 font-mono-code text-[10px] text-slate-600">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 bg-red-700 rounded-xs" /> SiO₂ (58.4%)</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 bg-amber-600 rounded-xs" /> Al₂O₃ (24.1%)</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 bg-slate-700 rounded-xs" /> Fe₂O₃ (6.2%)</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 bg-emerald-600 rounded-xs" /> CaO (3.8%)</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 bg-slate-400 rounded-xs" /> Other (7.5%)</span>
          </div>
        </div>

        {/* Elemental Oxide Composition Table/Grid */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>ELEMENTAL OXIDE COMPOSITION (% W/W DRY WEIGHT BASIS)</span>
            <span className="font-mono-code text-[11px] text-slate-500">Total: 96.7% + 3.3% Residuals</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono-code text-xs">
            <div className="rounded border border-[#CBD5E1] p-2.5 bg-white">
              <span className="text-[10px] text-slate-500 block">SiO₂ (SILICON)</span>
              <span className="text-base font-bold text-slate-900">58.4</span> <span className="text-slate-400">%</span>
            </div>
            <div className="rounded border border-[#CBD5E1] p-2.5 bg-white">
              <span className="text-[10px] text-slate-500 block">Al₂O₃ (ALUMINUM)</span>
              <span className="text-base font-bold text-slate-900">24.1</span> <span className="text-slate-400">%</span>
            </div>
            <div className="rounded border border-[#CBD5E1] p-2.5 bg-white">
              <span className="text-[10px] text-slate-500 block">Fe₂O₃ (IRON OXIDE)</span>
              <span className="text-base font-bold text-slate-900">6.2</span> <span className="text-slate-400">%</span>
            </div>
            <div className="rounded border border-[#CBD5E1] p-2.5 bg-white">
              <span className="text-[10px] text-slate-500 block">CaO (FREE LIME)</span>
              <span className="text-base font-bold text-slate-900">3.8</span> <span className="text-slate-400">%</span>
            </div>
            <div className="rounded border border-[#CBD5E1] p-2.5 bg-white">
              <span className="text-[10px] text-slate-500 block">MgO (MAGNESIA)</span>
              <span className="text-base font-bold text-slate-900">1.4</span> <span className="text-slate-400">%</span>
            </div>
            <div className="rounded border border-[#CBD5E1] p-2.5 bg-white">
              <span className="text-[10px] text-slate-500 block">SO₃ (SULFUR TRI)</span>
              <span className="text-base font-bold text-slate-900">0.7</span> <span className="text-slate-400">%</span>
            </div>
            <div className="rounded border border-[#CBD5E1] p-2.5 bg-white">
              <span className="text-[10px] text-slate-500 block">LOI (LOSS IGN.)</span>
              <span className="text-base font-bold text-slate-900">2.1</span> <span className="text-slate-400">%</span>
            </div>
            <div className="rounded border border-[#CBD5E1] p-2.5 bg-white">
              <span className="text-[10px] text-slate-500 block">FREE CARBON</span>
              <span className="text-base font-bold text-slate-900">1.1</span> <span className="text-slate-400">%</span>
            </div>
          </div>
        </div>

        {/* Physical Screening & Lab Certificate */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pt-2 border-t border-slate-100">
          <div className="space-y-2.5 font-mono-code text-xs">
            <span className="font-bold text-slate-700 text-xs block">
              PHYSICAL & ENVIRONMENTAL SCREENING METRICS
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded border border-[#CBD5E1] p-2 bg-slate-50">
                <span className="text-[10px] text-slate-500 block">pH VALUE (1:5 AQUEOUS)</span>
                <span className="font-bold text-slate-900">8.2</span> <span className="text-slate-500">(Alkaline Buffer)</span>
              </div>
              <div className="rounded border border-[#CBD5E1] p-2 bg-slate-50">
                <span className="text-[10px] text-slate-500 block">MOISTURE CONTENT</span>
                <span className="font-bold text-slate-900">1.2%</span> <span className="text-slate-500">(Limit &lt; 3.0%)</span>
              </div>
              <div className="rounded border border-[#CBD5E1] p-2 bg-slate-50">
                <span className="text-[10px] text-slate-500 block">BLAINE FINENESS</span>
                <span className="font-bold text-slate-900">340 m²/kg</span> <span className="text-slate-500">(D50 ≈ 22 µm)</span>
              </div>
              <div className="rounded border border-emerald-200 bg-emerald-50/50 p-2">
                <span className="text-[10px] text-emerald-800 block">TCLP HEAVY METALS</span>
                <span className="font-bold text-emerald-700">Passed IS 16087</span>
              </div>
            </div>
          </div>

          {/* Laboratory Report Upload Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>CERTIFIED XRF / ICP-MS LABORATORY REPORT</span>
              <span className="font-mono-code text-[10px] text-slate-400">NABL Accredited</span>
            </div>

            {isReportVerified ? (
              <div className="rounded border border-emerald-300 bg-emerald-50/30 p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-mono-code font-bold text-slate-900 text-xs">
                      CSTPS_XRF_Analysis_Certificate_Sep2024.pdf
                    </div>
                    <div className="font-mono-code text-[10px] text-slate-500">
                      2.4 MB · Cryptographically Signed · MD5: e291c..81
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white font-mono-code">
                    VERIFIED
                  </span>
                  <button 
                    onClick={() => setIsReportVerified(false)} 
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => setIsReportVerified(true)}
                className="border-2 border-dashed border-[#CBD5E1] rounded p-4 text-center cursor-pointer hover:border-[#DC2626] bg-[#F8F9FA]"
              >
                <Upload className="h-5 w-5 text-slate-400 mx-auto mb-1" />
                <div className="text-xs font-medium text-slate-700">Drag and drop certified report or click to browse</div>
                <div className="text-[10px] text-slate-400 font-mono-code">PDF, CSV, XLSX accepted up to 25MB</div>
              </div>
            )}

            {/* Spectrometer Instrument Photo & Specs */}
            <div className="rounded border border-[#CBD5E1] bg-[#F8F9FA] p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <img 
                  src={ASSETS.spectrometer} 
                  alt="Rigaku Primus IV Spectrometer" 
                  className="h-10 w-14 rounded object-cover border border-[#CBD5E1]"
                />
                <div>
                  <div className="font-mono-code text-[10px] font-bold text-slate-500 uppercase">
                    SPECTROMETER INSTRUMENT
                  </div>
                  <div className="font-bold text-slate-900 text-xs">
                    WDXRF Rigaku Primus IV
                  </div>
                  <div className="font-mono-code text-[10px] text-slate-500">
                    Calibrated against NIST SRM 2689 · 4.0kW Rh-anode
                  </div>
                </div>
              </div>
              <span className="font-mono-code text-xs font-bold text-slate-700 bg-white border border-[#CBD5E1] px-2 py-1 rounded">
                ±0.04% Precision
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 03: Preliminary ML Classification */}
      <div className="rounded border border-[#CBD5E1] bg-white p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div>
            <span className="font-mono-code text-xs font-bold text-slate-500 uppercase">
              PRELIMINARY ML CLASSIFICATION
            </span>
            <h2 className="font-headline font-bold text-slate-900 text-base">
              Projected Destination Compatibility Pathways
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Predicted circularity score:</span>
            <span className="font-mono-code text-xl font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              94.2 / 100
            </span>
          </div>
        </div>

        {/* 3 Pathway Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Target 1 */}
          <div 
            onClick={() => onNavigate('waste-analysis')}
            className="cursor-pointer rounded border border-[#CBD5E1] p-4 bg-white hover:border-[#DC2626] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-[10px] font-bold text-[#DC2626] uppercase">
                PRIMARY TARGET #1
              </span>
              <span className="font-mono-code text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                98% Fit
              </span>
            </div>
            <div className="mt-2 font-headline font-bold text-slate-900 text-sm">
              Portland Pozzolana Cement (PPC)
            </div>
            <p className="mt-1 text-xs text-slate-600 leading-snug">
              Meets IS 1489 Part 1 specifications. Direct silo injection without pre-calcining.
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 font-mono-code text-xs">
              <span className="text-slate-500">Potential Offtake: <strong>3,200 MT</strong></span>
              <span className="font-bold text-emerald-700">₹1,428/MT saved</span>
            </div>
          </div>

          {/* Target 2 */}
          <div 
            onClick={() => onNavigate('reuse-opportunities')}
            className="cursor-pointer rounded border border-[#CBD5E1] p-4 bg-white hover:border-[#DC2626] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-[10px] font-bold text-slate-500 uppercase">
                SECONDARY TARGET #2
              </span>
              <span className="font-mono-code text-xs font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                91% Fit
              </span>
            </div>
            <div className="mt-2 font-headline font-bold text-slate-900 text-sm">
              Geopolymer Concrete Precast
            </div>
            <p className="mt-1 text-xs text-slate-600 leading-snug">
              Alkali-activated low calcium mix. Optimal SiO₂/Al₂O₃ molar ratio (2.42).
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 font-mono-code text-xs">
              <span className="text-slate-500">Potential Offtake: <strong>1,600 MT</strong></span>
              <span className="font-bold text-blue-700">1.18 tCO₂e/t avoided</span>
            </div>
          </div>

          {/* Target 3 */}
          <div 
            onClick={() => onNavigate('destination-matching')}
            className="cursor-pointer rounded border border-[#CBD5E1] p-4 bg-white hover:border-[#DC2626] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-[10px] font-bold text-slate-500 uppercase">
                TERTIARY BACKUP #3
              </span>
              <span className="font-mono-code text-xs font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                84% Fit
              </span>
            </div>
            <div className="mt-2 font-headline font-bold text-slate-900 text-sm">
              Autoclaved Aerated Concrete (AAC)
            </div>
            <p className="mt-1 text-xs text-slate-600 leading-snug">
              Requires secondary particle sizing or blending with high-silica sand slurry.
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 font-mono-code text-xs">
              <span className="text-slate-500">Potential Offtake: <strong>800 MT</strong></span>
              <span className="text-slate-600">Neutral Cost</span>
            </div>
          </div>
        </div>

        {/* ESG / MoEFCC Compliance Note */}
        <div className="rounded border border-blue-200 bg-blue-50/50 p-3 flex items-start justify-between gap-3 text-xs">
          <div className="flex items-start gap-2 text-slate-700">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Compliance Note:</strong> Data logged will be cryptographically tagged for ESG scope-3 circular compliance audits and MoEFCC ash utilization statutory declarations (Notification S.O. 5481(E)).
            </span>
          </div>
          <span className="font-mono-code text-[10px] text-blue-800 shrink-0 border border-blue-200 bg-white px-1.5 py-0.5 rounded">
            Sec-Audit V4.1
          </span>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-56 right-0 z-30 flex items-center justify-between border-t border-[#CBD5E1] bg-white px-6 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('overview')}
            className="rounded border border-[#CBD5E1] bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setIsSavedDraft(true);
              setTimeout(() => setIsSavedDraft(false), 2000);
            }}
            className="rounded border border-[#CBD5E1] bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
          >
            {isSavedDraft ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : null}
            <span>{isSavedDraft ? 'Draft Saved' : 'Save Draft as In-Progress'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>All mandatory ASTM C618 / IS 3812 Class F parameters verified. Ready for ML compatibility engine.</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('All spectroscopic and elemental parameters verified against NIST standards.')}
            className="rounded border border-[#CBD5E1] bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Validate Laboratory Parameters
          </button>
          <button
            onClick={() => onNavigate('waste-analysis')}
            className="flex items-center gap-2 rounded bg-[#DC2626] px-5 py-2 font-headline font-bold text-xs text-white shadow-xs hover:bg-[#B91C1C] active:translate-y-px"
          >
            <span>Analyze Waste</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
