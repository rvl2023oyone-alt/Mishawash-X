import React, { useState } from 'react';
import { CrewMember, MissionEvent } from '../../types/telemetry';
import { MISSION_EVENTS } from '../../data/crewData';
import { IMAGES } from '../../assets/images';
import { Compass, Clock, Radio, Activity, Orbit, AlertCircle } from 'lucide-react';

interface MissionTimelineScreenProps {
  selectedCrew: CrewMember;
  flightDay: number;
  onSelectFlightDay?: (day: number) => void;
}

export const MissionTimelineScreen: React.FC<MissionTimelineScreenProps> = ({
  selectedCrew,
  flightDay
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(MISSION_EVENTS[4].id); // default to Event 5 (Lunar Far-Side Periapsis)

  const activeEvent = MISSION_EVENTS.find(e => e.id === selectedEventId) || MISSION_EVENTS[0];

  const beforeAfterMetrics = [
    {
      metric: 'Resting Heart Rate',
      before: `${selectedCrew.baseline.restingHeartRate} bpm`,
      after: `${selectedCrew.baseline.restingHeartRate + 11} bpm`,
      delta: '+11 bpm',
      status: 'Elevated'
    },
    {
      metric: 'Nocturnal Sleep Duration',
      before: `${selectedCrew.baseline.sleepDuration} hrs`,
      after: '5.1 hrs',
      delta: '-2.2 hrs',
      status: 'Compacted'
    },
    {
      metric: 'Autonomic HRV (rMSSD)',
      before: `${selectedCrew.baseline.hrvRmssd} ms`,
      after: `${Math.round(selectedCrew.baseline.hrvRmssd * 0.65)} ms`,
      delta: '-35%',
      status: 'Suppressed'
    },
    {
      metric: 'Cabin Ambient CO2',
      before: '3,200 ppm',
      after: `${activeEvent.environmentalFactors.co2Ppm} ppm`,
      delta: '+1,400 ppm',
      status: 'Transient Rise'
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner with Lunar Window Backdrop */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-800/60 shadow-2xl bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.lunarOrbit}
            alt="Lunar Surface View from Orion Window"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090e]/90 via-transparent to-[#07090e]/90" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                ORION FLIGHT TRAJECTORY
              </span>
              <span className="text-xs font-mono text-slate-300">
                Lunar Free-Return Orbit
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
              Mission Timeline & Environmental Telemetry
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Synchronize crew cardiovascular deconditioning, circadian shifts, and metabolic fatigue directly against spacecraft propulsion burns, radiation belt crossings, and ECLSS filter cycles.
            </p>
          </div>

          <div className="bg-[#070a12]/80 backdrop-blur border border-slate-800 p-3 rounded-xl text-xs font-mono text-slate-200 shrink-0">
            <div>Current Mission MET: <strong className="text-cyan-400">FD {flightDay} 14:22 UTC</strong></div>
            <div className="text-[10px] text-slate-400 mt-0.5">Orbit Stage: Translunar Coast Phase 2</div>
          </div>
        </div>
      </div>

      {/* Interactive Milestone Cards */}
      <div className="bg-[#0b0f19] border border-cyan-900/40 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Key Mission Milestones & Environmental Transients
          </h3>
          <span className="text-xs text-slate-400">Select event to inspect ±48h physiological shifts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {MISSION_EVENTS.map((evt) => {
            const isSelected = evt.id === selectedEventId;
            return (
              <button
                key={evt.id}
                onClick={() => setSelectedEventId(evt.id)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#0f172a] border-cyan-400 shadow-xl shadow-cyan-950/50 ring-1 ring-cyan-400'
                    : 'bg-[#070a12] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 font-mono font-bold text-[8px] px-1.5 py-0.5 rounded-bl">
                    SELECTED
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className="text-cyan-400 font-bold">{evt.timeLabel}</span>
                    <span className="uppercase text-slate-400 text-[9px]">{evt.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 leading-snug line-clamp-2">
                    {evt.title}
                  </h4>
                </div>

                <div className="pt-2.5 mt-3 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
                  CO2: {evt.environmentalFactors.co2Ppm} ppm · Rad: {evt.environmentalFactors.radiationMicroSvHour} μSv/h
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Event Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Event Details */}
        <div className="bg-[#0b0f19] border border-cyan-900/40 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Milestone Deep Dive</span>
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-1">
              {activeEvent.title}
            </h3>
            <span className="text-xs font-mono text-cyan-400/90 block mb-3">
              Timestamp: {activeEvent.timeLabel} UTC
            </span>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {activeEvent.description}
            </p>

            {/* Environmental Conditions Box */}
            <div className="bg-[#070a12] p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
                Orion Habitat Telemetry at Event
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cabin Pressure:</span>
                <span className="text-slate-200">{activeEvent.environmentalFactors.cabinPressureKpa} kPa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ambient CO2:</span>
                <span className="text-amber-400">{activeEvent.environmentalFactors.co2Ppm} ppm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Radiation Rate:</span>
                <span className="text-cyan-400">{activeEvent.environmentalFactors.radiationMicroSvHour} μSv/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cabin Temp:</span>
                <span className="text-slate-200">{activeEvent.environmentalFactors.ambientTempCel} °C</span>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            <strong>Crew Response Summary:</strong> {activeEvent.impactSummary}
          </div>
        </div>

        {/* Right: Before-and-After Physiological Matrix */}
        <div className="lg:col-span-2 bg-[#0b0f19] border border-cyan-900/40 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  Before vs. After Physiological Shift Analysis (±48 Hours)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Astronaut: {selectedCrew.name}
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800 font-semibold">
                Net Delta
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                    <th className="pb-2.5 font-medium">Biometric Indicator</th>
                    <th className="pb-2.5 font-medium">48h Prior (Pre-Event)</th>
                    <th className="pb-2.5 font-medium">48h Post (Post-Event)</th>
                    <th className="pb-2.5 font-medium">Net Shift (Δ)</th>
                    <th className="pb-2.5 font-medium">Evaluation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {beforeAfterMetrics.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-900/40">
                      <td className="py-3.5 font-sans font-medium text-slate-200">{item.metric}</td>
                      <td className="py-3.5 text-slate-400">{item.before}</td>
                      <td className="py-3.5 font-bold text-slate-100">{item.after}</td>
                      <td className="py-3.5">
                        <span className="text-amber-400 font-bold">{item.delta}</span>
                      </td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-1 rounded text-[10px] bg-slate-900 border border-slate-800 text-slate-200 font-semibold">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#070a12] p-4 rounded-xl border border-slate-800 mt-4 text-xs text-slate-300">
            <strong>Aerospace Medical Insight:</strong> The {activeEvent.title} induced a measurable shift in cardiovascular resting tone and sleep stage architecture. AETHER allows researchers to confirm that the cardiovascular elevation was temporally tied to the mission event rather than an acute infectious or pathological onset.
          </div>
        </div>
      </div>
    </div>
  );
};
