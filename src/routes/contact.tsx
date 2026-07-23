import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { ContactForm } from "@/components/sections/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · अvinya 2.0" },
      { name: "description", content: "Get in touch with the अvinya 2.0 team." },
      { property: "og:title", content: "Contact · अvinya 2.0" },
      { property: "og:description", content: "Reach out." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <section className="pt-40 pb-24 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary mb-6"
            >
              Open Frequency
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold tracking-tight leading-[0.95] mb-8"
            >
              Send a <span className="text-primary text-glow">transmission</span>
            </motion.h1>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Sponsorships, media, or general questions — leave a message and the
              crew will respond within 48 hours.
            </p>
            <dl className="space-y-4 font-mono text-xs uppercase tracking-widest">
              <div>
                <dt className="text-primary text-[10px] mb-1">Email</dt>
                <dd>societytheempirical@gmail.com</dd>
              </div>
              <div>
                <dt className="text-primary text-[10px] mb-1">Campus</dt>
                <dd className="text-muted-foreground">
                  Guru Tegh Bahadur 4th Centenary College
                </dd>
              </div>
              <div>
                <dt className="text-primary text-[10px] mb-1">Social</dt>
                <dd className="flex gap-4 text-muted-foreground">
                  <a href="https://www.instagram.com/the_empirical_society?igsh=MW1zY2RoZ2Iwb2c4MQ==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
                  <a href="https://www.linkedin.com/company/the-empirical-society/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
                </dd>
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
