export type ScreenId =
  | 'overview'
  | 'waste-intake'
  | 'waste-analysis'
  | 'reuse-opportunities'
  | 'destination-matching'
  | 'allocation-optimization'
  | 'scenario-comparison'
  | 'decision-summary'
  | 'data-sources'
  | 'settings';

export interface WasteStream {
  id: string;
  code: string;
  name: string;
  classification: string;
  sourceFacility: string;
  location: string;
  coordinates: { lat: number; lng: number };
  quantity: number; // in tonnes
  moistureState: 'Dry Bulk (Powder)' | 'Slurry (Pond)' | 'Filter Cake';
  hazardCategory: string;
  status: 'Validated' | 'Active' | 'Under Review';
  chemicalBaseline: string;
  oxideComposition: {
    sio2: number;
    al2o3: number;
    fe2o3: number;
    cao: number;
    mgo: number;
    so3: number;
    loi: number;
    freeCarbon: number;
    residuals: number;
  };
  physicalMetrics: {
    ph: number;
    moistureContent: number;
    blaineFineness: number;
    tclpHeavyMetals: string;
  };
  pozzolanicIndex: number;
  threshold: number;
  predictedCircularityScore: number;
}

export interface OfftakeDestination {
  id: string;
  code: string;
  name: string;
  category: 'Cement' | 'Infrastructure' | 'Precast' | 'Mine Backfill';
  cluster: string;
  transitDistanceKm: number;
  transitTime: string;
  intakeCapacityTonnes: number;
  chemistryFit: number;
  chemistryFitLabel: 'Optimal' | 'High' | 'Med-High' | 'Low';
  dischargeMode: string;
  freightPerTonne: number;
  offtakeCreditPerTonne: number;
  netValuePerTonne: number;
  netBatchValueLakhs: number;
  status: 'Allocated' | 'Qualified' | 'Standby';
  allocatedQuantity: number;
  routeCorridor: string;
  coordinates: { x: number; y: number }; // relative for map svg canvas
}

export interface OptimizationRun {
  id: string;
  jobId: string;
  batchName: string;
  streamCode: string;
  volumeTonnes: number;
  objective: string;
  date: string;
  savingsLakhs: number;
  status: 'Optimized & Ready' | 'Dispatch Scheduled' | 'Under Review';
}

export interface ActivityLog {
  id: string;
  time: string;
  department: string;
  description: string;
  type: 'assay' | 'solver' | 'registry' | 'dispatch';
  highlightWord?: string;
}

export interface PathwayOption {
  id: string;
  name: string;
  standard: string;
  compatibilityScore: number;
  compatibilityLabel: string;
  maxOfftakeTonnes: number;
  optimalOfftakeTonnes: number;
  processingReq: string;
  processingLevel: 'Minimal Prep' | 'Standard Field Mix' | 'Chemical Dosing' | 'Heavy Infrastructure';
  estCostPerTonne: number;
  netValueAvoidedLakhs: number;
  co2OffsetPerTonne: number;
  technicalBasis: string;
  statusTag: string;
}

export interface OptimizationPreset {
  id: 'balanced' | 'min-cost' | 'min-co2' | 'max-diversion';
  name: string;
  description: string;
  costWeight: number;
  co2Weight: number;
  radiusWeight: number;
  netEconLakhs: number;
  co2OffsetTonnes: number;
  diversionPct: number;
  avgRadiusKm: number;
}
