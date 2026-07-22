import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";

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

const teamInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(120),
  role: z.string().max(160).optional().nullable(),
  category: z.string().min(1).max(60),
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

export const adminListUploads = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("uploaded_files")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const adminDeleteUpload = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; key: string }) =>
    z.object({ id: z.string().uuid(), key: z.string().min(1) }).parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: storageError } = await supabaseAdmin.storage
      .from("site-media")
      .remove([data.key]);
    if (storageError) throw new Error(storageError.message);

    const { error } = await supabaseAdmin.from("uploaded_files").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Image uploads ----------

const uploadInput = z.object({
  filename: z.string().min(1).max(200),
  contentType: z.string().min(1).max(120),
  dataBase64: z.string().min(10).max(15_000_000),
  folder: z.enum(["team", "gallery"]).default("team"),
});

export const adminUploadImage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => uploadInput.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const buf = Buffer.from(data.dataBase64, "base64");
    if (buf.length > 8 * 1024 * 1024) throw new Error("Image too large (max 8MB)");
    const ext =
      (data.filename.split(".").pop() || "jpg")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 5) || "jpg";
    const key = `${data.folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: uploadError } = await supabaseAdmin.storage.from("site-media").upload(key, buf, {
      contentType: data.contentType,
      upsert: false,
    });
    if (uploadError) throw new Error(uploadError.message);

    const { data: pub } = supabaseAdmin.storage.from("site-media").getPublicUrl(key);
    const { error: insertError } = await supabaseAdmin.from("uploaded_files").insert({
      bucket_id: "site-media",
      key,
      public_url: pub.publicUrl,
      filename: data.filename,
      content_type: data.contentType,
      folder: data.folder,
      size: buf.length,
      uploaded_by: null,
    });

    if (insertError) {
      await supabaseAdmin.storage.from("site-media").remove([key]);
      throw new Error(insertError.message);
    }

    return { url: pub.publicUrl, key };
  });
