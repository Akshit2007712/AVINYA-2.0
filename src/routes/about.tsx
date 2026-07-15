import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · अvinya 2.0" },
      {
        name: "description",
        content:
          "About अvinya 2.0 — the story, the vision, and the community behind the flagship college tech festival.",
      },
      { property: "og:title", content: "About · अvinya 2.0" },
      {
        property: "og:description",
        content: "The story behind अvinya 2.0.",
      },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { v: "5,000+", l: "Participants" },
  { v: "24", l: "Colleges" },
  { v: "12", l: "Events" },
  { v: "72h", l: "Non-stop" },
];

function AboutPage() {
  return (
    <SiteShell>
      <section className="pt-40 pb-24 px-6 md:px-10 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary mb-6"
        >
          About · Chapter 2
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-10"
        >
          A festival where{" "}
          <span className="text-primary text-glow">heritage</span> meets the future.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-10 text-muted-foreground text-base leading-relaxed"
        >
          <p>
            अvinya — from the Sanskrit for <em className="text-foreground">innovation</em> — is the
            annual flagship technology festival at the Faculty of Technology.
            Three days, twelve events, and one shared belief: that the future
            is written by the students building it now.
          </p>
          <p>
            We bring together engineers, designers, hackers, and dreamers from
            across the country to compete, collaborate, and celebrate. From
            36-hour hackathons to combat robotics arenas, अvinya 2.0 is a
            planetarium for the next generation of makers.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="glass-panel p-6"
            >
              <div className="text-4xl font-bold text-primary text-glow">{s.v}</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
