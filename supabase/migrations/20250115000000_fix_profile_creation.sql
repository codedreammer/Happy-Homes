-- Fix profile creation trigger to handle signup properly
-- Drop and recreate the trigger function with better error handling

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_name TEXT;
    user_role user_role;
BEGIN
    -- Extract name from metadata, fallback to email prefix
    user_name := COALESCE(
        NEW.raw_user_meta_data->>'name',
        split_part(NEW.email, '@', 1)
    );
    
    -- Extract role from metadata, fallback to 'client'
    user_role := COALESCE(
        (NEW.raw_user_meta_data->>'role')::user_role,
        'client'::user_role
    );
    
    -- Insert profile with proper error handling
    INSERT INTO public.profiles (id, name, role, email)
    VALUES (
        NEW.id,
        user_name,
        user_role,
        NEW.email
    );
    
    -- Log successful profile creation
    RAISE LOG 'Profile created for user: %', NEW.id;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error but don't fail the signup
        RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add email column to profiles if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'email'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN email TEXT;
    END IF;
END $$;

-- Update existing profiles to have email if missing
UPDATE public.profiles 
SET email = auth.users.email 
FROM auth.users 
WHERE profiles.id = auth.users.id AND profiles.email IS NULL;