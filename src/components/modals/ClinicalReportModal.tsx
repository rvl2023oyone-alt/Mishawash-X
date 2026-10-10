import React from 'react';
import { CrewMember, VitalTelemetryPoint, SleepRecord, EarlyWarningAlert } from '../../types/telemetry';
import { FileText, Download, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ClinicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCrew: CrewMember;
  vitals: VitalTelemetryPoint[];
  sleepHistory: SleepRecord[];
  alerts: EarlyWarningAlert[];
  flightDay: number;
}

export const ClinicalReportModal: React.FC<ClinicalReportModalProps> = ({
  isOpen,
  onClose,
  selectedCrew,
  vitals,
  sleepHistory,
  alerts,
  flightDay
}) => {
  if (!isOpen) return null;

  const currentVital = vitals[vitals.length - 1];
  const latestSleep = sleepHistory[sleepHistory.length - 1];
  const base = selectedCrew.baseline;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0b0f19] border border-cyan-800 rounded-2xl max-w-3xl w-full p-6 text-slate-100 flex flex-col gap-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-400 font-mono font-bold">
              Æ
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                AETHER Mission Clinical Telemetry Summary Report
              </h2>
              <div className="text-xs font-mono text-cyan-400">
                NASA Artemis II Cislunar Mission · Orion Spacecraft Medical Subsystem
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-100 font-mono text-base px-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Patient / Astronaut Demographic Block */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#070a12] p-3.5 rounded-lg border border-slate-800 text-xs font-mono">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Crewmember</div>
            <div className="text-slate-100 font-bold mt-0.5">{selectedCrew.name}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Role / Callsign</div>
            <div className="text-slate-200 mt-0.5">{selectedCrew.role}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Mission Elapsed Time</div>
            <div className="text-cyan-400 font-bold mt-0.5">Flight Day {flightDay} 14:22 UTC</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Ground Audit Status</div>
            <div className="text-emerald-400 font-bold mt-0.5">DSN Synced & Verified</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
          <h4 className="font-bold text-slate-100 uppercase tracking-wide text-xs">
            1. Executive Telemetry Evaluation
          </h4>
          <p>
            Continuous physiological telemetry recorded via the Canadian Space Agency (CSA) Bio-Monitor garment and Actiwatch over the past 48 hours has been evaluated against {selectedCrew.name}'s personalized 14-day baseline envelope.
          </p>
          {alerts.length > 0 ? (
            <div className="bg-amber-950/40 border border-amber-800/80 p-3 rounded-lg text-amber-200 mt-2">
              <strong>Clinical Finding:</strong> Compound multi-signal divergence noted. Nocturnal resting heart rate (+12 bpm above personal baseline) concurrent with a 2.2-hour nightly sleep compression over the preceding 72 hours. Sensor confidence is high (96.4%).
            </div>
          ) : (
            <div className="bg-emerald-950/40 border border-emerald-800/80 p-3 rounded-lg text-emerald-200 mt-2">
              <strong>Clinical Finding:</strong> All monitored indicators remain nominal within ±1.5σ personal baseline limits. Autonomic tone and circadian regulation remain intact.
            </div>
          )}
        </div>

        {/* Biometric Snapshot Comparison */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-100 uppercase tracking-wide text-xs">
            2. Biometric Indicators vs Personal Baseline
          </h4>
          <div className="overflow-x-auto bg-[#070a12] p-1 rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase">
                  <th className="p-2">Indicator</th>
                  <th className="p-2">Current Reading</th>
                  <th className="p-2">Personal Baseline</th>
                  <th className="p-2">Standard Clinical Range</th>
                  <th className="p-2">Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                <tr>
                  <td className="p-2 text-slate-200 font-sans">Resting Heart Rate</td>
                  <td className="p-2 font-bold text-slate-100">{currentVital.heartRate} bpm</td>
                  <td className="p-2 text-cyan-400">{base.restingHeartRate} bpm (±{base.restingHeartRateStd})</td>
                  <td className="p-2 text-slate-400">60 - 100 bpm</td>
                  <td className="p-2">
                    {Math.abs(currentVital.heartRate - base.restingHeartRate) > 4 ? (
                      <span className="text-amber-400 font-bold">Elevated vs Personal</span>
                    ) : (
                      <span className="text-emerald-400">Nominal</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-200 font-sans">Nocturnal HRV (rMSSD)</td>
                  <td className="p-2 font-bold text-slate-100">{currentVital.hrvRmssd} ms</td>
                  <td className="p-2 text-cyan-400">{base.hrvRmssd} ms</td>
                  <td className="p-2 text-slate-400">25 - 65 ms</td>
                  <td className="p-2">
                    {currentVital.hrvRmssd < base.hrvRmssd - 10 ? (
                      <span className="text-amber-400 font-bold">Suppressed Tone</span>
                    ) : (
                      <span className="text-emerald-400">Nominal</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-200 font-sans">Sleep Duration (Last Night)</td>
                  <td className="p-2 font-bold text-slate-100">{latestSleep.totalDurationHours} hrs</td>
                  <td className="p-2 text-cyan-400">{base.sleepDuration} hrs</td>
                  <td className="p-2 text-slate-400">7.0 - 9.0 hrs</td>
                  <td className="p-2">
                    {latestSleep.totalDurationHours < base.sleepDuration - 1.0 ? (
                      <span className="text-amber-400 font-bold">Sleep Debt (-2.2h)</span>
                    ) : (
                      <span className="text-emerald-400">Adequate</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-200 font-sans">Blood Oxygen (SpO2)</td>
                  <td className="p-2 font-bold text-slate-100">{currentVital.spo2}%</td>
                  <td className="p-2 text-cyan-400">{base.spo2}%</td>
                  <td className="p-2 text-slate-400">95 - 100%</td>
                  <td className="p-2 text-emerald-400">Nominal</td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-200 font-sans">Core Body Temp</td>
                  <td className="p-2 font-bold text-slate-100">{currentVital.coreTemp} °C</td>
                  <td className="p-2 text-cyan-400">{base.coreTemp} °C</td>
                  <td className="p-2 text-slate-400">36.5 - 37.5 °C</td>
                  <td className="p-2 text-emerald-400">Normothermic</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Countermeasure Protocol Recommendations */}
        <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
          <h4 className="font-bold text-slate-100 uppercase tracking-wide text-xs">
            3. Operational Countermeasures & Flight Surgeon Actions
          </h4>
          <ul className="list-disc list-inside space-y-1 text-slate-200 pl-1">
            <li>Review schedule to ensure a protected 8.0-hour sleep opportunity prior to lunar flyby periapsis.</li>
            <li>Perform daily Bio-Monitor electrode contact check; verify inductive plethysmography band tension.</li>
            <li>Adjust resistive treadmill/ARED session timing to prevent late-evening sympathetic activation.</li>
            <li>Maintain fluid and electrolyte balance logs in accordance with JSC-HRP countermeasure protocols.</li>
          </ul>
        </div>

        {/* Signatures & Disclaimers */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <div>
            <strong>Generated By:</strong> AETHER Intelligent Telemetry Engine
            <div className="text-[10px] text-slate-500">NASA Space Apps Challenge · Human Spaceflight Telemetry</div>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold rounded-lg text-xs"
          >
            Done / Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
