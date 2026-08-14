-- 20260814_add_blog_seo_fields.sql
ALTER TABLE blog_posts
ADD COLUMN seo_title text,
ADD COLUMN meta_description text,
ADD COLUMN tags jsonb DEFAULT '[]'::jsonb,
ADD COLUMN scheduled_for timestamp with time zone;
