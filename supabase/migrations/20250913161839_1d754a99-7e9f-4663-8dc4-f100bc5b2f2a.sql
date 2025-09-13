-- Fix the security vulnerability: Restrict profiles SELECT policy
-- Only allow users to view their own profiles or public professional profiles

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Create secure policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Public can view professional profiles" 
ON public.profiles 
FOR SELECT 
USING (role = 'professional');

-- Add a function to get current user role safely
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT COALESCE(
    (SELECT role FROM public.profiles WHERE id = auth.uid())::TEXT, 
    'client'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;