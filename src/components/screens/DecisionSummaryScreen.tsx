import React, { useState } from 'react';
import { 
  FileCheck2, 
  Printer, 
  Download, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Building2, 
  QrCode, 
  FileText, 
  ExternalLink,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Lock,
  BadgeCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { ScreenId, WasteStream, OfftakeDestination } from '../../types';
import { DESTINATIONS } from '../../data/mockData';

interface DecisionSummaryScreenProps {
  activeStream: WasteStream;
  onNavigate: (screen: ScreenId) => void;
  onOpenGatePass: (lotCode?: string) => void;
}

export const DecisionSummaryScreen: React.FC<DecisionSummaryScreenProps> = ({
  activeStream,
  onNavigate,
  onOpenGatePass
}) => {
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('dest-01');
  const [copiedLink, setCopiedLink] = useState(false);

  const allocatedDests = DESTINATIONS.filter(d => d.allocatedQuantity > 0);
  const totalAllocated = allocatedDests.reduce((sum, d) => sum + d.allocatedQuantity, 0);
  const totalNetSavingLakhs = 39.98;
  const totalCarbonAvoided = 3260;

  const selectedDest = DESTINATIONS.find(d => d.id === selectedDestinationId) || allocatedDests[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in print:p-0">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              STAGE 08 / FINAL DISPATCH DIRECTIVE & AUDIT
            </span>
            <span className="text-xs font-mono text-slate-400">·</span>
            <span className="text-xs font-mono text-slate-500">MIP-EXEC-2024-9041A</span>
          </div>
          <h1 className="text-2xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-3">
            Decision Summary & Dispatch Clearances
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Manifest Locked & Legally Validated
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Authorized multi-destination allocation manifest conforming to CPCB Hazardous & Other Wastes Rules (2016, Form-10).
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-xs cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copiedLink ? 'Copied' : 'Share Report'}
          </button>
          <button 
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Print All Clearances
          </button>
          <button 
            onClick={() => onOpenGatePass(activeStream.id)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded bg-rose-600 text-white hover:bg-rose-700 shadow-sm cursor-pointer transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
            Print Gate Pass Dockets
          </button>
        </div>
      </div>

      {/* High-Level Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
            Total Diverted Mass
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline text-slate-900">
              {totalAllocated.toLocaleString()}
            </span>
            <span className="text-xs font-mono font-medium text-slate-500">Tons / 100% of Target</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Zero unallocated slag residual
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
            Corridor Net Advantage
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline text-emerald-700">
              +₹{totalNetSavingLakhs.toFixed(2)}
            </span>
            <span className="text-xs font-mono font-medium text-slate-500">Lakhs Net Gain</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            vs ₹-31.68L Landfill tipping liability
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
            Total Avoided Carbon
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline text-teal-700">
              -{totalCarbonAvoided.toLocaleString()}
            </span>
            <span className="text-xs font-mono font-medium text-slate-500">tCO₂e</span>
          </div>
          <div className="text-[11px] text-teal-600 font-medium mt-1">
            Gold Standard / EPR verified scope 3
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
            Regulatory Clearances
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline text-slate-900">
              3 / 3
            </span>
            <span className="text-xs font-mono font-medium text-slate-500">Signed & Countersigned</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Form-10 e-Manifest ready
          </div>
        </div>
      </div>

      {/* Main Execution Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Approved Allocation Plan & Carrier Dispatch */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded shadow-2xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-rose-600" />
                <h2 className="text-sm font-bold font-headline uppercase tracking-wider text-slate-800">
                  Approved Industrial Sinks & Dispatch Schedule
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Discharge Batch: <span className="font-semibold text-slate-700">{activeStream.code}</span>
              </span>
            </div>

            <div className="divide-y divide-slate-200">
              {allocatedDests.map((dest, idx) => {
                const isSelected = selectedDestinationId === dest.id;
                const trucksCount = Math.ceil(dest.allocatedQuantity / 30);
                return (
                  <div 
                    key={dest.id}
                    onClick={() => setSelectedDestinationId(dest.id)}
                    className={`p-4 transition-all cursor-pointer ${isSelected ? 'bg-rose-50/40 border-l-4 border-rose-600' : 'hover:bg-slate-50/80 border-l-4 border-transparent'}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded bg-slate-100 border border-slate-200 font-mono text-xs font-bold text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                          0{idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900 hover:text-rose-600 transition-colors">
                              {dest.name}
                            </span>
                            <span className="text-[11px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200">
                              {dest.code}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                              · {dest.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                            <span>{dest.cluster}</span>
                            <span>•</span>
                            <span className="font-mono">{dest.transitDistanceKm} km via {dest.routeCorridor}</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-medium">Fit: {dest.chemistryFitLabel} ({dest.chemistryFit}%)</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:text-right shrink-0">
                        <div>
                          <div className="text-base font-bold font-mono text-slate-900">
                            {dest.allocatedQuantity.toLocaleString()} T
                          </div>
                          <div className="text-[11px] font-mono text-slate-500">
                            {trucksCount} Bulker Trips ({dest.transitTime} transit)
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDestinationId(dest.id);
                            onOpenGatePass(activeStream.code);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer"
                        >
                          Docket
                        </button>
                      </div>
                    </div>

                    {/* Expandable/Sub-bar details */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                      <div className="flex items-center gap-4 font-mono text-[11px]">
                        <span>Freight: <strong className="text-slate-800">₹{dest.freightPerTonne}/T</strong></span>
                        <span>Offtaker Net: <strong className="text-emerald-700">₹{dest.offtakeCreditPerTonne}/T</strong></span>
                        <span>Unit Delta: <strong className="text-rose-600">₹{dest.netValuePerTonne}/T</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-teal-700 font-mono font-medium">
                          🌱 Value: ₹{dest.netBatchValueLakhs} Lakhs
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          Discharge: {dest.dischargeMode}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compliance & Regulatory Clearances Card */}
          <div className="bg-white border border-slate-200 rounded shadow-2xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold font-headline uppercase tracking-wider text-slate-800">
                  Statutory Environmental Compliance Sign-Offs (Form 10)
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                100% REGULATORY AUDIT PASSED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">CPCB Form-10 Manifest</span>
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Ref: CPCB/HOWR/2026/MH-90412
                </p>
                <div className="mt-2 text-[11px] text-emerald-700 font-medium">
                  Digitally Countersigned via Aadhaar e-Sign
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">MoEF&CC Notification</span>
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  S.O. 5481(E) Mandated 100% Fly Ash
                </p>
                <div className="mt-2 text-[11px] text-emerald-700 font-medium">
                  300 km Construction Radius Exempt
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">MPCB Transit Clearance</span>
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Haz-Tracking Portal ID: #983210
                </p>
                <div className="mt-2 text-[11px] text-emerald-700 font-medium">
                  GPS Telemetry Auto-Stream Verified
                </div>
              </div>
            </div>
          </div>

          {/* Digital Audit Log & Blockchain/Cryptographic Hash */}
          <div className="bg-slate-900 text-slate-100 rounded p-4 font-mono text-xs shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
              <span className="text-rose-400 font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Cryptographic Integrity Audit Trail
              </span>
              <span className="text-slate-400 text-[11px]">SHA-256 Manifest Digest</span>
            </div>
            <div className="break-all text-[11px] text-emerald-400 mb-2 select-all">
              8f92c10b4278ef83a009c91038165b42d07174fa901f4c7d0e3a6813cb219e7a
            </div>
            <div className="text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span>Timestamp: 2026-09-29T12:15:00.000Z</span>
              <span>Auditor Node: CSTPS-NODE-04-VALIDATOR</span>
              <span className="text-emerald-400">Consensus Confirmed (6/6 Nodes)</span>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Selected Docket Preview & Quick Print */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border-2 border-slate-300 rounded p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  SELECTED DISPATCH DOCKET
                </span>
                <h3 className="font-bold text-sm text-slate-900">
                  {selectedDest.name}
                </h3>
              </div>
              <span className="w-8 h-8 rounded bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold text-xs">
                {selectedDest.code.slice(-2)}
              </span>
            </div>

            {/* Simulated QR Code / Pass Token */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 bg-white p-2 border border-slate-300 rounded shadow-2xs mb-2 flex items-center justify-center">
                <QrCode className="w-28 h-28 text-slate-900" />
              </div>
              <div className="font-mono text-xs font-bold text-slate-800">
                PASS-{activeStream.code}-{selectedDest.code}
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                Scan at Chandrapur Gate #4 Outbound Scales
              </div>
            </div>

            {/* Quick Details Table */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Batch Mass</span>
                <span className="font-bold font-mono text-slate-800">{selectedDest.allocatedQuantity.toLocaleString()} T</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Transit Corridor</span>
                <span className="font-mono text-slate-800">{selectedDest.routeCorridor} ({selectedDest.transitDistanceKm} km)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Truck Transits Required</span>
                <span className="font-bold font-mono text-slate-800">{Math.ceil(selectedDest.allocatedQuantity / 30)} Trips</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Weighbridge Outbound</span>
                <span className="font-mono text-slate-800">CSTPS-WB-02A (Active)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">Net Corridor Credit</span>
                <span className="font-bold font-mono text-emerald-700">+₹{selectedDest.netBatchValueLakhs} Lakhs</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => onOpenGatePass(activeStream.code)}
                className="w-full py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Full Gate Docket (3-Ply Copy)
              </button>
              <button
                onClick={() => alert(`Downloading signed CPCB Form-10 Manifest for ${selectedDest.name}...`)}
                className="w-full py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium text-xs rounded shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                Download PDF Regulatory Manifest
              </button>
            </div>
          </div>

          {/* Plant Dispatch Official Signatory Card */}
          <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs text-xs space-y-3">
            <div className="font-mono text-[11px] font-bold uppercase text-slate-400">
              Statutory Dispatch Authority
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                DK
              </div>
              <div>
                <div className="font-bold text-slate-900">Er. Dilip Kshirsagar</div>
                <div className="text-[11px] text-slate-500">Chief Chemical Engineer & Ash Management</div>
                <div className="text-[10px] font-mono text-emerald-600 font-semibold">DSC: VALID (EXP 2028)</div>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Clearance Status:</span>
              <span className="px-2 py-0.5 rounded font-mono font-bold bg-emerald-100 text-emerald-800">
                DISPATCH AUTHORIZED
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
