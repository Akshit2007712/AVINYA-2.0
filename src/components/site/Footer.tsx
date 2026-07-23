import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/60 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo />
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
            © 2026 · Guru Tegh Bahadur 4th Centenary College
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/events" className="hover:text-primary transition-colors">Events</Link>
          <Link to="/timeline" className="hover:text-primary transition-colors">Timeline</Link>
          <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
          <Link to="/sponsors" className="hover:text-primary transition-colors">Sponsors</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        <div className="flex gap-5 items-center text-muted-foreground">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/the_empirical_society?igsh=MW1zY2RoZ2Iwb2c4MQ=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-primary transition-colors duration-200 hover:scale-110 transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/the-empirical-society/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary transition-colors duration-200 hover:scale-110 transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect width="4" height="12" x="2" y="9"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <Link to="/admin" className="font-mono text-[10px] uppercase tracking-[0.2em] hover:text-primary transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
