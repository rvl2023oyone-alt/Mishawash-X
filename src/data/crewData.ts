import { CrewMember, VitalTelemetryPoint, SleepRecord, EarlyWarningAlert, MissionEvent, ScenarioPreset } from '../types/telemetry';

export const ARTEMIS_CREW: CrewMember[] = [
  {
    id: 'reid-wiseman',
    name: 'Reid Wiseman',
    callsign: 'Comdr. Wiseman',
    role: 'Commander',
    age: 48,
    flightExperience: '165 days in space (Expedition 41)',
    avatarUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=200&q=80',
    baseline: {
      restingHeartRate: 58,
      restingHeartRateStd: 3.2,
      hrvRmssd: 48,
      hrvRmssdStd: 5.5,
      sleepDuration: 7.3,
      sleepDurationStd: 0.5,
      deepSleepPct: 18.5,
      remSleepPct: 22.0,
      spo2: 98.4,
      coreTemp: 36.8,
      respirationRate: 14.2,
      orthostaticToleranceScore: 92
    }
  },
  {
    id: 'victor-glover',
    name: 'Victor Glover',
    callsign: 'Pilot Glover',
    role: 'Pilot',
    age: 48,
    flightExperience: '168 days in space (Crew-1 / Expedition 64/65)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    baseline: {
      restingHeartRate: 62,
      restingHeartRateStd: 3.5,
      hrvRmssd: 42,
      hrvRmssdStd: 4.8,
      sleepDuration: 6.9,
      sleepDurationStd: 0.6,
      deepSleepPct: 17.0,
      remSleepPct: 21.5,
      spo2: 98.1,
      coreTemp: 36.9,
      respirationRate: 15.0,
      orthostaticToleranceScore: 89
    }
  },
  {
    id: 'christina-koch',
    name: 'Christina Koch',
    callsign: 'Spec. Koch',
    role: 'Mission Specialist 1',
    age: 45,
    flightExperience: '328 days continuous in space (Record female single spaceflight)',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    baseline: {
      restingHeartRate: 54,
      restingHeartRateStd: 2.8,
      hrvRmssd: 54,
      hrvRmssdStd: 6.0,
      sleepDuration: 7.5,
      sleepDurationStd: 0.4,
      deepSleepPct: 20.2,
      remSleepPct: 23.5,
      spo2: 98.7,
      coreTemp: 36.7,
      respirationRate: 13.8,
      orthostaticToleranceScore: 95
    }
  },
  {
    id: 'jeremy-hansen',
    name: 'Jeremy Hansen',
    callsign: 'Spec. Hansen (CSA)',
    role: 'Mission Specialist 2 (CSA)',
    age: 48,
    flightExperience: 'First lunar mission; veteran CF-18 fighter pilot & NEEMO commander',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    baseline: {
      restingHeartRate: 60,
      restingHeartRateStd: 3.1,
      hrvRmssd: 45,
      hrvRmssdStd: 5.0,
      sleepDuration: 7.1,
      sleepDurationStd: 0.5,
      deepSleepPct: 18.0,
      remSleepPct: 22.0,
      spo2: 98.3,
      coreTemp: 36.8,
      respirationRate: 14.5,
      orthostaticToleranceScore: 91
    }
  }
];

