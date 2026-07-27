-- Migration: Update auth roles to 'viewer' by default instead of 'admin'
-- and ensure profiles RLS is properly set.

-- 1. Update the handle_new_user trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    'viewer' -- changed from 'admin' for security
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Update default on profiles table just in case
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'viewer';

-- 3. Enhance RLS for profiles table
-- Enable RLS if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to replace them
DROP POLICY IF EXISTS "Admin manage profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create comprehensive policies
-- a. Admins can do anything
CREATE POLICY "Admin manage profiles" ON public.profiles FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
  )
);

-- b. Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (
  auth.uid() = id
);

-- c. Users can update their own profile (but not their role)
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (
  auth.uid() = id
) WITH CHECK (
  auth.uid() = id 
  -- Users cannot elevate their own role
  AND (
    (
      SELECT role FROM public.profiles WHERE id = auth.uid()
    ) = role
    OR role IS NULL
  )
);
