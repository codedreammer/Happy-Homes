import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";
import { 
  Star, 
  MapPin,
  Search,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Professional {
  id: string | null;
  name: string | null;
  avatar_url: string | null;
  professional_id: string | null;
  category: "interior_designer" | "architect" | "contractor" | "decorator" | null;
  bio: string | null;
  experience_years: number | null;
  hourly_rate: number | null;
  rating: number | null;
  total_reviews: number | null;
  is_verified: boolean | null;
  is_active: boolean | null;
  specializations: string[] | null;
  portfolio_images: string[] | null;
  location: string | null;
}

export default function Professionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfession, setSelectedProfession] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('public_professionals')
        .select('*')
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching professionals:', error);
        toast.error('Failed to load professionals');
        return;
      }

      setProfessionals(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filteredProfessionals = professionals.filter(professional => {
    const matchesProfession = selectedProfession === "all" || 
      professional.category === selectedProfession;
    const matchesLocation = selectedLocation === "all" || 
      (professional.location && professional.location.toLowerCase().includes(selectedLocation));
    const matchesSearch = searchTerm === "" || 
      (professional.name && professional.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (professional.category && professional.category.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesProfession && matchesLocation && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Browse Professionals</h1>
          <p className="text-xl font-semibold text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Connect with verified architects, designers, and specialists for your dream home project
          </p>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Select value={selectedProfession} onValueChange={setSelectedProfession}>
            <SelectTrigger>
              <SelectValue placeholder="Select Profession" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Professions</SelectItem>
              <SelectItem value="interior_designer">Interior Designer</SelectItem>
              <SelectItem value="architect">Architect</SelectItem>
              <SelectItem value="contractor">Contractor</SelectItem>
              <SelectItem value="decorator">Decorator</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search professionals..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Professionals Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading professionals...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">No professionals found matching your criteria.</p>
              </div>
            ) : (
              filteredProfessionals.map((professional) => (
              <Card key={professional.professional_id || professional.id || 'unknown'} className="bg-card rounded-2xl shadow-soft hover:shadow-lg p-4 transition transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="text-center mb-4">
                    <img
                      src={professional.avatar_url || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`}
                      alt={professional.name || 'Professional'}
                      className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                    />
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {professional.name || 'Anonymous Professional'}
                    </h3>
                    <p className="text-base font-semibold text-muted-foreground mb-1">
                      {professional.category && professional.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    {professional.location && (
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-3">
                        <MapPin className="h-4 w-4" />
                        {professional.location}
                      </div>
                    )}
                    
                    {professional.rating && (
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(professional.rating!)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm font-medium">{professional.rating}</span>
                        {professional.total_reviews && professional.total_reviews > 0 && (
                          <span className="text-xs text-gray-500">({professional.total_reviews} reviews)</span>
                        )}
                      </div>
                    )}
                    
                    {professional.experience_years && (
                      <p className="text-sm text-gray-600 mb-2">{professional.experience_years} years experience</p>
                    )}

                    {professional.hourly_rate && (
                      <p className="text-sm font-medium text-primary mb-4">₹{professional.hourly_rate}/hour</p>
                    )}
                    
                    <Link to={`/professional/${professional.professional_id || professional.id}`}>
                      <Button className="w-full bg-primary text-white rounded-xl hover:shadow-md transition-all">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
            )}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16">
          <Card className="bg-gradient-hero text-primary-foreground rounded-2xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-4">Are You a Design Professional?</h3>
              <p className="text-xl font-semibold text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                Join DesifyHub and connect with homeowners looking for your expertise. 
                Grow your business with our platform.
              </p>
              <Link to="/professional/register">
                <Button variant="outline" size="lg" className="bg-card text-foreground hover:bg-accent border-card">
                  Register as Professional
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}