import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, Sliders, Activity } from 'lucide-react';

interface SolverRunModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const SolverRunModal: React.FC<SolverRunModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState(0);

  const logs = [
    'Parsing stream assay vectors: SiO2 (58.4%), Al2O3 (24.1%), Fe2O3 (6.2%)...',
    'Loading regional recipient matrix: 4 verified offtake candidates within 150km corridor...',
    'Building mixed-integer linear programming (MILP) model: 16 decision variables, 12 hard constraints...',
    'Initializing CBC v2.10.8 branch-and-cut solver with dual simplex relaxation...',
    'Evaluating Pareto frontier: Trade-off between transit distance (km) and clinker displacement factor...',
    'Optimal solution converged in 0.42s with zero slack variable residue. 100% circular diversion.',
  ];

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }

    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < logs.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
            onClose();
          }, 800);
          return prev;
        }
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isOpen, onComplete, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-lg border border-[#CBD5E1] bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 border-b border-[#E2E8F0] px-5 py-3.5 bg-[#F8F9FA]">
          <Cpu className="h-5 w-5 text-[#DC2626] animate-spin" />
          <div>
            <h3 className="font-headline font-bold text-slate-900 text-sm">
              MIP Optimization Solver Active
            </h3>
            <p className="text-[11px] text-slate-500 font-mono-code">
              CBC v2.10.8 / HiGHS Branch-and-Cut Simplex Engine
            </p>
          </div>
        </div>

        <div className="p-5 font-mono-code text-xs bg-slate-950 text-emerald-400 space-y-2 min-h-[220px]">
          {logs.slice(0, step + 1).map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-slate-600 select-none">&gt;</span>
              <span className={idx === step ? 'text-white font-medium' : 'text-emerald-400/90'}>
                {log}
              </span>
            </div>
          ))}
          {step < logs.length - 1 && (
            <div className="flex items-center gap-2 text-slate-500 pt-1">
              <span className="inline-block h-3 w-1.5 bg-emerald-400 animate-pulse" />
              <span>solving relaxation tree...</span>
            </div>
          )}
        </div>

        <div className="border-t border-[#E2E8F0] px-5 py-3 bg-[#F8F9FA] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Activity className="h-4 w-4 text-[#DC2626]" />
            <span>Convergence tolerance: 1e-6</span>
          </div>
          <span className="font-mono-code text-[11px] text-slate-400">
            Node ID: MH-04-CBC
          </span>
        </div>
      </div>
    </div>
  );
};
