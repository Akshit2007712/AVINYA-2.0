import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { GalleryMasonry } from "@/components/sections/GalleryMasonry";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · अvinya 2.0" },
      { name: "description", content: "Signals from last year's edition — the archive of अvinya." },
      { property: "og:title", content: "Gallery · अvinya 2.0" },
      { property: "og:description", content: "Archive of past editions." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <SiteShell>
      <section className="pt-40 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary mb-6"
        >
          Archive · 2025
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-14"
        >
          Signals from the <span className="text-primary text-glow">last cycle</span>
        </motion.h1>
        <GalleryMasonry />
      </section>
    </SiteShell>
  );
}
