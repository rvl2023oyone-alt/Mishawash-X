import React, { useState } from 'react';
import { VitalTelemetryPoint } from '../../types/telemetry';

interface MultiSignalCorrelatorProps {
  data: VitalTelemetryPoint[];
  astronautName: string;
}

export const MultiSignalCorrelator: React.FC<MultiSignalCorrelatorProps> = ({
  data,
  astronautName
}) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const width = 860;
  const height = 240;
  const padding = { top: 20, right: 24, bottom: 32, left: 50 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Signal 1: Heart Rate (bpm) -> scaled 40 to 120
  const hrMin = 45;
  const hrMax = 110;
  const getHrY = (val: number) => padding.top + plotHeight - ((val - hrMin) / (hrMax - hrMin)) * plotHeight;

  // Signal 2: HRV rMSSD (ms) -> scaled 15 to 80
  const hrvMin = 15;
  const hrvMax = 75;
  const getHrvY = (val: number) => padding.top + plotHeight - ((val - hrvMin) / (hrvMax - hrvMin)) * plotHeight;

  // Signal 3: SpO2 (%) -> scaled 94 to 100
  const spo2Min = 94;
  const spo2Max = 100;
  const getSpo2Y = (val: number) => padding.top + plotHeight - ((val - spo2Min) / (spo2Max - spo2Min)) * plotHeight;

  const getX = (i: number) => padding.left + (i / (data.length - 1)) * plotWidth;

  const hrPath = data.map((d, i) => `${getX(i)},${getHrY(d.heartRate)}`).join(' ');
  const hrvPath = data.map((d, i) => `${getX(i)},${getHrvY(d.hrvRmssd)}`).join(' ');
  const spo2Path = data.map((d, i) => `${getX(i)},${getSpo2Y(d.spo2)}`).join(' ');

  const active = hoverIdx !== null ? data[hoverIdx] : data[data.length - 1];

  return (
    <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 tracking-wide">
            Multi-Signal Temporal Correlation
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Synchronized alignment of Cardiovascular (HR), Autonomic Parasympathetic (HRV rMSSD), and Oxygenation (SpO2).
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-400">Time Window:</span>
          <span className="text-cyan-400">Past 48 Hours Continuous</span>
        </div>
      </div>

      {/* Synchronized Readout Bar */}
      <div className="grid grid-cols-3 gap-3 bg-[#070a12] p-3 rounded-lg border border-slate-800/60 text-xs">
        <div className="flex items-center justify-between border-r border-slate-800 pr-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300 font-medium">Heart Rate</span>
          </div>
          <span className="font-mono font-bold text-slate-100 text-sm tabular-nums">
            {active.heartRate} <span className="text-[10px] text-slate-400 font-normal">bpm</span>
          </span>
        </div>

        <div className="flex items-center justify-between border-r border-slate-800 pr-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            <span className="text-slate-300 font-medium">Autonomic HRV</span>
          </div>
          <span className="font-mono font-bold text-purple-300 text-sm tabular-nums">
            {active.hrvRmssd} <span className="text-[10px] text-slate-400 font-normal">ms</span>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300 font-medium">Blood Oxygen</span>
          </div>
          <span className="font-mono font-bold text-emerald-300 text-sm tabular-nums">
            {active.spo2} <span className="text-[10px] text-slate-400 font-normal">%</span>
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto cursor-crosshair overflow-visible"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {/* Horizontal Grid */}
          {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
            const y = padding.top + plotHeight * ratio;
            return (
              <line
                key={ratio}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#1e293b"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Left Axis: HR */}
          <text x={padding.left - 6} y={padding.top + 8} textAnchor="end" className="text-[10px] font-mono fill-cyan-400">
            {hrMax} bpm
          </text>
          <text x={padding.left - 6} y={padding.top + plotHeight} textAnchor="end" className="text-[10px] font-mono fill-cyan-400">
            {hrMin} bpm
          </text>

          {/* Lines */}
          <polyline
            points={hrPath}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <polyline
            points={hrvPath}
            fill="none"
            stroke="#a855f7"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <polyline
            points={spo2Path}
            fill="none"
            stroke="#10b981"
            strokeWidth="1.6"
            strokeDasharray="4 2"
          />

          {/* Timeline labels */}
          {data.map((d, i) => {
            if (i % 8 !== 0 && i !== data.length - 1) return null;
            const x = getX(i);
            return (
              <text
                key={i}
                x={x}
                y={padding.top + plotHeight + 16}
                textAnchor="middle"
                className="text-[10px] font-mono fill-slate-400"
              >
                {d.timestamp.replace('FD ', 'D')}
              </text>
            );
          })}

          {/* Hover Crosshair */}
          {hoverIdx !== null && (
            <g>
              <line
                x1={getX(hoverIdx)}
                y1={padding.top}
                x2={getX(hoverIdx)}
                y2={padding.top + plotHeight}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle cx={getX(hoverIdx)} cy={getHrY(data[hoverIdx].heartRate)} r="4" fill="#06b6d4" />
              <circle cx={getX(hoverIdx)} cy={getHrvY(data[hoverIdx].hrvRmssd)} r="4" fill="#a855f7" />
              <circle cx={getX(hoverIdx)} cy={getSpo2Y(data[hoverIdx].spo2)} r="4" fill="#10b981" />
            </g>
          )}

          {/* Hit areas */}
          {data.map((_, i) => {
            const x = getX(i);
            const w = plotWidth / (data.length - 1);
            return (
              <rect
                key={i}
                x={x - w / 2}
                y={padding.top}
                width={w}
                height={plotHeight}
                fill="transparent"
                onMouseEnter={() => setHoverIdx(i)}
              />
            );
          })}
        </svg>
      </div>

      <div className="text-[11px] text-slate-400 bg-slate-900/40 p-2.5 rounded border border-slate-800/80">
        <strong className="text-slate-300">Analytical Note:</strong> Simultaneous divergence occurs when heart rate rises while autonomic HRV drops significantly below baseline. AETHER treats this multi-signal correlation as an alert factor rather than interpreting either signal in isolation.
      </div>
    </div>
  );
};
