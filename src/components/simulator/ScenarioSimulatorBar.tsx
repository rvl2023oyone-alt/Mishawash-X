import React, { useState } from 'react';
import { ScenarioPreset, CrewMember } from '../../types/telemetry';
import { Play, Sparkles, AlertTriangle, ShieldCheck, CheckCircle, Video, HelpCircle } from 'lucide-react';

interface ScenarioSimulatorBarProps {
  activeScenario: ScenarioPreset;
  onSelectScenario: (scenario: ScenarioPreset) => void;
  selectedCrew: CrewMember;
  onOpenVideoScriptGuide: () => void;
}

export const ScenarioSimulatorBar: React.FC<ScenarioSimulatorBarProps> = ({
  activeScenario,
  onSelectScenario,
  selectedCrew,
  onOpenVideoScriptGuide
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className="fixed bottom-3 left-4 right-4 z-40 max-w-5xl mx-auto">
      <div className="bg-[#0b0f19]/95 backdrop-blur-md border border-cyan-800/80 rounded-2xl p-3 shadow-2xl shadow-cyan-950/50 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Scenario description & info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Play className="w-4 h-4 fill-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Interactive Judges Demonstration Engine
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden md:inline">
                · Simulating {selectedCrew.name}
              </span>
            </div>
            <p className="text-xs text-slate-200">
              {activeScenario === 'nominal' && 'Nominal orbit: All 4 astronauts within personalized ±1.5σ baseline range.'}
              {activeScenario === 'fatigue_deconditioning' && 'Video Demo Preset: Resting HR creeps +12 bpm, sleep debt triggers compound alert.'}
              {activeScenario === 'post_eva_strain' && 'Operational Strain: Core temp and respiration rise post-EVA physical workload.'}
              {activeScenario === 'sensor_artifact' && 'Noise Rejection: PPG optical artifact detected; false alarm suppressed.'}
            </p>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-[#070a12] p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => onSelectScenario('nominal')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                activeScenario === 'nominal'
                  ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Nominal
            </button>
            <button
              onClick={() => onSelectScenario('fatigue_deconditioning')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                activeScenario === 'fatigue_deconditioning'
                  ? 'bg-amber-950 text-amber-300 font-bold border border-amber-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Fatigue Creep
            </button>
            <button
              onClick={() => onSelectScenario('post_eva_strain')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                activeScenario === 'post_eva_strain'
                  ? 'bg-blue-950 text-blue-300 font-bold border border-blue-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Post-EVA
            </button>
            <button
              onClick={() => onSelectScenario('sensor_artifact')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                activeScenario === 'sensor_artifact'
                  ? 'bg-purple-950 text-purple-300 font-bold border border-purple-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              4. Noise Test
            </button>
          </div>

          <button
            onClick={onOpenVideoScriptGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/50 text-cyan-300 text-xs font-semibold whitespace-nowrap transition-colors"
          >
            <Video className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">4-Min Pitch Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};
