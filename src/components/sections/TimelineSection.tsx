import { motion } from "framer-motion";
import { TIMELINE } from "@/data/site";

export function TimelineSection() {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

      <div className="space-y-16">
        {TIMELINE.map((n, i) => {
          const leftSide = i % 2 === 0;
          return (
            <motion.div
              key={n.phase}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col md:flex-row items-start"
            >
              <div className={`flex-1 ${leftSide ? "md:text-right md:pr-12" : "md:order-3 md:pl-12"} pl-12 md:pl-0 mb-3 md:mb-0`}>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary">
                  Phase {n.phase} · {n.date}
                </span>
                <h4 className="text-lg font-bold mt-2">{n.title}</h4>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{n.desc}</p>
              </div>

              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 md:order-2 top-1 md:top-2 z-10">
                <span className="block w-3 h-3 rounded-full bg-primary shadow-[0_0_16px_var(--color-primary)]" />
              </div>

              <div className={`flex-1 ${leftSide ? "md:order-3 md:pl-12" : "md:text-right md:pr-12"} hidden md:block`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
