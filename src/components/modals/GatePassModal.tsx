import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck, QrCode } from 'lucide-react';

interface GatePassModalProps {
  isOpen: boolean;
  onClose: () => void;
  lotCode?: string;
}

export const GatePassModal: React.FC<GatePassModalProps> = ({
  isOpen,
  onClose,
  lotCode = 'GP-FA-09-01',
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-2xl rounded-lg border border-[#CBD5E1] bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-3.5 bg-[#F8F9FA]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <div>
              <h3 className="font-headline font-bold text-slate-900 text-sm">
                Official Dispatch Gate Pass & Weighbridge Docket
              </h3>
              <p className="text-[11px] text-slate-500 font-mono-code">
                CPCB Consignment E-Waybill / Electronic Weighbridge Certificate (IS 1436:2018)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Printable Ticket Area */}
        <div className="p-6 text-xs text-slate-800 space-y-5 bg-white font-mono-code print:p-0">
          <div className="border border-slate-300 p-4 rounded bg-[#FAFAFA]">
            {/* Top Bar of Docket */}
            <div className="flex items-start justify-between border-b border-dashed border-slate-300 pb-3">
              <div>
                <div className="font-headline text-base font-bold text-slate-900 tracking-tight">
                  CHANDRAPUR SUPER THERMAL POWER STATION (CSTPS)
                </div>
                <div className="text-[11px] text-slate-600">
                  Bulk Fly Ash Evacuation & Circular Valorization Terminal #2B
                </div>
                <div className="text-[10px] text-slate-500">
                  Chandrapur 442404, Maharashtra · GSTIN: 27AAACM0124K1ZW
                </div>
              </div>
              <div className="text-right">
                <div className="bg-[#DC2626] text-white px-2 py-0.5 text-xs font-bold rounded inline-block">
                  GATE PASS: {lotCode}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Generated: 24-SEP-2024 14:45 IST
                </div>
              </div>
            </div>

            {/* Weighbridge Specs */}
            <div className="grid grid-cols-3 gap-4 py-4 border-b border-dashed border-slate-300">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Material Consignment</span>
                <span className="font-bold text-slate-900">Class F Siliceous Fly Ash</span>
                <span className="text-[10px] text-slate-600 block">Batch FA-2024-09 (IS 3812-1)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Consignee Offtaker</span>
                <span className="font-bold text-slate-900">UltraTech Cement Works</span>
                <span className="text-[10px] text-slate-600 block">Nagpur Clinker Grinding Unit</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Authorized Vehicle</span>
                <span className="font-bold text-slate-900">MH-34-AB-9821</span>
                <span className="text-[10px] text-slate-600 block">30t Pneumatic Powder Bulker</span>
              </div>
            </div>

            {/* Net Weight Grid */}
            <div className="grid grid-cols-4 gap-3 py-3 border-b border-dashed border-slate-300 bg-white p-2 rounded">
              <div className="border-r border-slate-200 pr-2">
                <span className="text-[10px] text-slate-500 uppercase block">Tare Weight</span>
                <span className="font-bold text-sm text-slate-900">12,420 kg</span>
              </div>
              <div className="border-r border-slate-200 pr-2">
                <span className="text-[10px] text-slate-500 uppercase block">Gross Weight</span>
                <span className="font-bold text-sm text-slate-900">42,420 kg</span>
              </div>
              <div className="border-r border-slate-200 pr-2">
                <span className="text-[10px] text-slate-500 uppercase block">Net Material</span>
                <span className="font-bold text-sm text-emerald-700">30,000 kg (30.00 MT)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Scale Variance</span>
                <span className="font-bold text-sm text-slate-700">±0.12% (CALIBRATED)</span>
              </div>
            </div>

            {/* Security Verification & Signatures */}
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-white border border-slate-300 p-1 flex items-center justify-center">
                  <QrCode className="h-10 w-10 text-slate-900" />
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  Cryptographic Manifest Hash:<br />
                  <span className="text-slate-700 font-bold">SHA256: 9e88c03...b21</span><br />
                  MoEFCC Portal Registration: COMP-2024-CSTPS-09
                </div>
              </div>
              <div className="text-right text-[10px]">
                <div className="font-bold text-slate-800">Er. Rajeshwar Kulkarni</div>
                <div className="text-slate-500">Plant Logistics Controller</div>
                <div className="text-emerald-700 font-bold flex items-center justify-end gap-1 mt-0.5">
                  <CheckCircle className="h-3 w-3" />
                  <span>DIGITALLY SIGNED & VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between border-t border-[#E2E8F0] px-6 py-3.5 bg-[#F8F9FA]">
          <span className="text-xs text-slate-500">
            Copies routed to CSTPS Gate Sentry, Driver Transit Wallet, and Offtaker Inbound Log.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded border border-[#CBD5E1] bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded bg-[#DC2626] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#B91C1C]"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Docket</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
