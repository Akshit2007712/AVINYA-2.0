import { useEffect, useState } from "react";

// Fest date — March 4, 2027 09:00 IST
const TARGET = new Date("2027-03-04T09:00:00+05:30").getTime();

function diff() {
  const d = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    mins: Math.floor((d % 3600000) / 60000),
    secs: Math.floor((d % 60000) / 1000),
  };
}

export function Countdown() {
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { v: t?.days, l: "Days" },
    { v: t?.hours, l: "Hrs" },
    { v: t?.mins, l: "Min" },
    { v: t?.secs, l: "Sec" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-10 font-mono">
      {items.map((it, i) => (
        <div key={it.l} className="flex flex-col items-center min-w-[52px]">
          <span
            className={`text-3xl md:text-4xl tabular-nums ${i === 3 ? "text-primary text-glow" : ""}`}
          >
            {it.v === undefined ? "--" : it.v.toString().padStart(2, "0")}
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            {it.l}
          </span>
        </div>
      ))}
    </div>
  );
}
