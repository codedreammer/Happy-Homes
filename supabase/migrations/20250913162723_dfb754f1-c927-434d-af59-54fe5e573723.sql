-- Fix security definer issue by recreating the view without any security definer properties
DROP VIEW IF EXISTS public.public_professionals;

-- Create a simple view without SECURITY DEFINER (which is the default)
CREATE VIEW public.public_professionals AS
SELECT 
    p.id,
    p.name,
    p.avatar_url,
    p.role,
    prof.id as professional_id,
    prof.category,
    prof.bio,
    prof.experience_years,
    prof.hourly_rate,
    prof.rating,
    prof.total_reviews,
    prof.is_verified,
    prof.is_active,
    prof.specializations,
    prof.portfolio_images,
    -- Only show general location area, not specific addresses
    CASE 
        WHEN p.location IS NOT NULL 
        THEN split_part(p.location, ',', 1) -- Only show city/area, not full address
        ELSE prof.location
    END as location
FROM profiles p
INNER JOIN professionals prof ON p.id = prof.user_id
WHERE prof.is_active = true AND p.role = 'professional';

-- Ensure proper permissions
GRANT SELECT ON public.public_professionals TO anon;
GRANT SELECT ON public.public_professionals TO authenticated;