import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setLoading(false), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-baseline gap-1"
          >
            <span
              className="text-8xl md:text-9xl text-primary text-glow-strong"
              style={{ fontFamily: "var(--font-devanagari)" }}
            >
              अ
            </span>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tighter"
            >
              vinya
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-2xl md:text-3xl italic"
            >
              2.0
            </motion.span>
          </motion.div>

          <div className="mt-12 w-56 h-[2px] bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <p className="mt-4 font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
            Initializing · {progress.toString().padStart(3, "0")}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
