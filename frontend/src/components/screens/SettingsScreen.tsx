import React, { useState } from 'react';
import { 
  Settings, 
  Sliders, 
  Cpu, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle,
  Building,
  Truck,
  Leaf,
  Layers,
  Database,
  Radio
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const [solverTimeout, setSolverTimeout] = useState('30');
  const [mipGap, setMipGap] = useState('0.005');
  const [dieselPrice, setDieselPrice] = useState('94.50');
  const [tonKmTariff, setTonKmTariff] = useState('4.80');
  const [carbonCreditPrice, setCarbonCreditPrice] = useState('1850');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              SYSTEM CONFIGURATION · INDUSTRIAL CLUSTER NODE MH-04
            </span>
          </div>
          <h1 className="text-2xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-3">
            Cluster & Solver Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Global optimization hyperparameters, geospatial freight matrices, statutory carbon crediting, and MILP branch-and-cut tolerance rules.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded bg-rose-600 text-white hover:bg-rose-700 shadow-sm cursor-pointer transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          {saved ? 'Saved Successfully!' : 'Save System Parameters'}
        </button>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          Configuration persisted to cluster coordinator node. All active optimization pipelines updated.
        </div>
      )}

      {/* Form sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MILP Solver Parameters */}
        <div className="bg-white border border-slate-200 rounded p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Cpu className="w-4 h-4 text-rose-600" />
            <h2 className="text-sm font-bold font-headline uppercase tracking-wider text-slate-800">
              MILP Mathematical Solver Hyperparameters
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Optimality Relative Tolerance Gap (MIP Gap)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={mipGap}
                  onChange={(e) => setMipGap(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs focus:ring-1 focus:ring-rose-500"
                />
                <span className="font-mono text-slate-400 text-xs shrink-0">(0.5%)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Lower gap increases precision but extends branch-and-bound iterations.</p>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Maximum Branch-and-Cut Wall Time (Seconds)
              </label>
              <input
                type="number"
                value={solverTimeout}
                onChange={(e) => setSolverTimeout(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Active Linear Solver Engine
              </label>
              <select className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-slate-50 font-medium">
                <option>COIN-OR CBC (Open-Source Multi-Threaded MILP)</option>
                <option>HiGHS High-Performance Simplex (Parallel)</option>
                <option>SCIP (Solving Constraint Integer Programs)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Logistics & Freight Tariff Matrix */}
        <div className="bg-white border border-slate-200 rounded p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Truck className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-bold font-headline uppercase tracking-wider text-slate-800">
              Freight Tariff & Fuel Rates (Maharashtra)
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Bulk Pneumatic Tanker Base Tariff (₹ / Ton-km)
              </label>
              <input
                type="text"
                value={tonKmTariff}
                onChange={(e) => setTonKmTariff(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs focus:ring-1 focus:ring-rose-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">Based on Maharashtra State Transporters Association bulk rate index.</p>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Regional Diesel Benchmark (₹ / Litre)
              </label>
              <input
                type="text"
                value={dieselPrice}
                onChange={(e) => setDieselPrice(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Internal Shadow Carbon Price (₹ / tCO₂e)
              </label>
              <input
                type="text"
                value={carbonCreditPrice}
                onChange={(e) => setCarbonCreditPrice(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs focus:ring-1 focus:ring-rose-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">Used to evaluate environmental cost tradeoffs in multi-objective optimization.</p>
            </div>
          </div>
        </div>

        {/* Regulatory & Standards Compliance Profiles */}
        <div className="bg-white border border-slate-200 rounded p-5 shadow-2xs space-y-4 md:col-span-2">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold font-headline uppercase tracking-wider text-slate-800">
              Statutory Standard Verification Presets
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="font-bold text-slate-900 mb-1">IS 3812: Part 1 (2013)</div>
              <p className="text-slate-500 text-[11px]">
                Pulverized fuel ash for use as pozzolana in cement mortar and concrete.
              </p>
              <div className="mt-2 text-[10px] font-mono text-emerald-700 font-semibold">
                ACTIVE · SiO₂ + Al₂O₃ + Fe₂O₃ ≥ 70%
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="font-bold text-slate-900 mb-1">ASTM C618 Class F</div>
              <p className="text-slate-500 text-[11px]">
                Coal fly ash for use in concrete, strict Loss on Ignition (LOI) limit &lt; 6.0%.
              </p>
              <div className="mt-2 text-[10px] font-mono text-emerald-700 font-semibold">
                ACTIVE · SO₃ ≤ 5.0%, Moisture ≤ 3.0%
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="font-bold text-slate-900 mb-1">IRC:SP:58 (NHAI Sub-base)</div>
              <p className="text-slate-500 text-[11px]">
                Guidelines for use of fly ash in embankment and road subgrade construction.
              </p>
              <div className="mt-2 text-[10px] font-mono text-emerald-700 font-semibold">
                ACTIVE · Free lime &lt; 1.0%, CBR &gt; 8%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
