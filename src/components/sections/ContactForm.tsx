import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10, "Message too short").max(2000),
});

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject") || undefined,
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your inputs");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setLoading(false);
    if (error) {
      toast.error("Could not send. Please try again.");
      return;
    }
    toast.success("Transmission received. We'll be in touch.");
    form.reset();
  }

  const field =
    "w-full glass-panel px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-xl">
      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" required placeholder="Your name" className={field} />
        <input name="email" type="email" required placeholder="Email address" className={field} />
      </div>
      <input name="subject" placeholder="Subject (optional)" className={field} />
      <textarea name="message" required placeholder="Your message" rows={5} className={field} />
      <button
        type="submit"
        disabled={loading}
        className="mt-2 px-8 py-4 bg-primary text-primary-foreground font-bold uppercase text-xs tracking-[0.25em] hover:brightness-110 hover:shadow-[0_0_30px_var(--color-primary)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Transmitting…" : "Send Transmission"}
      </button>
    </form>
  );
}
