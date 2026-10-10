export interface CrewMember {
  id: string;
  name: string;
  callsign: string;
  role: string;
  age: number;
  flightExperience: string;
  avatarUrl: string;
  baseline: {
    restingHeartRate: number; // bpm
    restingHeartRateStd: number;
    hrvRmssd: number; // ms
    hrvRmssdStd: number;
    sleepDuration: number; // hours
    sleepDurationStd: number;
    deepSleepPct: number; // %
    remSleepPct: number; // %
    spo2: number; // %
    coreTemp: number; // °C
    respirationRate: number; // breaths/min
    orthostaticToleranceScore: number; // 0-100
  };
}

export interface VitalTelemetryPoint {
  timestamp: string; // ISO or MET string
  metDay: number;
  timeHour: number;
  heartRate: number;
  heartRateBaselineMean: number;
  heartRateBaselineUpper: number;
  heartRateBaselineLower: number;
  spo2: number;
  respirationRate: number;
  coreTemp: number;
  hrvRmssd: number;
  activityMets: number; // metabolic equivalent
  signalQuality: number; // 0-100%
}

export interface SleepRecord {
  flightDay: number;
  dateStr: string;
  totalDurationHours: number;
  baselineDurationHours: number;
  deepSleepPct: number;
  remSleepPct: number;
  lightSleepPct: number;
  wakePct: number;
  sleepEfficiencyPct: number;
  circadianPhaseShiftMinutes: number;
  stages: {
    startHour: number;
    endHour: number;
    stage: 'wake' | 'rem' | 'light' | 'deep';
  }[];
}

export interface EarlyWarningAlert {
  id: string;
  flightDay: number;
  timestamp: string;
  severity: 'nominal' | 'advisory' | 'caution' | 'warning';
  title: string;
  summary: string;
  deviationFactors: {
    indicator: string;
    currentValue: string;
    baselineRange: string;
    zScore: number;
    durationHours: number;
    contributionWeight: number; // %
  }[];
  dataQuality: {
    sensorConfidencePct: number;
    coveragePct: number;
    noiseLevel: 'low' | 'moderate' | 'high';
    primaryDevice: string;
  };
  clinicalContext: string;
  recommendedAction: string;
  acknowledged: boolean;
}

export interface MissionEvent {
  id: string;
  flightDay: number;
  timeLabel: string;
  title: string;
  category: 'eva' | 'burn' | 'environment' | 'science' | 'rest';
  description: string;
  environmentalFactors: {
    cabinPressureKpa: number;
    co2Ppm: number;
    radiationMicroSvHour: number;
    ambientTempCel: number;
  };
  impactSummary: string;
}

export interface NasaDatasetInfo {
  id: string;
  name: string;
  sourceAuthority: string;
  studyId: string;
  description: string;
  variablesCovered: string[];
  sampleCohort: string;
  sensorHardware: string;
  limitations: string;
  citation: string;
  doiLink: string;
}

export type ScenarioPreset = 
  | 'nominal'
  | 'fatigue_deconditioning'
  | 'post_eva_strain'
  | 'sensor_artifact';
