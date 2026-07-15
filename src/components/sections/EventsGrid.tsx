import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { EVENTS } from "@/data/site";

export function EventsGrid({ limit }: { limit?: number }) {
  const list = limit ? EVENTS.slice(0, limit) : EVENTS;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {list.map((e, i) => (
        <motion.article
          key={e.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex flex-col glass-panel rounded-sm overflow-hidden hover-glow transition-all duration-500 hover:border-primary/40"
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <img
              src={e.image}
              alt={e.title}
              loading="lazy"
              className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.3em] text-primary glass-panel px-2 py-1">
              {e.category}
            </span>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold uppercase tracking-tight">{e.title}</h3>
              <span className="font-mono text-[10px] bg-white/5 px-2 py-1 whitespace-nowrap">
                {e.date}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
              {e.short}
            </p>
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                {e.venue}
              </span>
              <Link
                to="/auth"
                className="text-[10px] font-mono uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                Register →
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
