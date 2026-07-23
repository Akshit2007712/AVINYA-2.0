import { Link } from "@tanstack/react-router";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s =
    size === "lg"
      ? "text-3xl"
      : size === "sm"
        ? "text-lg"
        : "text-2xl";
  return (
    <Link to="/" className="flex items-baseline gap-1 group">
      <span
        className={`${s} text-primary transition-all duration-500 group-hover:text-glow-strong`}
        style={{ fontFamily: "var(--font-devanagari)" }}
      >
        अ
      </span>
      <span className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/90">
        vinya &apos;26
      </span>
    </Link>
  );
}
