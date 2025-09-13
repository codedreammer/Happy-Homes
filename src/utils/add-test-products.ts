import { supabase } from "@/integrations/supabase/client";

export const addTestProducts = async () => {
  const testProducts = [
    {
      name: 'Modern Armchair',
      category: 'furniture',
      description: 'A comfortable modern armchair with premium fabric upholstery.',
      price: 2500000,
      vendor: 'Design Studio',
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'],
      specifications: { material: 'Fabric', dimensions: '80x85x90cm', weight: '25kg' },
      is_featured: true,
      model_url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'
    },
    {
      name: 'Wooden Coffee Table',
      category: 'furniture',
      description: 'Handcrafted wooden coffee table with modern design.',
      price: 1800000,
      vendor: 'Wood Works',
      images: ['https://images.unsplash.com/photo-1549497538-303791108f95?w=500'],
      specifications: { material: 'Oak Wood', dimensions: '120x60x45cm', weight: '30kg' },
      is_featured: false,
      model_url: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb'
    },
    {
      name: 'Designer Lamp',
      category: 'lighting',
      description: 'Contemporary floor lamp with adjustable brightness.',
      price: 750000,
      vendor: 'Light House',
      images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'],
      specifications: { power: '60W', height: '150cm', material: 'Metal' },
      is_featured: true,
      model_url: 'https://modelviewer.dev/shared-assets/models/reflectiveSphere.gltf'
    }
  ];

  const { data, error } = await supabase
    .from('products')
    .insert(testProducts)
    .select();

  if (error) throw error;
  return data;
};