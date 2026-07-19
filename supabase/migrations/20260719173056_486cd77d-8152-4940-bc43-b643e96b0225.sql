
CREATE TYPE public.team_category AS ENUM (
  'faculty_coordinator',
  'mentor',
  'head',
  'creative',
  'event_management',
  'literary',
  'social_media',
  'anchoring'
);

CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  category public.team_category NOT NULL,
  image_url TEXT,
  bio TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.team_members TO anon, authenticated;
GRANT ALL ON public.team_members TO service_role;

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members are publicly readable when published"
  ON public.team_members FOR SELECT
  USING (published = true);

CREATE OR REPLACE FUNCTION public.tg_team_members_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION public.tg_team_members_updated_at();

CREATE INDEX team_members_category_idx ON public.team_members(category, sort_order);
