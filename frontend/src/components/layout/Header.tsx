import React, { useState } from 'react';
import { 
  Building2, 
  ChevronDown, 
  Search, 
  Bell, 
  Plus, 
  Cpu, 
  Layers, 
  SlidersHorizontal 
} from 'lucide-react';
import { ScreenId, WasteStream } from '../../types';

interface HeaderProps {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  streams: WasteStream[];
  activeStream: WasteStream;
  setActiveStream: (stream: WasteStream) => void;
  onOpenCommandPalette: () => void;
  onToggleNotifications: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  setCurrentScreen,
  streams,
  activeStream,
  setActiveStream,
  onOpenCommandPalette,
  onToggleNotifications,
  unreadCount,
}) => {
  const [showRegionMenu, setShowRegionMenu] = useState(false);
  const [showFacilityMenu, setShowFacilityMenu] = useState(false);
  const [showStreamMenu, setShowStreamMenu] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Western Region');
  const [selectedFacility, setSelectedFacility] = useState('Chandrapur Super Thermal');

  const regions = ['Western Region', 'Northern Belt', 'Eastern Metallurgical Zone', 'Southern Coastal Hub'];
  const facilities = [
    'Chandrapur Super Thermal (CSTPS)',
    'Mahasteel Blast Furnace Nagpur',
    'NMDC Bellary Extraction Pit',
    'Hindalco Belgaum Smelter'
  ];

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-[#CBD5E1] bg-white px-4 text-xs select-none">
      {/* Left zone: Brand & context dropdowns */}
      <div className="flex items-center gap-3">
        {/* Brand */}
        <div 
          onClick={() => setCurrentScreen('overview')}
          className="flex cursor-pointer items-center gap-2 pr-2"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#DC2626] text-white shadow-xs">
            <Layers className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-headline text-sm font-bold tracking-tight text-[#0F172A]">
              Waste2Value
            </span>
            <span className="text-[9px] font-semibold tracking-wider text-[#64748B] uppercase">
              Industrial Circularity
            </span>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-[#E2E8F0]" />

        {/* Region selector */}
        <div className="relative">
          <button
            onClick={() => setShowRegionMenu(!showRegionMenu)}
            className="flex items-center gap-1.5 rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1 text-slate-700 hover:border-[#CBD5E1] hover:bg-slate-100"
          >
            <Building2 className="h-3.5 w-3.5 text-slate-500" />
            <span className="font-medium">{selectedRegion}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>
          {showRegionMenu && (
            <div className="absolute left-0 top-full mt-1 w-52 rounded border border-[#CBD5E1] bg-white py-1 shadow-md z-50">
              <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Industrial Clusters
              </div>
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => {
                    setSelectedRegion(reg);
                    setShowRegionMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 ${selectedRegion === reg ? 'font-semibold text-[#DC2626] bg-red-50/50' : 'text-slate-700'}`}
                >
                  {reg}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Facility selector */}
        <div className="relative">
          <button
            onClick={() => setShowFacilityMenu(!showFacilityMenu)}
            className="flex items-center gap-1.5 rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1 text-slate-700 hover:border-[#CBD5E1] hover:bg-slate-100"
          >
            <span className="max-w-[150px] truncate font-medium">{selectedFacility}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>
          {showFacilityMenu && (
            <div className="absolute left-0 top-full mt-1 w-64 rounded border border-[#CBD5E1] bg-white py-1 shadow-md z-50">
              <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Generation Points
              </div>
              {facilities.map((fac) => (
                <button
                  key={fac}
                  onClick={() => {
                    setSelectedFacility(fac.split(' (')[0]);
                    setShowFacilityMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 ${selectedFacility.includes(fac.split(' ')[0]) ? 'font-semibold text-[#DC2626] bg-red-50/50' : 'text-slate-700'}`}
                >
                  {fac}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Stream selector */}
        <div className="relative">
          <button
            onClick={() => setShowStreamMenu(!showStreamMenu)}
            className="flex items-center gap-1.5 rounded border border-[#E2E8F0] bg-[#F8F9FA] px-2.5 py-1 text-slate-700 hover:border-[#CBD5E1] hover:bg-slate-100"
          >
            <span className="font-mono-code font-semibold text-slate-900">Stream {activeStream.code}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>
          {showStreamMenu && (
            <div className="absolute left-0 top-full mt-1 w-72 rounded border border-[#CBD5E1] bg-white py-1 shadow-md z-50">
              <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Active Industrial Streams
              </div>
              {streams.map((stream) => (
                <button
                  key={stream.id}
                  onClick={() => {
                    setActiveStream(stream);
                    setShowStreamMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between ${activeStream.id === stream.id ? 'font-semibold text-[#DC2626] bg-red-50/50' : 'text-slate-700'}`}
                >
                  <div>
                    <span className="font-mono-code font-bold">{stream.code}</span>
                    <span className="ml-1.5 text-slate-500 font-normal">{stream.name}</span>
                  </div>
                  <span className="font-mono-code text-[11px] text-slate-400">
                    {stream.quantity.toLocaleString()} t
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Middle zone: Search bar */}
      <div className="flex flex-1 max-w-md mx-4">
        <div 
          onClick={onOpenCommandPalette}
          className="flex w-full cursor-pointer items-center justify-between rounded border border-[#CBD5E1] bg-[#F8F9FA] px-3 py-1.5 text-slate-500 hover:border-slate-400 hover:bg-white"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-xs text-slate-400">Search streams, analyses, endpoints...</span>
          </div>
          <kbd className="rounded border border-[#E2E8F0] bg-white px-1.5 py-0.5 font-mono-code text-[10px] text-slate-500 shadow-2xs">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* Right zone: Engine status, notifications, intake button */}
      <div className="flex items-center gap-3">
        {/* Solver status pill */}
        <div 
          onClick={() => setCurrentScreen('allocation-optimization')}
          className="flex cursor-pointer items-center gap-2 rounded border border-[#86EFAC] bg-[#DCFCE7] px-2.5 py-1 text-[11px] font-medium text-[#166534] hover:bg-[#bbf7d0]"
          title="Click to view MIP Solver Parameters"
        >
          <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
          <span className="font-mono-code">Engine v4.2 · MIP Solver Ready</span>
        </div>

        {/* Notifications */}
        <button
          onClick={onToggleNotifications}
          className="relative flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-[#F8F9FA] text-slate-600 hover:bg-slate-100"
          title="Notifications & Regulatory Alerts"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#DC2626] font-mono-code text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Primary CTA: + Intake Stream */}
        <button
          onClick={() => setCurrentScreen('waste-intake')}
          className="flex items-center gap-1.5 rounded bg-[#DC2626] px-3.5 py-1.5 font-medium text-white shadow-xs hover:bg-[#B91C1C] active:translate-y-px"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="font-headline font-semibold text-xs tracking-wide">
            + Intake Stream
          </span>
        </button>
      </div>
    </header>
  );
};
