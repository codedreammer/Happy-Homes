-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user role enum
CREATE TYPE user_role AS ENUM ('client', 'professional', 'admin');

-- Create professional category enum  
CREATE TYPE professional_category AS ENUM ('interior_designer', 'architect', 'contractor', 'decorator');

-- Create product category enum
CREATE TYPE product_category AS ENUM ('furniture', 'tiles', 'lighting', 'decor', 'modular_kitchen', 'paints');

-- Create project status enum
CREATE TYPE project_status AS ENUM ('requested', 'accepted', 'in_progress', 'completed', 'cancelled');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'client',
    phone TEXT,
    location TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create professionals table
CREATE TABLE public.professionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category professional_category NOT NULL,
    bio TEXT,
    portfolio_images TEXT[],
    location TEXT NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    hourly_rate INTEGER,
    experience_years INTEGER,
    specializations TEXT[],
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category product_category NOT NULL,
    description TEXT,
    price INTEGER NOT NULL, -- in paisa/cents
    vendor TEXT NOT NULL,
    images TEXT[] NOT NULL,
    specifications JSONB,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create client wishlist table
CREATE TABLE public.client_wishlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Create saved professionals table
CREATE TABLE public.saved_professionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, professional_id)
);

-- Create projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    budget_min INTEGER,
    budget_max INTEGER,
    status project_status DEFAULT 'requested',
    notes TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(professional_id, client_id, project_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for professionals
CREATE POLICY "Professionals are viewable by everyone" ON public.professionals
    FOR SELECT USING (is_active = true);

CREATE POLICY "Professionals can insert their own profile" ON public.professionals
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND id = user_id)
    );

CREATE POLICY "Professionals can update their own profile" ON public.professionals
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND id = user_id)
    );

-- Create RLS policies for products
CREATE POLICY "Products are viewable by everyone" ON public.products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage products" ON public.products
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Create RLS policies for wishlist
CREATE POLICY "Users can view their own wishlist" ON public.client_wishlist
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own wishlist" ON public.client_wishlist
    FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for saved professionals
CREATE POLICY "Users can view their own saved professionals" ON public.saved_professionals
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own saved professionals" ON public.saved_professionals
    FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for projects
CREATE POLICY "Users can view their own projects" ON public.projects
    FOR SELECT USING (
        auth.uid() = client_id OR 
        EXISTS (SELECT 1 FROM public.professionals WHERE id = professional_id AND user_id = auth.uid())
    );

CREATE POLICY "Clients can create projects" ON public.projects
    FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Project participants can update projects" ON public.projects
    FOR UPDATE USING (
        auth.uid() = client_id OR 
        EXISTS (SELECT 1 FROM public.professionals WHERE id = professional_id AND user_id = auth.uid())
    );

-- Create RLS policies for reviews
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews
    FOR SELECT USING (true);

CREATE POLICY "Clients can create reviews for their projects" ON public.reviews
    FOR INSERT WITH CHECK (
        auth.uid() = client_id AND
        EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND client_id = auth.uid())
    );

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
        'client'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update professional ratings
CREATE OR REPLACE FUNCTION public.update_professional_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.professionals 
    SET 
        rating = (
            SELECT ROUND(AVG(rating::DECIMAL), 2)
            FROM public.reviews 
            WHERE professional_id = NEW.professional_id
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM public.reviews 
            WHERE professional_id = NEW.professional_id
        )
    WHERE id = NEW.professional_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update ratings when reviews are added
CREATE TRIGGER on_review_created
    AFTER INSERT ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_professional_rating();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_professionals_updated_at
    BEFORE UPDATE ON public.professionals
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert demo data for professionals
INSERT INTO public.profiles (id, name, role, phone, location) VALUES
(uuid_generate_v4(), 'Arjun Mehta', 'professional', '+91 98765 43210', 'Mumbai, Maharashtra'),
(uuid_generate_v4(), 'Priya Sharma', 'professional', '+91 87654 32109', 'Delhi, NCR'),
(uuid_generate_v4(), 'Vikram Singh', 'professional', '+91 76543 21098', 'Bangalore, Karnataka'),
(uuid_generate_v4(), 'Anjali Gupta', 'professional', '+91 65432 10987', 'Chennai, Tamil Nadu'),
(uuid_generate_v4(), 'Rohit Kumar', 'professional', '+91 54321 09876', 'Pune, Maharashtra');

