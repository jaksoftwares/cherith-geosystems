-- Fix infinite recursion in profiles RLS policies

-- 1. Create a secure function to check roles that bypasses RLS
CREATE OR REPLACE FUNCTION public.get_user_role(user_uid uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM profiles WHERE id = user_uid;
$$;

-- 2. Drop all broken/recursive policies on profiles
DROP POLICY IF EXISTS "Admin manage profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- 3. Create non-recursive policies
-- a. Users can always read and update their OWN profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  -- Prevent users from escalating their own role
  AND (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = role
    OR role IS NULL
  )
);

-- b. Admins can manage ALL profiles using the security definer function to avoid recursion
CREATE POLICY "Admin manage profiles" 
ON public.profiles FOR ALL 
USING (get_user_role(auth.uid()) = 'admin');

-- 4. Fix is_admin() helper for other tables to also use the secure function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT get_user_role(auth.uid()) = 'admin';
$$;
