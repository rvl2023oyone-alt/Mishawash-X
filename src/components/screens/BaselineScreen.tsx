import React, { useState } from 'react';
import { CrewMember, VitalTelemetryPoint, SleepRecord } from '../../types/telemetry';
import { BaselineBandChart } from '../charts/BaselineBandChart';
import { SleepHypnogram } from '../charts/SleepHypnogram';
import { PhysioRadarChart } from '../charts/PhysioRadarChart';
import { IMAGES } from '../../assets/images';
import { Calculator, ShieldCheck, Activity, Cpu, Sparkles } from 'lucide-react';

interface BaselineScreenProps {
  selectedCrew: CrewMember;
  vitals: VitalTelemetryPoint[];
  sleepHistory: SleepRecord[];
}

export const BaselineScreen: React.FC<BaselineScreenProps> = ({
  selectedCrew,
  vitals,
  sleepHistory
}) => {
  const [timeView, setTimeView] = useState<'48h' | '7d' | '14d'>('48h');
  const [showMathModal, setShowMathModal] = useState<boolean>(false);
  const [activeSensorHotspot, setActiveSensorHotspot] = useState<string>('ecg');

  const base = selectedCrew.baseline;
  const currentVital = vitals[vitals.length - 1];
  const latestSleep = sleepHistory[sleepHistory.length - 1];

  const hrDeviationScore = Math.max(30, Math.min(100, Math.round(100 - Math.abs(currentVital.heartRate - base.restingHeartRate) * 4)));
  const hrvScore = Math.max(25, Math.min(100, Math.round((currentVital.hrvRmssd / base.hrvRmssd) * 100)));
  const sleepDurationScore = Math.max(30, Math.min(100, Math.round((latestSleep.totalDurationHours / base.sleepDuration) * 100)));
  const deepSleepScore = Math.max(30, Math.min(100, Math.round((latestSleep.deepSleepPct / base.deepSleepPct) * 100)));
  const respScore = Math.max(40, Math.min(100, Math.round(100 - Math.abs(currentVital.respirationRate - base.respirationRate) * 5)));
  const tempScore = Math.max(40, Math.min(100, Math.round(100 - Math.abs(currentVital.coreTemp - base.coreTemp) * 40)));

  const radarMetrics = [
    { label: 'Resting HR', score: hrDeviationScore, rawNote: `${currentVital.heartRate} bpm vs base ${base.restingHeartRate}` },
    { label: 'Autonomic HRV', score: hrvScore, rawNote: `${currentVital.hrvRmssd} ms vs base ${base.hrvRmssd}` },
    { label: 'Sleep Duration', score: sleepDurationScore, rawNote: `${latestSleep.totalDurationHours}h vs base ${base.sleepDuration}h` },
    { label: 'Deep Sleep Ratio', score: deepSleepScore, rawNote: `${latestSleep.deepSleepPct}% vs base ${base.deepSleepPct}%` },
    { label: 'Respiratory Tone', score: respScore, rawNote: `${currentVital.respirationRate} bpm vs base ${base.respirationRate}` },
    { label: 'Thermoregulation', score: tempScore, rawNote: `${currentVital.coreTemp} °C vs base ${base.coreTemp}` }
  ];

  const sensorDescriptions: Record<string, { title: string; desc: string; sampleRate: string; accuracy: string }> = {
    ecg: {
      title: '3-Lead Embedded Vector ECG Leads',
      desc: 'Gold-plated skin contact electrodes knitted directly into smart garment textile. Continuous 256 Hz recording with real-time QRS detection and arrhythmia rejection.',
      sampleRate: '256 Hz continuous',
      accuracy: '±1 ms R-peak resolution'
    },
    rip: {
      title: 'Dual Respiratory Inductive Plethysmography (RIP) Bands',
      desc: 'Ribcage and abdominal elastic inductive loops measuring tidal volume, breathing rate, and central vs obstructive apnea events during microgravity sleep.',
      sampleRate: '32 Hz dual-band',
      accuracy: '±0.5 breaths/min'
    },
    spo2: {
      title: 'Multispectral Optical Pulse Oximeter',
      desc: 'Forehead and wrist reflectance optical photoplethysmography (PPG) with automatic ambient light compensation and motion-artifact rejection.',
      sampleRate: '64 Hz raw PPG',
      accuracy: '±1.0% SpO2 (70-100% range)'
    },
    temp: {
      title: 'Circadian Double-Sensor Thermistor',
      desc: 'Dual heat-flux thermal sensor calculating internal core body temperature non-invasively through forehead and sternal skin contact.',
      sampleRate: '1 Hz continuous',
      accuracy: '±0.05 °C resolution'
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0b0f19] border border-cyan-900/40 rounded-2xl p-5 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-100">
              Personal Physiological Baseline Engine
            </h2>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-2 py-0.5 rounded font-semibold">
              {selectedCrew.name}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Replaces generic population thresholds (60–100 bpm) with an astronaut-calibrated 14-day statistical envelope.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-[#070a12] border border-slate-800 rounded-lg text-xs font-mono">
            <button
              onClick={() => setTimeView('48h')}
              className={`px-3 py-1.5 rounded transition-colors ${timeView === '48h' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800' : 'text-slate-400 hover:text-slate-200'}`}
            >
              48 Hours
            </button>
            <button
              onClick={() => setTimeView('7d')}
              className={`px-3 py-1.5 rounded transition-colors ${timeView === '7d' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800' : 'text-slate-400 hover:text-slate-200'}`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeView('14d')}
              className={`px-3 py-1.5 rounded transition-colors ${timeView === '14d' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800' : 'text-slate-400 hover:text-slate-200'}`}
            >
              14-Day Baseline
            </button>
          </div>

          <button
            onClick={() => setShowMathModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold transition-all shadow-md"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Algorithm Math</span>
          </button>
        </div>
      </div>

      {/* CSA Bio-Monitor Smart Garment Interactive Telemetry Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0b0f19] border border-cyan-900/40 rounded-2xl p-6 shadow-2xl overflow-hidden relative">
        {/* Left: Astronaut Smart Garment Visual (4 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#070a12] rounded-xl border border-slate-800 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono mb-2 z-10">
            <span className="text-cyan-400 uppercase tracking-wider font-bold">
              CSA Bio-Monitor System
            </span>
            <span className="text-slate-400 text-[10px]">ISS & Orion Hardware</span>
          </div>

          {/* Biomonitor Smart Suit Image with Hotspots */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-slate-800 shadow-inner group">
            <img
              src={IMAGES.biomonitorSuit}
              alt="CSA / NASA Bio-Monitor Smart Suit"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a12]/90 via-transparent to-transparent pointer-events-none" />

            {/* Interactive Sensor Hotspots */}
            <button
              onClick={() => setActiveSensorHotspot('ecg')}
              className={`absolute top-[48%] left-[45%] w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                activeSensorHotspot === 'ecg'
                  ? 'bg-cyan-500 ring-4 ring-cyan-500/40 text-slate-950 font-bold scale-110'
                  : 'bg-cyan-950/80 border border-cyan-500 text-cyan-300 hover:scale-110'
              }`}
              title="3-Lead ECG Sensor Nodes"
            >
              <span className="text-[10px] font-mono font-bold">1</span>
            </button>

            <button
              onClick={() => setActiveSensorHotspot('rip')}
              className={`absolute top-[68%] left-[50%] w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                activeSensorHotspot === 'rip'
                  ? 'bg-cyan-500 ring-4 ring-cyan-500/40 text-slate-950 font-bold scale-110'
                  : 'bg-cyan-950/80 border border-cyan-500 text-cyan-300 hover:scale-110'
              }`}
              title="Inductive Plethysmography Respiratory Band"
            >
              <span className="text-[10px] font-mono font-bold">2</span>
            </button>

            <button
              onClick={() => setActiveSensorHotspot('spo2')}
              className={`absolute top-[28%] left-[62%] w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                activeSensorHotspot === 'spo2'
                  ? 'bg-cyan-500 ring-4 ring-cyan-500/40 text-slate-950 font-bold scale-110'
                  : 'bg-cyan-950/80 border border-cyan-500 text-cyan-300 hover:scale-110'
              }`}
              title="Pulse Oximeter Optical Sensor"
            >
              <span className="text-[10px] font-mono font-bold">3</span>
            </button>

            <button
              onClick={() => setActiveSensorHotspot('temp')}
              className={`absolute top-[36%] left-[32%] w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                activeSensorHotspot === 'temp'
                  ? 'bg-cyan-500 ring-4 ring-cyan-500/40 text-slate-950 font-bold scale-110'
                  : 'bg-cyan-950/80 border border-cyan-500 text-cyan-300 hover:scale-110'
              }`}
              title="Double-Sensor Skin Thermistor"
            >
              <span className="text-[10px] font-mono font-bold">4</span>
            </button>
          </div>

          {/* Active Sensor Readout Box */}
          <div className="mt-3 p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs">
            <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold mb-0.5">
              {sensorDescriptions[activeSensorHotspot].title}
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              {sensorDescriptions[activeSensorHotspot].desc}
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2 pt-2 border-t border-slate-800">
              <span>Rate: {sensorDescriptions[activeSensorHotspot].sampleRate}</span>
              <span className="text-emerald-400 font-semibold">{sensorDescriptions[activeSensorHotspot].accuracy}</span>
            </div>
          </div>
        </div>

        {/* Right: Physiological Comparison & Radar (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5">
          {/* Radar + Metric Envelope Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PhysioRadarChart
              currentMetrics={radarMetrics}
              title={`${selectedCrew.callsign} Baseline Calibration`}
            />

            {/* Why Individual Baseline Matters Callout */}
            <div className="bg-[#070a12] rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold mb-1">
                  Spaceflight Physiology Trap
                </div>
                <h4 className="text-sm font-bold text-slate-100 mb-2">
                  The Population Range Dilemma
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Hospital vitals monitors rely on broad population bounds:
                  <br />
                  <code className="text-cyan-400 font-mono text-[11px] block my-1">
                    Normal Adult HR: 60 - 100 bpm
                  </code>
                  For {selectedCrew.name}, whose resting baseline is <strong>{selectedCrew.baseline.restingHeartRate} bpm</strong>, a creeping shift to 72 bpm represents a <strong>+3.8σ divergence</strong> caused by fluid shifts and fatigue. Traditional hospital software considers this "normal" and ignores it until operational performance collapses.
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AETHER flags subtle deviation 72h before clinical failure.</span>
              </div>
            </div>
          </div>

          {/* Calibrated Thresholds Table */}
          <div className="bg-[#070a12] rounded-xl border border-slate-800 p-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
              Live Biometric Calibration Summary ({selectedCrew.name})
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase">
                    <th className="pb-1.5">Indicator</th>
                    <th className="pb-1.5">Personal Base</th>
                    <th className="pb-1.5">Earth Standard</th>
                    <th className="pb-1.5">Current</th>
                    <th className="pb-1.5">Z-Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  <tr>
                    <td className="py-2 text-slate-200 font-sans">Resting Heart Rate</td>
                    <td className="py-2 text-cyan-400">{base.restingHeartRate} ± {base.restingHeartRateStd} bpm</td>
                    <td className="py-2 text-slate-400">60 - 100 bpm</td>
                    <td className="py-2 font-bold text-slate-100">{currentVital.heartRate} bpm</td>
                    <td className="py-2 font-bold text-amber-400">
                      {(((currentVital.heartRate - base.restingHeartRate) / base.restingHeartRateStd)).toFixed(2)}σ
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-200 font-sans">Nocturnal HRV</td>
                    <td className="py-2 text-cyan-400">{base.hrvRmssd} ± {base.hrvRmssdStd} ms</td>
                    <td className="py-2 text-slate-400">25 - 65 ms</td>
                    <td className="py-2 font-bold text-slate-100">{currentVital.hrvRmssd} ms</td>
                    <td className="py-2 text-slate-300">
                      {(((currentVital.hrvRmssd - base.hrvRmssd) / base.hrvRmssdStd)).toFixed(2)}σ
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-200 font-sans">Sleep Duration</td>
                    <td className="py-2 text-cyan-400">{base.sleepDuration} hrs</td>
                    <td className="py-2 text-slate-400">7.0 - 9.0 hrs</td>
                    <td className="py-2 font-bold text-slate-100">{latestSleep.totalDurationHours} hrs</td>
                    <td className="py-2 text-slate-300">
                      {(((latestSleep.totalDurationHours - base.sleepDuration) / base.sleepDurationStd)).toFixed(2)}σ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Chart: Baseline Band Chart */}
      <BaselineBandChart
        data={vitals}
        astronautName={selectedCrew.name}
        metricLabel="Resting Heart Rate Continuous Envelope"
        unit="bpm"
      />

      {/* Sleep Architecture Breakdown */}
      <SleepHypnogram
        sleepHistory={sleepHistory}
        astronautName={selectedCrew.name}
      />

      {/* Mathematical Algorithm Documentation Modal */}
      {showMathModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-cyan-800 rounded-2xl max-w-2xl w-full p-6 text-slate-200 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-slate-100">
                  AETHER Baseline Calculation Logic & Formulae
                </h3>
              </div>
              <button
                onClick={() => setShowMathModal(false)}
                className="text-slate-400 hover:text-slate-100 font-mono text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-3 leading-relaxed text-slate-300">
              <p>
                <strong>1. Rolling 14-Day Median & Interquartile Window:</strong> To avoid distorting the baseline with acute post-exercise spikes or transient stress, AETHER computes a 14-day rolling window:
              </p>
              <div className="bg-[#070a12] p-2.5 rounded font-mono text-cyan-300 border border-slate-800">
                Baseline_Mean(t) = Median( telemetry[t-14d : t] ) with Huber-loss downweighting
              </div>

              <p>
                <strong>2. Diurnal & Circadian Phase Adjustment:</strong> Human resting heart rate and core temperature follow a 24-hour sinusoidal circadian cycle. The baseline envelope dynamically adjusts for sleep/wake phases:
              </p>
              <div className="bg-[#070a12] p-2.5 rounded font-mono text-purple-300 border border-slate-800">
                Baseline_Circadian(t, hour) = Baseline_Mean + A · cos( 2π · (hour - φ) / 24 )
              </div>

              <p>
                <strong>3. Multi-Signal Z-Score Divergence Metric:</strong> Rather than issuing an alert based on a single sensor spike, AETHER calculates standardized Z-scores across all indicators:
              </p>
              <div className="bg-[#070a12] p-2.5 rounded font-mono text-amber-300 border border-slate-800">
                Z_i(t) = (Value_i(t) - Baseline_i) / σ_i
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowMathModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg text-xs font-semibold"
              >
                Close Documentation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
