import React, { useState } from 'react';
import { 
  Sliders, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  TrendingUp, 
  Layers, 
  RotateCcw,
  Sparkles,
  GitMerge,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { ScreenId, WasteStream, OptimizationPreset } from '../../types';
import { OPTIMIZATION_PRESETS } from '../../data/mockData';
import { SolverRunModal } from '../modals/SolverRunModal';

interface AllocationOptimizationScreenProps {
  onNavigate: (screen: ScreenId) => void;
  activeStream: WasteStream;
}

export const AllocationOptimizationScreen: React.FC<AllocationOptimizationScreenProps> = ({
  onNavigate,
  activeStream,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<'balanced' | 'min-cost' | 'min-co2' | 'max-diversion'>('balanced');
  const [isSolverModalOpen, setIsSolverModalOpen] = useState(false);
  const [hasJustSolved, setHasJustSolved] = useState(false);

  const preset = OPTIMIZATION_PRESETS.find(p => p.id === selectedPresetId) || OPTIMIZATION_PRESETS[0];

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto pb-24">
      {/* Top Header & Solver Status */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#CBD5E1] pb-3 gap-2">
        <div className="flex flex-wrap items-center gap-2 font-mono-code text-[11px] text-slate-700">
          <span className="font-bold text-[#DC2626]">SIMPLEX / CBC MILP V4.2</span>
          <span>·</span>
          <span>Job ID: <strong>OPT-2024-8841-B</strong></span>
          <span>·</span>
          <span>Stream FA-2024-09: <strong>4,800.00 MT</strong> (Class-F Fly Ash)</span>
          <span>·</span>
          <span className="text-slate-400">Convergence Tolerance: 1e-6</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 font-mono-code text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Optimal Solution Found (0.42s) · Pareto Frontier: Rank 1
          </span>
        </div>
      </div>

      {/* Main Title & KPIs */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-slate-400">
            OPERATIONAL DISPATCH OPTIMIZATION · CORE ENGINE
          </span>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-[#0F172A] mt-0.5">
            Allocation Optimization
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-3xl">
            Determine how the available waste should be distributed across feasible reuse destinations using mathematical programming (Mixed-Integer Linear Programming / Pareto Multi-Objective).
          </p>
        </div>

        {/* 3 Metric Badges */}
        <div className="flex flex-wrap items-center gap-3 font-mono-code text-xs">
          <div className="rounded border border-[#CBD5E1] bg-white p-2.5 text-right shadow-2xs">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">CIRCULARITY RATE</span>
            <span className="text-xl font-bold text-emerald-700">{preset.diversionPct}%</span>
            <span className="text-[10px] text-slate-500 block">0.0 MT Landfilled</span>
          </div>

          <div className="rounded border border-[#CBD5E1] bg-white p-2.5 text-right shadow-2xs">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">NET ECON BENEFIT</span>
            <span className="text-xl font-bold text-emerald-700">+₹{preset.netEconLakhs.toFixed(2)} L</span>
            <span className="text-[10px] text-slate-500 block">₹172.92 / t gain</span>
          </div>

          <div className="rounded border border-[#CBD5E1] bg-white p-2.5 text-right shadow-2xs">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">CO₂ AVOIDANCE</span>
            <span className="text-xl font-bold text-emerald-700">{preset.co2OffsetTonnes} t</span>
            <span className="text-[10px] text-slate-500 block">Displaced Clinker</span>
          </div>
        </div>
      </div>

      {/* MIP Solver Parameters Card */}
      <div className="rounded border border-[#CBD5E1] bg-white p-5 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between border-b border-[#E2E8F0] pb-3 gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#DC2626]" />
            <h2 className="font-headline font-bold text-slate-900 text-sm">
              MIP Solver Parameters & Objective Function
            </h2>
            <span className="font-mono-code text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              CBC v2.10.8 Engine
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-1 font-mono-code text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold mr-1">WEIGHT PRESET:</span>
            {OPTIMIZATION_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPresetId(p.id)}
                className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  selectedPresetId === p.id
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Weight Distribution Bars */}
          <div className="space-y-3 font-mono-code text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span className="font-bold">MULTI-OBJECTIVE WEIGHT DISTRIBUTION (Σ = 100%)</span>
              <span className="font-bold text-slate-900">Sum: 100%</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded border border-[#CBD5E1] p-2.5 bg-slate-50">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800">Econ Cost</span>
                  <span className="font-bold text-slate-900">{preset.costWeight}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded mt-1.5 overflow-hidden">
                  <div className="h-full bg-amber-600" style={{ width: `${preset.costWeight}%` }} />
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">Minimizes freight & processing tariffs</span>
              </div>

              <div className="rounded border border-[#CBD5E1] p-2.5 bg-slate-50">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800">Carbon Offset</span>
                  <span className="font-bold text-emerald-700">{preset.co2Weight}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded mt-1.5 overflow-hidden">
                  <div className="h-full bg-emerald-600" style={{ width: `${preset.co2Weight}%` }} />
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">Maximizes Scope 3 displacement credit</span>
              </div>

              <div className="rounded border border-[#CBD5E1] p-2.5 bg-slate-50">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800">Transit Radius</span>
                  <span className="font-bold text-slate-900">{preset.radiusWeight}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded mt-1.5 overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${preset.radiusWeight}%` }} />
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">Minimizes corridor ton-kilometers</span>
              </div>
            </div>
          </div>

          {/* Hard Constraints & Solve Buttons */}
          <div className="space-y-3 font-mono-code text-xs">
            <span className="font-bold text-slate-600 block">
              BOUNDARY CONDITIONS & HARD CONSTRAINTS
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded border border-[#CBD5E1] p-2 flex items-center justify-between bg-white">
                <span className="text-slate-500">Max Radius:</span>
                <strong className="text-slate-900">120 km</strong>
              </div>
              <div className="rounded border border-[#CBD5E1] p-2 flex items-center justify-between bg-white">
                <span className="text-slate-500">Min Compat:</span>
                <strong className="text-slate-900">≥ 85.0%</strong>
              </div>
              <div className="rounded border border-[#CBD5E1] p-2 flex items-center justify-between bg-white">
                <span className="text-slate-500">Silo Limits:</span>
                <span className="rounded bg-slate-100 px-1 text-[10px] font-bold text-slate-700">ENFORCED</span>
              </div>
              <div className="rounded border border-[#CBD5E1] p-2 flex items-center justify-between bg-white">
                <span className="text-slate-500">Diversion:</span>
                <span className="rounded bg-emerald-50 text-emerald-800 border border-emerald-200 px-1 text-[10px] font-bold">100% MAND</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setIsSolverModalOpen(true)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded bg-[#DC2626] px-4 py-2 font-bold text-white shadow-xs hover:bg-[#B91C1C]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Re-Run Optimization Model</span>
              </button>
              <button 
                onClick={() => alert('Current Pareto optimal values locked to dispatch ledger.')}
                className="rounded border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800"
              >
                Optimum Fixed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Material Allocation Flow Stream (DAG Diagram) */}
      <div className="rounded border border-[#CBD5E1] bg-white p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2">
            <GitMerge className="h-4 w-4 text-emerald-600" />
            <h2 className="font-headline font-bold text-slate-900 text-sm">
              Material Allocation Flow Stream
            </h2>
            <span className="font-mono-code text-[11px] text-slate-500">
              Directed Acyclic Stream Graph (DAG)
            </span>
          </div>

          <span className="font-mono-code text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
            ● 0 TONNES RELEGATED TO LANDFILL · 100% CIRCULAR DIVERSION
          </span>
        </div>

        {/* Directed Graph Split Visualization */}
        <div className="rounded border border-[#CBD5E1] bg-[#F8F9FA] p-5">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-center">
            {/* Source Node (Left 4 cols) */}
            <div className="md:col-span-4 rounded border-2 border-slate-700 bg-white p-4 shadow-sm relative">
              <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 uppercase">
                <span>PRIMARY ORIGIN</span>
                <span className="bg-red-50 text-[#DC2626] border border-red-200 px-1 rounded font-bold">SILO-04B</span>
              </div>
              <h3 className="font-headline font-bold text-slate-900 text-base mt-1">
                Chandrapur Super Thermal
              </h3>
              <p className="text-[11px] font-mono-code text-slate-500">
                Class-F Fly Ash · Batch FA-2024-09
              </p>
              <div className="mt-3 flex items-baseline justify-between border-t border-slate-100 pt-2 font-mono-code">
                <span className="text-[10px] text-slate-400 uppercase">ACTIVE INVENTORY</span>
                <span className="text-xl font-bold text-slate-900">4,800.0 MT</span>
              </div>

              {/* Connecting Circle */}
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                Σ
              </div>
            </div>

            {/* Allocation Branches (Right 8 cols) */}
            <div className="md:col-span-8 space-y-3 font-mono-code text-xs">
              {/* Branch 1 */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-emerald-300 bg-white p-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#DC2626]" />
                  <div>
                    <strong className="text-slate-900">Pozzolanic Cement Substitution</strong>
                    <div className="text-[11px] text-slate-500 font-sans">Corridor: NH-353 Rail/Bulk Tanker</div>
                  </div>
                </div>

                <div className="text-center">
                  <span className="font-bold text-slate-900">2,400 MT</span>
                  <span className="text-[11px] text-slate-500 block">(50.0%)</span>
                </div>

                <div className="text-right">
                  <span className="font-bold text-emerald-700">CO₂ Offset: -1,680 t</span>
                  <div className="text-slate-700 font-bold">UltraTech Cement Works (+₹5.24 L)</div>
                </div>
              </div>

              {/* Branch 2 */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-blue-300 bg-white p-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                  <div>
                    <strong className="text-slate-900">Road Embankment / Sub-Base</strong>
                    <div className="text-[11px] text-slate-500 font-sans">Corridor: State Highway SH-264</div>
                  </div>
                </div>

                <div className="text-center">
                  <span className="font-bold text-slate-900">1,500 MT</span>
                  <span className="text-[11px] text-slate-500 block">(31.2%)</span>
                </div>

                <div className="text-right">
                  <span className="font-bold text-emerald-700">CO₂ Offset: -750 t</span>
                  <div className="text-slate-700 font-bold">NHAI Highway Package 4 (+₹2.39 L)</div>
                </div>
              </div>

              {/* Branch 3 */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-amber-300 bg-white p-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-600" />
                  <div>
                    <strong className="text-slate-900">Geopolymer Precast Blocks</strong>
                    <div className="text-[11px] text-slate-500 font-sans">Corridor: MIDC Internal Roadways</div>
                  </div>
                </div>

                <div className="text-center">
                  <span className="font-bold text-slate-900">900 MT</span>
                  <span className="text-[11px] text-slate-500 block">(18.8%)</span>
                </div>

                <div className="text-right">
                  <span className="font-bold text-emerald-700">CO₂ Offset: -410 t</span>
                  <div className="text-slate-700 font-bold">Vidarbha Precast Blocks (+₹0.67 L)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mathematical Optimal Allocation Schedule Table */}
      <div className="rounded border border-[#CBD5E1] bg-white shadow-2xs overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-[#E2E8F0] px-5 py-3 bg-[#F8F9FA] gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
            <h2 className="font-headline font-bold text-slate-900 text-sm">
              Mathematical Optimal Allocation Schedule
            </h2>
            <span className="font-mono-code text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              100% Mass Conserved
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono-code text-xs text-slate-600">
            <span>Logistics Cost: <strong>₹23.65 Lakhs</strong></span>
            <span>|</span>
            <span>Gross Value: <strong>₹31.95 Lakhs</strong></span>
            <button 
              onClick={() => alert('Schedule exported (.CSV)')}
              className="text-slate-400 hover:text-slate-600"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-code">
            <thead className="border-b border-[#E2E8F0] bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4">DESTINATION FACILITY</th>
                <th className="py-2.5 px-3">ASSIGNED PATHWAY</th>
                <th className="py-2.5 px-2">ALLOCATED MASS</th>
                <th className="py-2.5 px-2">DISTANCE</th>
                <th className="py-2.5 px-3">TRANSIT MODE</th>
                <th className="py-2.5 px-2">FREIGHT RATE</th>
                <th className="py-2.5 px-2">PROCESSING</th>
                <th className="py-2.5 px-2">GROSS EXPENSE</th>
                <th className="py-2.5 px-2">OFFTAKE VALUE</th>
                <th className="py-2.5 px-4 text-right">NET BENEFIT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-sans">
                  <div className="font-bold text-slate-900 text-xs">UltraTech Cement Works</div>
                  <div className="text-[10px] text-slate-500 font-mono-code">Plant Code: UTC-MH-02 · Silo Cap: 4,000 MT</div>
                </td>
                <td className="py-3 px-3">
                  <span className="flex items-center gap-1 font-medium text-slate-800">
                    <span className="h-2 w-2 rounded-xs bg-slate-400" />
                    <span>Clinker Substitution</span>
                  </span>
                </td>
                <td className="py-3 px-2 font-bold text-slate-900">
                  2,400 MT
                  <span className="text-[10px] text-slate-500 block font-normal">50.0% share</span>
                </td>
                <td className="py-3 px-2">86 km</td>
                <td className="py-3 px-3">Bulk Pneumatic Tanker</td>
                <td className="py-3 px-2">₹412 / t</td>
                <td className="py-3 px-2">₹120 / t</td>
                <td className="py-3 px-2 font-bold">₹12.76 L</td>
                <td className="py-3 px-2 font-bold">₹18.00 L</td>
                <td className="py-3 px-4 text-right font-bold text-emerald-700 text-sm">
                  +₹5.24 L
                </td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-sans">
                  <div className="font-bold text-slate-900 text-xs">NHAI Highway Project</div>
                  <div className="text-[10px] text-slate-500 font-mono-code">Pkg 4 Wani-Chandrapur · Embankment Reach</div>
                </td>
                <td className="py-3 px-3">
                  <span className="flex items-center gap-1 font-medium text-slate-800">
                    <span className="h-2 w-2 rounded-xs bg-blue-400" />
                    <span>Road Sub-base Layer</span>
                  </span>
                </td>
                <td className="py-3 px-2 font-bold text-slate-900">
                  1,500 MT
                  <span className="text-[10px] text-slate-500 block font-normal">31.2% share</span>
                </td>
                <td className="py-3 px-2">42 km</td>
                <td className="py-3 px-3">Covered Heavy Tipper</td>
                <td className="py-3 px-2">₹201 / t</td>
                <td className="py-3 px-2">₹90 / t</td>
                <td className="py-3 px-2 font-bold">₹4.36 L</td>
                <td className="py-3 px-2 font-bold">₹6.75 L</td>
                <td className="py-3 px-4 text-right font-bold text-emerald-700 text-sm">
                  +₹2.39 L
                </td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-sans">
                  <div className="font-bold text-slate-900 text-xs">Vidarbha Precast Works</div>
                  <div className="text-[10px] text-slate-500 font-mono-code">MIDC Ghuggus Yard · Block Mfg Line #3</div>
                </td>
                <td className="py-3 px-3">
                  <span className="flex items-center gap-1 font-medium text-slate-800">
                    <span className="h-2 w-2 rounded-xs bg-amber-500" />
                    <span>Geopolymer Blocks</span>
                  </span>
                </td>
                <td className="py-3 px-2 font-bold text-slate-900">
                  900 MT
                  <span className="text-[10px] text-slate-500 block font-normal">18.8% share</span>
                </td>
                <td className="py-3 px-2">118 km</td>
                <td className="py-3 px-3">Flatbed Tarpaulin Tipper</td>
                <td className="py-3 px-2">₹566 / t</td>
                <td className="py-3 px-2">₹160 / t</td>
                <td className="py-3 px-2 font-bold">₹6.53 L</td>
                <td className="py-3 px-2 font-bold">₹7.20 L</td>
                <td className="py-3 px-4 text-right font-bold text-emerald-700 text-sm">
                  +₹0.67 L
                </td>
              </tr>

              {/* Total Summary Row */}
              <tr className="bg-slate-50 font-bold border-t-2 border-slate-300">
                <td className="py-3 px-4">PROGRAM TOTAL / WEIGHTED AVERAGE</td>
                <td className="py-3 px-3">Multi-modal Highway Fleet</td>
                <td className="py-3 px-2 text-slate-900">
                  4,800 MT
                  <span className="text-[10px] text-emerald-700 block font-normal">100.0% Diverted</span>
                </td>
                <td className="py-3 px-2">78.2 km (avg)</td>
                <td className="py-3 px-3">Certified HCVs</td>
                <td className="py-3 px-2">₹375 / t</td>
                <td className="py-3 px-2">₹118 / t</td>
                <td className="py-3 px-2">₹23.65 L</td>
                <td className="py-3 px-2">₹31.95 L</td>
                <td className="py-3 px-4 text-right text-emerald-800 text-base">
                  +₹8.30 Lakhs Net
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between border-t border-[#E2E8F0] px-5 py-2.5 bg-[#F8F9FA] text-[11px] font-mono-code text-slate-500">
          <span>Average Transit Fleet Carbon Footprint: <strong>42.8 tCO₂e</strong></span>
          <span>Net Offset Credit (Displaced Raw Materials): <strong className="text-emerald-700">-2,840.0 tCO₂e</strong></span>
          <span>Optimization Status: <strong className="text-slate-900">Integer Solution Feasible (No Slack Active)</strong></span>
        </div>
      </div>

      {/* Comparison Matrix: Optimized Circular Reuse vs Conventional Landfill Disposal */}
      <div className="rounded border border-[#CBD5E1] bg-white shadow-2xs overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-3 bg-[#F8F9FA]">
          <div>
            <h2 className="font-headline font-bold text-slate-900 text-sm">
              Optimized Circular Reuse vs. Conventional Landfill Disposal
            </h2>
            <div className="text-[11px] text-slate-500 font-mono-code">
              Financial, Environmental, and Regulatory Impact Matrix for Stream FA-2024-09 (4,800 t)
            </div>
          </div>
          <span className="font-mono-code text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
            ● Net Advantage: +₹39.98 Lakhs Positive Shift
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-code">
            <thead className="border-b border-[#E2E8F0] bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4">EVALUATION METRIC</th>
                <th className="py-2.5 px-3">CONVENTIONAL ASH POND DISPOSAL</th>
                <th className="py-2.5 px-3">OPTIMIZED WASTE2VALUE REUSE</th>
                <th className="py-2.5 px-4 text-right">NET OPERATIONAL VARIANCE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Landfill Tipping / Dyke Storage Fee</td>
                <td className="py-3 px-3 text-[#DC2626]">
                  ₹550 / tonne <span className="text-slate-500">(₹26.40 L expense)</span>
                </td>
                <td className="py-3 px-3 text-emerald-700 font-bold">
                  ₹0 / tonne <span className="text-slate-500 font-normal">(No tipping)</span>
                </td>
                <td className="py-3 px-4 text-right text-emerald-700 font-bold">
                  -₹26.40 Lakhs saved
                </td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Corridor Logistics & Freight</td>
                <td className="py-3 px-3 text-slate-600">
                  ₹110 / tonne <span className="text-slate-500">(₹5.28 L slurry dyke pump)</span>
                </td>
                <td className="py-3 px-3 text-slate-900 font-bold">
                  ₹492 / tonne <span className="text-slate-500 font-normal">(₹23.65 L multi-client freight)</span>
                </td>
                <td className="py-3 px-4 text-right text-amber-700 font-bold">
                  +₹18.37 Lakhs added transit
                </td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Secondary Material Offtake Credit</td>
                <td className="py-3 px-3 text-slate-400">
                  ₹0.00 <span className="text-slate-500">(Zero monetization)</span>
                </td>
                <td className="py-3 px-3 text-emerald-700 font-bold">
                  ₹665 / tonne <span className="text-slate-500 font-normal">(₹31.95 L gross offtake)</span>
                </td>
                <td className="py-3 px-4 text-right text-emerald-700 font-bold">
                  +₹31.95 Lakhs revenue
                </td>
              </tr>

              <tr className="bg-slate-50/80 font-bold border-t-2 border-slate-300">
                <td className="py-3.5 px-4 text-slate-900 font-sans text-sm">
                  NET FINANCIAL BOTTOM-LINE
                </td>
                <td className="py-3.5 px-3 text-[#DC2626]">
                  -₹31.68 Lakhs
                  <span className="text-[10px] text-red-600 block font-normal">Direct Liability / OpEx Drain</span>
                </td>
                <td className="py-3.5 px-3 text-emerald-700">
                  +₹8.30 Lakhs
                  <span className="text-[10px] text-emerald-800 block font-normal">Net Circular Operating Gain</span>
                </td>
                <td className="py-3.5 px-4 text-right text-emerald-800 text-sm">
                  +₹39.98 L Advantage
                </td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Lifecycle Carbon Footprint (Scope 1-3)</td>
                <td className="py-3 px-3 text-[#DC2626]">
                  +420 tCO₂e <span className="text-slate-500 font-normal">(Slurry aeration & dyke fugitives)</span>
                </td>
                <td className="py-3 px-3 text-emerald-700 font-bold">
                  -2,840 tCO₂e <span className="text-slate-500 font-normal">(Virgin clinker & borrow pit displacement)</span>
                </td>
                <td className="py-3 px-4 text-right text-emerald-700 font-bold">
                  -3,260 tCO₂e Delta
                </td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Regulatory Audit & Statutory Compliance</td>
                <td className="py-3 px-3 text-[#DC2626] font-bold">
                  High Risk <span className="text-slate-500 font-normal">(CPCB Ash pond penalty exposure)</span>
                </td>
                <td className="py-3 px-3 text-emerald-700 font-bold">
                  100% MoEFCC Compliant <span className="text-slate-500 font-normal">(Notification certified)</span>
                </td>
                <td className="py-3 px-4 text-right text-emerald-700 font-bold">
                  Zero Statutory Penalty
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-56 right-0 z-30 flex items-center justify-between border-t border-[#CBD5E1] bg-white px-6 py-3 shadow-lg">
        <div className="flex items-center gap-4 text-xs font-mono-code">
          <button
            onClick={() => onNavigate('scenario-comparison')}
            className="rounded border border-[#CBD5E1] bg-white px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 font-semibold"
          >
            Compare with Alternative Heuristics
          </button>
          <span className="text-slate-400">
            Model Hash: <strong>SHA256: 79a1f..4b9</strong>
          </span>
          <button 
            onClick={() => alert('Full allocation manifest exported.')}
            className="text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Manifest</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate('decision-summary')}
          className="flex items-center gap-2 rounded bg-[#DC2626] px-5 py-2 font-headline font-bold text-xs text-white shadow-xs hover:bg-[#B91C1C] active:translate-y-px"
        >
          <span>View Decision Summary & Dispatch Report</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Interactive Solver Execution Modal */}
      <SolverRunModal
        isOpen={isSolverModalOpen}
        onClose={() => setIsSolverModalOpen(false)}
        onComplete={() => {
          setHasJustSolved(true);
        }}
      />
    </div>
  );
};
