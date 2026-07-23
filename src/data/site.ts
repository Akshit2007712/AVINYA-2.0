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
    slug: "turin-trial",
    title: "TURIN TRIAL",
    category: "AI & Research",
    short: "An evaluation matrix pitting complex intelligence networks against human parsing protocols. Dive deep into prompt engine...",
    long: "An evaluation matrix pitting complex intelligence networks against human parsing protocols. Dive deep into prompt engineering...",
    image: eventHack,
    date: "04 MAR",
    venue: "Cyber Lab 01"
  },
  {
    slug: "kill-code",
    title: "KILL CODE",
    category: "Coding",
    short: "A high-stress tactical offensive and defensive speed coding infrastructure. Build automated scripts, hunt computational ...",
    long: "A high-stress tactical offensive and defensive speed coding infrastructure. Build automated scripts, hunt computational ...",
    image: eventHack,
    date: "04 MAR",
    venue: "Cyber Lab 01"
  },
  {
    slug: "synthora",
    title: "SYNTHORA",
    category: "Development",
    short: "Amalgamate multiple open-source technologies to architect full-stack structural engines. Projects address machine virtua...",
    long: "Amalgamate multiple open-source technologies to architect full-stack structural engines. Projects address machine virtual...",
    image: eventHack,
    date: "04 MAR",
    venue: "Cyber Lab 01"
  },
  {
    slug: "binary-blitz",
    title: "BINARY BLITZ",
    category: "Gaming/Quiz",
    short: "Rapid computational multiple-choice array evaluation tracking logic speed. Compete live inside a high-speed engine desig...",
    long: "Rapid computational multiple-choice array evaluation tracking logic speed. Compete live inside a high-speed engine designed...",
    image: eventHack,
    date: "04 MAR",
    venue: "Cyber Lab 01"
  },
  {
    slug: "thinkverse",
    title: "THINKVERSE",
    category: "Ideation",
    short: "Cross-functional collaborative solution framework brainstorming space. Bring architectural strategies targeting space sc...",
    long: "Cross-functional collaborative solution framework brainstorming space. Bring architectural strategies targeting space science...",
    image: eventHack,
    date: "04 MAR",
    venue: "Cyber Lab 01"
  },
  {
    slug: "case-tactics",
    title: "CASE TACTICS",
    category: "Management",
    short: "Resolve high-impact economic corporate gridlocks under structural systemic limitations. Optimize resources and deliver s...",
    long: "Resolve high-impact economic corporate gridlocks under structural systemic limitations. Optimize resources and deliver solutions...",
    image: eventHack,
    date: "04 MAR",
    venue: "Cyber Lab 01"
  },
  {
    slug: "code-whirl",
    title: "CODE WHIRL",
    category: "Coding",
    short: "Algorithmic iteration race where code parameters cyclically shift structural requirements every 10 minutes. Adapt codeba...",
    long: "Algorithmic iteration race where code parameters cyclically shift structural requirements every 10 minutes. Adapt codebase...",
    image: eventHack,
    date: "04 MAR",
    venue: "Cyber Lab 01"
  },
  {
    slug: "cuisine-cosmos",
    title: "CUISINE COSMOS",
    category: "Creative & Culinary",
    short: "Where molecular culinary science interacts directly with engineering workflows. Build and evaluate aesthetic food matrix...",
    long: "Where molecular culinary science interacts directly with engineering workflows. Build and evaluate aesthetic food matrix...",
    image: eventHack,
    date: "04 MAR",
    venue: "Cyber Lab 01"
  },
  {
    slug: "designops",
    title: "DESIGNOPS",
    category: "UI/UX",
    short: "High-fidelity spatial design asset sprinting field. Produce cohesive functional dark futuristic human-machine interfaces...",
    long: "High-fidelity spatial design asset sprinting field. Produce cohesive functional dark futuristic human-machine interfaces...",
    image: eventHack,
    date: "04 MAR",
    venue: "Cyber Lab 01"
  },
  {
    slug: "colossal-a-pitch",
    title: "COLOSSAL-A-PITCH",
    category: "Ideation",
    short: "The definitive architectural business venture pitch presentation field. Secure system angel funding nodes by showcasing ...",
    long: "The definitive architectural business venture pitch presentation field. Secure system angel funding nodes by showcasing ...",
    image: eventHack,
    date: "04 MAR",
    venue: "Cyber Lab 01"
  }
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
