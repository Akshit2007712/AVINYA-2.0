import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/60 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo />
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
            © 2026 · Faculty of Technology
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/events" className="hover:text-primary transition-colors">Events</Link>
          <Link to="/timeline" className="hover:text-primary transition-colors">Timeline</Link>
          <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
          <Link to="/sponsors" className="hover:text-primary transition-colors">Sponsors</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        <div className="flex gap-5 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          <a href="#" className="hover:text-primary transition-colors">Discord</a>
        </div>
      </div>
    </footer>
  );
}