export const MISSION_EVENTS: MissionEvent[] = [
  {
    id: 'evt-01',
    flightDay: 1,
    timeLabel: 'FD 01 04:30',
    title: 'Trans-Lunar Injection (TLI)',
    category: 'burn',
    description: 'Interim Cryogenic Propulsion Stage burn to break Low Earth Orbit towards the Moon.',
    environmentalFactors: {
      cabinPressureKpa: 101.3,
      co2Ppm: 2800,
      radiationMicroSvHour: 0.04,
      ambientTempCel: 22.1
    },
    impactSummary: 'G-transition and high-metabolic crew workload during launch sequence.'
  },
  {
    id: 'evt-02',
    flightDay: 3,
    timeLabel: 'FD 03 11:15',
    title: 'Inner Van Allen Belt Crossing',
    category: 'environment',
    description: 'High-energy proton belt transit. Active dosimeters logged temporary elevated radiation flux.',
    environmentalFactors: {
      cabinPressureKpa: 101.1,
      co2Ppm: 3400,
      radiationMicroSvHour: 0.38,
      ambientTempCel: 22.4
    },
    impactSummary: 'SRAG dosimeter spike; crew remained in protected core habitat; biological monitoring continuous.'
  },
  {
    id: 'evt-03',
    flightDay: 9,
    timeLabel: 'FD 09 18:00',
    title: 'Amine Bed CO2 Scrubber Regeneration Cycle',
    category: 'environment',
    description: 'Transient elevation in ambient CO2 during scheduled ECLSS vacuum swing adsorption cycle.',
    environmentalFactors: {
      cabinPressureKpa: 100.8,
      co2Ppm: 4600,
      radiationMicroSvHour: 0.06,
      ambientTempCel: 23.2
    },
    impactSummary: 'Ambient CO2 temporarily rose to 4600 ppm (3.5 mmHg); subtle increase in crew baseline respiratory rate observed.'
  },
  {
    id: 'evt-04',
    flightDay: 14,
    timeLabel: 'FD 14 08:00',
    title: 'High-Density Orbital Maneuver & Timeline Crunch',
    category: 'science',
    description: 'Dense 36-hour operational sprint: mid-course correction burn, live deep-space television broadcast, and autonomous docking system radar checkout.',
    environmentalFactors: {
      cabinPressureKpa: 101.2,
      co2Ppm: 3900,
      radiationMicroSvHour: 0.05,
      ambientTempCel: 22.6
    },
    impactSummary: 'Significant sleep displacement for Commander and Pilot; reduced REM sleep and cumulative cognitive fatigue markers.'
  },
  {
    id: 'evt-05',
    flightDay: 21,
    timeLabel: 'FD 21 14:45',
    title: 'Lunar Far-Side Periapsis Flyby',
    category: 'burn',
    description: 'Closest approach to the lunar surface (~7,400 km over lunar far side) in free-return trajectory. Communications blackout with Earth for 42 minutes.',
    environmentalFactors: {
      cabinPressureKpa: 101.4,
      co2Ppm: 3300,
      radiationMicroSvHour: 0.07,
      ambientTempCel: 22.0
    },
    impactSummary: 'Complete autonomy required. AETHER on-orbit edge analysis operated offline without Houston ground link.'
  }
];

