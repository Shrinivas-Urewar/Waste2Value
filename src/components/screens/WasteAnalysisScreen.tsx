import React from 'react';
import { 
  FlaskConical, 
  Download, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  AlertCircle, 
  Building2, 
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ScreenId, WasteStream } from '../../types';
import { PATHWAYS } from '../../data/mockData';

interface WasteAnalysisScreenProps {
  onNavigate: (screen: ScreenId) => void;
  activeStream: WasteStream;
}

export const WasteAnalysisScreen: React.FC<WasteAnalysisScreenProps> = ({
  onNavigate,
  activeStream,
}) => {
  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto pb-24">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#CBD5E1] pb-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono-code text-[11px] font-bold text-[#DC2626]">
            MODULE 03 · CALIBRATION ENGINE // MIP-IS-3812
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button 
            onClick={() => alert('Assay Raw CSV data package exported.')}
            className="flex items-center gap-1.5 rounded border border-[#CBD5E1] bg-white px-3 py-1 font-mono-code text-slate-700 hover:bg-slate-50 shadow-2xs"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Assay Raw (.CSV)</span>
          </button>
          <button 
            onClick={() => alert('Sample chain custody audit verified on ledger: Hash 0x8841-CHAIN')}
            className="flex items-center gap-1.5 rounded border border-[#CBD5E1] bg-white px-3 py-1 font-mono-code text-slate-700 hover:bg-slate-50 shadow-2xs"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
            <span>Sample Chain #8841</span>
          </button>
        </div>
      </div>

      {/* Main Title */}
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-[#0F172A]">
          Waste Analysis
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Chemical characterization and algorithmic reuse pathway evaluation.
        </p>
      </div>

      {/* Stream Overview Banner Card */}
      <div className="rounded border border-[#CBD5E1] bg-white p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-red-100 text-[#DC2626] shrink-0">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline font-bold text-slate-900 text-lg">
                Stream {activeStream.code} · {activeStream.name}
              </h2>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3 font-mono-code text-xs text-slate-600">
              <span>{activeStream.quantity.toLocaleString()} Tonnes Available</span>
              <span>·</span>
              <span>{activeStream.location}</span>
              <span>·</span>
              <span className="font-semibold text-emerald-700">
                ● SPCB Compliance: Approved Non-Hazardous
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 border-l border-slate-200 pl-6">
          <div>
            <div className="text-[10px] font-mono-code font-bold uppercase text-slate-400">
              ALGORITHMIC RESOLUTION
            </div>
            <div className="flex items-center gap-1.5 font-mono-code text-xl font-bold text-slate-900">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>94.6%</span>
              <span className="text-xs font-normal text-slate-500">Confidence</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono-code font-bold uppercase text-slate-400">
              STATUS VERDICT
            </div>
            <div className="font-semibold text-emerald-800 text-xs">
              Analysis Complete
            </div>
            <div className="font-mono-code text-[10px] text-slate-500">
              (Deterministic Validated)
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 01: Material Profile & Chemical Oxide Spectrum */}
      <div className="rounded border border-[#CBD5E1] bg-white p-5 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div>
            <span className="font-mono-code text-xs font-bold text-[#DC2626]">
              SECTION 01
            </span>
            <h2 className="font-headline font-bold text-slate-900 text-base ml-2 inline">
              Material Profile & Chemical Oxide Spectrum
            </h2>
          </div>
          <span className="font-mono-code text-[11px] text-slate-500">
            Method: X-Ray Fluorescence (XRF) + ICP-OES
          </span>
        </div>

        {/* Stacked Oxide Bar */}
        <div>
          <div className="flex items-center justify-between font-mono-code text-xs text-slate-600 mb-1.5">
            <span>OXIDE MASS FRACTION (%)</span>
            <span className="font-bold text-slate-900">TOTAL ASSAY: 100.0% NORMALIZED</span>
          </div>

          <div className="h-6 w-full rounded overflow-hidden flex bg-slate-200 shadow-2xs font-mono-code text-xs text-white font-bold leading-6 text-center">
            <div className="h-full bg-red-700 w-[58.4%] flex items-center justify-center" title="SiO2: 58.4%">
              SiO₂ 58.4%
            </div>
            <div className="h-full bg-amber-600 w-[24.1%] flex items-center justify-center" title="Al2O3: 24.1%">
              Al₂O₃ 24.1%
            </div>
            <div className="h-full bg-slate-700 w-[6.2%] flex items-center justify-center text-[10px]" title="Fe2O3: 6.2%">
              Fe₂O₃ 6.2%
            </div>
            <div className="h-full bg-emerald-600 w-[3.8%] flex items-center justify-center text-[10px]" title="CaO: 3.8%">
              3.8%
            </div>
            <div className="h-full bg-slate-400 w-[7.5%] flex items-center justify-center text-[10px]" title="Other: 7.5%">
              7.5%
            </div>
          </div>
        </div>

        {/* 5 Oxide Detailed Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 text-xs font-mono-code">
          <div className="rounded border border-[#CBD5E1] p-3 bg-white border-t-3 border-t-red-700">
            <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-bold">
              <span className="h-2 w-2 rounded-xs bg-red-700" />
              <span>SiO₂ (Silicon Dioxide)</span>
            </div>
            <div className="mt-1 text-xl font-bold text-red-700">58.4%</div>
            <p className="mt-1 text-[11px] text-slate-500 font-sans leading-tight">
              Primary glass matrix pozzolan
            </p>
          </div>

          <div className="rounded border border-[#CBD5E1] p-3 bg-white border-t-3 border-t-amber-600">
            <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-bold">
              <span className="h-2 w-2 rounded-xs bg-amber-600" />
              <span>Al₂O₃ (Aluminum Oxide)</span>
            </div>
            <div className="mt-1 text-xl font-bold text-amber-700">24.1%</div>
            <p className="mt-1 text-[11px] text-slate-500 font-sans leading-tight">
              Aluminate hydrate phase precursor
            </p>
          </div>

          <div className="rounded border border-[#CBD5E1] p-3 bg-white border-t-3 border-t-slate-700">
            <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-bold">
              <span className="h-2 w-2 rounded-xs bg-slate-700" />
              <span>Fe₂O₃ (Iron Oxide)</span>
            </div>
            <div className="mt-1 text-xl font-bold text-slate-800">6.2%</div>
            <p className="mt-1 text-[11px] text-slate-500 font-sans leading-tight">
              Fluxing element; stabilizes ferrite
            </p>
          </div>

          <div className="rounded border border-[#CBD5E1] p-3 bg-white border-t-3 border-t-emerald-600">
            <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-bold">
              <span className="h-2 w-2 rounded-xs bg-emerald-600" />
              <span>CaO (Calcium Oxide)</span>
            </div>
            <div className="mt-1 text-xl font-bold text-emerald-700">3.8%</div>
            <p className="mt-1 text-[11px] text-slate-500 font-sans leading-tight">
              Low free lime; zero unsoundness
            </p>
          </div>

          <div className="rounded border border-[#CBD5E1] p-3 bg-white border-t-3 border-t-slate-400">
            <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-bold">
              <span className="h-2 w-2 rounded-xs bg-slate-400" />
              <span>LOI + Trace Inorganics</span>
            </div>
            <div className="mt-1 text-xl font-bold text-slate-700">7.5%</div>
            <p className="mt-1 text-[11px] text-slate-500 font-sans leading-tight">
              Unburnt carbon 2.1% + balance
            </p>
          </div>
        </div>

        {/* Combined Pozzolanic Index Card */}
        <div className="rounded border border-emerald-300 bg-emerald-50/50 p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900 text-sm">
                Combined Pozzolanic Index: (SiO₂ + Al₂O₃ + Fe₂O₃) = <span className="text-emerald-800 font-mono-code font-bold">88.7%</span>
              </div>
              <p className="mt-0.5 text-xs text-slate-600">
                Exceeds ASTM C618 standard minimum threshold of <strong>70.0%</strong> by +18.7 percentage points. Certified Class F Pozzolan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l border-emerald-200 pl-4">
            <div className="text-right">
              <span className="text-[10px] font-mono-code uppercase text-emerald-800 font-bold block">
                ASTM C618 SAFETY MARGIN
              </span>
              <span className="font-mono-code text-sm font-bold text-emerald-700">
                +26.7% over limit
              </span>
            </div>
            <div className="h-9 w-9 rounded-full border-3 border-emerald-600 flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 02: Physical & Mineralogical Spec Ledger */}
      <div className="rounded border border-[#CBD5E1] bg-white shadow-2xs overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-3 bg-[#F8F9FA]">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold text-[#DC2626]">
              SECTION 02
            </span>
            <h2 className="font-headline font-bold text-slate-900 text-base ml-2 inline">
              Physical & Mineralogical Spec Ledger
            </h2>
          </div>
          <span className="font-mono-code text-[11px] text-slate-500">
            Testing Standard: BIS IS 3812 (Part 1): 2013
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-code">
            <thead className="border-b border-[#E2E8F0] bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4">TESTED PARAMETER / OXIDE</th>
                <th className="py-2.5 px-3">OBSERVED VALUE</th>
                <th className="py-2.5 px-3">REFERENCE RANGE (IS 3812-1)</th>
                <th className="py-2.5 px-3">TOLERANCE WINDOW</th>
                <th className="py-2.5 px-4 text-right">VERIFICATION STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-slate-700">
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-bold text-slate-900">
                  <span className="text-[#DC2626] mr-2">01</span> Silicon Dioxide (SiO₂) Content
                </td>
                <td className="py-2.5 px-3 font-bold text-slate-900">58.4%</td>
                <td className="py-2.5 px-3 text-slate-500">≥ 35.0% by mass</td>
                <td className="py-2.5 px-3">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">Normal Range</span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    ● Within Spec
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-bold text-slate-900">
                  <span className="text-[#DC2626] mr-2">02</span> Reactive Aluminum Oxide (Al₂O₃)
                </td>
                <td className="py-2.5 px-3 font-bold text-slate-900">24.1%</td>
                <td className="py-2.5 px-3 text-slate-500">15.0 - 30.0%</td>
                <td className="py-2.5 px-3">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">High Pozzolanic</span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    ● Optimal
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-bold text-slate-900">
                  <span className="text-[#DC2626] mr-2">03</span> Reactive Calcium Oxide (CaO)
                </td>
                <td className="py-2.5 px-3 font-bold text-slate-900">3.8%</td>
                <td className="py-2.5 px-3 text-slate-500">&lt; 10.0% (Class F standard)</td>
                <td className="py-2.5 px-3">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">Low Free Lime</span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    ● Class F Confirmed
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-bold text-slate-900">
                  <span className="text-[#DC2626] mr-2">04</span> Total Iron Oxide (Fe₂O₃)
                </td>
                <td className="py-2.5 px-3 font-bold text-slate-900">6.2%</td>
                <td className="py-2.5 px-3 text-slate-500">≤ 8.0%</td>
                <td className="py-2.5 px-3">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">Normal Range</span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    ● Within Spec
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-bold text-slate-900">
                  <span className="text-[#DC2626] mr-2">05</span> Loss on Ignition (LOI Carbon)
                </td>
                <td className="py-2.5 px-3 font-bold text-slate-900">2.1%</td>
                <td className="py-2.5 px-3 text-slate-500">≤ 5.0% by mass</td>
                <td className="py-2.5 px-3">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">Low Unburnt Carbon</span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    ● Excellent
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-bold text-slate-900">
                  <span className="text-[#DC2626] mr-2">06</span> pH (10% aqueous slurry)
                </td>
                <td className="py-2.5 px-3 font-bold text-slate-900">8.2</td>
                <td className="py-2.5 px-3 text-slate-500">7.0 - 9.5</td>
                <td className="py-2.5 px-3">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">Mild Alkaline</span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    ● Non-Corrosive
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-bold text-slate-900">
                  <span className="text-[#DC2626] mr-2">07</span> Specific Surface Area (Blaine Fineness)
                </td>
                <td className="py-2.5 px-3 font-bold text-slate-900">340 m²/kg</td>
                <td className="py-2.5 px-3 text-slate-500">≥ 320 m²/kg</td>
                <td className="py-2.5 px-3">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">High Fineness</span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    ● High Reactivity
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-bold text-slate-900">
                  <span className="text-[#DC2626] mr-2">08</span> TCLP Leachability (Arsenic & Lead)
                </td>
                <td className="py-2.5 px-3 font-bold text-slate-900">&lt; 0.05 mg/L</td>
                <td className="py-2.5 px-3 text-slate-500">Non-detectable limit (ND)</td>
                <td className="py-2.5 px-3">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">Sub-threshold</span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    ● Certified Safe
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 03: Algorithmic Reuse Compatibility Pathways */}
      <div className="rounded border border-[#CBD5E1] bg-white p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div>
            <span className="font-mono-code text-xs font-bold text-[#DC2626]">
              SECTION 03
            </span>
            <h2 className="font-headline font-bold text-slate-900 text-base ml-2 inline">
              Algorithmic Reuse Compatibility Pathways
            </h2>
          </div>
          <span className="font-mono-code text-[11px] text-slate-500">
            Ranked by Value Recovery & Substitution Thermodynamic Efficacy
          </span>
        </div>

        <div className="space-y-3">
          {PATHWAYS.map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigate('reuse-opportunities')}
              className={`rounded border p-4 cursor-pointer transition-colors ${
                p.id === 'pathway-a' ? 'border-emerald-300 bg-emerald-50/20 hover:border-emerald-500' :
                p.id === 'pathway-b' ? 'border-[#CBD5E1] bg-white hover:border-slate-400' :
                p.id === 'pathway-c' ? 'border-emerald-200 bg-white hover:border-emerald-400' :
                'border-slate-200 bg-slate-50/60 opacity-80'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline font-bold text-slate-900 text-sm">
                      {p.id === 'pathway-a' ? 'Pathway A: ' :
                       p.id === 'pathway-b' ? 'Pathway B: ' :
                       p.id === 'pathway-c' ? 'Pathway C: ' : 'Pathway D: '}
                      {p.name}
                    </h3>
                    <span className={`font-mono-code text-[10px] font-bold px-2 py-0.5 rounded border ${
                      p.compatibilityScore >= 90 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      p.compatibilityScore >= 80 ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {p.compatibilityLabel} · {p.compatibilityScore}%
                    </span>
                    <span className="font-mono-code text-[10px] text-slate-500">
                      {p.standard}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                    <strong>Technical Basis:</strong> {p.technicalBasis}
                  </p>
                  <div className="flex items-center gap-4 pt-1 font-mono-code text-[11px] text-slate-500">
                    <span className="text-emerald-700 font-semibold">● {p.statusTag}</span>
                    <span>·</span>
                    <span>Theoretical Clinker CO₂ Offset: {Math.abs(p.co2OffsetPerTonne)} t CO₂/t Fly Ash</span>
                  </div>
                </div>

                <div className="text-right shrink-0 border-l border-slate-200 pl-4">
                  <span className="text-[10px] font-mono-code uppercase text-slate-400 block font-bold">
                    {p.id === 'pathway-c' ? 'CAPACITY BUFFER' :
                     p.id === 'pathway-d' ? 'ECONOMIC RATING' : 'OPTIMAL OFFTAKE'}
                  </span>
                  <span className="font-mono-code text-xl font-bold text-slate-900 block">
                    {p.id === 'pathway-d' ? 'LOW ROI' : `${p.optimalOfftakeTonnes.toLocaleString()} t/mo`}
                  </span>
                  <span className="font-mono-code text-[10px] text-slate-500">
                    {p.id === 'pathway-a' ? 'Ready Mix / PPC Mills' :
                     p.id === 'pathway-b' ? 'Masonry Clusters' :
                     p.id === 'pathway-c' ? 'NHAI Highway Corridors' : 'Alternative Fallback'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 04: Model & Rule Explanation Engine */}
      <div className="rounded border border-[#CBD5E1] bg-white p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold text-[#DC2626]">
              SECTION 04
            </span>
            <h2 className="font-headline font-bold text-slate-900 text-base ml-2 inline">
              Model & Rule Explanation Engine
            </h2>
          </div>
          <span className="flex items-center gap-1.5 font-mono-code text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Deterministic MIP Engine v4.2 Verified</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <HelpCircle className="h-4 w-4 text-[#DC2626]" />
          <span>Why this pathway was identified (Deterministic Rules + ML Surrogates)</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono-code text-xs">
          {/* Card 1 */}
          <div className="rounded border border-[#CBD5E1] p-3 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>01. Chemical Matrix Match</span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
              Oxide sum (SiO₂ + Al₂O₃ + Fe₂O₃ = <strong>88.7%</strong>) exceeds 70% requirement. CaO at 3.8% secures low-heat pozzolanic curing profile.
            </p>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
              Rule: RULE_CHEM_ASTM_C618_F
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded border border-[#CBD5E1] p-3 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>02. Minimum Batch Scale</span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
              Available quantity (<strong>4,800 t</strong>) satisfies continuous 30-day clinker substitution campaign for regional cement grinders without risk of stockout.
            </p>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
              Rule: RULE_VOL_30D_MIN_THRESHOLD
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded border border-[#CBD5E1] p-3 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>03. Regional Offtake Capacity</span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
              Active cement grinding plants within a 120km radius report aggregate open demand of <strong>6,200 t/month</strong>, comfortably absorbing batch allocation.
            </p>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
              Rule: RULE_MARKET_CAPACITY_RATIO
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded border border-[#CBD5E1] p-3 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>04. Logistics Radius Threshold</span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
              All identified high-compatibility destinations sit inside economical heavy bulk transit envelopes (<strong>≤ 150 km</strong> haul distance).
            </p>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
              Rule: RULE_TRANSIT_CARBON_BREAKEVEN
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 text-xs">
          <button 
            onClick={() => onNavigate('data-sources')}
            className="text-[#DC2626] font-semibold hover:underline flex items-center gap-1 font-mono-code text-[11px]"
          >
            <span>[View supporting validation data & thermodynamic hydration curve →]</span>
          </button>
          <span className="font-mono-code text-[11px] text-slate-400">
            Deterministic Model Run ID: #XRF-8921-MIP
          </span>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-56 right-0 z-30 flex items-center justify-between border-t border-[#CBD5E1] bg-white px-6 py-3 shadow-lg">
        <div className="flex items-center gap-4 text-xs font-mono-code">
          <button
            onClick={() => alert('Exporting full Assay Report (PDF) with digital signatures...')}
            className="flex items-center gap-1.5 rounded border border-[#CBD5E1] bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export Assay Report (PDF)</span>
          </button>
          <div className="text-slate-500">
            AUDIT HASH: <strong className="text-slate-800">SHA-256: e8f9...31c2</strong>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('waste-intake')}
            className="rounded border border-[#CBD5E1] bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
          >
            <span>← Intake Batch</span>
          </button>
          <button
            onClick={() => onNavigate('reuse-opportunities')}
            className="flex items-center gap-2 rounded bg-[#DC2626] px-5 py-2 font-headline font-bold text-xs text-white shadow-xs hover:bg-[#B91C1C] active:translate-y-px"
          >
            <span>Proceed to Reuse Opportunities (4 Pathways Identified)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
