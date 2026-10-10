import React, { useEffect, useRef } from 'react';

interface EcgWaveformProps {
  bpm: number;
  color?: string;
  height?: number;
}

export const EcgWaveform: React.FC<EcgWaveformProps> = ({
  bpm = 60,
  color = '#06b6d4',
  height = 36
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let offset = 0;
    const width = canvas.width;
    const h = canvas.height;
    const midY = h / 2;

    // Single beat cycle length in pixels based on BPM
    // 60 bpm = 1 beat/sec. At 60fps, 60 frames = 1 beat.
    const beatLength = Math.max(40, Math.min(120, Math.round((60 / bpm) * 75)));

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 20) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += 10) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw ECG trace
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      for (let x = 0; x < width; x++) {
        const beatPos = (x + offset) % beatLength;
        const norm = beatPos / beatLength;
        let y = midY;

        // P wave (at norm 0.15 - 0.25)
        if (norm >= 0.15 && norm <= 0.25) {
          y -= Math.sin((norm - 0.15) * Math.PI * 10) * (h * 0.12);
        }
        // Q dip (at norm 0.32 - 0.35)
        else if (norm >= 0.32 && norm <= 0.35) {
          y += (norm - 0.32) * (h * 0.4);
        }
        // R peak (at norm 0.35 - 0.40)
        else if (norm > 0.35 && norm <= 0.38) {
          y -= ((norm - 0.35) / 0.03) * (h * 0.42);
        } else if (norm > 0.38 && norm <= 0.42) {
          y -= (1 - (norm - 0.38) / 0.04) * (h * 0.42);
        }
        // S dip (at norm 0.42 - 0.45)
        else if (norm > 0.42 && norm <= 0.45) {
          y += Math.sin((norm - 0.42) * Math.PI * 33) * (h * 0.18);
        }
        // T wave (at norm 0.55 - 0.70)
        else if (norm >= 0.55 && norm <= 0.70) {
          y -= Math.sin((norm - 0.55) * Math.PI * 6.66) * (h * 0.18);
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      offset = (offset + 1.2) % beatLength;
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [bpm, color]);

  return (
    <canvas
      ref={canvasRef}
      width={180}
      height={height}
      className="w-full max-w-[180px] h-[36px] rounded bg-black/40 border border-slate-800/80"
    />
  );
};
