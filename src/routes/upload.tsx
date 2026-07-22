import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload · अvinya 2.0" },
      { name: "description", content: "Upload images and view upload instructions." },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  return (
    <SiteShell>
      <section className="pt-40 pb-24 px-6 md:px-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel-strong p-10"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-3">
            Admin Uploads
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Image upload backend is ready
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Use the admin console at <span className="text-primary">/admin</span> to upload images to Supabase storage.
            Uploaded image metadata is persisted in the <code className="rounded bg-slate-950 px-1 py-0.5">uploaded_files</code> table.
          </p>
          <div className="grid gap-4 text-sm">
            <div>
              <h2 className="font-bold">Required environment variables</h2>
              <ul className="list-disc list-inside text-muted-foreground mt-2">
                <li><code>SUPABASE_URL</code></li>
                <li><code>SUPABASE_PUBLISHABLE_KEY</code></li>
                <li><code>SUPABASE_SERVICE_ROLE_KEY</code></li>
                <li><code>ADMIN_PASSWORD</code></li>
                <li><code>ADMIN_SESSION_SECRET</code></li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold">Supabase migration</h2>
              <p className="text-muted-foreground mt-2">
                Apply <code>supabase/migrations/20260720183000_9a1b2c3d-1234-5678-9012-abcdef123456.sql</code> to create the upload metadata table.
              </p>
            </div>
            <div>
              <h2 className="font-bold">Bucket policy</h2>
              <p className="text-muted-foreground mt-2">
                The <code>site-media</code> bucket already has public read policy configured in the existing migrations.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </SiteShell>
  );
}
