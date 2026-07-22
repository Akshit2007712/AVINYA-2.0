import { SPONSORS } from "@/data/site";

export function SponsorsMarquee() {
  const doubled = [...SPONSORS, ...SPONSORS];
  return (
    <div className="relative overflow-hidden py-6">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex gap-16 animate-marquee whitespace-nowrap w-max">
        {doubled.map((s, i) => (
          <span
            key={i}
            className="font-mono text-lg md:text-2xl tracking-[0.3em] text-muted-foreground hover:text-primary hover:text-glow transition-all duration-500 cursor-default"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
