import { useMemo } from "react";

/** Lightweight CSS-only particle field. Zero deps, cheap on paint. */
export function Particles({ count = 32 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 8,
        opacity: 0.3 + Math.random() * 0.5,
        key: i,
      })),
    [count],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <span
          key={d.key}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            boxShadow: `0 0 ${d.size * 4}px currentColor`,
            animation: `float-particle ${d.duration}s ${d.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
