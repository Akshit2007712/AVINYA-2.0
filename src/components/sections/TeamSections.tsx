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
      className="group glass-panel overflow-hidden hover-glow transition-all flex flex-col"
    >
      <div className={`relative w-full ${dims} overflow-hidden bg-white/5 flex-shrink-0`}>
        {m.image_url ? (
          <img
            src={m.image_url}
            alt={m.name}
            loading="lazy"
            className="w-full h-full object-cover object-top grayscale-[0.25] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary/50">
            <User className="size-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="text-base font-bold leading-snug"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {m.name}
        </h3>
        {m.role && (
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
            {m.role}
          </p>
        )}
        {m.bio && (
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">{m.bio}</p>
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
      {/* Prominent category divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-8 bg-primary rounded-full flex-shrink-0" />
        <h3
          className="text-2xl md:text-3xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h3>
        <div className="flex-1 h-[1px] bg-white/10" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary flex-shrink-0">
          {members.length.toString().padStart(2, "0")} members
        </span>
      </div>
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
    <div className="space-y-20">
      <CategoryBlock
        title="Faculty Coordinators"
        members={faculty}
        size="lg"
        cols="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl"
      />
      <CategoryBlock title="Mentors" members={mentors} size="md" />
      <CategoryBlock title="Fest Heads" members={heads} size="md" />
    </div>
  );
}

const TEAM_LABELS: Record<string, string> = {
  "TURING TRIAL": "Turing Trial",
  "KILL CODE": "Kill Code",
  SYNTHORA: "Synthora",
  "BINARY BLITZ": "Binary Blitz",
  THINKVERSE: "Thinkverse",
  "CASE TACTICS": "Case Tactics",
  "CODE WHIRL": "Code Whirl",
  "CUISINE COSMOS": "Cuisine Cosmos",
  DESIGNOPS: "DesignOps",
  "COLOSSAL-A-PITCH": "Colossal-A-Pitch",
};

const TEAM_ORDER: TeamCategory[] = [
  "TURING TRIAL",
  "KILL CODE",
  "SYNTHORA",
  "BINARY BLITZ",
  "THINKVERSE",
  "CASE TACTICS",
  "CODE WHIRL",
  "CUISINE COSMOS",
  "DESIGNOPS",
  "COLOSSAL-A-PITCH",
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
            {/* Prominent team name header */}
            <div className="flex items-center gap-4 mb-8 border-b border-white/8 pb-5">
              <div className="w-1 h-8 bg-primary rounded-full flex-shrink-0" />
              <h3
                className="text-2xl md:text-3xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {TEAM_LABELS[cat]}
              </h3>
              <div className="flex-1 h-[1px] bg-white/10" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary flex-shrink-0">
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
              <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground/60 pl-5">
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
