import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Particles } from "@/components/site/Particles";
import { Countdown } from "@/components/site/Countdown";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Massive background अ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="text-primary opacity-[0.04] select-none leading-none"
          style={{ fontFamily: "var(--font-devanagari)", fontSize: "min(80vh, 90vw)" }}
        >
          अ
        </span>
      </div>

      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <Particles count={40} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-6"
      >
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-[1px] w-10 bg-primary/40" />
          <p className="font-mono text-[10px] tracking-[0.5em] text-primary uppercase">
            Infinity Unleashed · 2026
          </p>
          <span className="h-[1px] w-10 bg-primary/40" />
        </div>

        <h1 className="mb-4 flex flex-col items-center">
          <span className="flex items-baseline">
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-primary text-glow-strong"
              style={{
                fontFamily: "var(--font-devanagari)",
                fontSize: "clamp(5rem, 15vw, 12rem)",
                lineHeight: 0.9,
              }}
            >
              अ
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-extrabold tracking-tighter"
              style={{ fontSize: "clamp(4rem, 12vw, 10rem)", lineHeight: 0.9 }}
            >
              vinya
            </motion.span>
          </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="italic font-medium tracking-tight -mt-2"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            2.0
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="max-w-xl mx-auto text-sm md:text-base text-muted-foreground mb-10 leading-relaxed"
        >
          A three-day confluence of engineering, design, and imagination.
          Step into the planetarium.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mb-12"
        >
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/auth"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold uppercase text-xs tracking-[0.25em] transition-all hover:brightness-110 hover:shadow-[0_0_30px_var(--color-primary)]"
          >
            Register Now
          </Link>
          <Link
            to="/events"
            className="w-full sm:w-auto px-8 py-4 glass-panel uppercase text-xs tracking-[0.25em] transition-all hover:bg-white/5"
          >
            Explore Events
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-60">
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground">
          Scroll to Enter
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent animate-scroll-hint" />
      </div>
    </section>
  );
}
