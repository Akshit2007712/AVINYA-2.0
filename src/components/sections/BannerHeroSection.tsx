import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { Maximize2, Sparkles } from "lucide-react";
import bannerImg from "@/assets/banner.webp";

export function AboutBannerCard() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Mouse 3D tilt interactive effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      <div className="perspective-1000 w-full">
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative group rounded-2xl overflow-hidden glass-panel border border-white/15 shadow-[0_0_40px_rgba(0,229,255,0.15)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,229,255,0.3)] cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        >
          {/* Top Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono tracking-widest text-primary border border-primary/30 flex items-center gap-1.5 shadow-md">
              <Sparkles className="size-3 text-cyan-400 animate-pulse" /> Official Poster
            </span>
          </div>

          {/* Banner Image */}
          <img
            src={bannerImg}
            alt="अVINYA 2026 Official Banner"
            className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
            <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-mono tracking-wider text-white border border-white/20 flex items-center gap-2">
              <Maximize2 className="size-3.5 text-primary" /> Tap to Expand Banner
            </span>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-5xl max-h-[90vh] overflow-auto rounded-2xl border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-black/80 text-white font-mono text-xs rounded-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              Close ✕
            </button>
            <img
              src={bannerImg}
              alt="Full Resolution Banner"
              className="w-full h-auto rounded-2xl"
            />
          </motion.div>
        </div>
      )}
    </>
  );
}
