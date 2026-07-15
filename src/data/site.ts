import eventHack from "@/assets/event-hack.jpg";
import eventRobotics from "@/assets/event-robotics.jpg";
import eventDesign from "@/assets/event-design.jpg";
import eventDrone from "@/assets/event-drone.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

export type Event = {
  slug: string;
  title: string;
  category: string;
  short: string;
  long: string;
  image: string;
  date: string;
  venue: string;
};

export const EVENTS: Event[] = [
  {
    slug: "core-sync-hack",
    title: "Core-Sync Hack",
    category: "36H Hackathon",
    short: "A 36-hour sprint into decentralized infrastructure and neural interfaces.",
    long: "Team up and build production-grade prototypes for real-world problems — mentorship from industry engineers, hardware kits on site, and prizes for the top three submissions.",
    image: eventHack,
    date: "04 MAR",
    venue: "Cyber Lab 01",
  },
  {
    slug: "mecha-wars",
    title: "Mecha Wars",
    category: "Robotics",
    short: "Ballistic robotics where hardware meets pure kinetic strategy.",
    long: "Design, build, and pilot combat-class robots through a knockout bracket. Weight class caps and safety protocols in the brief.",
    image: eventRobotics,
    date: "05 MAR",
    venue: "The Arena",
  },
  {
    slug: "pixel-theory",
    title: "Pixel Theory",
    category: "Generative Design",
    short: "Where generative AI meets human-centered aesthetic systems.",
    long: "A design challenge exploring the boundary between algorithmic composition and craft. Bring a laptop and your favorite tools.",
    image: eventDesign,
    date: "06 MAR",
    venue: "Studio V",
  },
  {
    slug: "sky-sprint",
    title: "Sky Sprint",
    category: "FPV Racing",
    short: "High-speed FPV drone racing on a neon indoor course.",
    long: "Pilot your own drone or use one of ours through a hand-built neon obstacle course. Timed heats followed by a knockout final.",
    image: eventDrone,
    date: "06 MAR",
    venue: "Hangar B",
  },
];

export const TIMELINE = [
  {
    phase: "01",
    title: "Registrations Open",
    date: "JAN 20 · 00:00",
    desc: "Portal opens for all flagship events with early-bird access to workshops.",
  },
  {
    phase: "02",
    title: "Selection & Mentorship",
    date: "FEB 12 · 10:00",
    desc: "Shortlisted teams are paired with industry mentors to refine proposals.",
  },
  {
    phase: "03",
    title: "System Activation",
    date: "MAR 04 · 09:00",
    desc: "Opening ceremony and keynote from industry titans in the Grand Auditorium.",
  },
  {
    phase: "04",
    title: "Competitions & Expo",
    date: "MAR 05 · 09:00",
    desc: "Two full days of tracks, panels, and interactive student showcases.",
  },
  {
    phase: "05",
    title: "The Grand Finale",
    date: "MAR 06 · 18:00",
    desc: "Award ceremony followed by our signature cultural night.",
  },
];

export const GALLERY = [
  { src: gallery1, alt: "Beams of light", h: 1200 },
  { src: gallery2, alt: "Stage under blue lights", h: 900 },
  { src: gallery3, alt: "Keyboard in the dark", h: 1100 },
  { src: gallery4, alt: "Robot arm with trophy", h: 800 },
  { src: gallery5, alt: "Astronaut helmet", h: 1300 },
  { src: gallery6, alt: "Nebula", h: 900 },
];

export const SPONSORS = [
  "NEBULA LABS",
  "QUANTUM FORGE",
  "BINARY SOUL",
  "NEON CIRCUIT",
  "AXIOM VENTURES",
  "HELIOS COMPUTE",
  "ORBIT DYNAMICS",
  "PRISM WORKS",
];
