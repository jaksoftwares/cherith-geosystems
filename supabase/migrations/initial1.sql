-- ==========================================================
-- CHERITH GEOSYSTEMS - COMPLETE DATABASE SETUP
-- ==========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==========================================================
-- 1. ACCESS CONTROL & PROFILES
-- ==========================================================

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text default 'admin', -- 'admin', 'editor', 'viewer'
  avatar_url text,
  last_login timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Trigger: Automatically create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- ==========================================================
-- 2. CMS: SERVICES & CATEGORIES
-- ==========================================================

create table service_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  icon_name text, -- Lucide icon identifier
  position int default 0,
  created_at timestamp with time zone default now()
);

create table services (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references service_categories(id) on delete set null,
  title text not null,
  slug text unique not null,
  short_description text,
  content text, -- Rich text content
  sub_services jsonb default '[]'::jsonb, -- Array of strings
  image_url text,
  featured boolean default false,
  position int default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ==========================================================
-- 3. CMS: PROJECT PORTFOLIO
-- ==========================================================

create table projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  description text,
  full_description text,
  location text,
  client text,
  year text, -- e.g., "2026"
  completion_date date,
  
  -- Media
  image_url text, -- Primary cover
  image_public_id text, -- Cloudinary reference
  gallery jsonb default '[]'::jsonb, -- Array of additional image objects

  technical_specs jsonb default '[]'::jsonb, -- Array of {label, value}
  category text, -- Matches frontend filter categories
  featured boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ==========================================================
-- 4. CMS: BLOG & INSIGHTS
-- ==========================================================

create table blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text, -- Rich text
  author text,
  category text,
  reading_time text, -- e.g., "5 min read"
  
  cover_image_url text,
  cover_image_public_id text,
  
  featured boolean default false,
  published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ==========================================================
-- 5. CRM: SEGREGATED LEAD MANAGEMENT
-- ==========================================================
... (existing lead tables)
...
-- ==========================================================
-- 6. SYSTEM: SITE CONTENT (Marketing)
-- ==========================================================

create table partners (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  subtitle text,
  logo_url text,
  position int default 0,
  created_at timestamp with time zone default now()
);

create table testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text,
  content text not null,
  avatar_url text,
  rating int default 5,
  position int default 0,
  created_at timestamp with time zone default now()
);

create table hero_slides (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  alt_text text,
  title text,
  subtitle text,
  position int default 0,
  created_at timestamp with time zone default now()
);

create table features (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  icon_name text,
  position int default 0,
  created_at timestamp with time zone default now()
);

create table industries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  icon_name text,
  position int default 0,
  created_at timestamp with time zone default now()
);

create table regional_experience (
  id uuid primary key default uuid_generate_v4(),
  country text not null,
  projects_count text,
  details text,
  expertise text[], -- array of skills
  position int default 0,
  created_at timestamp with time zone default now()
);

create table leadership (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text,
  qualifications text[],
  memberships text,
  image_url text,
  position int default 0,
  created_at timestamp with time zone default now()
);

create table assets_inventory (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text check (type in ('equipment', 'software')),
  description text,
  created_at timestamp with time zone default now()
);

-- ==========================================================
-- 7. SYSTEM: SITE SETTINGS
-- ==========================================================

-- General Inquiries
create table contacts (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text default 'New', -- 'New', 'In Progress', 'Resolved', 'Spam'
  created_at timestamp with time zone default now()
);

-- Technical Survey Requests
create table survey_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  location text not null,
  survey_type text not null, -- 'Cadastral', 'Topo', 'Engineering', etc.
  description text,
  status text default 'New',
  created_at timestamp with time zone default now()
);

-- Sales / Quote Estimates
create table quote_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  service text not null,
  budget text,
  details text,
  status text default 'New',
  created_at timestamp with time zone default now()
);

-- Expert Consultations
create table consultations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  preferred_date timestamp with time zone,
  message text,
  status text default 'New',
  created_at timestamp with time zone default now()
);

-- ==========================================================
-- 6. SYSTEM: SITE SETTINGS
-- ==========================================================

create table site_settings (
  key text primary key,
  value jsonb not null,
  description text,
  updated_at timestamp with time zone default now()
);

-- Seed basic settings
insert into site_settings (key, value, description) values
('contact_info', '{"phone": "0722 300 565", "email": "info@cherith.co.ke", "address": "Olympic House, Nairobi"}', 'General company contact details'),
('social_links', '{"linkedin": "#", "twitter": "#", "facebook": "#"}', 'Social media profile links'),
('seo_metadata', '{"title": "Cherith GeoSystems", "description": "Professional Geospatial Solutions"}', 'Default site-wide SEO values');

-- ==========================================================
-- 7. PERFORMANCE & SEARCH INDEXES
-- ==========================================================

create index idx_services_slug on services(slug);
create index idx_projects_slug on projects(slug);
create index idx_blog_slug on blog_posts(slug);
create index idx_contacts_email on contacts(email);
create index idx_survey_status on survey_requests(status);

-- ==========================================================
-- 8. SECURITY: ROW LEVEL SECURITY (RLS)
-- ==========================================================

-- Enable RLS on all tables
alter table industries enable row level security;
alter table regional_experience enable row level security;
alter table leadership enable row level security;
alter table assets_inventory enable row level security;

create policy "Public read industries" on industries for select using (true);
create policy "Public read regional" on regional_experience for select using (true);
create policy "Public read leadership" on leadership for select using (true);
create policy "Public read assets" on assets_inventory for select using (true);

create policy "Admin manage industries" on industries for all using (is_admin());
create policy "Admin manage regional" on regional_experience for all using (is_admin());
create policy "Admin manage leadership" on leadership for all using (is_admin());
create policy "Admin manage assets" on assets_inventory for all using (is_admin());

-- Admin Helper Function
create or replace function is_admin() 
returns boolean as $$
begin
  return exists (
    select 1 from profiles 
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- PUBLIC READ POLICIES (Content visibility)
create policy "Public read categories" on service_categories for select using (true);
create policy "Public read services" on services for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read blog" on blog_posts for select using (published = true);
create policy "Public read settings" on site_settings for select using (true);

-- PUBLIC INSERT POLICIES (Lead generation)
create policy "Insert contacts" on contacts for insert with check (true);
create policy "Insert survey" on survey_requests for insert with check (true);
create policy "Insert quote" on quote_requests for insert with check (true);
create policy "Insert consultation" on consultations for insert with check (true);

-- ADMIN FULL CRUD POLICIES (Management control)
create policy "Admin manage profiles" on profiles for all using (is_admin());
create policy "Admin manage categories" on service_categories for all using (is_admin());
create policy "Admin manage services" on services for all using (is_admin());
create policy "Admin manage projects" on projects for all using (is_admin());
create policy "Admin manage blog" on blog_posts for all using (is_admin());
create policy "Admin manage contacts" on contacts for all using (is_admin());
create policy "Admin manage survey" on survey_requests for all using (is_admin());
create policy "Admin manage quote" on quote_requests for all using (is_admin());
create policy "Admin manage consultations" on consultations for all using (is_admin());
create policy "Admin manage settings" on site_settings for all using (is_admin());