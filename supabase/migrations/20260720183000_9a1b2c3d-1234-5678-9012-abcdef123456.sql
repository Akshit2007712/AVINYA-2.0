CREATE TABLE public.uploaded_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bucket_id TEXT NOT NULL,
  key TEXT NOT NULL UNIQUE,
  public_url TEXT NOT NULL,
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL,
  folder TEXT NOT NULL,
  size INT NOT NULL,
  uploaded_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.uploaded_files TO service_role;

ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins manage uploaded files" ON public.uploaded_files
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
