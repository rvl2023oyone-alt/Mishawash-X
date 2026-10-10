import React from 'react';

interface RadialGaugeProps {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  statusLabel?: string;
  color?: string;
  size?: number;
}

export const RadialGauge: React.FC<RadialGaugeProps> = ({
  value,
  min,
  max,
  unit,
  label,
  statusLabel = 'NOMINAL',
  color = '#06b6d4',
  size = 130
}) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use a 260-degree arc instead of full 360
  const arcLength = circumference * 0.72;
  const normValue = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const progressLength = normValue * arcLength;

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-[#0b0f19] border border-slate-800 rounded-xl relative group">
      {/* Corner crosshairs for aerospace look */}
      <span className="absolute top-1 left-1 text-[8px] font-mono text-slate-700 select-none">+</span>
      <span className="absolute top-1 right-1 text-[8px] font-mono text-slate-700 select-none">+</span>

      <div className="relative flex items-center justify-center" style={{ width: size, height: size * 0.85 }}>
        <svg
          width={size}
          height={size}
          className="overflow-visible -rotate-125"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Foreground colored arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${progressLength} ${circumference}`}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 6px ${color}80)`,
              transition: 'stroke-dasharray 0.5s ease-out'
            }}
          />
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span className="text-xl font-mono font-bold text-slate-100 tabular-nums tracking-tight">
            {value}
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase">
            {unit}
          </span>
        </div>
      </div>

      <div className="text-center mt-1">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {label}
        </div>
        <div className="text-[9px] font-mono text-cyan-400 mt-0.5">
          {statusLabel}
        </div>
      </div>
    </div>
  );
};
