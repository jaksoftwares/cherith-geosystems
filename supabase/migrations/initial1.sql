-- =============================
-- EXTENSIONS
-- =============================
create extension if not exists "uuid-ossp";

-- =============================
-- SERVICES TABLE
-- =============================
create table services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  description text,
  content text,
  icon text,
  created_at timestamp default now()
);

-- =============================
-- PROJECTS TABLE
-- =============================
create table projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique,
  description text,
  content text,
  location text,
  client text,
  completion_date date,
  image_url text,
  created_at timestamp default now()
);

-- =============================
-- BLOG / INSIGHTS
-- =============================
create table blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image text,
  author text,
  published boolean default false,
  published_at timestamp,
  created_at timestamp default now()
);

-- =============================
-- CONTACT MESSAGES
-- =============================
create table contacts (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamp default now()
);

-- =============================
-- REQUEST A SURVEY
-- =============================
create table survey_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  location text,
  survey_type text,
  description text,
  created_at timestamp default now()
);

-- =============================
-- REQUEST A QUOTE
-- =============================
create table quote_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  service text,
  budget text,
  details text,
  created_at timestamp default now()
);

-- =============================
-- CONSULTATION REQUESTS (TALK TO AN EXPERT)
-- =============================
create table consultations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  preferred_date timestamp,
  message text,
  created_at timestamp default now()
);

-- =============================
-- MEDIA TABLE (CLOUDINARY LINKS)
-- =============================
create table media (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  public_id text,
  type text, -- image / video
  related_type text, -- project / blog / service
  related_id uuid,
  created_at timestamp default now()
);

-- =============================
-- INDEXES (PERFORMANCE)
-- =============================
create index idx_services_slug on services(slug);
create index idx_projects_slug on projects(slug);
create index idx_blog_slug on blog_posts(slug);

-- =============================
-- ROW LEVEL SECURITY (RLS)
-- =============================

-- Enable RLS
alter table services enable row level security;
alter table projects enable row level security;
alter table blog_posts enable row level security;
alter table contacts enable row level security;
alter table survey_requests enable row level security;
alter table quote_requests enable row level security;
alter table consultations enable row level security;

-- =============================
-- PUBLIC READ (WEBSITE DATA)
-- =============================
create policy "Public read services"
on services for select
using (true);

create policy "Public read projects"
on projects for select
using (true);

create policy "Public read blog"
on blog_posts for select
using (published = true);

-- =============================
-- INSERT (FOR FORMS)
-- =============================
create policy "Anyone can insert contacts"
on contacts for insert
with check (true);

create policy "Anyone can insert survey requests"
on survey_requests for insert
with check (true);

create policy "Anyone can insert quotes"
on quote_requests for insert
with check (true);

create policy "Anyone can insert consultations"
on consultations for insert
with check (true);

-- =============================
-- ADMIN FULL ACCESS (AUTH USERS)
-- =============================
create policy "Admin full access services"
on services for all
using (auth.role() = 'authenticated');

create policy "Admin full access projects"
on projects for all
using (auth.role() = 'authenticated');

create policy "Admin full access blog"
on blog_posts for all
using (auth.role() = 'authenticated');

create policy "Admin read contacts"
on contacts for select
using (auth.role() = 'authenticated');

create policy "Admin read survey"
on survey_requests for select
using (auth.role() = 'authenticated');

create policy "Admin read quotes"
on quote_requests for select
using (auth.role() = 'authenticated');

create policy "Admin read consultations"
on consultations for select
using (auth.role() = 'authenticated');