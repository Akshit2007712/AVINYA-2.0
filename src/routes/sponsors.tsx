import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { SponsorsMarquee } from "@/components/sections/SponsorsMarquee";
import { SPONSORS } from "@/data/site";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors · अvinya 2.0" },
      { name: "description", content: "The partners who make अvinya 2.0 possible." },
      { property: "og:title", content: "Sponsors · अvinya 2.0" },
      { property: "og:description", content: "Our partners." },
    ],
  }),
  component: SponsorsPage,
});

function SponsorsPage() {
  return (
    <SiteShell>
      <section className="pt-40 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary mb-6"
        >
          Partners
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-14"
        >
          Presented in <span className="text-primary text-glow">partnership</span> with
        </motion.h1>
      </section>

      <section className="py-12 border-y border-white/5 bg-background/40">
        <SponsorsMarquee />
      </section>

      <section className="py-20 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SPONSORS.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="glass-panel h-32 flex items-center justify-center hover:border-primary/40 hover:hover-glow transition-all"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors">
                {s}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
