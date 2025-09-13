-- First, add model_url column to products table if it doesn't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS model_url TEXT;

-- Insert test products with 3D model URLs
INSERT INTO products (
  name, 
  category, 
  description, 
  price, 
  vendor, 
  images, 
  specifications, 
  is_featured, 
  model_url
) VALUES 
(
  'Modern Armchair',
  'furniture',
  'A comfortable modern armchair with premium fabric upholstery.',
  2500000,
  'Design Studio',
  ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'],
  '{"material": "Fabric", "dimensions": "80x85x90cm", "weight": "25kg"}',
  true,
  'https://modelviewer.dev/shared-assets/models/Astronaut.glb'
),
(
  'Wooden Coffee Table',
  'furniture', 
  'Handcrafted wooden coffee table with modern design.',
  1800000,
  'Wood Works',
  ARRAY['https://images.unsplash.com/photo-1549497538-303791108f95?w=500'],
  '{"material": "Oak Wood", "dimensions": "120x60x45cm", "weight": "30kg"}',
  false,
  'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb'
),
(
  'Designer Lamp',
  'lighting',
  'Contemporary floor lamp with adjustable brightness.',
  750000,
  'Light House',
  ARRAY['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'],
  '{"power": "60W", "height": "150cm", "material": "Metal"}',
  true,
  'https://modelviewer.dev/shared-assets/models/reflectiveSphere.gltf'
);