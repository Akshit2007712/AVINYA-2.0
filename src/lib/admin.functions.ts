import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import type { TeamCategory } from "./site-data.functions";

type AdminSession = { unlocked?: boolean };

function sessionConfig() {
  return {
    password: process.env.ADMIN_SESSION_SECRET!,
    name: "avinya-admin",
    maxAge: 60 * 60 * 8,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

async function requireAdmin() {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.unlocked) throw new Error("Unauthorized");
  return session;
}

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  return { unlocked: !!session.data.unlocked };
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) =>
    z.object({ password: z.string().min(1).max(200) }).parse(data),
  )
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) throw new Error("Admin password not configured");
    if (!matches(data.password, expected)) return { ok: false as const };
    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

// ---------- Team members ----------

const teamCategories: readonly TeamCategory[] = [
  "faculty_coordinator",
  "mentor",
  "head",
  "creative",
  "event_management",
  "literary",
  "social_media",
  "anchoring",
] as const;

const teamInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(120),
  role: z.string().max(160).optional().nullable(),
  category: z.enum(teamCategories as unknown as [TeamCategory, ...TeamCategory[]]),
  image_url: z.string().url().max(1000).optional().nullable().or(z.literal("")),
  bio: z.string().max(1000).optional().nullable(),
  sort_order: z.number().int().min(0).max(9999).default(0),
  published: z.boolean().default(true),
});

export const adminListTeam = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("team_members")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const adminUpsertTeam = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => teamInput.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = {
      ...data,
      image_url: data.image_url || null,
      role: data.role || null,
      bio: data.bio || null,
    };
    const { error } = data.id
      ? await supabaseAdmin.from("team_members").update(payload).eq("id", data.id)
      : await supabaseAdmin.from("team_members").insert(payload);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteTeam = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("team_members").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Gallery ----------

const galleryInput = z.object({
  id: z.string().uuid().optional(),
  image_url: z.string().url().max(1000),
  caption: z.string().max(300).optional().nullable(),
  sort_order: z.number().int().min(0).max(9999).default(0),
  published: z.boolean().default(true),
});

export const adminListGallery = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const adminUpsertGallery = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => galleryInput.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = { ...data, caption: data.caption || null };
    const { error } = data.id
      ? await supabaseAdmin.from("gallery_images").update(payload).eq("id", data.id)
      : await supabaseAdmin.from("gallery_images").insert(payload);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteGallery = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("gallery_images").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
