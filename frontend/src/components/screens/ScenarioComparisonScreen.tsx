import React, { useState } from 'react';
import { 
  GitCompare, 
  Scale, 
  Truck, 
  Leaf, 
  ShieldCheck, 
  Download, 
  Printer, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  Sliders,
  Check,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { ScreenId, WasteStream } from '../../types';
import { ASSETS } from '../../data/mockData';

interface ScenarioComparisonScreenProps {
  onNavigate: (screen: ScreenId) => void;
  activeStream: WasteStream;
}

export const ScenarioComparisonScreen: React.FC<ScenarioComparisonScreenProps> = ({
  onNavigate,
  activeStream,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<'A' | 'B' | 'C'>('A');

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto pb-24">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#CBD5E1] pb-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
          <span className="font-mono-code text-[11px] font-bold text-[#DC2626] uppercase">
            DECISION MODELING STAGE 07 / MULTI-CRITERIA FRONTIER
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code">
          <div className="text-slate-500">
            STREAM PAYLOAD: <strong className="text-slate-900">4,800 MT</strong>
          </div>
          <div className="text-slate-500">
            PARETO INDEX: <strong className="text-emerald-700">0.892 (Optimal)</strong>
          </div>
          <div className="text-slate-500">
            SIMULATION ENGINE: <strong className="text-slate-900">MIP v4.2</strong>
          </div>
        </div>
      </div>

      {/* Main Title & Strategy Selector */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-[#0F172A]">
            Scenario Comparison
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-3xl">
            Evaluate trade-offs between competing operational strategies: <strong>Balanced Pareto Optimization</strong>, <strong>Lowest Logistics Cost</strong>, and <strong>Maximum Decarbonization</strong> for Batch {activeStream.code}.
          </p>
        </div>

        <button 
          onClick={() => alert('Variable weighting matrix adjusted.')}
          className="flex items-center gap-1.5 rounded border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs font-mono-code"
        >
          <Sliders className="h-3.5 w-3.5 text-slate-500" />
          <span>Adjust Decision Variables</span>
        </button>
      </div>

      {/* Scenario Filter Radio Pills */}
      <div className="flex flex-wrap items-center gap-3 font-mono-code text-xs">
        <button
          onClick={() => setSelectedScenario('A')}
          className={`flex items-center gap-2 rounded px-3 py-1.5 border transition-colors ${
            selectedScenario === 'A'
              ? 'border-[#DC2626] bg-red-50/50 text-[#DC2626] font-bold shadow-2xs'
              : 'border-[#CBD5E1] bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
          <span>Scenario A: Balanced Multi-Objective</span>
          <span className="rounded bg-red-100 text-[#DC2626] px-1 text-[9px] uppercase font-bold">RECOMMENDED</span>
        </button>

        <button
          onClick={() => setSelectedScenario('B')}
          className={`flex items-center gap-2 rounded px-3 py-1.5 border transition-colors ${
            selectedScenario === 'B'
              ? 'border-slate-800 bg-slate-100 text-slate-900 font-bold shadow-2xs'
              : 'border-[#CBD5E1] bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span>Scenario B: Lowest Logistics Cost (Freight Minimized)</span>
        </button>

        <button
          onClick={() => setSelectedScenario('C')}
          className={`flex items-center gap-2 rounded px-3 py-1.5 border transition-colors ${
            selectedScenario === 'C'
              ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold shadow-2xs'
              : 'border-[#CBD5E1] bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          <span>Scenario C: Lowest CO₂ / Maximum Decarbonization</span>
        </button>
      </div>

      {/* 3 Scenario Cards Side-by-Side */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Scenario A Card */}
        <div 
          onClick={() => setSelectedScenario('A')}
          className={`rounded border-2 p-5 bg-white shadow-2xs space-y-4 cursor-pointer transition-all ${
            selectedScenario === 'A' ? 'border-[#DC2626] ring-2 ring-red-100' : 'border-[#CBD5E1] hover:border-slate-400'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono-code text-[10px] font-bold text-[#DC2626] bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                  SCENARIO A
                </span>
                <span className="font-mono-code text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  RECOMMENDED
                </span>
              </div>
              <h2 className="font-headline font-bold text-slate-900 text-lg mt-1.5">
                Balanced Multi-Objective
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Pareto optimal weight balancing economics and emissions.
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-red-50 text-[#DC2626] shrink-0">
              <Scale className="h-4 w-4" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-b border-slate-100 py-3 font-mono-code text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">WASTE DIVERTED</span>
              <strong className="text-base text-slate-900">4,800 t</strong>
              <span className="text-[10px] text-emerald-700 block font-bold">100% Zero Dyke</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">NET ECON GAIN</span>
              <strong className="text-base text-emerald-700">+₹8.30 L</strong>
              <span className="text-[10px] text-slate-500 block">₹172.9 / tonne</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">CO₂ OFFSET</span>
              <strong className="text-base text-emerald-700">-2,840 t</strong>
              <span className="text-[10px] text-slate-500 block">0.59 tCO₂e/t</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">AVG RADIUS</span>
              <strong className="text-base text-slate-900">78.2 km</strong>
              <span className="text-[10px] text-slate-500 block">3 Dispatched Hubs</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-mono-code text-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 uppercase text-[10px]">SUPPLY CHAIN RISK</span>
              <span className="flex items-center gap-1 font-bold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Very Low
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              OFFTAKER ALLOCATION: <strong>Cement (58%) · Road (29%) · Precast (13%)</strong>
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
              <span className="text-slate-400">PAYBACK VELOCITY</span>
              <strong className="text-slate-800">T+14 Business Days</strong>
            </div>
          </div>
        </div>

        {/* Scenario B Card */}
        <div 
          onClick={() => setSelectedScenario('B')}
          className={`rounded border-2 p-5 bg-white shadow-2xs space-y-4 cursor-pointer transition-all ${
            selectedScenario === 'B' ? 'border-slate-800 ring-2 ring-slate-200' : 'border-[#CBD5E1] hover:border-slate-400'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono-code text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                  SCENARIO B
                </span>
                <span className="font-mono-code text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                  FREIGHT CONSTRAINED
                </span>
              </div>
              <h2 className="font-headline font-bold text-slate-900 text-lg mt-1.5">
                Lowest Logistics Cost
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Minimizes tonne-kilometer transport outlays strictly.
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 text-slate-700 shrink-0">
              <Truck className="h-4 w-4" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-b border-slate-100 py-3 font-mono-code text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">WASTE DIVERTED</span>
              <strong className="text-base text-red-700">4,200 t</strong>
              <span className="text-[10px] text-red-600 block">87.5% (600t to Dyke)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">NET ECON GAIN</span>
              <strong className="text-base text-slate-900">+₹9.65 L</strong>
              <span className="text-[10px] text-emerald-700 block font-bold">Highest Immediate</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">CO₂ OFFSET</span>
              <strong className="text-base text-slate-700">-2,180 t</strong>
              <span className="text-[10px] text-red-600 block">-23% vs Scenario A</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">AVG RADIUS</span>
              <strong className="text-base text-slate-900">51.4 km</strong>
              <span className="text-[10px] text-slate-500 block">Short Haul Only</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-mono-code text-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 uppercase text-[10px]">SUPPLY CHAIN RISK</span>
              <span className="flex items-center gap-1 font-bold text-amber-700">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Medium (Road Dep.)
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              OFFTAKER ALLOCATION: <strong>NHAI Sub-base (68%) · Local Yard (19.5%)</strong>
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
              <span className="text-slate-400">DYKE DISPOSAL FEE</span>
              <strong className="text-red-700">₹1.80 L incurred</strong>
            </div>
          </div>
        </div>

        {/* Scenario C Card */}
        <div 
          onClick={() => setSelectedScenario('C')}
          className={`rounded border-2 p-5 bg-white shadow-2xs space-y-4 cursor-pointer transition-all ${
            selectedScenario === 'C' ? 'border-emerald-600 ring-2 ring-emerald-100' : 'border-[#CBD5E1] hover:border-slate-400'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono-code text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  SCENARIO C
                </span>
                <span className="font-mono-code text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  GREEN FRONTIER
                </span>
              </div>
              <h2 className="font-headline font-bold text-slate-900 text-lg mt-1.5">
                Max Decarbonization
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Maximizes clinker displacement across regional cement mills.
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-50 text-emerald-600 shrink-0">
              <Leaf className="h-4 w-4" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-b border-slate-100 py-3 font-mono-code text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">WASTE DIVERTED</span>
              <strong className="text-base text-slate-900">4,800 t</strong>
              <span className="text-[10px] text-emerald-700 block font-bold">100% Zero Dyke</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">NET ECON GAIN</span>
              <strong className="text-base text-slate-900">+₹6.15 L</strong>
              <span className="text-[10px] text-amber-700 block">High Freight Drag</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">CO₂ OFFSET</span>
              <strong className="text-base text-emerald-700">-3,450 t</strong>
              <span className="text-[10px] text-emerald-800 block font-bold">+21.5% vs Scenario A</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">AVG RADIUS</span>
              <strong className="text-base text-red-700">112.6 km</strong>
              <span className="text-[10px] text-slate-500 block">Distant Grinding Unit</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-mono-code text-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 uppercase text-[10px]">SUPPLY CHAIN RISK</span>
              <span className="flex items-center gap-1 font-bold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Low
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              OFFTAKER ALLOCATION: <strong>Ultratech Grinding (82%) · ACC Cement (18%)</strong>
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
              <span className="text-slate-400">CARBON CREDIT VALUE</span>
              <strong className="text-emerald-700">₹13.80 L @ ₹400/tCO₂e</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Trade-off Visualization & Highway Corridor Telemetry */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols): Trade-off bar chart & executive recommendation */}
        <div className="rounded border border-[#CBD5E1] bg-white p-5 shadow-2xs space-y-4 lg:col-span-8">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
            <div>
              <span className="text-[10px] font-mono-code font-bold uppercase text-slate-400">
                TRADE-OFF VISUALIZATION
              </span>
              <h2 className="font-headline font-bold text-slate-900 text-sm">
                Economic Margin vs. Carbon Abatement Frontier
              </h2>
            </div>
            <div className="flex items-center gap-3 font-mono-code text-[11px] text-slate-600">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-xs bg-emerald-600" /> CO₂ Avoided</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-xs bg-red-700" /> Net Realized Gain</span>
            </div>
          </div>

          {/* Bar 1: Scenario A */}
          <div className="space-y-1.5 font-mono-code text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
                Scenario A (Balanced Optimal)
              </span>
              <span>Net: <strong>+₹8.30 L</strong> · Offsets: <strong>2,840 tCO₂e</strong></span>
            </div>
            <div className="flex h-5 w-full rounded overflow-hidden bg-slate-100">
              <div className="h-full bg-emerald-600 w-[55%] flex items-center px-2 text-[10px] text-white font-bold" title="2,840 tCO2e">
                2,840 tCO₂e (82% of max)
              </div>
              <div className="h-full bg-red-700 w-[45%] flex items-center px-2 text-[10px] text-white font-bold" title="₹8.30L">
                ₹8.30L (86%)
              </div>
            </div>
          </div>

          {/* Bar 2: Scenario B */}
          <div className="space-y-1.5 font-mono-code text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-500" />
                Scenario B (Lowest Logistics Cost)
              </span>
              <span>Net: <strong>+₹9.65 L</strong> · Offsets: <strong>2,180 tCO₂e</strong></span>
            </div>
            <div className="flex h-5 w-full rounded overflow-hidden bg-slate-100">
              <div className="h-full bg-emerald-600 w-[42%] flex items-center px-2 text-[10px] text-white font-bold">
                2,180 tCO₂e (63%)
              </div>
              <div className="h-full bg-red-700 w-[58%] flex items-center px-2 text-[10px] text-white font-bold">
                ₹9.65L (100% max)
              </div>
            </div>
          </div>

          {/* Bar 3: Scenario C */}
          <div className="space-y-1.5 font-mono-code text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                Scenario C (Max Decarbonization)
              </span>
              <span>Net: <strong>+₹6.15 L</strong> · Offsets: <strong>3,450 tCO₂e</strong></span>
            </div>
            <div className="flex h-5 w-full rounded overflow-hidden bg-slate-100">
              <div className="h-full bg-emerald-600 w-[70%] flex items-center px-2 text-[10px] text-white font-bold">
                3,450 tCO₂e (100% max)
              </div>
              <div className="h-full bg-red-700 w-[30%] flex items-center px-2 text-[10px] text-white font-bold">
                ₹6.15L (63%)
              </div>
            </div>
          </div>

          {/* Executive Recommendation Box */}
          <div className="rounded border border-red-200 bg-red-50/40 p-3 flex items-start gap-2.5 text-xs">
            <Info className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" />
            <p className="text-slate-800 leading-relaxed font-sans">
              <strong>Executive Recommendation:</strong> Scenario A captures <strong>86%</strong> of peak financial yield while securing <strong>82%</strong> of total decarbonization ceiling, while eliminating all environmental dyke fines. Choosing Scenario B causes irreversible loss of <strong>660 tCO₂e</strong> in credits to save only <strong>₹1.35 L</strong> in diesel.
            </p>
          </div>
        </div>

        {/* Right Column (4 cols): Route Topology with Photo */}
        <div className="rounded border border-[#CBD5E1] bg-white p-4 shadow-2xs space-y-3 lg:col-span-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
            <div>
              <span className="text-[10px] font-mono-code font-bold uppercase text-slate-400">
                CORRIDOR TELEMETRY
              </span>
              <h3 className="font-headline font-bold text-slate-900 text-xs">
                Maharashtra Regional Route Topology
              </h3>
            </div>
            <span className="font-mono-code text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
              SH-234 Active
            </span>
          </div>

          <div className="relative rounded overflow-hidden border border-[#CBD5E1]">
            <img 
              src={ASSETS.highwayRoute} 
              alt="Highway Freight Corridor" 
              className="h-32 w-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded font-mono-code text-[10px] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>3 Active Bulk Tankers En-Route</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-600 font-sans leading-snug">
            Dynamic routing nodes connecting Chandrapur Super Thermal to UltraTech Awarpur and NHAI NH-353 Bypass.
          </p>

          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-2 font-mono-code text-xs">
            <div className="rounded border border-[#CBD5E1] p-2 bg-slate-50">
              <span className="text-[9px] text-slate-400 block uppercase">FLEET FUEL ECONOMY</span>
              <strong className="text-slate-900 text-xs">3.82 km/L</strong>
              <span className="text-[10px] text-slate-500 block">(28t Gross)</span>
            </div>

            <div className="rounded border border-[#CBD5E1] p-2 bg-slate-50">
              <span className="text-[9px] text-slate-400 block uppercase">CONGESTION DELAY INDEX</span>
              <strong className="text-emerald-700 text-xs">0.04</strong>
              <span className="text-[10px] text-slate-500 block">(Negligible)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Multi-Criteria Metric Matrix */}
      <div className="rounded border border-[#CBD5E1] bg-white shadow-2xs overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-[#E2E8F0] px-5 py-3 bg-[#F8F9FA] gap-2">
          <div>
            <h2 className="font-headline font-bold text-slate-900 text-sm">
              Detailed Multi-Criteria Metric Matrix
            </h2>
            <div className="text-[11px] text-slate-500 font-mono-code">
              Deterministic evaluation across logistics, commercial off-take values, and ESG compliance parameters.
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-code">
            <button 
              onClick={() => alert('Matrix exported as CSV.')}
              className="flex items-center gap-1 rounded border border-[#CBD5E1] bg-white px-2.5 py-1 text-slate-700 hover:bg-slate-50"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>CSV Export</span>
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-1 rounded border border-[#CBD5E1] bg-white px-2.5 py-1 text-slate-700 hover:bg-slate-50"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" />
              <span>Print Ledger</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-code">
            <thead className="border-b border-[#E2E8F0] bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4">OPERATIONAL & ENVIRONMENTAL METRIC</th>
                <th className="py-2.5 px-2">UNIT</th>
                <th className="py-2.5 px-3 bg-red-50/50 text-[#DC2626]">SCENARIO A (BALANCED) ★</th>
                <th className="py-2.5 px-3">SCENARIO B (LOWEST COST)</th>
                <th className="py-2.5 px-3">SCENARIO C (LOWEST CARBON)</th>
                <th className="py-2.5 px-4">SENSITIVITY & CONSTRAINTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-4 font-bold text-slate-900">Total Mass Reused</td>
                <td className="py-2.5 px-2 text-slate-500">Tonnes</td>
                <td className="py-2.5 px-3 font-bold text-slate-900 bg-red-50/20">4,800 t</td>
                <td className="py-2.5 px-3 text-red-600">4,200 t</td>
                <td className="py-2.5 px-3 font-bold text-slate-900">4,800 t</td>
                <td className="py-2.5 px-4 text-slate-500 font-sans text-[11px]">Fixed 4,800 MT Chandrapur Batch FA-2024-09</td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-4 font-bold text-slate-900">Gross Logistics Expense</td>
                <td className="py-2.5 px-2 text-slate-500">INR (₹)</td>
                <td className="py-2.5 px-3 font-bold text-slate-900 bg-red-50/20">₹23.65 L</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">₹14.80 L</td>
                <td className="py-2.5 px-3 font-bold text-red-700">₹32.40 L</td>
                <td className="py-2.5 px-4 text-slate-500 font-sans text-[11px]">High sensitivity to diesel benchmark (₹94.2/L)</td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-4 font-bold text-slate-900">Gross Offtaker Revenue Credit</td>
                <td className="py-2.5 px-2 text-slate-500">INR (₹)</td>
                <td className="py-2.5 px-3 font-bold text-slate-900 bg-red-50/20">₹31.95 L</td>
                <td className="py-2.5 px-3 text-slate-600">₹24.45 L</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">₹38.55 L</td>
                <td className="py-2.5 px-4 text-slate-500 font-sans text-[11px]">Indexed to BIS 3812 Part 1 Grade clinker prices</td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-4 font-bold text-slate-900">Net Advantage vs Landfill</td>
                <td className="py-2.5 px-2 text-slate-500">INR (₹)</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700 bg-red-50/20 text-sm">+₹39.98 L</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">+₹36.85 L</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">+₹32.55 L</td>
                <td className="py-2.5 px-4 text-slate-500 font-sans text-[11px]">Includes avoided dyke upkeep (₹660/t baseline)</td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-4 font-bold text-slate-900">Direct CO₂ Emissions Avoided</td>
                <td className="py-2.5 px-2 text-slate-500">tCO₂e</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700 bg-red-50/20">-2,840</td>
                <td className="py-2.5 px-3 text-slate-700">-2,180</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700 text-sm">-3,450</td>
                <td className="py-2.5 px-4 text-slate-500 font-sans text-[11px]">Governed by clinker substitution factor (0.82)</td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-4 font-bold text-slate-900">Weighted Fleet Transport Radius</td>
                <td className="py-2.5 px-2 text-slate-500">km</td>
                <td className="py-2.5 px-3 font-bold text-slate-900 bg-red-50/20">78.2 km</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">51.4 km</td>
                <td className="py-2.5 px-3 text-red-700">112.6 km</td>
                <td className="py-2.5 px-4 text-slate-500 font-sans text-[11px]">Driver duty hours regulation & fleet availability</td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-4 font-bold text-slate-900">Number of Active Off-take Sites</td>
                <td className="py-2.5 px-2 text-slate-500">Count</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700 bg-red-50/20">3 Facilities</td>
                <td className="py-2.5 px-3 text-amber-700">2 Facilities</td>
                <td className="py-2.5 px-3 text-slate-700">2 Facilities</td>
                <td className="py-2.5 px-4 text-slate-500 font-sans text-[11px]">Redundancy buffer: Minimum 2 required by mandate</td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-4 font-bold text-slate-900">Unused Regional Demand Buffer</td>
                <td className="py-2.5 px-2 text-slate-500">Tonnes</td>
                <td className="py-2.5 px-3 font-bold text-slate-900 bg-red-50/20">1,400 t</td>
                <td className="py-2.5 px-3 text-emerald-700">2,000 t</td>
                <td className="py-2.5 px-3 text-slate-900">1,400 t</td>
                <td className="py-2.5 px-4 text-slate-500 font-sans text-[11px]">Absorptive slack capacity for surge volume</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Solvency & Statutory Checks */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 text-xs">
        {/* Off-taker Solvency */}
        <div className="rounded border border-[#CBD5E1] bg-white p-4 shadow-2xs space-y-2">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2 font-mono-code text-[11px]">
            <span className="font-bold text-slate-700 uppercase">OFF-TAKER SOLVENCY & SILO CAPACITY</span>
            <span className="text-emerald-700 font-bold">● 100% Inspected</span>
          </div>
          <div className="space-y-1 font-mono-code text-[11px]">
            <div className="flex items-center justify-between">
              <strong>UltraTech Cement Works (Awarpur)</strong>
              <span className="text-slate-600">3,200 t capacity available · Grade AAA</span>
            </div>
            <div className="flex items-center justify-between">
              <strong>NHAI Package 4 Sub-base Contractor</strong>
              <span className="text-slate-600">1,500 t aggregate blend · Grade A</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-mono-code text-slate-500">
            <span>All contracts governed by CPCB Circular 2024 compliance</span>
            <span className="text-emerald-700 font-bold">Audit Complete</span>
          </div>
        </div>

        {/* Statutory Alignment */}
        <div className="rounded border border-emerald-200 bg-emerald-50/50 p-4 shadow-2xs space-y-2">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-2 font-mono-code text-[11px]">
            <span className="font-bold text-emerald-950 uppercase">STATUTORY ALIGNMENT</span>
            <span className="text-emerald-800 font-bold">MPCB-CH-2024-C</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-950 font-sans text-xs">100% Fly Ash Utilization Notification</strong>
              <p className="text-[11px] text-emerald-900 leading-snug mt-0.5">
                Scenario A &amp; C fully fulfill the Ministry of Environment, Forest and Climate Change (MoEFCC) zero-dyke accumulation threshold.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-emerald-200 text-xs font-mono-code">
            <span className="text-emerald-900">Penalty exposure on Scenario A:</span>
            <strong className="text-emerald-800 text-sm">₹0.00 (Zero Violation)</strong>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-56 right-0 z-30 flex items-center justify-between border-t border-[#CBD5E1] bg-white px-6 py-3 shadow-lg">
        <div className="flex items-center gap-5 text-xs font-mono-code">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#DC2626]" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">DESIGNATED SOLUTION</span>
              <strong className="text-slate-900 font-sans">Scenario A (Pareto Optimal)</strong>
            </div>
          </div>

          <div className="border-l border-slate-200 pl-4">
            <span className="text-[10px] text-slate-400 block uppercase">OFFSET</span>
            <span className="font-bold text-emerald-700">-2,840 tCO₂e</span>
          </div>

          <div className="border-l border-slate-200 pl-4">
            <span className="text-[10px] text-slate-400 block uppercase">ECON GAIN</span>
            <span className="font-bold text-[#DC2626]">+₹8.30 L</span>
          </div>

          <div className="border-l border-slate-200 pl-4">
            <span className="text-[10px] text-slate-400 block uppercase">RADIUS</span>
            <span className="font-bold text-slate-900">78.2 km</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Scenario A designated as Master Dispatch Plan. Manifest dockets generated.')}
            className="flex items-center gap-1.5 rounded border border-[#CBD5E1] bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span>Apply Scenario A as Master Dispatch Plan</span>
          </button>
          <button
            onClick={() => onNavigate('decision-summary')}
            className="flex items-center gap-2 rounded bg-[#DC2626] px-5 py-2 font-headline font-bold text-xs text-white shadow-xs hover:bg-[#B91C1C] active:translate-y-px"
          >
            <span>Proceed to Decision Summary Report</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
