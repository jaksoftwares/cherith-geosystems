-- =============================
-- EXTENSIONS
-- =============================
create extension if not exists "uuid-ossp";




-- =============================
-- PROFILES TABLE
-- =============================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text default 'admin', -- admin, editor
  avatar_url text,
  created_at timestamp default now()
);


2. AUTO CREATE PROFILE ON SIGNUP (VERY IMPORTANT)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
🔹 3. ENABLE RLS
alter table profiles enable row level security;
🔹 4. PROFILE POLICIES
User can read own profile
create policy "Users can view own profile"
on profiles for select
using (auth.uid() = id);
User can update own profile
create policy "Users can update own profile"
on profiles for update
using (auth.uid() = id);
Admin can read all profiles
create policy "Admin read all profiles"
on profiles for select
using (
  exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  )
);





-- =============================
-- SERVICE CATEGORIES
-- =============================
create table service_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  icon_url text,
  position int default 0,
  created_at timestamp default now()
);

-- =============================
-- SERVICES (CHILD OF CATEGORY)
-- =============================
create table services (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references service_categories(id) on delete cascade,
  title text not null,
  slug text unique not null,
  short_description text,
  content text,
  image_url text,
  icon_url text,
  featured boolean default false,
  position int default 0,
  created_at timestamp default now()
);

-- =============================
-- PROJECTS
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

  -- Cloudinary images
  cover_image_url text,
  cover_image_public_id text,
  gallery jsonb,

  featured boolean default false,
  created_at timestamp default now()
);

-- =============================
-- BLOG (INSIGHTS)
-- =============================
create table blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,

  -- Images
  cover_image_url text,
  cover_image_public_id text,
  gallery jsonb,

  author text,
  published boolean default false,
  published_at timestamp,
  created_at timestamp default now()
);

-- =============================
-- CONTACT FORM
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
-- SURVEY REQUESTS
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
-- QUOTE REQUESTS
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
-- CONSULTATIONS (TALK TO EXPERT)
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
-- ADMIN PROFILE (OPTIONAL BUT IMPORTANT)
-- =============================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text default 'admin',
  created_at timestamp default now()
);

-- =============================
-- INDEXES (PERFORMANCE)
-- =============================
create index idx_service_categories_slug on service_categories(slug);
create index idx_services_slug on services(slug);
create index idx_services_category on services(category_id);
create index idx_projects_slug on projects(slug);
create index idx_blog_slug on blog_posts(slug);

-- =============================
-- ENABLE RLS
-- =============================
alter table service_categories enable row level security;
alter table services enable row level security;
alter table projects enable row level security;
alter table blog_posts enable row level security;
alter table contacts enable row level security;
alter table survey_requests enable row level security;
alter table quote_requests enable row level security;
alter table consultations enable row level security;
alter table profiles enable row level security;

-- =============================
-- PUBLIC READ ACCESS
-- =============================

create policy "Public read categories"
on service_categories for select
using (true);

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
-- FORM SUBMISSIONS (PUBLIC INSERT)
-- =============================

create policy "Insert contacts"
on contacts for insert
with check (true);

create policy "Insert survey requests"
on survey_requests for insert
with check (true);

create policy "Insert quote requests"
on quote_requests for insert
with check (true);

create policy "Insert consultations"
on consultations for insert
with check (true);

-- =============================
-- ADMIN ACCESS (AUTH USERS)
-- =============================

-- SERVICES
create policy "Admin full services"
on services for all
using (auth.role() = 'authenticated');

-- CATEGORIES
create policy "Admin full categories"
on service_categories for all
using (auth.role() = 'authenticated');

-- PROJECTS
create policy "Admin full projects"
on projects for all
using (auth.role() = 'authenticated');

-- BLOG
create policy "Admin full blog"
on blog_posts for all
using (auth.role() = 'authenticated');

-- LEADS (READ ONLY FOR ADMIN)
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

-- PROFILES
create policy "Users can view own profile"
on profiles for select
using (auth.uid() = id);

create policy "Users can update own profile"
on profiles for update
using (auth.uid() = id);