import React, { useState, useEffect } from 'react';
import { ScreenId, WasteStream } from './types';
import { WASTE_STREAMS, OPTIMIZATION_RUNS, ACTIVITY_LOGS } from './data/mockData';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { CommandPalette } from './components/layout/CommandPalette';
import { NotificationsDrawer } from './components/layout/NotificationsDrawer';
import { GatePassModal } from './components/modals/GatePassModal';
import { SolverRunModal } from './components/modals/SolverRunModal';

// Screens
import { OverviewScreen } from './components/screens/OverviewScreen';
import { WasteIntakeScreen } from './components/screens/WasteIntakeScreen';
import { WasteAnalysisScreen } from './components/screens/WasteAnalysisScreen';
import { ReuseOpportunitiesScreen } from './components/screens/ReuseOpportunitiesScreen';
import { DestinationMatchingScreen } from './components/screens/DestinationMatchingScreen';
import { AllocationOptimizationScreen } from './components/screens/AllocationOptimizationScreen';
import { ScenarioComparisonScreen } from './components/screens/ScenarioComparisonScreen';
import { DecisionSummaryScreen } from './components/screens/DecisionSummaryScreen';
import { DataSourcesScreen } from './components/screens/DataSourcesScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('overview');
  const [streams, setStreams] = useState<WasteStream[]>(WASTE_STREAMS);
  const [selectedStream, setSelectedStream] = useState<WasteStream>(WASTE_STREAMS[0]);
  
  // Modals & Drawers
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [gatePassModal, setGatePassModal] = useState<{ isOpen: boolean; lotCode?: string }>({
    isOpen: false,
    lotCode: undefined,
  });
  const [isSolverModalOpen, setIsSolverModalOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsNotificationsOpen(false);
        setGatePassModal({ isOpen: false });
        setIsSolverModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectStream = (stream: WasteStream) => {
    setSelectedStream(stream);
  };

  const handleUpdateStream = (updated: WasteStream) => {
    setSelectedStream(updated);
    setStreams((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleOpenGatePass = (lotCode?: string) => {
    setGatePassModal({
      isOpen: true,
      lotCode: lotCode || selectedStream.code,
    });
  };

  const handleCloseGatePass = () => {
    setGatePassModal({ isOpen: false, lotCode: undefined });
  };

  const handleTriggerSolver = () => {
    setIsSolverModalOpen(true);
  };

  const handleSolverComplete = () => {
    setIsSolverModalOpen(false);
    setCurrentScreen('allocation-optimization');
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col text-slate-800 font-body selection:bg-rose-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        streams={streams}
        activeStream={selectedStream}
        setActiveStream={handleSelectStream}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleNotifications={() => {
          setIsNotificationsOpen((prev) => !prev);
          setUnreadNotifications(0);
        }}
        unreadCount={unreadNotifications}
      />

      {/* Main Workspace: Persistent Sidebar + Responsive Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Persistent Industrial Left Sidebar */}
        <Sidebar
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />

        {/* Dynamic Screen Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="w-full">
            {currentScreen === 'overview' && (
              <OverviewScreen
                onNavigate={setCurrentScreen}
                streams={streams}
                onSelectStream={handleSelectStream}
                runs={OPTIMIZATION_RUNS}
                logs={ACTIVITY_LOGS}
              />
            )}

            {currentScreen === 'waste-intake' && (
              <WasteIntakeScreen
                onNavigate={setCurrentScreen}
                activeStream={selectedStream}
                onUpdateStream={handleUpdateStream}
              />
            )}

            {currentScreen === 'waste-analysis' && (
              <WasteAnalysisScreen
                onNavigate={setCurrentScreen}
                activeStream={selectedStream}
              />
            )}

            {currentScreen === 'reuse-opportunities' && (
              <ReuseOpportunitiesScreen
                onNavigate={setCurrentScreen}
                activeStream={selectedStream}
              />
            )}

            {currentScreen === 'destination-matching' && (
              <DestinationMatchingScreen
                onNavigate={setCurrentScreen}
                activeStream={selectedStream}
              />
            )}

            {currentScreen === 'allocation-optimization' && (
              <AllocationOptimizationScreen
                onNavigate={setCurrentScreen}
                activeStream={selectedStream}
              />
            )}

            {currentScreen === 'scenario-comparison' && (
              <ScenarioComparisonScreen
                onNavigate={setCurrentScreen}
                activeStream={selectedStream}
              />
            )}

            {currentScreen === 'decision-summary' && (
              <DecisionSummaryScreen
                activeStream={selectedStream}
                onNavigate={setCurrentScreen}
                onOpenGatePass={handleOpenGatePass}
              />
            )}

            {currentScreen === 'data-sources' && (
              <div className="p-6 max-w-7xl mx-auto">
                <DataSourcesScreen />
              </div>
            )}

            {currentScreen === 'settings' && (
              <div className="p-6 max-w-7xl mx-auto">
                <SettingsScreen />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals & Slide-overs */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectScreen={setCurrentScreen}
        streams={streams}
        onSelectStream={handleSelectStream}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={setCurrentScreen}
      />

      <GatePassModal
        isOpen={gatePassModal.isOpen}
        onClose={handleCloseGatePass}
        lotCode={gatePassModal.lotCode}
      />

      <SolverRunModal
        isOpen={isSolverModalOpen}
        onClose={() => setIsSolverModalOpen(false)}
        onComplete={handleSolverComplete}
      />
    </div>
  );
}
