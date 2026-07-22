# Image Upload Backend Setup

This project uses Supabase storage and a metadata table for image uploads.

## Required environment variables

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

For local development, copy `.env.example` to `.env` and fill in your values.

## Supabase schema

A new table was added:

- `uploaded_files`
  - `id`
  - `bucket_id`
  - `key`
  - `public_url`
  - `filename`
  - `content_type`
  - `folder`
  - `size`
  - `uploaded_by`
  - `created_at`

It is created by the migration file:

- `supabase/migrations/20260720183000_9a1b2c3d-1234-5678-9012-abcdef123456.sql`

## Upload flow

1. Admin logs in at `/admin`
2. Uploads images from the admin console using `ImageUpload`
3. Images are stored in Supabase storage bucket `site-media`
4. Metadata is recorded in `uploaded_files`

## Admin interface

A new admin tab is available for managing uploads once authenticated.

## Apply the migration

Use the Supabase CLI or dashboard to apply the migration file to your project.

## Notes

- Storage objects are public via the existing `site-media` bucket policy.
- Deleting an upload removes both the storage object and metadata record.
