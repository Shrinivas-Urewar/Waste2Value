import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Layers, FileSpreadsheet, FlaskConical, RefreshCw, Share2, Sliders, GitCompare, FileCheck2, Database } from 'lucide-react';
import { ScreenId, WasteStream } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScreen: (screen: ScreenId) => void;
  streams: WasteStream[];
  onSelectStream: (stream: WasteStream) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectScreen,
  streams,
  onSelectStream,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const screens: { id: ScreenId; label: string; group: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview - Operational Window FY 2024-Q3', group: 'Navigation', icon: Layers },
    { id: 'waste-intake', label: 'Waste Intake - Add Waste Stream Form', group: 'Navigation', icon: FileSpreadsheet },
    { id: 'waste-analysis', label: 'Waste Analysis - Chemical Oxide Spectrum', group: 'Navigation', icon: FlaskConical },
    { id: 'reuse-opportunities', label: 'Reuse Opportunities - Pathway Feasibility Matrix', group: 'Navigation', icon: RefreshCw },
    { id: 'destination-matching', label: 'Destination Matching - Geospatial Freight Map', group: 'Navigation', icon: Share2 },
    { id: 'allocation-optimization', label: 'Allocation Optimization - Simplex / CBC MILP Engine', group: 'Navigation', icon: Sliders },
    { id: 'scenario-comparison', label: 'Scenario Comparison - Multi-Criteria Frontier', group: 'Navigation', icon: GitCompare },
    { id: 'decision-summary', label: 'Decision Summary - Regulatory Manifest & Gate Dockets', group: 'Navigation', icon: FileCheck2 },
    { id: 'data-sources', label: 'Data Sources & Transparency - Audit Registry', group: 'Configuration', icon: Database },
  ];

  const filteredScreens = screens.filter(s =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredStreams = streams.filter(st =>
    st.code.toLowerCase().includes(query.toLowerCase()) ||
    st.name.toLowerCase().includes(query.toLowerCase()) ||
    st.classification.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-xl rounded-lg border border-[#CBD5E1] bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <div className="flex items-center border-b border-[#E2E8F0] px-4 py-3 bg-[#F8F9FA]">
          <Search className="h-4 w-4 text-slate-400 mr-2.5" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a screen, waste stream code, or action..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 text-xs">
          {/* Streams */}
          {filteredStreams.length > 0 && (
            <div className="mb-3">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Industrial Streams ({filteredStreams.length})
              </div>
              {filteredStreams.map((st) => (
                <div
                  key={st.id}
                  onClick={() => {
                    onSelectStream(st);
                    onSelectScreen('waste-analysis');
                    onClose();
                  }}
                  className="flex items-center justify-between rounded px-2.5 py-2 hover:bg-slate-100 cursor-pointer text-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono-code font-bold text-[#DC2626]">{st.code}</span>
                    <span className="font-medium text-slate-700">{st.name}</span>
                    <span className="text-[11px] text-slate-400">· {st.location}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono-code text-slate-500">
                    <span>{st.quantity.toLocaleString()} t</span>
                    <ArrowRight className="h-3 w-3 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Screens */}
          <div>
            <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Platform Views ({filteredScreens.length})
            </div>
            {filteredScreens.map((sc) => {
              const Icon = sc.icon;
              return (
                <div
                  key={sc.id}
                  onClick={() => {
                    onSelectScreen(sc.id);
                    onClose();
                  }}
                  className="flex items-center justify-between rounded px-2.5 py-2 hover:bg-slate-100 cursor-pointer text-slate-800"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{sc.label}</span>
                  </div>
                  <span className="text-[10px] font-mono-code text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    {sc.group}
                  </span>
                </div>
              );
            })}
          </div>

          {filteredScreens.length === 0 && filteredStreams.length === 0 && (
            <div className="py-8 text-center text-slate-400">
              No matching streams or operations found for "{query}".
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#E2E8F0] px-4 py-2 bg-[#F8F9FA] text-[10px] text-slate-400">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
