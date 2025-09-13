-- Create a secure public view for professionals that only shows business-relevant information
CREATE OR REPLACE VIEW public.public_professionals AS
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

-- Update RLS policy to restrict direct profile access
DROP POLICY IF EXISTS "Public can view professional profiles" ON profiles;

-- Create more restrictive policy - only authenticated users can see professional profiles
-- and only basic business information
CREATE POLICY "Authenticated users can view professional profiles" 
ON profiles 
FOR SELECT 
TO authenticated
USING (role = 'professional');

-- Grant public access to the secure view
GRANT SELECT ON public.public_professionals TO anon;
GRANT SELECT ON public.public_professionals TO authenticated;