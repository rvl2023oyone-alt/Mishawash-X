import React from 'react';
import { Video, CheckCircle2, Compass, Play, Sparkles } from 'lucide-react';
import { ScenarioPreset } from '../../types/telemetry';

interface VideoScriptGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tabId: string) => void;
  onSelectScenario: (scenario: ScenarioPreset) => void;
}

export const VideoScriptGuideModal: React.FC<VideoScriptGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
  onSelectScenario
}) => {
  if (!isOpen) return null;

  const scriptStages = [
    {
      timeRange: '0:00 – 0:45',
      sectionTitle: 'WHO — Mission & Crew Context',
      scriptGoal: 'Introduce AETHER, Artemis II lunar mission context, and crew biometrics.',
      appDemonstration: 'Mission Overview screen: View Orion habitat ECLSS, distance from Earth (348,720 km), real-time telemetry ribbon, and 4-astronaut crew switcher (Reid Wiseman, Victor Glover, Christina Koch, Jeremy Hansen).',
      targetTab: 'overview',
      preset: 'nominal' as ScenarioPreset
    },
    {
      timeRange: '0:45 – 1:45',
      sectionTitle: 'WHY — The Isolated Health Indicator Problem',
      scriptGoal: 'Show microgravity challenges: fluid shifts, circadian disruption, and why standard Earth clinical ranges (60–100 bpm) fail.',
      appDemonstration: 'My Health Baseline screen: Show Christina Koch\'s personal baseline (54 bpm). Checkbox "Show Population Standard" proves that at 71 bpm, hospital monitors mark her normal, but AETHER detects a +3.8σ divergence!',
      targetTab: 'baseline',
      preset: 'nominal' as ScenarioPreset
    },
    {
      timeRange: '1:45 – 2:45',
      sectionTitle: 'WHAT — Personal Baseline & Multi-Signal Correlation',
      scriptGoal: 'Demonstrate live detection when multiple indicators (HR creep + sleep debt + HRV drop) deviate simultaneously.',
      appDemonstration: 'Early-Warning Center: Trigger the "Fatigue & HR Creep" scenario. See compound alert trigger with 96.4% confidence, showing exact duration and deviation weights without black-box scores.',
      targetTab: 'alerts',
      preset: 'fatigue_deconditioning' as ScenarioPreset
    },
    {
      timeRange: '2:45 – 4:00',
      sectionTitle: 'SO WHAT NEXT — Explainable Action & NASA Provenance',
      scriptGoal: 'Prove scientific credibility, offline deep-space readiness, and actionable flight surgeon recommendations.',
      appDemonstration: 'Explainable Insights & Data Provenance: Review grounded telemetry Q&A, cite NASA LSDA & Bio-Monitor datasets, toggle lunar far-side offline mode, and download clinical audit summary.',
      targetTab: 'insights',
      preset: 'fatigue_deconditioning' as ScenarioPreset
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0b0f19] border border-cyan-800 rounded-2xl max-w-3xl w-full p-6 text-slate-100 flex flex-col gap-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                4-Minute Video Script & Judging Alignment Guide
              </h2>
              <div className="text-xs font-mono text-cyan-400">
                NASA Space Apps Challenge · How AETHER Maps to Your Pitch Script
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 font-mono text-base px-2"
          >
            ✕
          </button>
        </div>

        {/* Introduction */}
        <p className="text-xs text-slate-300 leading-relaxed">
          This prototype is architected specifically to match your 4-minute presentation video. Use the quick demonstration buttons below to jump directly to each segment during your screen-recording or live demo:
        </p>

        {/* 4 Stages */}
        <div className="space-y-3">
          {scriptStages.map((stage, i) => (
            <div
              key={i}
              className="bg-[#070a12] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800 font-bold">
                    {stage.timeRange}
                  </span>
                  <h3 className="text-xs font-bold text-slate-100">
                    {stage.sectionTitle}
                  </h3>
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong>Script Goal:</strong> {stage.scriptGoal}
                </div>
                <div className="text-xs text-slate-200">
                  <strong>App Demo:</strong> {stage.appDemonstration}
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectScenario(stage.preset);
                  onNavigateToTab(stage.targetTab);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-semibold whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Jump to Demo</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>AETHER: Astronaut Enhanced Telemetry & Health Evaluation Resource</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
