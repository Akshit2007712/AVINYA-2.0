import { useEffect, useState } from "react";

type Dot = {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

/** Lightweight CSS-only particle field. Mount-only to avoid SSR hydration
 *  mismatch caused by Math.random(). */
export function Particles({ count = 32 }: { count?: number }) {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    setDots(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 8,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d, i) => (
        <span
          key={i}
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
