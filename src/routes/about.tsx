import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { AboutBannerCard } from "@/components/sections/BannerHeroSection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · अvinya '26" },
      {
        name: "description",
        content:
          "About अvinya '26 — the story, the vision, and the community behind the flagship college tech festival.",
      },
      { property: "og:title", content: "About · अvinya '26" },
      {
        property: "og:description",
        content: "The story behind अvinya '26.",
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
      <section className="pt-40 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
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
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-12"
        >
          A festival where{" "}
          <span className="text-primary text-glow">heritage</span> meets the future.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid lg:grid-cols-12 gap-10 items-center"
        >
          {/* Left Side: Banner Card */}
          <div className="lg:col-span-5">
            <AboutBannerCard />
          </div>

          {/* Right Side: Description */}
          <div className="lg:col-span-7 space-y-6 text-muted-foreground text-base leading-relaxed">
            <p>
              <strong className="text-foreground">अVINYA</strong>, The Annual Tech Fest of <span className="text-foreground font-semibold">Guru Tegh Bahadur 4th Centenary Engineering College</span>, is a distinguished event celebrating innovation, knowledge, and creativity. <strong className="text-foreground">अVINYA</strong> means &quot;Innovation,&quot; embodying the fest&apos;s mission to offer a platform for students to engage with emerging technologies through a range of exciting events.
            </p>
            <p>
              Guided by our college motto, <em className="text-foreground font-medium">&apos;Fostering Dreams, Forging Futures,&apos;</em> <strong className="text-foreground">अVINYA</strong> focuses on developing technical, communication, and presentation skills. This year marks the second edition, now an inter-college event, welcoming participants from various institutions to collaborate and showcase their abilities.
            </p>
          </div>
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
