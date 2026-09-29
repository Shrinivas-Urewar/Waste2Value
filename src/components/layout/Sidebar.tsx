import React from 'react';
import {
  LayoutDashboard,
  FileSpreadsheet,
  FlaskConical,
  RefreshCw,
  Share2,
  Sliders,
  GitCompare,
  FileCheck2,
  Database,
  Settings,
  CircleDot,
  Radio,
  UserCheck
} from 'lucide-react';
import { ScreenId } from '../../types';

interface SidebarProps {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, setCurrentScreen }) => {
  const coreNavItems: { id: ScreenId; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'waste-intake', label: 'Waste Intake', icon: FileSpreadsheet },
    { id: 'waste-analysis', label: 'Waste Analysis', icon: FlaskConical },
    { id: 'reuse-opportunities', label: 'Reuse Opportunities', icon: RefreshCw },
    { id: 'destination-matching', label: 'Destination Matching', icon: Share2 },
    { id: 'allocation-optimization', label: 'Allocation Optimization', icon: Sliders },
    { id: 'scenario-comparison', label: 'Scenario Comparison', icon: GitCompare },
    { id: 'decision-summary', label: 'Decision Summary', icon: FileCheck2 },
  ];

  const configNavItems: { id: ScreenId; label: string; icon: React.ElementType }[] = [
    { id: 'data-sources', label: 'Data Sources', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-56 shrink-0 flex flex-col justify-between border-r border-[#CBD5E1] bg-white text-xs select-none min-h-[calc(100vh-3.5rem)]">
      <div>
        {/* Active Cluster Badge */}
        <div className="border-b border-[#E2E8F0] p-3 bg-[#F8F9FA]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="text-[11px] font-semibold text-slate-800">Active Cluster</span>
            </div>
            <span className="font-mono-code text-[11px] font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0]">
              MH-04
            </span>
          </div>
          <div className="mt-1 text-[11px] font-medium text-slate-600">
            Maharashtra Cluster A · Phase 2
          </div>
        </div>

        {/* CORE OPERATIONS */}
        <div className="pt-3">
          <div className="px-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Core Operations
          </div>
          <nav className="space-y-0.5 px-2">
            {coreNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`group flex w-full items-center gap-2.5 rounded px-2.5 py-2 text-left font-medium transition-colors ${
                    isActive
                      ? 'bg-red-50 text-[#DC2626] font-semibold shadow-2xs border-l-3 border-[#DC2626]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-[#DC2626]' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* CONFIGURATION */}
        <div className="pt-5">
          <div className="px-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Configuration
          </div>
          <nav className="space-y-0.5 px-2">
            {configNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`group flex w-full items-center gap-2.5 rounded px-2.5 py-2 text-left font-medium transition-colors ${
                    isActive
                      ? 'bg-red-50 text-[#DC2626] font-semibold shadow-2xs border-l-3 border-[#DC2626]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-[#DC2626]' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Engineer Profile & Grid Status */}
      <div className="border-t border-[#E2E8F0] p-3 bg-[#F8F9FA]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-white font-mono-code font-bold text-xs ring-2 ring-emerald-500/30">
            AT
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-semibold text-slate-900 text-xs">
              Dr. Aris Thorne
            </div>
            <div className="truncate text-[10px] text-slate-500">
              Lead Circular Engineer
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between border-t border-[#E2E8F0] pt-2 text-[10px]">
          <div className="flex items-center gap-1.5 font-medium text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>GRID ONLINE</span>
          </div>
          <span className="font-mono-code text-slate-400">24ms</span>
        </div>
      </div>
    </aside>
  );
};
