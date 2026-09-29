import React, { useState } from 'react';
import { 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Server, 
  Cpu, 
  Radio, 
  Wifi, 
  Upload, 
  Download, 
  Layers, 
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { DATA_SOURCES } from '../../data/mockData';

export const DataSourcesScreen: React.FC = () => {
  const [sources, setSources] = useState(DATA_SOURCES);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [syncAllStatus, setSyncAllStatus] = useState<string>('idle');
  const [filterType, setFilterType] = useState<string>('all');

  const handleSyncSingle = (id: string) => {
    setIsSyncing(id);
    setTimeout(() => {
      setSources(prev => prev.map(s => {
        if (s.id === id) {
          return {
            ...s,
            lastSync: 'Just now',
            recordsCount: s.recordsCount + Math.floor(Math.random() * 25) + 1
          };
        }
        return s;
      }));
      setIsSyncing(null);
    }, 900);
  };

  const handleSyncAll = () => {
    setSyncAllStatus('syncing');
    setTimeout(() => {
      setSources(prev => prev.map(s => ({
        ...s,
        lastSync: 'Just now',
        recordsCount: s.recordsCount + Math.floor(Math.random() * 50) + 5
      })));
      setSyncAllStatus('done');
      setTimeout(() => setSyncAllStatus('idle'), 2500);
    }, 1400);
  };

  const filteredSources = filterType === 'all' 
    ? sources 
    : sources.filter(s => s.type === filterType);

  const totalRecords = sources.reduce((acc, curr) => acc + curr.recordsCount, 0);
  const healthyCount = sources.filter(s => s.status === 'healthy').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              STAGE 00 / PIPELINE TELEMETRY & INGESTION
            </span>
            <span className="text-xs font-mono text-slate-400">·</span>
            <span className="text-xs font-mono text-slate-500">MH-04 CLUSTER DATA BUS</span>
          </div>
          <h1 className="text-2xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-3">
            Data Sources & Instrument Feeds
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {healthyCount}/{sources.length} Feeds Operational
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time integration middleware connecting automated digital weighbridges, laboratory XRF spectrometers, enterprise ERPs, and statutory CPCB compliance portals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncAll}
            disabled={syncAllStatus === 'syncing'}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded bg-rose-600 text-white hover:bg-rose-700 shadow-sm cursor-pointer disabled:opacity-50 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncAllStatus === 'syncing' ? 'animate-spin' : ''}`} />
            {syncAllStatus === 'syncing' ? 'Polling Instruments...' : syncAllStatus === 'done' ? 'All Feeds Synced!' : 'Poll All Instruments'}
          </button>
        </div>
      </div>

      {/* Cluster Ingestion Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
            Total Synced Records
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline text-slate-900">
              {totalRecords.toLocaleString()}
            </span>
            <span className="text-xs font-mono font-medium text-slate-500">Events</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Zero packet loss across broker
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
            Average Network Latency
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline text-slate-900">
              34
            </span>
            <span className="text-xs font-mono font-medium text-slate-500">ms / P99</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Kafka cluster in Mumbai AWS (ap-south-1)
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
            Active IoT Edge Gateways
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline text-slate-900">
              12 / 12
            </span>
            <span className="text-xs font-mono font-medium text-slate-500">Online</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            Rigaku, Avery Weigh-Tronix & GPS Modems
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
            Regulatory Gateway Sync
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline text-emerald-700">
              CPCB v2.4
            </span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Signed webhook heartbeats active
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <span className="text-xs font-mono font-semibold text-slate-500 mr-2">FEED FILTER:</span>
        {[
          { key: 'all', label: 'All Sources (5)' },
          { key: 'iot', label: 'IoT & Instruments' },
          { key: 'erp', label: 'Enterprise ERP' },
          { key: 'gis', label: 'GIS & Highway Corridors' },
          { key: 'api', label: 'Statutory Portal APIs' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilterType(tab.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
              filterType === tab.key 
                ? 'bg-slate-900 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map(source => {
          const isThisSyncing = isSyncing === source.id;
          return (
            <div key={source.id} className="bg-white border border-slate-200 rounded p-5 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    {source.type === 'iot' && <Cpu className="w-5 h-5 text-indigo-600" />}
                    {source.type === 'erp' && <Server className="w-5 h-5 text-blue-600" />}
                    {source.type === 'gis' && <Radio className="w-5 h-5 text-amber-600" />}
                    {source.type === 'api' && <Zap className="w-5 h-5 text-emerald-600" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      {source.name}
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {source.type}
                      </span>
                    </h3>
                    <p className="text-xs font-mono text-slate-500">
                      ID: {source.id.toUpperCase()} · Endpoint: {source.endpoint}
                    </p>
                  </div>
                </div>

                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium ${
                  source.status === 'healthy' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${source.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  {source.status.toUpperCase()}
                </span>
              </div>

              {/* Specs & Frequency */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 font-mono text-xs">
                <div>
                  <div className="text-[10px] uppercase text-slate-400">Sync Interval</div>
                  <div className="font-semibold text-slate-700 mt-0.5">{source.frequency}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-400">Last Synced</div>
                  <div className="font-semibold text-slate-700 mt-0.5">{source.lastSync}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-400">Total Events</div>
                  <div className="font-semibold text-slate-900 mt-0.5">{source.recordsCount.toLocaleString()}</div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 mt-1">
                <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> TLS 1.3 / HMAC Auth
                </span>
                <button
                  onClick={() => handleSyncSingle(source.id)}
                  disabled={isThisSyncing}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isThisSyncing ? 'animate-spin' : ''}`} />
                  {isThisSyncing ? 'Syncing...' : 'Poll Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline Architecture Diagram / Ingestion Flow */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-2xs">
        <h3 className="text-sm font-bold font-headline uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-rose-600" />
          End-to-End Pipeline Telemetry Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded text-center">
            <div className="w-8 h-8 mx-auto rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mb-2">
              01
            </div>
            <div className="font-bold text-xs text-slate-800">Physical Edge</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Rigaku Spectrometer & Avery Weighbridge loadcells at silo bay
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded text-center">
            <div className="w-8 h-8 mx-auto rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs mb-2">
              02
            </div>
            <div className="font-bold text-xs text-slate-800">Kafka Bus & Normalizer</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Oxide stoichiometry schema validation against IS 3812 Part 1
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded text-center">
            <div className="w-8 h-8 mx-auto rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs mb-2">
              03
            </div>
            <div className="font-bold text-xs text-slate-800">MILP Optimization Core</div>
            <div className="text-[11px] text-slate-500 mt-1">
              COIN-OR CBC / Simplex solver with multi-objective trade-off
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded text-center">
            <div className="w-8 h-8 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mb-2">
              04
            </div>
            <div className="font-bold text-xs text-slate-800">Regulatory Dispatch</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Automated CPCB Form-10 manifests & weighbridge QR dockets
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
