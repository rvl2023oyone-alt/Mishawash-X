import React from 'react';

interface PhysioRadarChartProps {
  currentMetrics: {
    label: string;
    score: number; // 0 to 100, where 100 is perfectly within baseline
    rawNote: string;
  }[];
  title?: string;
}

export const PhysioRadarChart: React.FC<PhysioRadarChartProps> = ({
  currentMetrics,
  title = '6-Axis Baseline Calibration Envelope'
}) => {
  const size = 260;
  const center = size / 2;
  const radius = 95;
  const totalAxes = currentMetrics.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Base polygon (Target 100% baseline)
  const basePolygonPoints = currentMetrics.map((_, i) => {
    const { x, y } = getCoordinates(100, i);
    return `${x},${y}`;
  }).join(' ');

  // Current state polygon
  const currentPolygonPoints = currentMetrics.map((m, i) => {
    const { x, y } = getCoordinates(m.score, i);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4 flex flex-col items-center">
      <div className="w-full flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
        <h4 className="text-xs font-semibold text-slate-200 tracking-wide uppercase">
          {title}
        </h4>
        <span className="text-[10px] font-mono text-cyan-400">Target Envelope = 100</span>
      </div>

      <div className="relative w-full max-w-[280px] flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto overflow-visible select-none">
          {/* Concentric rings */}
          {[25, 50, 75, 100].map((level) => {
            const levelPoints = currentMetrics.map((_, i) => {
              const { x, y } = getCoordinates(level, i);
              return `${x},${y}`;
            }).join(' ');
            return (
              <polygon
                key={level}
                points={levelPoints}
                fill="none"
                stroke="#1e293b"
                strokeWidth={level === 100 ? 1.5 : 1}
                strokeDasharray={level === 100 ? 'none' : '2 2'}
              />
            );
          })}

          {/* Radial Axis Spokes */}
          {currentMetrics.map((_, i) => {
            const { x, y } = getCoordinates(100, i);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#1e293b"
                strokeWidth="1"
              />
            );
          })}

          {/* Target Baseline Polygon (dashed outline) */}
          <polygon
            points={basePolygonPoints}
            fill="none"
            stroke="#0891b2"
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* Current State Polygon */}
          <polygon
            points={currentPolygonPoints}
            fill="rgba(6, 182, 212, 0.22)"
            stroke="#06b6d4"
            strokeWidth="2"
          />

          {/* Vertex Points */}
          {currentMetrics.map((m, i) => {
            const { x, y } = getCoordinates(m.score, i);
            const isDeficient = m.score < 75;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3.5"
                fill={isDeficient ? '#f59e0b' : '#38bdf8'}
                stroke="#0b0f19"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Axis Labels */}
          {currentMetrics.map((m, i) => {
            const { x, y } = getCoordinates(120, i);
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[9px] font-mono fill-slate-300"
              >
                {m.label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Axis Readout List */}
      <div className="w-full grid grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
        {currentMetrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between px-1">
            <span className="text-slate-400 truncate">{m.label}:</span>
            <span className={`font-semibold ${m.score < 75 ? 'text-amber-400' : 'text-slate-200'}`}>
              {m.score}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
