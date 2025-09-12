import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Users, Search, Filter } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";

interface Professional {
  id: string;
  user_id: string;
  category: string;
  bio: string;
  location: string;
  rating: number;
  total_reviews: number;
  hourly_rate: number;
  experience_years: number;
  specializations: string[];
  is_verified: boolean;
  profiles: {
    name: string;
    avatar_url?: string;
  };
}

export default function Professionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");

  useEffect(() => {
    fetchProfessionals();
  }, []);

  useEffect(() => {
    filterProfessionals();
  }, [professionals, searchTerm, categoryFilter, locationFilter]);

  const fetchProfessionals = async () => {
    try {
      const { data, error } = await supabase
        .from("professionals")
        .select(`
          *,
          profiles (
            name,
            avatar_url
          )
        `)
        .eq("is_active", true)
        .order("rating", { ascending: false });

      if (error) throw error;
      setProfessionals(data ?? []);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProfessionals = () => {
    let filtered = professionals;

    if (searchTerm) {
      filtered = filtered.filter(
        (prof) =>
          prof.profiles.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prof.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prof.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prof.specializations.some(spec => 
            spec.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((prof) => prof.category === categoryFilter);
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter((prof) => 
        prof.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredProfessionals(filtered);
  };

  const formatCategory = (category: string) => {
    return category.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-full"></div>
                    <div>
                      <div className="h-4 bg-muted rounded w-32 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-24"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Find Expert Professionals</h1>
            <p className="text-lg opacity-90">
              Connect with India's finest interior designers, architects, contractors, and decorators
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search professionals, specializations, locations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="interior_designer">Interior Designer</SelectItem>
                <SelectItem value="architect">Architect</SelectItem>
                <SelectItem value="contractor">Contractor</SelectItem>
                <SelectItem value="decorator">Decorator</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Professionals Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {filteredProfessionals.length} Professional{filteredProfessionals.length !== 1 ? 's' : ''} Found
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional) => (
              <Card key={professional.id} className="hover-lift shadow-soft hover:shadow-warm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {professional.profiles.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {professional.profiles.name}
                          {professional.is_verified && (
                            <Badge className="bg-primary text-primary-foreground">Verified</Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {professional.location}
                        </CardDescription>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span>{professional.rating || 0}/5</span>
                      <span>({professional.total_reviews} reviews)</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {formatCategory(professional.category)}
                    </Badge>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {professional.bio}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {professional.specializations.slice(0, 3).map((spec, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {professional.specializations.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{professional.specializations.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{professional.experience_years}+ years</span>
                      </div>
                      <div className="text-primary font-semibold">
                        {formatCurrency(professional.hourly_rate)}/hr
                      </div>
                    </div>
                    <Button size="sm" className="bg-gradient-primary hover:shadow-elegant">
                      <Users className="h-4 w-4 mr-1" />
                      Hire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No professionals found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria to find more professionals.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}