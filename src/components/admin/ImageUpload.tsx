import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Upload, Loader2, X } from "lucide-react";
import { adminUploadImage } from "@/lib/admin.functions";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const s = String(r.result || "");
      resolve(s.includes(",") ? s.split(",")[1] : s);
    };
    r.onerror = () => reject(new Error("Read failed"));
    r.readAsDataURL(file);
  });
}

export function ImageUpload({
  value,
  onChange,
  folder,
}: {
  value: string | null | undefined;
  onChange: (url: string) => void;
  folder: "team" | "gallery";
}) {
  const upload = useServerFn(adminUploadImage);
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function pick(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Max size 8MB");
      return;
    }
    setBusy(true);
    try {
      const dataBase64 = await fileToBase64(file);
      const { url } = await upload({
        data: {
          filename: file.name,
          contentType: file.type,
          dataBase64,
          folder,
        },
      });
      onChange(url);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <div className="relative size-24 shrink-0 overflow-hidden glass-panel">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/50 text-[10px] font-mono uppercase">
              No image
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground text-[10px] font-mono uppercase tracking-widest hover:brightness-110 disabled:opacity-60"
          >
            {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
            {busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-destructive ml-2"
            >
              <X className="size-3" /> Remove
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) pick(f);
            }}
          />
          <input
            type="url"
            placeholder="or paste image URL"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full glass-panel px-3 py-2 text-xs focus:outline-none focus:border-primary/60"
          />
        </div>
      </div>
    </div>
  );
}
