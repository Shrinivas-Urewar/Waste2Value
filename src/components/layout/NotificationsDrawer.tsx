import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import { ScreenId } from '../../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'MoEFCC Ash Notification Compliance Check',
      description: 'Stream FA-2024-09 has 100% circular valorization allocation scheduled. Ready for mandatory S.O. 5481(E) portal filing.',
      time: '12m ago',
      type: 'success',
      actionScreen: 'decision-summary' as ScreenId,
      actionLabel: 'Review Regulatory Manifest',
    },
    {
      id: 'notif-2',
      title: 'MIP Optimization Solver Convergence',
      description: 'Mixed-Integer Linear Program ran in 0.42s on CBC v2.10.8 solver. Multi-objective Pareto rank 1 identified.',
      time: '45m ago',
      type: 'info',
      actionScreen: 'allocation-optimization' as ScreenId,
      actionLabel: 'View Solver Schedule',
    },
    {
      id: 'notif-3',
      title: 'Silo Discharge Tare Scale Calibration',
      description: 'CSTPS Silo Bay 2B scales verified at tare variance ±0.15%. Pneumatic loading flow rate stabilized at 140 MT/hr.',
      time: '2h ago',
      type: 'warning',
      actionScreen: 'waste-intake' as ScreenId,
      actionLabel: 'Check Silo Telemetry',
    },
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-96 flex-col border-l border-[#CBD5E1] bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-3 bg-[#F8F9FA]">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-[#DC2626]" />
          <span className="font-headline font-semibold text-slate-900 text-sm">
            Regulatory & System Alerts
          </span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="rounded border border-[#CBD5E1] bg-white p-3 shadow-2xs hover:border-slate-400 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 text-xs">
                {item.type === 'success' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                {item.type === 'info' && <Clock className="h-3.5 w-3.5 text-blue-600 shrink-0" />}
                {item.type === 'warning' && <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />}
                <span className="leading-snug">{item.title}</span>
              </div>
              <span className="shrink-0 font-mono-code text-[10px] text-slate-400">{item.time}</span>
            </div>
            <p className="mt-1.5 text-slate-600 text-[11px] leading-relaxed">
              {item.description}
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => {
                  onNavigate(item.actionScreen);
                  onClose();
                }}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#DC2626] hover:underline"
              >
                <span>{item.actionLabel}</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#E2E8F0] p-3 bg-[#F8F9FA] text-center">
        <span className="text-[11px] text-slate-500 font-mono-code">
          Traceability Node ID: MH-04-W2V-REG
        </span>
      </div>
    </div>
  );
};
