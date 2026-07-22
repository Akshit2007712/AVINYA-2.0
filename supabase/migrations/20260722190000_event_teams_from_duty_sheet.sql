-- ============================================================
-- Convert the Teams section from a fixed 5-pod enum
-- (creative / event_management / literary / social_media / anchoring)
-- into free-form, per-event teams driven by the Duty Sheet.
-- ============================================================

-- 1. Widen team_members.category from the enum to plain text so any
--    event name can be used as a category, and drop the now-unused enum type.
ALTER TABLE public.team_members
  ALTER COLUMN category TYPE TEXT USING category::text;

DROP TYPE public.team_category;

-- 2. Remove the old placeholder pods (Creative / Event Management / Literary /
--    Social Media / Anchoring). Staff categories (faculty_coordinator, mentor,
--    head) are untouched.
DELETE FROM public.team_members
WHERE category IN ('creative', 'event_management', 'literary', 'social_media', 'anchoring');

-- 3. Seed the event teams from DUTY_SHEET.xlsx.
--    role = 'Team Lead' for the Event Head, NULL for regular duty members.
--    category = exact Event Name (used as the team name on the site).
INSERT INTO public.team_members (name, role, category, sort_order, published) VALUES
  ('SWETA', 'Team Lead', 'TURING TRIAL', 0, true),
  ('SHUBH', NULL, 'TURING TRIAL', 1, true),
  ('UNNATI', NULL, 'TURING TRIAL', 2, true),
  ('SAKSHAM BATRA', NULL, 'TURING TRIAL', 3, true),
  ('YASHIKA', NULL, 'TURING TRIAL', 4, true),
  ('AYAN JOSHI', NULL, 'TURING TRIAL', 5, true),

  ('YAKSHITA', 'Team Lead', 'KILL CODE', 0, true),
  ('CHHAVISHKA', NULL, 'KILL CODE', 1, true),
  ('JATIN SINGH', NULL, 'KILL CODE', 2, true),
  ('KHUSHBOO', NULL, 'KILL CODE', 3, true),
  ('ADITYA SHARMA', NULL, 'KILL CODE', 4, true),
  ('MUSKAN', NULL, 'KILL CODE', 5, true),
  ('HARMAN', NULL, 'KILL CODE', 6, true),
  ('MDALSA', NULL, 'KILL CODE', 7, true),

  ('ISHA', 'Team Lead', 'SYNTHORA', 0, true),
  ('MEHUL', NULL, 'SYNTHORA', 1, true),
  ('RIDHIMA MITTAL', NULL, 'SYNTHORA', 2, true),
  ('JAGRIT SOOD', NULL, 'SYNTHORA', 3, true),
  ('ABHINAK KUMAR (1ST YEAR)', NULL, 'SYNTHORA', 4, true),
  ('DIVYA', NULL, 'SYNTHORA', 5, true),

  ('KARTIK', 'Team Lead', 'BINARY BLITZ', 0, true),
  ('DAKSHA SINGH', NULL, 'BINARY BLITZ', 1, true),
  ('RAUNAK', NULL, 'BINARY BLITZ', 2, true),
  ('SUMIT', NULL, 'BINARY BLITZ', 3, true),
  ('NIRDESH KHANNA', NULL, 'BINARY BLITZ', 4, true),
  ('PARIDHI GARG', NULL, 'BINARY BLITZ', 5, true),
  ('SAVITRI DUTTA', NULL, 'BINARY BLITZ', 6, true),

  ('MUDITA', 'Team Lead', 'THINKVERSE', 0, true),
  ('PRAGYA', NULL, 'THINKVERSE', 1, true),
  ('ARCHITA', NULL, 'THINKVERSE', 2, true),
  ('YUG SHARMA', NULL, 'THINKVERSE', 3, true),
  ('CHIRAG', NULL, 'THINKVERSE', 4, true),
  ('AKSHIT RAJPUT', NULL, 'THINKVERSE', 5, true),
  ('ABHAY', NULL, 'THINKVERSE', 6, true),

  ('KASHISH', 'Team Lead', 'CASE TACTICS', 0, true),
  ('HARMAN', NULL, 'CASE TACTICS', 1, true),
  ('SAANVI', NULL, 'CASE TACTICS', 2, true),
  ('SAKSHAM SHARMA', NULL, 'CASE TACTICS', 3, true),
  ('SUDHANSHU', NULL, 'CASE TACTICS', 4, true),
  ('JAYANT', NULL, 'CASE TACTICS', 5, true),
  ('SOMYA SHARMA', NULL, 'CASE TACTICS', 6, true),

  ('KHUSHI', 'Team Lead', 'CODE WHIRL', 0, true),
  ('RIDHIMA SHARMA', NULL, 'CODE WHIRL', 1, true),
  ('DISHIKA RUSTAGI', NULL, 'CODE WHIRL', 2, true),
  ('PRAGATI', NULL, 'CODE WHIRL', 3, true),
  ('NAITIK', NULL, 'CODE WHIRL', 4, true),
  ('TANISHK MADHWANI', NULL, 'CODE WHIRL', 5, true),
  ('LUCKEY DAHIYA', NULL, 'CODE WHIRL', 6, true),

  ('VANSH', 'Team Lead', 'CUISINE COSMOS', 0, true),
  ('SAINA', NULL, 'CUISINE COSMOS', 1, true),
  ('PARTH', NULL, 'CUISINE COSMOS', 2, true),
  ('LAVANYA', NULL, 'CUISINE COSMOS', 3, true),
  ('SANJANA SHARMA', NULL, 'CUISINE COSMOS', 4, true),
  ('JATIN TYAGI', NULL, 'CUISINE COSMOS', 5, true),
  ('AMAN', NULL, 'CUISINE COSMOS', 6, true),
  ('ADITYA RAI', NULL, 'CUISINE COSMOS', 7, true),

  ('BHAVYA', 'Team Lead', 'DESIGNOPS', 0, true),
  ('HARSH', NULL, 'DESIGNOPS', 1, true),
  ('ABHINAV KUMAR (2ND YEAR)', NULL, 'DESIGNOPS', 2, true),
  ('TARUN KUMAR', NULL, 'DESIGNOPS', 3, true),
  ('ARYAN TIWARI', NULL, 'DESIGNOPS', 4, true),
  ('SAKSHI AGGARWAL', NULL, 'DESIGNOPS', 5, true),
  ('SONA KUMARI', NULL, 'DESIGNOPS', 6, true),

  ('AAKASH', 'Team Lead', 'COLOSSAL-A-PITCH', 0, true),
  ('PRIYANSHI', NULL, 'COLOSSAL-A-PITCH', 1, true),
  ('YASHVARDHAN GOYAL', NULL, 'COLOSSAL-A-PITCH', 2, true),
  ('RITYA KAPOOR', NULL, 'COLOSSAL-A-PITCH', 3, true),
  ('VISHU GARG', NULL, 'COLOSSAL-A-PITCH', 4, true),
  ('VIRANG', NULL, 'COLOSSAL-A-PITCH', 5, true),
  ('ARPIT', NULL, 'COLOSSAL-A-PITCH', 6, true);
