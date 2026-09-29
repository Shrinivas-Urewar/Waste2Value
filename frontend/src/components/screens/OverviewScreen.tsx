import React from 'react';
import { 
  ArrowUpRight, 
  TrendingUp, 
  RotateCcw, 
  Plus, 
  Calendar, 
  Download, 
  SlidersHorizontal, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Flame, 
  Truck, 
  Boxes, 
  Building 
} from 'lucide-react';
import { ScreenId, WasteStream, OptimizationRun, ActivityLog } from '../../types';

interface OverviewScreenProps {
  onNavigate: (screen: ScreenId) => void;
  streams: WasteStream[];
  onSelectStream: (stream: WasteStream) => void;
  runs: OptimizationRun[];
  logs: ActivityLog[];
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  onNavigate,
  streams,
  onSelectStream,
  runs,
  logs,
}) => {
  return (
    <div className="space-y-5 p-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#CBD5E1] pb-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
          <span className="font-mono-code text-[11px] font-bold text-slate-700 tracking-wider uppercase">
            DEMO / BENCHMARK DATASET · LIVE REUSE REGISTRY
          </span>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>CPCB Circular Norms Rev. 2024.3 Active</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono-code text-slate-500">
            Telemetry Cycle: <strong className="text-slate-800">T+18m synced</strong>
          </span>
          <button 
            onClick={() => alert('Live telemetry feed re-synced with SCADA grid.')}
            className="flex items-center gap-1 rounded border border-[#CBD5E1] bg-white px-2.5 py-1 text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-3 w-3 text-slate-500" />
            <span>Sync Feed</span>
          </button>
          <button
            onClick={() => onNavigate('waste-intake')}
            className="flex items-center gap-1 rounded bg-[#DC2626] px-3 py-1 font-semibold text-white shadow-xs hover:bg-[#B91C1C]"
          >
            <span>Intake New Stream</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Title & Time Window */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-[#0F172A]">
              Overview
            </h1>
            <span className="font-mono-code text-xs font-bold text-slate-600 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded">
              NODE MH-04
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Monitor industrial waste streams and identify higher-value reuse opportunities across the Western Industrial Belt.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs text-slate-600 shadow-2xs">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span>Operational Window:</span>
          <strong className="font-mono-code text-slate-900">FY 2024-Q3 QTD</strong>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Waste */}
        <div className="relative rounded border border-[#CBD5E1] bg-white p-4 shadow-2xs border-l-4 border-l-slate-400">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            <span>Total Waste Available</span>
            <span className="font-mono-code text-[10px] text-slate-400 bg-slate-100 px-1 rounded">SAMPLE REGISTRY</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-mono-code text-3xl font-bold tracking-tight text-[#0F172A]">
              12,450
            </span>
            <span className="font-mono-code text-sm font-semibold text-slate-500">t</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Across 3 verified facility sources
          </div>
        </div>

        {/* Card 2: Reuse Potential */}
        <div className="relative rounded border border-[#CBD5E1] bg-white p-4 shadow-2xs border-l-4 border-l-emerald-600">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            <span>Reuse Potential</span>
            <span className="font-mono-code text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 rounded">
              +12.4% vs last cycle
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono-code text-3xl font-bold tracking-tight text-emerald-700">
              9,820
            </span>
            <span className="font-mono-code text-sm font-semibold text-slate-500">t</span>
            <span className="font-mono-code text-xs font-semibold text-emerald-800">
              78.9% valorization
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Diversion index verified (MIP Target)
          </div>
        </div>

        {/* Card 3: Estimated Cost Avoided */}
        <div className="relative rounded border border-[#CBD5E1] bg-white p-4 shadow-2xs border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            <span>Estimated Cost Avoided</span>
            <span className="font-mono-code text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1 rounded">
              INR SAVINGS
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-mono-code text-3xl font-bold tracking-tight text-slate-900">
              ₹18.6
            </span>
            <span className="font-mono-code text-lg font-bold text-slate-600">L</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Disposal & tipping fee diversion savings
          </div>
        </div>

        {/* Card 4: Estimated CO2 Impact */}
        <div className="relative rounded border border-[#CBD5E1] bg-white p-4 shadow-2xs border-l-4 border-l-emerald-600">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            <span>Estimated CO₂ Impact</span>
            <span className="font-mono-code text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 rounded">
              CLIMATE DIVIDEND
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-mono-code text-3xl font-bold tracking-tight text-emerald-700">
              -2,840
            </span>
            <span className="font-mono-code text-sm font-semibold text-slate-500">tCO₂e</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            ≈ 617 passenger cars/yr avoided
          </div>
        </div>
      </div>

      {/* Main Grid: Left (Tables & Runs) + Right (Pathways & Audits) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          {/* Current Waste Streams Table */}
          <div className="rounded border border-[#CBD5E1] bg-white shadow-2xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-3 bg-[#F8F9FA]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
                <h3 className="font-headline font-bold text-slate-900 text-sm tracking-tight">
                  Current Waste Streams
                </h3>
                <span className="font-mono-code text-[11px] text-slate-500">
                  {streams.length} Active Entries
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <button 
                  onClick={() => alert('Exporting Waste Streams Ledger (.CSV)...')}
                  className="hover:text-slate-600 p-1"
                  title="Export CSV"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => alert('Filtering options')}
                  className="hover:text-slate-600 p-1"
                  title="Filter streams"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#E2E8F0] bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-4">Waste Type</th>
                    <th className="py-2.5 px-3">Source Facility</th>
                    <th className="py-2.5 px-3">Location</th>
                    <th className="py-2.5 px-3 text-right">Quantity</th>
                    <th className="py-2.5 px-4">Chemical Baseline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] font-normal text-slate-700">
                  {streams.map((item) => (
                    <tr 
                      key={item.id}
                      onClick={() => {
                        onSelectStream(item);
                        onNavigate('waste-analysis');
                      }}
                      className="cursor-pointer hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${
                            item.code.includes('FA') ? 'bg-blue-400' :
                            item.code.includes('SL') ? 'bg-emerald-500' :
                            item.code.includes('MW') ? 'bg-amber-600' : 'bg-red-500'
                          }`} />
                          <div>
                            <div className="font-semibold text-slate-900">{item.name}</div>
                            <div className="font-mono-code text-[10px] text-slate-400">#{item.code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="max-w-[150px] truncate text-slate-700 font-medium">{item.sourceFacility}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-500 font-mono-code">{item.location}</td>
                      <td className="py-3 px-3 text-right font-mono-code font-bold text-slate-900">
                        {item.quantity.toLocaleString()} t
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block rounded bg-[#F1F3F5] border border-[#CBD5E1] px-2 py-0.5 font-mono-code text-[10px] font-medium text-slate-700">
                          {item.chemicalBaseline}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-[#E2E8F0] px-4 py-2.5 bg-[#F8F9FA] text-[11px] font-mono-code text-slate-500">
              <span>Total Active Mass: <strong>14,050 t</strong> · Unassigned Assay: <strong>1,600 t</strong></span>
              <button 
                onClick={() => onNavigate('waste-intake')}
                className="text-[#DC2626] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Stream Log History</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Recent Optimization Runs */}
          <div className="rounded border border-[#CBD5E1] bg-white shadow-2xs p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
              <div className="flex items-center gap-2 font-headline font-bold text-slate-900 text-sm">
                <SlidersHorizontal className="h-4 w-4 text-[#DC2626]" />
                <span>Recent Optimization Runs</span>
              </div>
              <button
                onClick={() => onNavigate('allocation-optimization')}
                className="text-xs font-semibold text-[#DC2626] hover:underline flex items-center gap-1"
              >
                <span>Launch New Run</span>
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {runs.map((run) => (
                <div
                  key={run.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded border border-[#CBD5E1] p-3 hover:border-slate-400 bg-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded bg-slate-100 text-slate-700">
                      {run.streamCode.includes('FA') ? <Flame className="h-4 w-4 text-[#DC2626]" /> :
                       run.streamCode.includes('SL') ? <Truck className="h-4 w-4 text-emerald-600" /> :
                       <Boxes className="h-4 w-4 text-amber-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code font-bold text-slate-900 text-xs">{run.jobId}</span>
                        <span className="font-semibold text-slate-800 text-xs">{run.batchName}</span>
                        <span className={`rounded px-1.5 py-0.2 text-[10px] font-medium font-mono-code ${
                          run.status === 'Optimized & Ready' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          run.status === 'Dispatch Scheduled' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {run.status}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-3 font-mono-code text-[11px] text-slate-500">
                        <span>Vol: {run.volumeTonnes.toLocaleString()} t</span>
                        <span>·</span>
                        <span>Objective: {run.objective}</span>
                        <span>·</span>
                        <span>{run.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-mono-code text-sm font-bold text-emerald-700">
                        ₹{run.savingsLakhs}L
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Savings
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('decision-summary')}
                      className="text-xs font-semibold text-[#DC2626] hover:underline flex items-center gap-1"
                    >
                      <span>View Solution</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Reuse Potential by Industrial Pathway */}
          <div className="rounded border border-[#CBD5E1] bg-white shadow-2xs p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
              <div className="flex items-center gap-2 font-headline font-bold text-slate-900 text-sm">
                <RotateCcw className="h-4 w-4 text-emerald-600" />
                <span>Reuse Potential by Industrial Pathway</span>
              </div>
              <span className="font-mono-code text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                78.9% Target
              </span>
            </div>

            {/* Distribution Stacked Bar */}
            <div>
              <div className="flex justify-between font-mono-code text-[11px] text-slate-600 mb-1.5">
                <span>OVERALL DISTRIBUTION</span>
                <span className="font-bold text-slate-900">9,820 T DIVERTED / 2,630 T RESIDUAL</span>
              </div>
              <div className="h-3 w-full rounded overflow-hidden flex bg-slate-200">
                <div className="h-full bg-emerald-600 w-[42%]" title="Cement (42%)" />
                <div className="h-full bg-slate-700 w-[27%]" title="Roads (27%)" />
                <div className="h-full bg-amber-600 w-[22%]" title="Precast (22%)" />
                <div className="h-full bg-slate-400 w-[9%]" title="Backfill (9%)" />
              </div>
              <div className="mt-2 flex flex-wrap gap-3 font-mono-code text-[10px] text-slate-600">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-xs bg-emerald-600" /> Cement (42%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-xs bg-slate-700" /> Roads (27%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-xs bg-amber-600" /> Precast (22%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-xs bg-slate-400" /> Backfill (9%)</span>
              </div>
            </div>

            {/* 4 Pathway Rows */}
            <div className="space-y-2.5 pt-1 text-xs">
              {/* Pathway 1 */}
              <div className="rounded border border-[#E2E8F0] p-2.5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <span className="h-2 w-2 rounded-xs bg-emerald-600" />
                    <span>Concrete & Cement Blending</span>
                  </div>
                  <span className="font-mono-code font-bold text-slate-900">4,120 t <span className="font-normal text-slate-500">(42%)</span></span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Primary Sink: UltraTech Grinding Unit 4</span>
                  <span className="font-mono-code font-semibold text-emerald-700">₹680/t net margin</span>
                </div>
              </div>

              {/* Pathway 2 */}
              <div className="rounded border border-[#E2E8F0] p-2.5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <span className="h-2 w-2 rounded-xs bg-slate-700" />
                    <span>Road Sub-base & Embankment</span>
                  </div>
                  <span className="font-mono-code font-bold text-slate-900">2,640 t <span className="font-normal text-slate-500">(27%)</span></span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Primary Sink: NHAI Expressway Corridor</span>
                  <span className="font-mono-code text-slate-600">MoRTH Spec 401 Compliant</span>
                </div>
              </div>

              {/* Pathway 3 */}
              <div className="rounded border border-[#E2E8F0] p-2.5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <span className="h-2 w-2 rounded-xs bg-amber-600" />
                    <span>Geopolymer Bricks & Precast Blocks</span>
                  </div>
                  <span className="font-mono-code font-bold text-slate-900">2,160 t <span className="font-normal text-slate-500">(22%)</span></span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Primary Sink: Vardhman Precast Yards</span>
                  <span className="font-mono-code text-amber-700">Zero-clinker curing</span>
                </div>
              </div>

              {/* Pathway 4 */}
              <div className="rounded border border-[#E2E8F0] p-2.5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <span className="h-2 w-2 rounded-xs bg-slate-400" />
                    <span>Mine Void Backfill & Stabilization</span>
                  </div>
                  <span className="font-mono-code font-bold text-slate-900">900 t <span className="font-normal text-slate-500">(9%)</span></span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Primary Sink: WCL Chandrapur Pit Area B</span>
                  <span className="font-mono-code text-slate-500">Hydraulic Stowing Protocol</span>
                </div>
              </div>
            </div>

            {/* Total Valorizable summary banner */}
            <div className="flex items-center justify-between rounded border border-emerald-200 bg-emerald-50/60 p-3 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-semibold text-emerald-950">Total Valorizable Mass: 9,820 t (78.9%)</div>
                  <div className="text-[11px] text-emerald-800">Residual to monitored containment: 2,630 t</div>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('reuse-opportunities')}
                className="font-semibold text-[#DC2626] hover:underline flex items-center gap-1 text-xs shrink-0"
              >
                <span>Explore Routes</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* System Activity & Audit Feed */}
          <div className="rounded border border-[#CBD5E1] bg-white shadow-2xs p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
              <div className="flex items-center gap-2 font-headline font-bold text-slate-900 text-sm">
                <ShieldCheck className="h-4 w-4 text-slate-700" />
                <span>System Activity & Audit Feed</span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>LIVE AUDIT</span>
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#DC2626] shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-code text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {log.time} · {log.department}
                      </span>
                    </div>
                    <p className="mt-0.5 text-slate-700 leading-snug">
                      {log.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-2.5 text-[11px] text-slate-500">
              <span>Audited to ISO 14044 LCA Specs</span>
              <button 
                onClick={() => alert('Manifest audit logs downloaded (SHA256 signature verified).')}
                className="font-semibold text-slate-700 hover:text-slate-900 underline"
              >
                Download Manifest Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
