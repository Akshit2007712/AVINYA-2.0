import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
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

export type TeamCategory =
  | "faculty_coordinator"
  | "mentor"
  | "head"
  | "creative"
  | "event_management"
  | "literary"
  | "social_media"
  | "anchoring";

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
