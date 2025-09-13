import { supabase } from "@/integrations/supabase/client";

const professionals = [
  {
    name: "Canna Hasmukh Patel",
    profession: "interior_designer",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    experience: 8,
    image: "https://imgs.search.brave.com/TDVh93qIHs-TWgvd3Ow6CyD7HPxFJ721wIZqaFwzdKs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXJjaGl0ZWN0YW5k/aW50ZXJpb3JzaW5k/aWEuY29tL2Nsb3Vk/LzIwMjEvMTEvMTUv/Q2FubmEuanBn",
  },
  {
    name: "Shimul Javeri Kadri",
    profession: "architect",
    location: "Bangalore, Karnataka",
    rating: 4.8,
    experience: 6,
    image: "https://imgs.search.brave.com/leLfHHpLwEGqAdd-07LFthSvm8gD5l5C4LjZJ9SwvZY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYXJjaGl0ZWN0/dXJlcGx1c2Rlc2ln/bi5pbi93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wMy8xMzEy/MjgxMy9TaGltdWwt/SmF2ZXJpLUthZHJp/LUZvdW5kaW5nLVBh/cnRuZXItU0pLLUFy/Y2hpdGVjdHMtaW5z/aWRlLWltYWdlLTU3/Ni14LTcyMC12ZXJ0/aWNhbC5qcGc",
  },
  {
    name: "Seetu Kohli",
    profession: "interior_designer",
    location: "Delhi, NCR",
    rating: 4.7,
    experience: 10,
    image: "https://imgs.search.brave.com/dUs0L6COD5aBJtNzy1xWJMIATV-9P15yflFb2I0VgH0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS52b2d1ZS5pbi93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8x/Mi9TZWV0dS1rb2hs/aS5naWY.jpeg",
  },
  {
    name: "Nikhil Patel",
    profession: "contractor",
    location: "Chennai, Tamil Nadu",
    rating: 4.9,
    experience: 7,
    image: "https://imgs.search.brave.com/Vma6kSW715FcvyG0smF_-xAyBq8IAMPAYCep-xhiRV8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wYXRl/bGVuZy5jb20vaW1h/Z2VzLzQ5NzJFbWFu/ZGlfU2Fua2FyYV9S/YW9fQk9ELnBuZw",
  },
  {
    name: "Housejoy",
    profession: "contractor",
    location: "Pune, Maharashtra",
    rating: 4.8,
    experience: 9,
    image: "https://imgs.search.brave.com/Etb8QmMTSFKKsGAc4lpn7k8JswK6nP85FExd_2kNspo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMua3JlYXRlY3Vi/ZS5jb20vdXNlZnVs/bC92ZW5kb3IvbG9n/by8zNTkwNy5wbmc",
  },
  {
    name: "Vikram Joshi",
    profession: "decorator",
    location: "Jaipur, Rajasthan",
    rating: 4.6,
    experience: 12,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

export async function seedProfessionals() {
  try {
    for (const professional of professionals) {
      // Create user profile first
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          name: professional.name,
          avatar_url: professional.image,
          role: 'professional'
        })
        .select()
        .single();
        console.log(profile);

      if (profileError) {
        console.error(`Error creating profile for ${professional.name}:`, profileError);
        continue;
      }

      // Create professional record
      const { error: professionalError } = await supabase
        .from('professionals')
        .insert({
          user_id: profile.id,
          category: professional.profession,
          location: professional.location,
          rating: professional.rating,
          experience_years: professional.experience,
          hourly_rate: Math.floor(Math.random() * 2000) + 500,
          bio: `Experienced ${professional.profession.replace('_', ' ')} with ${professional.experience} years of expertise in creating beautiful spaces.`,
          specializations: [professional.profession.replace('_', ' '), 'Modern Design', 'Space Planning'],
          is_verified: true,
          is_active: true,
          total_reviews: Math.floor(Math.random() * 50) + 10
        });

      if (professionalError) {
        console.error(`Error creating professional record for ${professional.name}:`, professionalError);
      } else {
        console.log(`Successfully added ${professional.name} to database`);
      }
    }
    
    console.log('Professional seeding completed!');
  } catch (error) {
    console.error('Error seeding professionals:', error);
  }
}

seedProfessionals();