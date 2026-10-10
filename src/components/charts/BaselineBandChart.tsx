import React, { useState } from 'react';
import { VitalTelemetryPoint } from '../../types/telemetry';

interface BaselineBandChartProps {
  data: VitalTelemetryPoint[];
  metricLabel?: string;
  unit?: string;
  populationRange?: { min: number; max: number; label: string };
  astronautName: string;
}

export const BaselineBandChart: React.FC<BaselineBandChartProps> = ({
  data,
  metricLabel = 'Resting Heart Rate',
  unit = 'bpm',
  populationRange = { min: 60, max: 100, label: 'Earth Hospital Standard (60–100 bpm)' },
  astronautName
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showPopulationRange, setShowPopulationRange] = useState<boolean>(true);
  const [selectedMetric, setSelectedMetric] = useState<'hr' | 'hrv' | 'spo2' | 'temp'>('hr');

  if (!data || data.length === 0) return null;

  // Chart layout dimensions
  const width = 880;
  const height = 300;
  const padding = { top: 28, right: 36, bottom: 42, left: 56 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Metric extraction helper
  const getMetricData = (d: VitalTelemetryPoint) => {
    switch (selectedMetric) {
      case 'hrv':
        return { val: d.hrvRmssd, upper: 65, lower: 35, mean: 48, label: 'Autonomic HRV', u: 'ms' };
      case 'spo2':
        return { val: d.spo2, upper: 99.5, lower: 97.0, mean: 98.4, label: 'Blood Oxygen', u: '%' };
      case 'temp':
        return { val: d.coreTemp, upper: 37.1, lower: 36.5, mean: 36.8, label: 'Core Temp', u: '°C' };
      case 'hr':
      default:
        return { val: d.heartRate, upper: d.heartRateBaselineUpper, lower: d.heartRateBaselineLower, mean: d.heartRateBaselineMean, label: 'Heart Rate', u: 'bpm' };
    }
  };

  const metricConfig = getMetricData(data[0]);

  // Find min and max for scaling
  const allValues = data.flatMap(d => {
    const m = getMetricData(d);
    return [m.val, m.upper, m.lower];
  });
  if (selectedMetric === 'hr' && showPopulationRange && populationRange) {
    allValues.push(populationRange.min, populationRange.max);
  }
  const minVal = Math.floor(Math.min(...allValues) / 5) * 5 - (selectedMetric === 'temp' ? 0.5 : 5);
  const maxVal = Math.ceil(Math.max(...allValues) / 5) * 5 + (selectedMetric === 'temp' ? 0.5 : 5);
  const rangeVal = maxVal - minVal || 1;

  const getX = (index: number) => padding.left + (index / (data.length - 1)) * plotWidth;
  const getY = (val: number) => padding.top + plotHeight - ((val - minVal) / rangeVal) * plotHeight;

  // Construct SVG polygon points for the shaded baseline band (Upper -> Lower)
  const bandPointsUpper = data.map((d, i) => `${getX(i)},${getY(getMetricData(d).upper)}`);
  const bandPointsLower = [...data].reverse().map((d, i) => {
    const origIdx = data.length - 1 - i;
    return `${getX(origIdx)},${getY(getMetricData(d).lower)}`;
  });
  const baselineBandPath = `${bandPointsUpper.join(' ')} ${bandPointsLower.join(' ')}`;

  // Construct actual telemetry polyline
  const telemetryPath = data.map((d, i) => `${getX(i)},${getY(getMetricData(d).val)}`).join(' ');

  // Baseline Mean polyline
  const baselineMeanPath = data.map((d, i) => `${getX(i)},${getY(getMetricData(d).mean)}`).join(' ');

  // Y-axis grid ticks (5 steps)
  const yTicks = [
    minVal,
    Math.round((minVal + rangeVal * 0.25) * 10) / 10,
    Math.round((minVal + rangeVal * 0.5) * 10) / 10,
    Math.round((minVal + rangeVal * 0.75) * 10) / 10,
    maxVal
  ];

  const activePoint = hoverIndex !== null ? data[hoverIndex] : data[data.length - 1];
  const activeMetric = getMetricData(activePoint);
  const deltaFromMean = Math.round((activeMetric.val - activeMetric.mean) * 10) / 10;
  const isElevated = Math.abs(deltaFromMean) > 3.5;

  return (
    <div className="bg-[#0b0f19] border border-cyan-900/40 rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden shadow-2xl shadow-cyan-950/20">
      {/* Background glow accent */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 font-semibold">
              TELEMETRY HUD · {astronautName.toUpperCase()}
            </span>
            <h3 className="text-sm font-bold text-slate-100 tracking-wide">
              {metricConfig.label} vs. Calibrated Personal Envelope
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic rolling 14-day baseline ($\mu \pm 1.5\sigma$) with diurnal circadian phase compensation.
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-[#070a12] border border-slate-800 rounded-lg text-xs font-mono">
            <button
              onClick={() => setSelectedMetric('hr')}
              className={`px-2.5 py-1 rounded transition-all ${
                selectedMetric === 'hr'
                  ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-700/80 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Heart Rate
            </button>
            <button
              onClick={() => setSelectedMetric('hrv')}
              className={`px-2.5 py-1 rounded transition-all ${
                selectedMetric === 'hrv'
                  ? 'bg-purple-950 text-purple-300 font-bold border border-purple-700/80 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              HRV rMSSD
            </button>
            <button
              onClick={() => setSelectedMetric('spo2')}
              className={`px-2.5 py-1 rounded transition-all ${
                selectedMetric === 'spo2'
                  ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-700/80 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SpO2
            </button>
            <button
              onClick={() => setSelectedMetric('temp')}
              className={`px-2.5 py-1 rounded transition-all ${
                selectedMetric === 'temp'
                  ? 'bg-amber-950 text-amber-300 font-bold border border-amber-700/80 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Core Temp
            </button>
          </div>

          {selectedMetric === 'hr' && (
            <label className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300 cursor-pointer select-none bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <input
                type="checkbox"
                checked={showPopulationRange}
                onChange={(e) => setShowPopulationRange(e.target.checked)}
                className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer w-3.5 h-3.5"
              />
              <span>Earth Hospital Bounds (60-100)</span>
            </label>
          )}
        </div>
      </div>

      {/* Metric Live HUD Readout Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#070a12] p-3.5 rounded-xl border border-slate-800/80 text-xs z-10">
        <div>
          <div className="text-slate-400 uppercase tracking-widest text-[9px] font-mono">Current Telemetry Point</div>
          <div className="text-2xl font-mono font-bold text-slate-100 tabular-nums mt-0.5">
            {activeMetric.val} <span className="text-xs font-normal text-slate-400">{metricConfig.u}</span>
          </div>
          <div className="text-[10px] font-mono text-slate-500">{activePoint.timestamp}</div>
        </div>

        <div>
          <div className="text-slate-400 uppercase tracking-widest text-[9px] font-mono">Personal Baseline Mean</div>
          <div className="text-2xl font-mono font-bold text-cyan-400 tabular-nums mt-0.5">
            {activeMetric.mean} <span className="text-xs font-normal text-slate-400">{metricConfig.u}</span>
          </div>
          <div className="text-[10px] font-mono text-cyan-400/80">14-Day Median Filter</div>
        </div>

        <div>
          <div className="text-slate-400 uppercase tracking-widest text-[9px] font-mono">Baseline Deviation (Δ)</div>
          <div className={`text-2xl font-mono font-bold tabular-nums mt-0.5 ${isElevated ? 'text-amber-400' : 'text-emerald-400'}`}>
            {deltaFromMean > 0 ? `+${deltaFromMean}` : deltaFromMean} <span className="text-xs font-normal text-slate-400">{metricConfig.u}</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            {isElevated ? 'Significant (+3.8σ)' : 'Within normal envelope'}
          </div>
        </div>

        <div>
          <div className="text-slate-400 uppercase tracking-widest text-[9px] font-mono">Clinical Judgement</div>
          <div className="text-xs font-medium text-slate-200 mt-1">
            {selectedMetric === 'hr' && activeMetric.val <= 100 && activeMetric.val >= 60 && isElevated ? (
              <span className="text-amber-400 font-mono text-[11px] block leading-tight">
                ⚠️ Population monitor says "Normal", but AETHER flags astronaut-specific divergence!
              </span>
            ) : isElevated ? (
              <span className="text-amber-400 font-mono text-[11px] block leading-tight">
                ⚠️ Divergent from personal historical range
              </span>
            ) : (
              <span className="text-emerald-400 font-mono text-[11px] block leading-tight">
                ✓ Fully calibrated within personal range
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SVG Chart Stage with Aerospace HUD Styling */}
      <div className="relative w-full overflow-hidden select-none bg-[#05070c] rounded-xl border border-slate-800/80 p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto cursor-crosshair overflow-visible"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            {/* Glow Filter for Telemetry Line */}
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="baselineBandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.06" />
            </linearGradient>

            <linearGradient id="populationShade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#64748b" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Background gridlines */}
          {yTicks.map((tickVal) => {
            const y = getY(tickVal);
            return (
              <g key={tickVal}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#172033"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[10px] font-mono fill-slate-400"
                >
                  {tickVal}
                </text>
              </g>
            );
          })}

          {/* Standard Population Range Shading (60 - 100 bpm) */}
          {selectedMetric === 'hr' && showPopulationRange && (
            <g>
              <rect
                x={padding.left}
                y={getY(Math.min(maxVal, populationRange.max))}
                width={plotWidth}
                height={Math.max(0, getY(Math.max(minVal, populationRange.min)) - getY(Math.min(maxVal, populationRange.max)))}
                fill="url(#populationShade)"
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity={0.8}
              />
              <text
                x={width - padding.right - 10}
                y={getY(populationRange.max) + 14}
                textAnchor="end"
                className="text-[10px] font-mono fill-slate-400"
              >
                Standard Earth Population Upper (100 bpm)
              </text>
              <text
                x={width - padding.right - 10}
                y={getY(populationRange.min) - 6}
                textAnchor="end"
                className="text-[10px] font-mono fill-slate-400"
              >
                Standard Earth Population Lower (60 bpm)
              </text>
            </g>
          )}

          {/* Shaded Personal Baseline Band (±1.5σ) */}
          <polygon
            points={baselineBandPath}
            fill="url(#baselineBandGradient)"
            stroke="#06b6d4"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* Baseline Mean Guideline (Dashed Cyan) */}
          <polyline
            points={baselineMeanPath}
            fill="none"
            stroke="#0891b2"
            strokeWidth="1.8"
            strokeDasharray="6 4"
          />

          {/* Actual Telemetry Line (Solid Cyan with Glow Filter) */}
          <polyline
            points={telemetryPath}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#cyanGlow)"
          />

          {/* X-Axis Labels */}
          {data.map((d, i) => {
            if (i % 8 !== 0 && i !== data.length - 1) return null;
            const x = getX(i);
            return (
              <g key={i}>
                <line x1={x} y1={padding.top + plotHeight} x2={x} y2={padding.top + plotHeight + 6} stroke="#334155" />
                <text
                  x={x}
                  y={padding.top + plotHeight + 18}
                  textAnchor="middle"
                  className="text-[10px] font-mono fill-slate-400"
                >
                  {d.timestamp.replace('FD ', 'D')}
                </text>
              </g>
            );
          })}

          {/* Interactive Crosshair Tracking Reticle */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={padding.top}
                x2={getX(hoverIndex)}
                y2={padding.top + plotHeight}
                stroke="#06b6d4"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              {/* Telemetry Point Circle */}
              <circle
                cx={getX(hoverIndex)}
                cy={getY(getMetricData(data[hoverIndex]).val)}
                r="5"
                fill="#38bdf8"
                stroke="#05070c"
                strokeWidth="2.5"
                filter="url(#cyanGlow)"
              />
              {/* Baseline Mean Point Circle */}
              <circle
                cx={getX(hoverIndex)}
                cy={getY(getMetricData(data[hoverIndex]).mean)}
                r="3"
                fill="#0891b2"
              />
            </g>
          )}

          {/* Transparent Hover Hit Boxes */}
          {data.map((_, i) => {
            const x = getX(i);
            const colWidth = plotWidth / (data.length - 1);
            return (
              <rect
                key={i}
                x={x - colWidth / 2}
                y={padding.top}
                width={colWidth}
                height={plotHeight}
                fill="transparent"
                onMouseEnter={() => setHoverIndex(i)}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend & Scientific Provenance */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-[#38bdf8] rounded-full shadow-[0_0_8px_#38bdf8]"></span>
            <span className="text-slate-200 font-medium">Actual Telemetry Stream</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-0.5 bg-[#0891b2] border-b border-dashed border-cyan-400"></span>
            <span className="text-slate-300 font-medium">14-Day Baseline Mean</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-2.5 bg-cyan-500/25 border border-cyan-500/50 rounded-sm"></span>
            <span className="text-slate-300 font-medium">Personal Envelope ($\pm 1.5\sigma$)</span>
          </div>
          {selectedMetric === 'hr' && showPopulationRange && (
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-2.5 bg-slate-600/20 border border-slate-500/40 rounded-sm"></span>
              <span className="text-slate-400">Standard Population Range</span>
            </div>
          )}
        </div>
        <div className="font-mono text-[11px] text-cyan-400/90 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>Sampling: 256 Hz Continuous Holter</span>
        </div>
      </div>
    </div>
  );
};
