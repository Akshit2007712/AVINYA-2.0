import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { listTeamMembers, type TeamCategory } from "@/lib/site-data.functions";
import { User } from "lucide-react";

type Member = {
  id: string;
  name: string;
  role: string | null;
  category: TeamCategory;
  image_url: string | null;
  bio: string | null;
  sort_order: number;
};

function useTeam() {
  return useQuery({
    queryKey: ["team-members"],
    queryFn: () => listTeamMembers() as Promise<Member[]>,
    staleTime: 60_000,
  });
}

function MemberCard({ m, i, size = "md" }: { m: Member; i: number; size?: "lg" | "md" | "sm" }) {
  const dims =
    size === "lg"
      ? "aspect-[3/4]"
      : size === "sm"
        ? "aspect-square"
        : "aspect-[4/5]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
      className="group glass-panel overflow-hidden hover-glow transition-all"
    >
      <div className={`relative w-full ${dims} overflow-hidden bg-white/5`}>
        {m.image_url ? (
          <img
            src={m.image_url}
            alt={m.name}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[0.25] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary/50">
            <User className="size-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold tracking-tight leading-tight">{m.name}</h3>
        {m.role && (
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
            {m.role}
          </p>
        )}
        {m.bio && (
          <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{m.bio}</p>
        )}
      </div>
    </motion.div>
  );
}

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
      className={`mb-12 ${align === "center" ? "text-center" : ""}`}
    >
      <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary mb-4">
        {eyebrow}
      </p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
    </motion.header>
  );
}

function CategoryBlock({
  members,
  title,
  size,
  cols,
}: {
  members: Member[];
  title: string;
  size?: "lg" | "md" | "sm";
  cols?: string;
}) {
  if (!members.length) return null;
  return (
    <div>
      <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
        {title}
      </h3>
      <div className={cols ?? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"}>
        {members.map((m, i) => (
          <MemberCard key={m.id} m={m} i={i} size={size} />
        ))}
      </div>
    </div>
  );
}

export function StaffSections() {
  const { data } = useTeam();
  const all = (data ?? []) as Member[];
  const faculty = all.filter((m) => m.category === "faculty_coordinator");
  const mentors = all.filter((m) => m.category === "mentor");
  const heads = all.filter((m) => m.category === "head");

  if (!faculty.length && !mentors.length && !heads.length) {
    return (
      <p className="text-center text-sm font-mono uppercase tracking-widest text-muted-foreground">
        Coordinators, mentors & heads will be announced soon.
      </p>
    );
  }

  return (
    <div className="space-y-16">
      <CategoryBlock
        title="Faculty Coordinators"
        members={faculty}
        size="lg"
        cols="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
      />
      <CategoryBlock title="Mentors" members={mentors} size="md" />
      <CategoryBlock title="Fest Heads" members={heads} size="md" />
    </div>
  );
}

const TEAM_LABELS: Record<string, string> = {
  creative: "Creative Team",
  event_management: "Event Management",
  literary: "Literary Team",
  social_media: "Social Media",
  anchoring: "Anchoring Team",
};

const TEAM_ORDER: TeamCategory[] = [
  "creative",
  "event_management",
  "literary",
  "social_media",
  "anchoring",
];

export function TeamsSection() {
  const { data } = useTeam();
  const all = (data ?? []) as Member[];

  return (
    <div className="space-y-20">
      {TEAM_ORDER.map((cat) => {
        const members = all.filter((m) => m.category === cat);
        return (
          <div key={cat}>
            <div className="flex items-baseline justify-between mb-6 border-b border-white/5 pb-4">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                {TEAM_LABELS[cat]}
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                {members.length.toString().padStart(2, "0")} members
              </span>
            </div>
            {members.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {members.map((m, i) => (
                  <MemberCard key={m.id} m={m} i={i} size="sm" />
                ))}
              </div>
            ) : (
              <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground/60">
                Roster loading…
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { SectionHeader as StaffSectionHeader };
