import React from 'react';
import { CrewMember, VitalTelemetryPoint, SleepRecord, EarlyWarningAlert, ScenarioPreset } from '../../types/telemetry';
import { ARTEMIS_CREW } from '../../data/crewData';
import { BaselineBandChart } from '../charts/BaselineBandChart';
import { EcgWaveform } from '../common/EcgWaveform';
import { RadialGauge } from '../common/RadialGauge';
import { IMAGES } from '../../assets/images';
import { Activity, Heart, Moon, ShieldCheck, AlertTriangle, Compass, Thermometer, Wind, Radio, Orbit, Clock } from 'lucide-react';

interface MissionOverviewScreenProps {
  selectedCrew: CrewMember;
  onSelectCrew: (crew: CrewMember) => void;
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
  flightDay: number;
  activeScenario: ScenarioPreset;
  onNavigateToTab: (tabId: string) => void;
}

export const MissionOverviewScreen: React.FC<MissionOverviewScreenProps> = ({
  selectedCrew,
  onSelectCrew,
  vitals,
  sleepHistory,
  alerts,
  currentStatus,
  flightDay,
  activeScenario,
  onNavigateToTab
}) => {
  const currentVital = vitals[vitals.length - 1];
  const latestSleep = sleepHistory[sleepHistory.length - 1];

  // Calculate quick deviations
  const hrDelta = Math.round((currentVital.heartRate - currentVital.heartRateBaselineMean) * 10) / 10;
  const isHrElevated = hrDelta > 3.5;
  const sleepDelta = Math.round((latestSleep.totalDurationHours - latestSleep.baselineDurationHours) * 10) / 10;

  return (
    <div className="flex flex-col gap-6">
      {/* Cinematic Orion Flight Deck Viewport Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-800/60 shadow-2xl shadow-cyan-950/40 bg-slate-950">
        {/* Background Image with Ambient Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.artemisCabin}
            alt="Orion Artemis Flight Deck"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 brightness-75 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090e]/90 via-transparent to-[#07090e]/90" />
        </div>

        {/* Foreground Telemetry HUD Overlay */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between min-h-[260px] gap-6">
          {/* Top Aerospace Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center font-mono font-bold text-cyan-300 text-base shadow-lg shadow-cyan-950/60">
                Δ2
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-800/80">
                    NASA ARTEMIS II · ORION SPACECRAFT
                  </span>
                  <span className="text-xs font-mono text-slate-300 hidden sm:inline">
                    Translunar Injection Complete
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5 drop-shadow">
                  Lunar Trajectory Telemetry & Health Intelligence
                </h1>
              </div>
            </div>

            {/* Live Deep Space Network Link Indicator */}
            <div className="flex items-center gap-3 bg-[#070a12]/80 backdrop-blur border border-slate-800/80 px-3.5 py-2 rounded-xl text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-emerald-300 font-semibold">DSN Goldstone 70m</span>
              </div>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">MET: FD {flightDay.toString().padStart(2, '0')}:14:22:08</span>
            </div>
          </div>

          {/* Center 4-Metric Orbital HUD Strip (Distance, Velocity, Time to Periapsis, ECLSS) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-[#070a12]/85 backdrop-blur-md border border-cyan-900/40 rounded-xl p-4 shadow-xl">
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Orbit className="w-3 h-3 text-cyan-400" />
                <span>Earth-Moon Distance</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white tabular-nums mt-1">
                348,720 <span className="text-xs font-normal text-slate-400">km</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-400 mt-0.5">88.4% of translunar transit</div>
            </div>

            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span>Translunar Velocity</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white tabular-nums mt-1">
                1.42 <span className="text-xs font-normal text-slate-400">km/s</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">Relative to lunar barycenter</div>
            </div>

            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>Countdown to Far-Side Periapsis</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white tabular-nums mt-1">
                122:14:00
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">T-minus closest approach</div>
            </div>

            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-emerald-400" />
                <span>Habitat Atmosphere</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white tabular-nums mt-1">
                101.3 <span className="text-xs font-normal text-slate-400">kPa</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">21.2% O2 · CO2 3,400 ppm</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Physiological Status Banner */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
          currentStatus.state === 'caution'
            ? 'bg-amber-950/30 border-amber-500/70 text-amber-200 shadow-lg shadow-amber-950/30 ring-1 ring-amber-500/30'
            : currentStatus.state === 'advisory'
            ? 'bg-blue-950/30 border-blue-500/60 text-blue-200 shadow-lg shadow-blue-950/30'
            : 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200 shadow-lg shadow-emerald-950/30'
        }`}
      >
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 mt-0.5">
            {currentStatus.state === 'caution' ? (
              <AlertTriangle className="w-6 h-6 text-amber-400 animate-pulse" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest font-bold">
                {currentStatus.label}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                · Telemetry Confidence: <strong className="text-cyan-400">{currentStatus.confidence}%</strong>
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {currentStatus.headline}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {currentStatus.deltaSummary}
            </p>
          </div>
        </div>

        {currentStatus.state !== 'nominal' && (
          <button
            onClick={() => onNavigateToTab('alerts')}
            className="px-4 py-2 rounded-xl bg-amber-500/25 hover:bg-amber-500/40 border border-amber-500/60 text-amber-300 text-xs font-semibold whitespace-nowrap transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Review Multi-Signal Alert</span>
            <span>→</span>
          </button>
        )}
      </div>

      {/* Artemis II Crew Biometric Telemetry Roster */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Artemis II Flight Crew Biometric Status</span>
          </h3>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Click astronaut to switch personal telemetry & baseline model
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ARTEMIS_CREW.map((member) => {
            const isSelected = member.id === selectedCrew.id;
            const isCrewElevated = isSelected && isHrElevated;

            return (
              <button
                key={member.id}
                onClick={() => onSelectCrew(member)}
                className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#0f172a] border-cyan-400 shadow-xl shadow-cyan-950/50 ring-1 ring-cyan-400/50'
                    : 'bg-[#0b0f19] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Active selection corner badge */}
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 font-mono font-bold text-[9px] px-2 py-0.5 rounded-bl">
                    MONITORED
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden shrink-0 flex items-center justify-center font-mono font-bold text-xs text-cyan-300">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-100 truncate">{member.name}</div>
                    <div className="text-[10px] text-cyan-400 font-mono truncate">{member.role}</div>
                  </div>
                </div>

                {/* Vitals snapshot */}
                <div className="grid grid-cols-3 gap-1 pt-2.5 border-t border-slate-800/80 text-[11px] font-mono">
                  <div>
                    <span className="text-[9px] text-slate-400 block">BASE HR</span>
                    <span className="font-semibold text-slate-300">{member.baseline.restingHeartRate} bpm</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">CURR HR</span>
                    <span className={`font-bold ${isSelected && isCrewElevated ? 'text-amber-400' : 'text-slate-100'}`}>
                      {isSelected ? currentVital.heartRate : member.baseline.restingHeartRate + 2} bpm
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">SLEEP</span>
                    <span className="font-semibold text-slate-300">{member.baseline.sleepDuration}h</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Crew Biometric Matrix (5 Vital Tiles + Live ECG Waveform) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Heart Rate Tile with Real-Time Oscilloscope Waveform */}
        <div className="bg-[#0b0f19] border border-cyan-900/40 rounded-2xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
              <span className="font-medium text-slate-200">Resting Heart Rate</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">ECG Lead I</span>
          </div>

          <div className="my-1">
            <div className="text-3xl font-mono font-extrabold text-slate-100 tabular-nums">
              {currentVital.heartRate} <span className="text-xs font-normal text-slate-400">bpm</span>
            </div>
            <div className={`text-xs font-mono mt-1 ${isHrElevated ? 'text-amber-400 font-semibold' : 'text-emerald-400'}`}>
              {hrDelta > 0 ? `+${hrDelta}` : hrDelta} bpm vs Personal Baseline
            </div>
          </div>

          {/* Live ECG Oscilloscope Strip */}
          <div className="mt-2 pt-2 border-t border-slate-800/80">
            <EcgWaveform
              bpm={currentVital.heartRate}
              color={isHrElevated ? '#f59e0b' : '#06b6d4'}
              height={34}
            />
          </div>
        </div>

        {/* Autonomic HRV Tile */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="font-medium text-slate-200">Autonomic HRV</span>
            </div>
            <span className="text-[10px] font-mono text-purple-400">rMSSD</span>
          </div>

          <div className="my-1">
            <div className="text-3xl font-mono font-extrabold text-purple-200 tabular-nums">
              {currentVital.hrvRmssd} <span className="text-xs font-normal text-slate-400">ms</span>
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1">
              Parasympathetic tone: {currentVital.hrvRmssd < 35 ? 'Suppressed' : 'Robust'}
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800/80">
            Personal Baseline: {selectedCrew.baseline.hrvRmssd} ms
          </div>
        </div>

        {/* Sleep Duration Tile */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-cyan-400" />
              <span className="font-medium text-slate-200">Last Sleep Period</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">Actigraphy</span>
          </div>

          <div className="my-1">
            <div className="text-3xl font-mono font-extrabold text-slate-100 tabular-nums">
              {latestSleep.totalDurationHours} <span className="text-xs font-normal text-slate-400">hrs</span>
            </div>
            <div className={`text-xs font-mono mt-1 ${sleepDelta < -1.0 ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}>
              {sleepDelta > 0 ? `+${sleepDelta}` : sleepDelta} hrs vs Target ({selectedCrew.baseline.sleepDuration}h)
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800/80">
            Slow-Wave Deep Sleep: {latestSleep.deepSleepPct}%
          </div>
        </div>

        {/* Blood Oxygen SpO2 Tile */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-emerald-400" />
              <span className="font-medium text-slate-200">Blood Oxygen</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">SpO2 PPG</span>
          </div>

          <div className="my-1">
            <div className="text-3xl font-mono font-extrabold text-emerald-300 tabular-nums">
              {currentVital.spo2} <span className="text-xs font-normal text-slate-400">%</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 mt-1">
              Oxygen saturation nominal
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800/80">
            Bio-Monitor Optical Sensor
          </div>
        </div>

        {/* Core Body Temp Tile */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <span className="font-medium text-slate-200">Core Body Temp</span>
            </div>
            <span className="text-[10px] font-mono text-amber-400">Double Sensor</span>
          </div>

          <div className="my-1">
            <div className="text-3xl font-mono font-extrabold text-slate-100 tabular-nums">
              {currentVital.coreTemp} <span className="text-xs font-normal text-slate-400">°C</span>
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1">
              Circadian rhythm phase intact
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800/80">
            Baseline: {selectedCrew.baseline.coreTemp} °C
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

      {/* Orion Cabin Environmental Gauges Strip (Inspired by Kernel360 Spacesuit Telemetry) */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-100 tracking-wide">
              Orion Cabin Environmental Life Support Gauges
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Environmental telemetry co-factors recorded by Orion ECLSS and Space Radiation Analysis Group (SRAG).
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-2.5 py-1 rounded">
            ECLSS Nominal
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <RadialGauge
            value={101.3}
            min={80}
            max={120}
            unit="kPa"
            label="Cabin Pressure"
            statusLabel="1.0 ATM (NOMINAL)"
            color="#06b6d4"
          />
          <RadialGauge
            value={22.4}
            min={15}
            max={30}
            unit="°C"
            label="Ambient Temp"
            statusLabel="THERMAL EQUILIBRIUM"
            color="#38bdf8"
          />
          <RadialGauge
            value={3400}
            min={1000}
            max={8000}
            unit="ppm"
            label="Ambient CO2"
            statusLabel="SCRUBBER CYCLE ACTIVE"
            color="#f59e0b"
          />
          <RadialGauge
            value={0.06}
            min={0}
            max={0.5}
            unit="μSv/h"
            label="Radiation Dosimeter"
            statusLabel="CISLUNAR FLUX NOMINAL"
            color="#a855f7"
          />
        </div>
      </div>
    </div>
  );
};
