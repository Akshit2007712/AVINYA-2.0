import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://ivpzuptfcwezgqjnsrgs.supabase.co";
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_Ws29JaYkhL0Shd2ef8F05Q_uijwUGqk";
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

// Staff categories (faculty_coordinator/mentor/head) stay fixed; event-team
// categories are now dynamic (one per event from the Duty Sheet), so this is a
// free-form string rather than a strict enum.
export type TeamCategory = string;

export const listTeamMembers = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, role, category, image_url, bio, sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) return [];
  return data ?? [];
});

export const listGalleryImages = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("id, image_url, caption, sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) return [];
  return data ?? [];
});
