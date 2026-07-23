import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/timeline", label: "Timeline" },
  { to: "/gallery", label: "Gallery" },
  { to: "/#teams", label: "Meet The Team" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-panel-strong h-14" : "glass-panel h-16"
      } flex items-center`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <Logo />

        <div className="hidden lg:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em]">
          {links.map((l) => {
            const isHash = l.to.includes("#");
            const active = !isHash && pathname === l.to;
            if (isHash) {
              return (
                <a
                  key={l.to}
                  href={l.to}
                  className="relative transition-colors text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </a>
              );
            }
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[1px] bg-primary shadow-[0_0_8px_var(--color-primary)]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="hidden sm:inline-flex px-4 py-2 border border-primary/40 text-primary text-[10px] font-mono uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Portal
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden absolute top-full left-0 right-0 glass-panel-strong border-t border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) =>
                l.to.includes("#") ? (
                  <a
                    key={l.to}
                    href={l.to}
                    onClick={() => setOpen(false)}
                    className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
