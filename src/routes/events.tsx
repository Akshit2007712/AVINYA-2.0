import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { EventsGrid } from "@/components/sections/EventsGrid";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events · अvinya 2.0" },
      {
        name: "description",
        content:
          "Explore all events at अvinya 2.0 — hackathons, robotics, drone racing, generative design, and more.",
      },
      { property: "og:title", content: "Events · अvinya 2.0" },
      { property: "og:description", content: "All events and competitions at अvinya 2.0." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <SiteShell>
      <section className="pt-40 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary mb-6"
        >
          Roster · Full Program
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-14"
        >
          All <span className="text-primary text-glow">events</span>
        </motion.h1>
        <EventsGrid />
      </section>
    </SiteShell>
  );
}
