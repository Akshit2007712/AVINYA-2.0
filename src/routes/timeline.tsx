import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { TimelineSection } from "@/components/sections/TimelineSection";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline · अvinya 2.0" },
      { name: "description", content: "The full timeline of अvinya 2.0 — from registrations to grand finale." },
      { property: "og:title", content: "Timeline · अvinya 2.0" },
      { property: "og:description", content: "The full sequence of events." },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <SiteShell>
      <section className="pt-40 pb-24 px-6 md:px-10 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary mb-6 text-center"
        >
          Sequence
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-16 text-center"
        >
          Operational <span className="text-primary text-glow">timeline</span>
        </motion.h1>
        <TimelineSection />
      </section>
    </SiteShell>
  );
}
