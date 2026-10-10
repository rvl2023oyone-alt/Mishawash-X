import React from 'react';
import { SleepRecord } from '../../types/telemetry';

interface SleepHypnogramProps {
  sleepHistory: SleepRecord[];
  astronautName: string;
}

export const SleepHypnogram: React.FC<SleepHypnogramProps> = ({
  sleepHistory,
  astronautName
}) => {
  if (!sleepHistory || sleepHistory.length === 0) return null;

  const latestSleep = sleepHistory[sleepHistory.length - 1];
  const baselineDur = latestSleep.baselineDurationHours;
  const isSleepDeficit = latestSleep.totalDurationHours < baselineDur - 1.0;

  // 14-day chart calculations
  const maxBarHeight = 110;
  const maxHours = 9.0;

  return (
    <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-5 flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 tracking-wide">
            Sleep Architecture & Multi-Day Debt Tracking
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Microgravity sleep structure monitored via actigraphy and nocturnal autonomic ECG.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Baseline Target:</span>
          <span className="text-cyan-400 font-bold">{baselineDur.toFixed(1)} hrs/night</span>
        </div>
      </div>

      {/* Stage Breakdown for Last Sleep Period */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#070a12] p-3.5 rounded-lg border border-slate-800/60">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Wake / Awakenings</span>
          </div>
          <div className="text-base font-mono font-bold text-slate-200 tabular-nums">
            {latestSleep.wakePct}%
            <span className="text-xs font-normal text-slate-400 ml-1.5">
              ({((latestSleep.totalDurationHours * latestSleep.wakePct) / 100).toFixed(1)}h)
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>REM (Dream / Cognitive)</span>
          </div>
          <div className="text-base font-mono font-bold text-purple-300 tabular-nums">
            {latestSleep.remSleepPct}%
            <span className="text-xs font-normal text-slate-400 ml-1.5">
              ({((latestSleep.totalDurationHours * latestSleep.remSleepPct) / 100).toFixed(1)}h)
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Light Sleep (N1 / N2)</span>
          </div>
          <div className="text-base font-mono font-bold text-cyan-300 tabular-nums">
            {latestSleep.lightSleepPct}%
            <span className="text-xs font-normal text-slate-400 ml-1.5">
              ({((latestSleep.totalDurationHours * latestSleep.lightSleepPct) / 100).toFixed(1)}h)
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Deep Sleep (Slow-Wave)</span>
          </div>
          <div className={`text-base font-mono font-bold tabular-nums ${latestSleep.deepSleepPct < 14 ? 'text-amber-400' : 'text-blue-300'}`}>
            {latestSleep.deepSleepPct}%
            <span className="text-xs font-normal text-slate-400 ml-1.5">
              ({((latestSleep.totalDurationHours * latestSleep.deepSleepPct) / 100).toFixed(1)}h)
            </span>
          </div>
        </div>
      </div>

      {/* Visual Sleep Hypnogram Stage Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Hypnogram Stage Timeline (FD {latestSleep.flightDay} Nocturnal Period)</span>
          <span className="font-mono text-slate-300">
            Total Sleep: <strong className="text-cyan-400">{latestSleep.totalDurationHours} hrs</strong> (Efficiency: {latestSleep.sleepEfficiencyPct}%)
          </span>
        </div>

        {/* Stacked bar representing proportional stages */}
        <div className="w-full h-8 rounded-lg overflow-hidden flex bg-slate-900 border border-slate-800">
          <div
            style={{ width: `${latestSleep.deepSleepPct}%` }}
            className="h-full bg-blue-600 flex items-center justify-center text-[10px] font-mono text-white font-medium"
            title={`Deep Sleep: ${latestSleep.deepSleepPct}%`}
          >
            Deep {latestSleep.deepSleepPct}%
          </div>
          <div
            style={{ width: `${latestSleep.lightSleepPct}%` }}
            className="h-full bg-cyan-500/80 flex items-center justify-center text-[10px] font-mono text-slate-950 font-medium"
            title={`Light Sleep: ${latestSleep.lightSleepPct}%`}
          >
            Light {latestSleep.lightSleepPct}%
          </div>
          <div
            style={{ width: `${latestSleep.remSleepPct}%` }}
            className="h-full bg-purple-600 flex items-center justify-center text-[10px] font-mono text-white font-medium"
            title={`REM: ${latestSleep.remSleepPct}%`}
          >
            REM {latestSleep.remSleepPct}%
          </div>
          <div
            style={{ width: `${latestSleep.wakePct}%` }}
            className="h-full bg-rose-500/80 flex items-center justify-center text-[10px] font-mono text-white font-medium"
            title={`Wake: ${latestSleep.wakePct}%`}
          >
            Wake
          </div>
        </div>
      </div>

      {/* 14-Day Sleep Duration Trend Bar Chart with Baseline Line */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/60">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-medium">14-Day Sleep Duration vs. Personal Baseline</span>
          {isSleepDeficit && (
            <span className="text-amber-400 font-mono text-xs">
              Accumulated Sleep Deficit Detected
            </span>
          )}
        </div>

        <div className="relative h-32 w-full pt-4 pb-6 flex items-end justify-between gap-1 sm:gap-2">
          {/* Baseline reference guideline */}
          <div
            className="absolute left-0 right-0 border-t border-dashed border-cyan-400 z-10 pointer-events-none"
            style={{
              bottom: `${(baselineDur / maxHours) * maxBarHeight + 24}px`
            }}
          >
            <span className="absolute right-0 -top-4 text-[10px] font-mono text-cyan-400 bg-[#0b0f19] px-1">
              Baseline ({baselineDur}h)
            </span>
          </div>

          {sleepHistory.map((rec) => {
            const barHeight = Math.max(12, (rec.totalDurationHours / maxHours) * maxBarHeight);
            const isBelowBaseline = rec.totalDurationHours < baselineDur - 1.0;

            return (
              <div key={rec.flightDay} className="flex-1 flex flex-col items-center group relative">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-200 px-2 py-0.5 rounded shadow pointer-events-none z-20 whitespace-nowrap">
                  {rec.dateStr}: {rec.totalDurationHours} hrs
                </div>

                {/* The Bar */}
                <div
                  style={{ height: `${barHeight}px` }}
                  className={`w-full max-w-[28px] rounded-t transition-all ${
                    isBelowBaseline
                      ? 'bg-amber-500/80 hover:bg-amber-400'
                      : 'bg-cyan-600/70 hover:bg-cyan-400'
                  }`}
                />

                {/* Day label */}
                <span className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                  {rec.dateStr.replace('FD ', 'D')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
