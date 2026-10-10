/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ARTEMIS_CREW, generateTelemetryData } from './data/crewData';
import { CrewMember, ScenarioPreset } from './types/telemetry';
import { Header } from './components/common/Header';
import { MissionOverviewScreen } from './components/screens/MissionOverviewScreen';
import { BaselineScreen } from './components/screens/BaselineScreen';
import { EarlyWarningScreen } from './components/screens/EarlyWarningScreen';
import { MissionTimelineScreen } from './components/screens/MissionTimelineScreen';
import { ExplainableInsightsScreen } from './components/screens/ExplainableInsightsScreen';
import { DataProvenanceScreen } from './components/screens/DataProvenanceScreen';
import { ScenarioSimulatorBar } from './components/simulator/ScenarioSimulatorBar';
import { ClinicalReportModal } from './components/modals/ClinicalReportModal';
import { VideoScriptGuideModal } from './components/modals/VideoScriptGuideModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [selectedCrew, setSelectedCrew] = useState<CrewMember>(ARTEMIS_CREW[2]); // Christina Koch by default (great baseline example: 54 bpm)
  const [activeScenario, setActiveScenario] = useState<ScenarioPreset>('nominal');
  const [flightDay, setFlightDay] = useState<number>(16);

  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isVideoGuideOpen, setIsVideoGuideOpen] = useState<boolean>(false);

  // Generate telemetry reactive to crew & scenario
  const telemetry = useMemo(() => {
    return generateTelemetryData(selectedCrew, activeScenario, flightDay);
  }, [selectedCrew, activeScenario, flightDay]);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans pb-24 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Precision Aerospace Top Bar */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        selectedCrew={selectedCrew}
        onSelectCrew={setSelectedCrew}
        activeScenario={activeScenario}
        onSelectScenario={setActiveScenario}
        flightDay={flightDay}
      />

      {/* Main Workspace Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {currentTab === 'overview' && (
          <MissionOverviewScreen
            selectedCrew={selectedCrew}
            onSelectCrew={setSelectedCrew}
            vitals={telemetry.vitals}
            sleepHistory={telemetry.sleepHistory}
            alerts={telemetry.alerts}
            currentStatus={telemetry.currentStatus}
            flightDay={flightDay}
            activeScenario={activeScenario}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'baseline' && (
          <BaselineScreen
            selectedCrew={selectedCrew}
            vitals={telemetry.vitals}
            sleepHistory={telemetry.sleepHistory}
          />
        )}

        {currentTab === 'alerts' && (
          <EarlyWarningScreen
            selectedCrew={selectedCrew}
            alerts={telemetry.alerts}
            activeScenario={activeScenario}
            onSelectScenario={setActiveScenario}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'timeline' && (
          <MissionTimelineScreen
            selectedCrew={selectedCrew}
            flightDay={flightDay}
            onSelectFlightDay={setFlightDay}
          />
        )}

        {currentTab === 'insights' && (
          <ExplainableInsightsScreen
            selectedCrew={selectedCrew}
            vitals={telemetry.vitals}
            sleepHistory={telemetry.sleepHistory}
            alerts={telemetry.alerts}
            activeScenario={activeScenario}
          />
        )}

        {currentTab === 'data' && (
          <DataProvenanceScreen
            selectedCrew={selectedCrew}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}
      </main>

      {/* Docked Scenario Simulator & Video Script Demo Bar */}
      <ScenarioSimulatorBar
        activeScenario={activeScenario}
        onSelectScenario={setActiveScenario}
        selectedCrew={selectedCrew}
        onOpenVideoScriptGuide={() => setIsVideoGuideOpen(true)}
      />

      {/* Modals */}
      <ClinicalReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        selectedCrew={selectedCrew}
        vitals={telemetry.vitals}
        sleepHistory={telemetry.sleepHistory}
        alerts={telemetry.alerts}
        flightDay={flightDay}
      />

      <VideoScriptGuideModal
        isOpen={isVideoGuideOpen}
        onClose={() => setIsVideoGuideOpen(false)}
        onNavigateToTab={setCurrentTab}
        onSelectScenario={setActiveScenario}
      />
    </div>
  );
}
