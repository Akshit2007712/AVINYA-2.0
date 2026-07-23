import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { EventsGrid } from "@/components/sections/EventsGrid";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { GalleryMasonry } from "@/components/sections/GalleryMasonry";
import { SponsorsMarquee } from "@/components/sections/SponsorsMarquee";
import { ContactForm } from "@/components/sections/ContactForm";
import { StaffSections, TeamsSection } from "@/components/sections/TeamSections";

import { AboutBannerCard } from "@/components/sections/BannerHeroSection";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function SectionHeader({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`mb-14 ${align === "center" ? "text-center" : ""}`}
    >
      <p className={`font-mono text-[10px] tracking-[0.4em] uppercase text-primary mb-4 ${align === "center" ? "" : ""}`}>
        {eyebrow}
      </p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
    </motion.header>
  );
}

function HomePage() {
  return (
    <SiteShell>
      <Hero />

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-10 max-w-7xl mx-auto border-b border-white/5">
        <SectionHeader
          eyebrow="About The Fest"
          title={
            <>
              Fostering Dreams, <span className="text-primary">Forging Futures</span>
            </>
          }
        />
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Side: Compact Banner Card */}
          <div className="lg:col-span-5">
            <AboutBannerCard />
          </div>

          {/* Right Side: Description Text */}
          <div className="lg:col-span-7 space-y-6 text-muted-foreground text-base leading-relaxed">
            <p>
              <strong className="text-foreground">अVINYA</strong>, The Annual Tech Fest organised by <span className="text-foreground font-semibold">The Empirical Society</span>, the first technical society of <span className="text-foreground font-semibold">Guru Tegh Bahadur 4th Centenary Engineering College</span>, is a distinguished event celebrating innovation, knowledge, and creativity. <strong className="text-foreground">अVINYA</strong> means &quot;Innovation,&quot; embodying the fest&apos;s mission to offer a platform for students to engage with emerging technologies through a range of exciting events.
            </p>
            <p>
              Guided by our college motto, <em className="text-foreground font-medium">&apos;Fostering Dreams, Forging Futures,&apos;</em> <strong className="text-foreground">अVINYA</strong> focuses on developing technical, communication, and presentation skills. This year marks the fourth edition, now an inter-college event, welcoming participants from various institutions to collaborate and showcase their abilities.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section id="events" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="03 / Selected Operations"
          title={
            <>
              Featured <span className="text-primary">Tracks</span>
            </>
          }
        />
        <EventsGrid limit={3} />
        <div className="mt-12 text-center">
          <Link
            to="/events"
            className="inline-flex px-8 py-4 glass-panel uppercase text-xs tracking-[0.25em] font-mono hover:bg-white/5 transition-all"
          >
            View all events →
          </Link>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Sequence of Events"
            title="Operational Timeline"
            align="center"
          />
          <TimelineSection />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <SectionHeader eyebrow="Archive · 2025" title="Signals from the Last Cycle" />
        <GalleryMasonry />
      </section>

      {/* Faculty / Mentors / Heads */}
      <section id="people" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Leadership Grid"
          title={
            <>
              Faculty, Mentors & <span className="text-primary">Heads</span>
            </>
          }
          align="center"
        />
        <StaffSections />
      </section>

      {/* Teams */}
      <section id="teams" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Operational Crew"
          title={
            <>
              The <span className="text-primary">Team</span>
            </>
          }
          align="center"
        />
        <TeamsSection />
      </section>

      {/* Sponsors */}
      <section id="sponsors" className="py-20 border-y border-white/5 bg-background/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-center font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-8">
            Presented in partnership with
          </p>
          <SponsorsMarquee />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHeader
              eyebrow="Open Frequency"
              title={
                <>
                  Send a <span className="text-primary">Transmission</span>
                </>
              }
            />
            <p className="text-muted-foreground max-w-md leading-relaxed mb-6">
              Sponsorship, collaboration, or a question about the fest — drop us a
              message and someone from the crew will get back to you.
            </p>
            <dl className="space-y-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <div>
                <dt className="text-primary">Email</dt>
                <dd>hello@avinya.tech</dd>
              </div>
              <div>
                <dt className="text-primary">Campus</dt>
                <dd>Faculty of Technology, Main Auditorium</dd>
              </div>
            </dl>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
