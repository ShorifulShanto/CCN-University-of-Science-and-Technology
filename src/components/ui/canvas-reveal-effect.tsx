import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export interface CanvasRevealEffectProps {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}

export const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
  animationSpeed = 3,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize = 2.5,
  showGradient = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const spacing = Math.max(12, dotSize * 4.5);
    const cols = Math.ceil(width / spacing) + 2;
    const rows = Math.ceil(height / spacing) + 2;

    let time = 0;

    const render = () => {
      time += (0.015 * animationSpeed);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          // Wave equation
          const wave1 = Math.sin(i * 0.2 + time);
          const wave2 = Math.cos(j * 0.2 + time * 0.8);
          const wave3 = Math.sin((i + j) * 0.15 - time * 0.5);
          const combined = (wave1 + wave2 + wave3) / 3;

          // Normalize -1 to 1 into opacity
          const opacityIndex = Math.floor(
            ((combined + 1) / 2) * (opacities.length - 1)
          );
          const opacity = opacities[Math.max(0, Math.min(opacities.length - 1, opacityIndex))];

          // Color selection
          const colorIndex = Math.abs((i + j) % colors.length);
          const [r, g, b] = colors[colorIndex] || [255, 255, 255];

          const radius = (dotSize / 2) * (0.6 + ((combined + 1) / 2) * 0.8);

          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.5, radius), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationSpeed, colors, dotSize, opacities]);

  return (
    <div
      className={cn(
        "h-full w-full absolute inset-0 overflow-hidden pointer-events-none",
        containerClassName
      )}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full absolute inset-0 block"
      />
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
      )}
    </div>
  );
};