export function generateTelemetryData(
  crew: CrewMember,
  scenario: ScenarioPreset = 'nominal',
  flightDay: number = 16
): {
  vitals: VitalTelemetryPoint[];
  sleepHistory: SleepRecord[];
  alerts: EarlyWarningAlert[];
  currentStatus: {
    state: 'nominal' | 'advisory' | 'caution' | 'warning';
    label: string;
    headline: string;
    confidence: number;
    deltaSummary: string;
  };
} {
  const points: VitalTelemetryPoint[] = [];
  const hoursCount = 48; // last 48 hours continuous telemetry
  const baseHr = crew.baseline.restingHeartRate;
  const baseStd = crew.baseline.restingHeartRateStd;

  // Build 48 hourly points
  for (let i = 0; i < hoursCount; i++) {
    const timeHour = i % 24;
    const dayOffset = Math.floor(i / 24);
    const curDay = flightDay - 1 + dayOffset;
    
    // Circadian dip during nighttime (23:00 - 06:00)
    const isSleepingHour = timeHour >= 23 || timeHour < 7;
    const circadianModifier = isSleepingHour ? -8 : 6;

    let hr = baseHr + circadianModifier + (Math.sin(i * 0.4) * 2.5);
    let spo2 = crew.baseline.spo2 + (Math.sin(i * 0.3) * 0.3);
    let resp = crew.baseline.respirationRate + (isSleepingHour ? -1.8 : 1.2);
    let coreTemp = crew.baseline.coreTemp + (isSleepingHour ? -0.4 : 0.3);
    let hrv = crew.baseline.hrvRmssd + (isSleepingHour ? 12 : -6);
    let mets = isSleepingHour ? 0.9 : 1.4;
    let signalQuality = 98;

    // Apply Scenario effects
    if (scenario === 'fatigue_deconditioning') {
      // Scenario B: video script highlight - resting HR creeps +12-15 bpm, HRV drops, sleep disruption
      const fatigueProgression = (i / hoursCount); // increases over the 48h window
      hr += (12 * fatigueProgression);
      hrv -= (18 * fatigueProgression);
      if (isSleepingHour && i > 24) {
        // Sleep disruption in second night
        hr += 8; // failure to dip during rest
        hrv -= 10;
        mets += 0.4;
      }
      spo2 -= 0.6;
    } else if (scenario === 'post_eva_strain') {
      // Scenario C: Intense metabolic strain and fluid shift
      if (i >= 16 && i <= 28) {
        // Active EVA window
        mets = 4.2;
        hr += 35;
        resp += 8.5;
        coreTemp += 0.9;
        hrv -= 24;
      } else if (i > 28) {
        // Recovery phase with lingering cardiac strain
        mets = 1.1;
        hr += 10;
        coreTemp += 0.3;
        hrv -= 12;
      }
    } else if (scenario === 'sensor_artifact') {
      // Scenario D: Sensor noise / telemetry dropout
      if (i >= 30 && i <= 38) {
        signalQuality = 42; // poor contact
        hr += (Math.random() * 40 - 20); // erratic spikes
        spo2 -= (Math.random() * 6);
      }
    }

    // Baseline envelopes (Mean and +/- 1.5 StdDev)
    const baselineUpper = baseHr + circadianModifier + (baseStd * 1.5);
    const baselineLower = baseHr + circadianModifier - (baseStd * 1.5);

    points.push({
      timestamp: `FD ${curDay} ${timeHour.toString().padStart(2, '0')}:00`,
      metDay: curDay,
      timeHour,
      heartRate: Math.round(hr * 10) / 10,
      heartRateBaselineMean: Math.round((baseHr + circadianModifier) * 10) / 10,
      heartRateBaselineUpper: Math.round(baselineUpper * 10) / 10,
      heartRateBaselineLower: Math.round(baselineLower * 10) / 10,
      spo2: Math.min(100, Math.round(spo2 * 10) / 10),
      respirationRate: Math.round(resp * 10) / 10,
      coreTemp: Math.round(coreTemp * 100) / 100,
      hrvRmssd: Math.max(12, Math.round(hrv * 10) / 10),
      activityMets: Math.round(mets * 10) / 10,
      signalQuality
    });
  }

  // Build 14-day sleep records
  const sleepHistory: SleepRecord[] = [];
  for (let d = flightDay - 13; d <= flightDay; d++) {
    let dur = crew.baseline.sleepDuration;
    let deep = crew.baseline.deepSleepPct;
    let rem = crew.baseline.remSleepPct;
    let light = 100 - deep - rem - 6;
    let efficiency = 92;

    if (scenario === 'fatigue_deconditioning' && d >= flightDay - 3) {
      // Acute progressive sleep loss
      const dayFactor = (d - (flightDay - 4)) / 3;
      dur = Math.max(4.6, dur - (2.4 * dayFactor));
      deep = Math.max(9.2, deep - (8.5 * dayFactor));
      rem = Math.max(14.0, rem - (7.0 * dayFactor));
      light = 100 - deep - rem - 14;
      efficiency = 74;
    }

    sleepHistory.push({
      flightDay: d,
      dateStr: `FD ${d.toString().padStart(2, '0')}`,
      totalDurationHours: Math.round(dur * 10) / 10,
      baselineDurationHours: crew.baseline.sleepDuration,
      deepSleepPct: Math.round(deep * 10) / 10,
      remSleepPct: Math.round(rem * 10) / 10,
      lightSleepPct: Math.round(light * 10) / 10,
      wakePct: Math.round((100 - deep - rem - light) * 10) / 10,
      sleepEfficiencyPct: efficiency,
      circadianPhaseShiftMinutes: scenario === 'fatigue_deconditioning' && d >= flightDay - 2 ? +65 : -10,
      stages: [
        { startHour: 23, endHour: 0.5, stage: 'light' },
        { startHour: 0.5, endHour: 2.2, stage: 'deep' },
        { startHour: 2.2, endHour: 3.5, stage: 'rem' },
        { startHour: 3.5, endHour: 5.0, stage: 'light' },
        { startHour: 5.0, endHour: 6.2, stage: 'rem' },
        { startHour: 6.2, endHour: 7.0, stage: 'wake' }
      ]
    });
  }

  // Alerts based on scenario
  const alerts: EarlyWarningAlert[] = [];

  if (scenario === 'fatigue_deconditioning') {
    alerts.push({
      id: 'alert-multi-01',
      flightDay,
      timestamp: `FD ${flightDay} 07:15 UTC`,
      severity: 'caution',
      title: 'Multi-Signal Baseline Deviation: Autonomic Fatigue & Sleep Restriction',
      summary: 'Simultaneous divergence observed across resting heart rate (+12 bpm above personal baseline), parasympathetic tone (HRV -38%), and slow-wave sleep deficit (-42%) over 3 consecutive flight days.',
      deviationFactors: [
        {
          indicator: 'Resting Heart Rate (Nocturnal Mean)',
          currentValue: `${crew.baseline.restingHeartRate + 13} bpm`,
          baselineRange: `${crew.baseline.restingHeartRate - 3} - ${crew.baseline.restingHeartRate + 3} bpm`,
          zScore: 3.8,
          durationHours: 72,
          contributionWeight: 42
        },
        {
          indicator: 'Sleep Duration (Cumulative Debt)',
          currentValue: '5.1 hrs/night (avg)',
          baselineRange: `${crew.baseline.sleepDuration - 0.5} - ${crew.baseline.sleepDuration + 0.5} hrs`,
          zScore: -3.2,
          durationHours: 72,
          contributionWeight: 31
        },
        {
          indicator: 'Autonomic HRV (rMSSD Nocturnal)',
          currentValue: `${Math.round(crew.baseline.hrvRmssd * 0.62)} ms`,
          baselineRange: `${crew.baseline.hrvRmssd - 6} - ${crew.baseline.hrvRmssd + 6} ms`,
          zScore: -2.7,
          durationHours: 48,
          contributionWeight: 27
        }
      ],
      dataQuality: {
        sensorConfidencePct: 96.4,
        coveragePct: 99.1,
        noiseLevel: 'low',
        primaryDevice: 'CSA Bio-Monitor High-Res ECG & Dual-Band RIP Garment'
      },
      clinicalContext: 'Notice: Population threshold for resting HR is 60–100 bpm, so a reading of 71 bpm appears clinically normal on generic monitors. However, for this astronaut whose baseline is 54–58 bpm, this represents a +3.8σ divergence correlated with microgravity fluid shifts and chronic sleep compression.',
      recommendedAction: '1. Initiate sleep hygiene countermeasure protocol; 2. Shift scheduled ARED high-intensity load by 4 hours; 3. Notify Crew Medical Officer (CMO) for routine scheduled tele-consult; 4. Re-evaluate post-rest cycle.',
      acknowledged: false
    });
  } else if (scenario === 'post_eva_strain') {
    alerts.push({
      id: 'alert-eva-01',
      flightDay,
      timestamp: `FD ${flightDay} 16:30 UTC`,
      severity: 'advisory',
      title: 'Metabolic & Thermal Recovery Strain Post-Operations',
      summary: 'Core body temperature remains elevated (+0.4°C) with compensatory elevated resting respiration (18.2/min) following prolonged physical workload.',
      deviationFactors: [
        {
          indicator: 'Core Body Temperature',
          currentValue: '37.4 °C',
          baselineRange: '36.7 - 37.0 °C',
          zScore: 2.1,
          durationHours: 8,
          contributionWeight: 55
        },
        {
          indicator: 'Respiration Rate',
          currentValue: '18.4 breaths/min',
          baselineRange: '13.5 - 15.0 breaths/min',
          zScore: 2.4,
          durationHours: 6,
          contributionWeight: 45
        }
      ],
      dataQuality: {
        sensorConfidencePct: 94.0,
        coveragePct: 98.2,
        noiseLevel: 'low',
        primaryDevice: 'Double-Sensor Core Temp & Bio-Monitor Inductive Bands'
      },
      clinicalContext: 'Expected physiological cost of sustained metabolic expenditure during EVA/operational tasks. Fluid redistribution in microgravity delays passive thermoregulation dissipation.',
      recommendedAction: 'Ensure electrolyte rehydration protocol (1.2 L oral fluid intake) and monitor passive cooling rate prior to scheduled rest cycle.',
      acknowledged: false
    });
  } else if (scenario === 'sensor_artifact') {
    alerts.push({
      id: 'alert-noise-01',
      flightDay,
      timestamp: `FD ${flightDay} 09:40 UTC`,
      severity: 'advisory',
      title: 'Data Quality Degradation: PPG Motion Artifact Detected',
      summary: 'Pulse oximeter signal quality dropped below 50% during crew exercise countermeasure. AETHER adaptive filter suppressed false tachycardia alarm.',
      deviationFactors: [
        {
          indicator: 'Signal Quality Index (SQI)',
          currentValue: '42 %',
          baselineRange: '> 90 %',
          zScore: -4.5,
          durationHours: 1.5,
          contributionWeight: 80
        }
      ],
      dataQuality: {
        sensorConfidencePct: 42.0,
        coveragePct: 76.5,
        noiseLevel: 'high',
        primaryDevice: 'Finger/Wrist Reflectance Pulse Oximeter'
      },
      clinicalContext: 'False alarm mitigation in action: When sensor signal quality drops, raw telemetry spikes are flagged as motion artifacts rather than physiological arrhythmias.',
      recommendedAction: 'Verify sensor placement and skin contact following exercise cycle. Switch to primary ECG lead telemetry for active heart rate gating.',
      acknowledged: true
    });
  }

  // Overall status rollup
  let currentStatus: {
    state: 'nominal' | 'advisory' | 'caution' | 'warning';
    label: string;
    headline: string;
    confidence: number;
    deltaSummary: string;
  } = {
    state: 'nominal',
    label: 'All Indicators Nominal',
    headline: 'Physiological Envelope Stable',
    confidence: 98.2,
    deltaSummary: 'All vital indicators remain within ±1.2σ personal baseline range across the past 72 hours.'
  };

  if (scenario === 'fatigue_deconditioning') {
    currentStatus = {
      state: 'caution',
      label: 'Multi-Signal Baseline Deviation',
      headline: 'Autonomic & Sleep Divergence Detected',
      confidence: 96.4,
      deltaSummary: '3 indicators concurrently exceeding +2.5σ baseline thresholds (Elevated resting HR, reduced nocturnal HRV, sleep debt).'
    };
  } else if (scenario === 'post_eva_strain') {
    currentStatus = {
      state: 'advisory',
      label: 'Transient Post-Activity Strain',
      headline: 'Active Thermoregulation Recovery',
      confidence: 94.0,
      deltaSummary: 'Elevated core temp (+0.4°C) and respiration rate following sustained physical exertion.'
    };
  } else if (scenario === 'sensor_artifact') {
    currentStatus = {
      state: 'advisory',
      label: 'Sensor Quality Advisory',
      headline: 'Adaptive Noise Rejection Active',
      confidence: 58.0,
      deltaSummary: 'Temporary optical signal artifact detected; automated filter prevented false cardiac divergence flag.'
    };
  }

  return {
    vitals: points,
    sleepHistory,
    alerts,
    currentStatus
  };
}
