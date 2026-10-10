import React from 'react';
import { CrewMember, ScenarioPreset } from '../../types/telemetry';
import { ARTEMIS_CREW } from '../../data/crewData';
import { Radio } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tabId: string) => void;
  selectedCrew: CrewMember;
  onSelectCrew: (crew: CrewMember) => void;
  activeScenario: ScenarioPreset;
  onSelectScenario: (scenario: ScenarioPreset) => void;
  flightDay: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  selectedCrew,
  onSelectCrew,
  activeScenario,
  onSelectScenario,
  flightDay
}) => {
  const tabs = [
    { id: 'overview', label: 'Mission Overview' },
    { id: 'baseline', label: 'Health Baseline' },
    { id: 'alerts', label: 'Early-Warning' },
    { id: 'timeline', label: 'Mission Timeline' },
    { id: 'insights', label: 'Explainable Insights' },
    { id: 'data', label: 'Data & Provenance' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-md border-b border-cyan-900/30 px-4 lg:px-8 py-3">
      {/* Primary Top Bar matching 3-zone contract */}
      <div className="flex items-center justify-between gap-6 max-w-7xl mx-auto">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTabChange('overview')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 border border-cyan-500/50 flex items-center justify-center text-cyan-300 font-mono font-extrabold text-sm tracking-wider shadow-lg shadow-cyan-950/60 group-hover:border-cyan-400 transition-colors">
              Æ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white whitespace-nowrap">
                  AETHER
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800 hidden sm:inline">
                  NASA SPACE APPS
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 whitespace-nowrap hidden lg:block">
                Astronaut Telemetry & Health Intelligence
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 text-xs font-medium">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-700/80 font-bold shadow-md shadow-cyan-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/70'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive Controls (Crew Switcher & Scenario Trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Astronaut Switcher with Avatar thumbnail */}
          <div className="flex items-center gap-2 bg-[#0b0f19] border border-slate-800 hover:border-slate-700 rounded-xl px-2.5 py-1.5 transition-colors">
            <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
              <img
                src={selectedCrew.avatarUrl}
                alt={selectedCrew.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <select
              value={selectedCrew.id}
              onChange={(e) => {
                const found = ARTEMIS_CREW.find(c => c.id === e.target.value);
                if (found) onSelectCrew(found);
              }}
              className="bg-transparent text-xs font-mono font-semibold text-cyan-300 focus:outline-none cursor-pointer border-none p-0 pr-1"
            >
              {ARTEMIS_CREW.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                  {c.name} ({c.role.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>

          {/* Scenario Simulation Selector */}
          <div className="hidden sm:flex items-center gap-1.5 bg-cyan-950/60 border border-cyan-800/80 rounded-xl px-2.5 py-1.5 shadow-sm">
            <span className="text-[10px] font-mono text-cyan-400 hidden xl:inline font-bold">SIM:</span>
            <select
              value={activeScenario}
              onChange={(e) => onSelectScenario(e.target.value as ScenarioPreset)}
              className="bg-transparent text-xs font-mono font-bold text-cyan-200 focus:outline-none cursor-pointer border-none p-0"
            >
              <option value="nominal" className="bg-slate-900 text-slate-200">
                Nominal Orbit (FD {flightDay})
              </option>
              <option value="fatigue_deconditioning" className="bg-slate-900 text-amber-300">
                Fatigue & HR Creep Demo
              </option>
              <option value="post_eva_strain" className="bg-slate-900 text-blue-300">
                Post-EVA Thermal Strain
              </option>
              <option value="sensor_artifact" className="bg-slate-900 text-purple-300">
                Sensor Noise Test
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Tab Scroller */}
      <div className="flex md:hidden overflow-x-auto gap-1.5 pt-2 pb-0.5 border-t border-slate-800/60 mt-2 text-xs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 text-xs font-medium ${
              currentTab === tab.id
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold'
                : 'text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
