import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Portal · अvinya 2.0" },
      { name: "description", content: "Sign in to register and manage your अvinya 2.0 experience." },
      { property: "og:title", content: "Portal · अvinya 2.0" },
      { property: "og:description", content: "Sign in or create an account." },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email().max(255);
const passwordSchema = z.string().min(6, "At least 6 characters").max(72);

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = emailSchema.safeParse(fd.get("email"));
    const password = passwordSchema.safeParse(fd.get("password"));
    if (!email.success) return toast.error("Invalid email");
    if (!password.success) return toast.error(password.error.issues[0].message);

    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.data,
          password: password.data,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        toast.success("Check your inbox to verify your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.data,
          password: password.data,
        });
        if (error) throw error;
        toast.success("Signed in.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function signInGoogle() {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) toast.error("Could not sign in with Google");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full glass-panel px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors";

  return (
    <SiteShell>
      <section className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md glass-panel-strong p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <span
              className="text-6xl text-primary text-glow-strong"
              style={{ fontFamily: "var(--font-devanagari)" }}
            >
              अ
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight">
              {mode === "signin" ? "Enter the Portal" : "Create your ID"}
            </h1>
            <p className="mt-2 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
              {mode === "signin" ? "Access your registration" : "Join the fest"}
            </p>
          </div>

          <button
            type="button"
            onClick={signInGoogle}
            disabled={loading}
            className="w-full glass-panel px-4 py-3 text-sm font-medium hover:bg-white/5 transition-colors mb-6 disabled:opacity-60"
          >
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background/80 px-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <form onSubmit={onSubmit} className="grid gap-3">
            <input name="email" type="email" required placeholder="Email" className={field} />
            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Password"
              className={field}
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full px-6 py-3 bg-primary text-primary-foreground font-bold uppercase text-xs tracking-[0.25em] hover:brightness-110 hover:shadow-[0_0_30px_var(--color-primary)] transition-all disabled:opacity-60"
            >
              {loading ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {mode === "signin" ? "Don't have an ID?" : "Already registered?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-primary hover:underline"
            >
              {mode === "signin" ? "Create one" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </section>
    </SiteShell>
  );
}
