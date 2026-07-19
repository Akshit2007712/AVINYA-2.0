import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GALLERY } from "@/data/site";
import { listGalleryImages } from "@/lib/site-data.functions";
import { X } from "lucide-react";

type Item = { src: string; alt: string };

export function GalleryMasonry() {
  const [open, setOpen] = useState<number | null>(null);
  const { data } = useQuery({
    queryKey: ["gallery-images"],
    queryFn: () => listGalleryImages(),
    staleTime: 60_000,
  });

  const dbItems: Item[] = (data ?? []).map((g) => ({
    src: g.image_url,
    alt: g.caption ?? "Gallery image",
  }));
  const items: Item[] = dbItems.length ? dbItems : GALLERY;

  return (
    <>
      <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
        {items.map((img, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            onClick={() => setOpen(i)}
            className="mb-4 block w-full break-inside-avoid group relative overflow-hidden glass-panel"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && items[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] bg-background/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-6 right-6 p-2 glass-panel hover:bg-white/10"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={items[open].src}
              alt={items[open].alt}
              className="max-h-[85vh] max-w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
