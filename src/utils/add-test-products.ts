import { supabase } from "@/integrations/supabase/client";

export const addTestProducts = async () => {
  const testProducts = [
    {
      name: 'Modern Armchair',
      category: 'furniture' as const,
      description: 'A comfortable modern armchair with premium fabric upholstery.',
      price: 2500000,
      vendor: 'Design Studio',
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'],
      specifications: { material: 'Fabric', dimensions: '80x85x90cm', weight: '25kg' },
      is_featured: true
    },
    {
      name: 'Wooden Coffee Table',
      category: 'furniture' as const,
      description: 'Handcrafted wooden coffee table with modern design.',
      price: 1800000,
      vendor: 'Wood Works',
      images: ['https://images.unsplash.com/photo-1549497538-303791108f95?w=500'],
      specifications: { material: 'Oak Wood', dimensions: '120x60x45cm', weight: '30kg' },
      is_featured: false
    },
    {
      name: 'LED Pendant Light',
      category: 'lighting' as const,
      description: 'Modern LED pendant light with adjustable brightness.',
      price: 1200000,
      vendor: 'Light House',
      images: ['https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500'],
      specifications: { material: 'Metal & Glass', power: '15W LED', height: '30cm' },
      is_featured: true
    }
  ];

  const { data, error } = await supabase
    .from('products')
    .insert(testProducts)
    .select();

  if (error) throw error;
  return data;
};