-- Insert demo professionals data
WITH demo_professionals AS (
    SELECT id, name FROM public.profiles WHERE role = 'professional' LIMIT 5
)
INSERT INTO public.professionals (user_id, category, bio, location, hourly_rate, experience_years, specializations, is_verified)
SELECT 
    id,
    CASE 
        WHEN name = 'Arjun Mehta' THEN 'interior_designer'
        WHEN name = 'Priya Sharma' THEN 'architect'
        WHEN name = 'Vikram Singh' THEN 'contractor'
        WHEN name = 'Anjali Gupta' THEN 'decorator'
        ELSE 'interior_designer'
    END::professional_category,
    CASE 
        WHEN name = 'Arjun Mehta' THEN 'Award-winning interior designer specializing in modern Indian homes with 8+ years of experience.'
        WHEN name = 'Priya Sharma' THEN 'Licensed architect with expertise in sustainable residential and commercial designs.'
        WHEN name = 'Vikram Singh' THEN 'Reliable contractor with 12+ years in luxury home construction and renovation.'
        WHEN name = 'Anjali Gupta' THEN 'Creative decorator passionate about blending traditional and contemporary styles.'
        ELSE 'Experienced professional in home design and construction.'
    END,
    CASE 
        WHEN name = 'Arjun Mehta' THEN 'Mumbai, Maharashtra'
        WHEN name = 'Priya Sharma' THEN 'Delhi, NCR'
        WHEN name = 'Vikram Singh' THEN 'Bangalore, Karnataka'
        WHEN name = 'Anjali Gupta' THEN 'Chennai, Tamil Nadu'
        ELSE 'Pune, Maharashtra'
    END,
    CASE 
        WHEN name = 'Arjun Mehta' THEN 2500
        WHEN name = 'Priya Sharma' THEN 3000
        WHEN name = 'Vikram Singh' THEN 1800
        WHEN name = 'Anjali Gupta' THEN 2000
        ELSE 2200
    END,
    CASE 
        WHEN name = 'Arjun Mehta' THEN 8
        WHEN name = 'Priya Sharma' THEN 10
        WHEN name = 'Vikram Singh' THEN 12
        WHEN name = 'Anjali Gupta' THEN 6
        ELSE 7
    END,
    CASE 
        WHEN name = 'Arjun Mehta' THEN ARRAY['Modern Design', 'Space Planning', 'Color Theory']
        WHEN name = 'Priya Sharma' THEN ARRAY['Sustainable Design', 'Commercial Architecture', 'Green Building']
        WHEN name = 'Vikram Singh' THEN ARRAY['Luxury Construction', 'Project Management', 'Quality Control']
        WHEN name = 'Anjali Gupta' THEN ARRAY['Traditional Decor', 'Contemporary Styling', 'Color Coordination']
        ELSE ARRAY['General Design', 'Project Coordination']
    END,
    true
FROM demo_professionals;

-- Insert demo products
INSERT INTO public.products (name, category, description, price, vendor, images, specifications, is_featured) VALUES
('Elegant Teak Dining Set', 'furniture', 'Handcrafted solid teak wood dining table with 6 chairs, perfect for modern Indian homes.', 85000, 'Crafted Woods Co.', ARRAY['/demo-furniture-1.jpg'], '{"material": "Solid Teak", "seating": "6 people", "dimensions": "180x90x75 cm"}', true),
('Premium Italian Marble Tiles', 'tiles', 'Luxurious Carrara marble tiles with subtle veining, ideal for flooring and walls.', 89000, 'Marble Elegance', ARRAY['/demo-tiles-1.jpg'], '{"size": "60x60 cm", "finish": "Polished", "thickness": "18mm"}', true),
('Modern Chandelier Collection', 'lighting', 'Contemporary crystal chandelier with LED technology and dimming features.', 25000, 'Luminous Designs', ARRAY['/demo-lighting-1.jpg'], '{"type": "LED Crystal", "dimming": "Yes", "warranty": "2 years"}', false),
('Handwoven Kashmiri Carpet', 'decor', 'Authentic handwoven carpet from Kashmir with intricate traditional patterns.', 45000, 'Heritage Textiles', ARRAY['/demo-decor-1.jpg'], '{"size": "8x6 feet", "material": "Pure Wool", "origin": "Kashmir"}', true),
('Premium Modular Kitchen', 'modular_kitchen', 'Complete modular kitchen setup with German hardware and laminated finish.', 185000, 'Kitchen Kraft', ARRAY['/demo-kitchen-1.jpg'], '{"finish": "Laminate", "hardware": "German Blum", "warranty": "5 years"}', true),
('Eco-Friendly Wall Paint', 'paints', 'VOC-free interior wall paint available in 50+ premium colors.', 2500, 'Green Paint Co.', ARRAY['/demo-paint-1.jpg'], '{"coverage": "140 sq ft", "finish": "Matt", "eco_friendly": "Yes"}', false),
('Luxury Sofa Set', 'furniture', 'Premium leather sofa set with ergonomic design and superior comfort.', 125000, 'Comfort Furniture', ARRAY['/demo-furniture-2.jpg'], '{"material": "Genuine Leather", "seating": "3+2", "warranty": "3 years"}', false),
('Designer Floor Tiles', 'tiles', 'Contemporary geometric patterned tiles perfect for modern interiors.', 12000, 'Pattern Pro', ARRAY['/demo-tiles-2.jpg'], '{"size": "30x30 cm", "pattern": "Geometric", "slip_resistance": "R10"}', false),
('Smart LED Strip Lights', 'lighting', 'RGB LED strip lights with smartphone app control and music sync.', 8500, 'Smart Illumination', ARRAY['/demo-lighting-2.jpg'], '{"length": "5 meters", "control": "Smartphone App", "features": "Music Sync"}', true),
('Artisan Wall Decor', 'decor', 'Handcrafted metal wall art with traditional Indian motifs and modern appeal.', 15000, 'Artisan Creations', ARRAY['/demo-decor-2.jpg'], '{"material": "Wrought Iron", "size": "100x60 cm", "finish": "Antique Bronze"}', false);