import React, { useState } from 'react';
import { 
  RefreshCw, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  Download, 
  SlidersHorizontal,
  ChevronDown,
  Building,
  Check,
  TrendingUp,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { ScreenId, WasteStream } from '../../types';
import { PATHWAYS, ASSETS } from '../../data/mockData';

interface ReuseOpportunitiesScreenProps {
  onNavigate: (screen: ScreenId) => void;
  activeStream: WasteStream;
}

export const ReuseOpportunitiesScreen: React.FC<ReuseOpportunitiesScreenProps> = ({
  onNavigate,
  activeStream,
}) => {
  const [selectedPathwayId, setSelectedPathwayId] = useState('pathway-a');
  const [minCompatibility, setMinCompatibility] = useState('80');
  const [maxDistance, setMaxDistance] = useState('150');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedPathway = PATHWAYS.find(p => p.id === selectedPathwayId) || PATHWAYS[0];

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto pb-24">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#CBD5E1] pb-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono-code text-[11px] font-bold text-slate-700 uppercase">
            MIP OPTIMIZATION PHASE 4
          </span>
          <span className="text-slate-300">·</span>
          <span className="font-mono-code text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            ● ISO 14044 LCA VALIDATED
          </span>
        </div>

        {/* 3 Metric Badges */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code">
          <div className="rounded border border-[#CBD5E1] bg-white px-3 py-1 text-right">
            <span className="text-[10px] text-slate-400 block uppercase">MAX OFFTAKE AVAILABLE</span>
            <span className="text-sm font-bold text-slate-900">5,600 <span className="text-xs font-normal">t</span></span>
            <span className="text-[10px] text-emerald-700 block">116% of batch volume</span>
          </div>

          <div className="rounded border border-[#CBD5E1] bg-white px-3 py-1 text-right">
            <span className="text-[10px] text-slate-400 block uppercase">TOTAL CO₂ DIVERTIBLE</span>
            <span className="text-sm font-bold text-emerald-700">-2,840 <span className="text-xs font-normal">t</span></span>
            <span className="text-[10px] text-slate-500 block">High decarbonization</span>
          </div>

          <div className="rounded border border-[#CBD5E1] bg-white px-3 py-1 text-right">
            <span className="text-[10px] text-slate-400 block uppercase">MAX POTENTIAL NET GAIN</span>
            <span className="text-sm font-bold text-[#DC2626]">₹18.6 <span className="text-xs font-normal">L</span></span>
            <span className="text-[10px] text-slate-500 block">Substitution credit base</span>
          </div>
        </div>
      </div>

      {/* Main Title */}
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-[#0F172A]">
          Reuse Opportunities
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-4xl">
          Potential commercial and infrastructural pathways evaluated for Batch <strong>{activeStream.code}</strong> ({activeStream.quantity.toLocaleString()} t). Algorithmic ranking prioritizes clinker substitution, carbon abatement, and logistics transit distance within the Maharashtra Industrial Corridor.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded border border-[#CBD5E1] bg-white p-2.5 text-xs">
        <div className="flex flex-1 items-center gap-2 min-w-[240px]">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations, specifications, or standards..."
            className="w-full text-xs text-slate-800 placeholder-slate-400 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono-code text-[11px] text-slate-600">
            <span>PATHWAY:</span>
            <select className="h-7 rounded border border-[#CBD5E1] bg-white px-2 text-xs font-semibold text-slate-800">
              <option>All Pathways</option>
              <option>Concrete & Cement</option>
              <option>Road Construction</option>
              <option>Geopolymer Precast</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 font-mono-code text-[11px] text-slate-600">
            <span>MIN COMPATIBILITY:</span>
            <select 
              value={minCompatibility}
              onChange={(e) => setMinCompatibility(e.target.value)}
              className="h-7 rounded border border-[#CBD5E1] bg-white px-2 text-xs font-semibold text-slate-800"
            >
              <option value="80">≥ 80%</option>
              <option value="85">≥ 85%</option>
              <option value="90">≥ 90%</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 font-mono-code text-[11px] text-slate-600">
            <span>MAX DISTANCE:</span>
            <select 
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
              className="h-7 rounded border border-[#CBD5E1] bg-white px-2 text-xs font-semibold text-slate-800"
            >
              <option value="100">≤ 100 km</option>
              <option value="150">≤ 150 km</option>
              <option value="200">≤ 200 km</option>
            </select>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
            <span className="font-mono-code text-[11px] text-slate-500">SORT BY:</span>
            <select className="h-7 rounded border border-[#CBD5E1] bg-white px-2 text-xs font-semibold text-slate-800">
              <option>Optimal Circular Value</option>
              <option>Maximum CO₂ Offset</option>
              <option>Lowest Freight Cost</option>
            </select>
            <button 
              onClick={() => {
                setMinCompatibility('80');
                setMaxDistance('150');
                setSearchQuery('');
              }}
              className="font-mono-code text-[11px] text-slate-500 hover:text-slate-900 border border-[#CBD5E1] px-2 py-1 rounded"
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left (Matrix + Yield) & Right (Deep-Dive Dossier) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          {/* Card 1: Pathway Feasibility Table */}
          <div className="rounded border border-[#CBD5E1] bg-white shadow-2xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-3 bg-[#F8F9FA]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
                <h3 className="font-headline font-bold text-slate-900 text-sm">
                  Pathway Feasibility & Allocation Matrix
                </h3>
              </div>
              <div className="flex items-center gap-3 font-mono-code text-[11px] text-slate-500">
                <span>4 Evaluated Candidates</span>
                <span>·</span>
                <span>Batch Volume: 4,800 MT Total</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-code">
                <thead className="border-b border-[#E2E8F0] bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">PATHWAY / APPLICATION</th>
                    <th className="py-2.5 px-2">COMPATIBILITY</th>
                    <th className="py-2.5 px-2">MAX OFFTAKE</th>
                    <th className="py-2.5 px-3">PROCESSING REQUIREMENTS</th>
                    <th className="py-2.5 px-2">EST. COST</th>
                    <th className="py-2.5 px-2">NET VALUE AVOIDED</th>
                    <th className="py-2.5 px-3 text-right">EST. CO₂ OFFSET</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-slate-700">
                  {/* Row 1: Concrete */}
                  <tr 
                    onClick={() => setSelectedPathwayId('pathway-a')}
                    className={`cursor-pointer transition-colors ${selectedPathwayId === 'pathway-a' ? 'bg-red-50/30' : 'hover:bg-slate-50'}`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 font-sans text-xs">
                        Concrete & Blended Cement
                      </div>
                      <div className="text-[10px] text-slate-500">IS 1489 Part 1 / ASTM C618</div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-bold text-emerald-700 text-xs">96%</span>
                      <span className="text-[10px] text-emerald-800 block">HIGH</span>
                    </td>
                    <td className="py-3 px-2 font-bold text-slate-900">
                      2,400 - 3,200 t
                      <span className="text-[10px] text-slate-500 block font-normal">Up to 66% of batch</span>
                    </td>
                    <td className="py-3 px-3 font-sans text-[11px]">
                      Dry de-agglomeration & pneumatic classification
                      <span className="font-mono-code text-[10px] text-emerald-700 block font-bold mt-0.5">MINIMAL PREP</span>
                    </td>
                    <td className="py-3 px-2">₹240 <span className="text-slate-400">/ t</span></td>
                    <td className="py-3 px-2 font-bold text-emerald-700">
                      +₹11.2 L
                      <span className="text-[10px] text-slate-500 block font-normal">Clinker substitution</span>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-700">
                      -1,968 t
                      <span className="text-[10px] text-slate-500 block font-normal">-0.82 tCO₂e / t</span>
                    </td>
                  </tr>

                  {/* Row 2: Road */}
                  <tr 
                    onClick={() => setSelectedPathwayId('pathway-c')}
                    className={`cursor-pointer transition-colors ${selectedPathwayId === 'pathway-c' ? 'bg-red-50/30' : 'hover:bg-slate-50'}`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 font-sans text-xs">
                        Road Construction & Embankment
                      </div>
                      <div className="text-[10px] text-slate-500">IRC:SP:58 Sub-Base Fill</div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-bold text-emerald-700 text-xs">91%</span>
                      <span className="text-[10px] text-emerald-800 block">HIGH</span>
                    </td>
                    <td className="py-3 px-2 font-bold text-slate-900">
                      1,500 - 2,000 t
                      <span className="text-[10px] text-slate-500 block font-normal">31% - 41% volume</span>
                    </td>
                    <td className="py-3 px-3 font-sans text-[11px]">
                      Moisture conditioning & lime stabilization blending
                      <span className="font-mono-code text-[10px] text-slate-700 block font-bold mt-0.5">STANDARD FIELD MIX</span>
                    </td>
                    <td className="py-3 px-2">₹180 <span className="text-slate-400">/ t</span></td>
                    <td className="py-3 px-2 font-bold text-emerald-700">
                      +₹4.5 L
                      <span className="text-[10px] text-slate-500 block font-normal">Soil borrow avoided</span>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-700">
                      -360 t
                      <span className="text-[10px] text-slate-500 block font-normal">-0.24 tCO₂e / t</span>
                    </td>
                  </tr>

                  {/* Row 3: Geopolymer */}
                  <tr 
                    onClick={() => setSelectedPathwayId('pathway-b')}
                    className={`cursor-pointer transition-colors ${selectedPathwayId === 'pathway-b' ? 'bg-red-50/30' : 'hover:bg-slate-50'}`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 font-sans text-xs">
                        Geopolymer Bricks & Pavers
                      </div>
                      <div className="text-[10px] text-slate-500">IS 1077 Heavy Masonry</div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-bold text-blue-700 text-xs">88%</span>
                      <span className="text-[10px] text-blue-800 block">MED-HIGH</span>
                    </td>
                    <td className="py-3 px-2 font-bold text-slate-900">
                      800 - 1,200 t
                      <span className="text-[10px] text-slate-500 block font-normal">17% - 25% volume</span>
                    </td>
                    <td className="py-3 px-3 font-sans text-[11px]">
                      Alkali activation (NaOH/Na₂SiO₃) & hydraulic pressing
                      <span className="font-mono-code text-[10px] text-amber-700 block font-bold mt-0.5">CHEMICAL DOSING</span>
                    </td>
                    <td className="py-3 px-2">₹320 <span className="text-slate-400">/ t</span></td>
                    <td className="py-3 px-2 font-bold text-emerald-700">
                      +₹2.9 L
                      <span className="text-[10px] text-slate-500 block font-normal">Topsoil preservation</span>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-700">
                      -512 t
                      <span className="text-[10px] text-slate-500 block font-normal">-0.64 tCO₂e / t</span>
                    </td>
                  </tr>

                  {/* Row 4: Mine Void */}
                  <tr 
                    onClick={() => setSelectedPathwayId('pathway-d')}
                    className={`cursor-pointer transition-colors ${selectedPathwayId === 'pathway-d' ? 'bg-red-50/30' : 'hover:bg-slate-50'}`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 font-sans text-xs">
                        Mine Void Reclamation & Stowing
                      </div>
                      <div className="text-[10px] text-slate-500">DGMS Hydraulic Stowing</div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-bold text-slate-500 text-xs">52%</span>
                      <span className="text-[10px] text-slate-400 block">LOW YIELD</span>
                    </td>
                    <td className="py-3 px-2 font-bold text-slate-900">
                      Up to 4,800 t
                      <span className="text-[10px] text-slate-500 block font-normal">100% Bulk contingency</span>
                    </td>
                    <td className="py-3 px-3 font-sans text-[11px]">
                      High-density slurry pumping & hydraulic barrier packing
                      <span className="font-mono-code text-[10px] text-red-700 block font-bold mt-0.5">HEAVY INFRASTRUCTURE</span>
                    </td>
                    <td className="py-3 px-2">₹410 <span className="text-slate-400">/ t</span></td>
                    <td className="py-3 px-2 font-bold text-red-700">
                      -₹1.1 L
                      <span className="text-[10px] text-slate-500 block font-normal">Net operational cost</span>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-600">
                      -240 t
                      <span className="text-[10px] text-slate-500 block font-normal">-0.05 tCO₂e / t</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between border-t border-[#E2E8F0] px-4 py-2.5 bg-[#F8F9FA] text-[11px] font-mono-code text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Standards verified against IS 3812 (Part 1 & 2) and ASTM C618. Batch Mass Balance: 4,800 MT (Dry Basis)</span>
              </div>
              <button 
                onClick={() => alert('Exporting Technical Dossier (.CSV)...')}
                className="text-[#DC2626] font-semibold hover:underline flex items-center gap-1"
              >
                <Download className="h-3 w-3" />
                <span>Export Technical Dossier (.CSV)</span>
              </button>
            </div>
          </div>

          {/* Card 2: Comparative Yield Matrix: Carbon Offset & Economic Avoidance */}
          <div className="rounded border border-[#CBD5E1] bg-white shadow-2xs p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
              <div className="flex items-center gap-2 font-headline font-bold text-slate-900 text-sm">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span>Comparative Yield Matrix: Carbon Offset & Economic Avoidance</span>
              </div>
              <span className="font-mono-code text-[11px] text-slate-500 uppercase">
                NORMALIZED PER 1,000 MT OFFTAKE
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 font-mono-code text-xs">
              {/* Col 1 */}
              <div className="rounded border border-[#CBD5E1] p-3 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Concrete & Cement</span>
                  <span className="text-emerald-700 font-bold">Optimal 96%</span>
                </div>
                <div className="h-2 w-full rounded bg-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-600 w-[96%]" />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-500">Offset: 820 kg CO₂e/t</span>
                  <span className="font-bold text-slate-900">₹3.5 Lakh/kt</span>
                </div>
              </div>

              {/* Col 2 */}
              <div className="rounded border border-[#CBD5E1] p-3 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Road Embankment</span>
                  <span className="text-emerald-700 font-bold">Feasible 91%</span>
                </div>
                <div className="h-2 w-full rounded bg-slate-200 overflow-hidden">
                  <div className="h-full bg-slate-700 w-[91%]" />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-500">Offset: 240 kg CO₂e/t</span>
                  <span className="font-bold text-slate-900">₹2.2 Lakh/kt</span>
                </div>
              </div>

              {/* Col 3 */}
              <div className="rounded border border-[#CBD5E1] p-3 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Geopolymer Bricks</span>
                  <span className="text-blue-700 font-bold">Viable 88%</span>
                </div>
                <div className="h-2 w-full rounded bg-slate-200 overflow-hidden">
                  <div className="h-full bg-amber-600 w-[88%]" />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-500">Offset: 640 kg CO₂e/t</span>
                  <span className="font-bold text-slate-900">₹2.4 Lakh/kt</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Deep-Dive Dossier */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded border border-[#CBD5E1] bg-white shadow-2xs overflow-hidden">
            {/* Header */}
            <div className="border-b border-[#E2E8F0] p-4 bg-slate-900 text-white">
              <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400 uppercase">
                <span>PATHWAY DEEP-DIVE DOSSIER</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-white font-bold">
                  {selectedPathway.id === 'pathway-a' ? 'Concrete & Blended Cement' : selectedPathway.name}
                </span>
              </div>
              <h2 className="font-headline font-bold text-lg mt-1 text-white">
                Portland Clinker Replacement in Cement Grinding
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="font-mono-code text-xs text-emerald-400">
                  Batch Compatibility Engine Score: <strong>96 / 100</strong>
                </span>
              </div>
            </div>

            {/* Dossier Body */}
            <div className="p-4 space-y-4 text-xs">
              {/* Material Requirements Conformity */}
              <div>
                <div className="flex items-center justify-between font-mono-code text-[11px] font-bold text-slate-500 uppercase mb-2">
                  <span>MATERIAL REQUIREMENTS CONFORMITY</span>
                  <span className="text-emerald-700 flex items-center gap-1 font-bold">
                    <Check className="h-3 w-3" /> ALL PASSED
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono-code text-[11px]">
                  <div className="rounded border border-slate-200 p-2 bg-slate-50">
                    <span className="text-[10px] text-slate-400 block">STANDARD SPECIFICATION</span>
                    <strong className="text-slate-900">ASTM C618 Class F</strong>
                  </div>
                  <div className="rounded border border-slate-200 p-2 bg-slate-50">
                    <span className="text-[10px] text-slate-400 block">LOSS ON IGNITION (LOI)</span>
                    <strong className="text-emerald-700">2.14% (Tolerance &lt; 3.0%)</strong>
                  </div>
                  <div className="rounded border border-slate-200 p-2 bg-slate-50">
                    <span className="text-[10px] text-slate-400 block">SPECIFIC SURFACE (BLAINE)</span>
                    <strong className="text-slate-900">364 m²/kg (&gt; 320 m²/kg)</strong>
                  </div>
                  <div className="rounded border border-slate-200 p-2 bg-slate-50">
                    <span className="text-[10px] text-slate-400 block">FREE LIME (CAO)</span>
                    <strong className="text-emerald-700">0.82% (Max allowed 1.5%)</strong>
                  </div>
                </div>
              </div>

              {/* Predicted Mortar Compressive Strength */}
              <div className="rounded border border-[#CBD5E1] p-3 bg-[#F8F9FA]">
                <div className="flex items-center justify-between font-mono-code text-[11px] font-bold text-slate-600 mb-2">
                  <span>PREDICTED MORTAR COMPRESSIVE STRENGTH</span>
                  <span className="text-slate-400">vs OPC Control</span>
                </div>
                <div className="grid grid-cols-2 gap-3 font-mono-code">
                  <div>
                    <span className="text-[10px] text-slate-500 block">7-Day Strength:</span>
                    <span className="text-base font-bold text-slate-900">89%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">28-Day Strength:</span>
                    <span className="text-base font-bold text-emerald-700">104%</span>
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-slate-500 leading-snug border-t border-slate-200 pt-1.5">
                  Long-term pozzolanic reaction exhibits superior pore structure refinement and chloride impermeability.
                </p>
              </div>

              {/* Industrial Processing Flow */}
              <div>
                <div className="font-mono-code text-[11px] font-bold text-slate-500 uppercase mb-2">
                  INDUSTRIAL PROCESSING FLOW
                </div>
                <div className="space-y-2 font-mono-code text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 font-bold text-slate-700">01</span>
                    <div>
                      <strong className="text-slate-900">Pneumatic Bulk Loading</strong>
                      <p className="text-[11px] text-slate-500 font-sans">Dry tank extraction via air slide at 85 t/hr</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 font-bold text-slate-700">02</span>
                    <div>
                      <strong className="text-slate-900">Inline Laser Particle Sizing</strong>
                      <p className="text-[11px] text-slate-500 font-sans">Real-time Blaine verification (&lt;45µm sieve)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 font-bold text-slate-700">03</span>
                    <div>
                      <strong className="text-slate-900">Co-Grinding / Interblending</strong>
                      <p className="text-[11px] text-slate-500 font-sans">Closed-circuit ball mill introduction with clinker & gypsum</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Offtake Partners */}
              <div>
                <div className="flex items-center justify-between font-mono-code text-[11px] font-bold text-slate-500 uppercase mb-2">
                  <span>VERIFIED OFFTAKE PARTNERS</span>
                  <span>READY CONTRACT STATUS</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded border border-slate-200 p-2 bg-white">
                    <div>
                      <strong className="text-slate-900">UltraTech Cement Grinding ...</strong>
                      <div className="text-[10px] text-slate-500 font-mono-code">Nagpur Zone · 86 km</div>
                    </div>
                    <div className="text-right font-mono-code">
                      <span className="font-bold text-slate-900 text-xs">1,800 t/mo</span>
                      <span className="text-[10px] text-emerald-700 block font-bold">ACTIVE PARTNER</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded border border-slate-200 p-2 bg-white">
                    <div>
                      <strong className="text-slate-900">ACC Cement Works Grindi...</strong>
                      <div className="text-[10px] text-slate-500 font-mono-code">Wardha Axis · 134 km</div>
                    </div>
                    <div className="text-right font-mono-code">
                      <span className="font-bold text-slate-900 text-xs">1,400 t/mo</span>
                      <span className="text-[10px] text-blue-700 block font-bold">CONTRACT READY</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regulatory Mandate */}
              <div className="rounded border border-emerald-200 bg-emerald-50/50 p-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Regulatory Mandate Compliance</span>
                </div>
                <p className="mt-1 text-[11px] text-emerald-900 leading-snug">
                  MoEFCC 2021 Gazette Notification for 100% Fly Ash Utilization mandate compliance (Category 1 priority recipient). High-durability sulfate resistance certification cleared under IS 3812 (Part 1).
                </p>
              </div>

              {/* LCA and Economic Values */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 font-mono-code">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">LCA CARBON SCORE</span>
                  <span className="text-sm font-bold text-emerald-700">-1,968 tCO₂e</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">ECONOMIC VALUE</span>
                  <span className="text-sm font-bold text-[#DC2626]">+₹11.20 Lakhs</span>
                </div>
              </div>

              {/* Discharge Logistics Node */}
              <div className="rounded border border-[#CBD5E1] p-2.5 bg-[#F8F9FA] flex items-center gap-3">
                <img 
                  src={ASSETS.siloDischarge} 
                  alt="Chandrapur Silo Array 02" 
                  className="h-12 w-16 rounded object-cover border border-[#CBD5E1]"
                />
                <div>
                  <span className="text-[10px] font-mono-code font-bold uppercase text-slate-500 block">
                    DISCHARGE LOGISTICS NODE
                  </span>
                  <strong className="text-slate-900 text-xs">Chandrapur Silo Array 02</strong>
                  <div className="text-[11px] font-mono-code text-slate-500">
                    Pneumatic Air-Slide: Operational (340 t/h)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-56 right-0 z-30 flex items-center justify-between border-t border-[#CBD5E1] bg-white px-6 py-3 shadow-lg">
        <div className="flex items-center gap-4 text-xs font-mono-code">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <div>
              <strong className="text-slate-900 font-sans">3 Compatible Pathways Selected</strong>
              <span className="text-slate-500 block text-[11px]">
                Identified Offtake Potential: <strong>4,800 t</strong> (100% of Batch {activeStream.code})
              </span>
            </div>
          </div>

          <div className="border-l border-slate-200 pl-4">
            <span className="text-[10px] text-slate-400 block uppercase">COMBINED AVOIDANCE</span>
            <span className="font-bold text-[#DC2626]">+₹18.60 Lakhs</span>
          </div>

          <div className="border-l border-slate-200 pl-4">
            <span className="text-[10px] text-slate-400 block uppercase">COMBINED DECARBONIZATION</span>
            <span className="font-bold text-emerald-700">-2,840 tCO₂e</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Re-running feasibility model across NCCBM regressions...')}
            className="flex items-center gap-1.5 rounded border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
            <span>Re-Run Feasibility Model</span>
          </button>
          <button
            onClick={() => onNavigate('destination-matching')}
            className="flex items-center gap-2 rounded bg-[#DC2626] px-5 py-2 font-headline font-bold text-xs text-white shadow-xs hover:bg-[#B91C1C] active:translate-y-px"
          >
            <span>Find Destinations (Geospatial Matching)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
