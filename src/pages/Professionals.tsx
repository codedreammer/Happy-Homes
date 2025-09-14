import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";
import { 
  Star, 
  MapPin, 
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

const professionals = [
  {
    id: 1,
    name: "Canna Hasmukh Patel",
    profession: "Interior Designer",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    experience: "8 years experience",
    image: "https://imgs.search.brave.com/TDVh93qIHs-TWgvd3Ow6CyD7HPxFJ721wIZqaFwzdKs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXJjaGl0ZWN0YW5k/aW50ZXJpb3JzaW5k/aWEuY29tL2Nsb3Vk/LzIwMjEvMTEvMTUv/Q2FubmEuanBn",
  },
  {
    id: 2,
    name: "Shimul Javeri Kadri",
    profession: "Architect",
    location: "Bangalore, Karnataka",
    rating: 4.8,
    experience: "6 years experience",
    image: "https://imgs.search.brave.com/leLfHHpLwEGqAdd-07LFthSvm8gD5l5C4LjZJ9SwvZY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYXJjaGl0ZWN0/dXJlcGx1c2Rlc2ln/bi5pbi93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wMy8xMzEy/MjgxMy9TaGltdWwt/SmF2ZXJpLUthZHJp/LUZvdW5kaW5nLVBh/cnRuZXItU0pLLUFy/Y2hpdGVjdHMtaW5z/aWRlLWltYWdlLTU3/Ni14LTcyMC12ZXJ0/aWNhbC5qcGc",
  },
  {
    id: 3,
    name: "Seetu Kohli",
    profession: "Interior Designer",
    location: "Delhi, NCR",
    rating: 4.7,
    experience: "10 years experience",
    image: "https://imgs.search.brave.com/dUs0L6COD5aBJtNzy1xWJMIATV-9P15yflFb2I0VgH0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS52b2d1ZS5pbi93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8x/Mi9TZWV0dS1rb2hs/aS5naWY.jpeg",
  },
  {
    id: 4,
    name: "Nikhil Patel",
    profession: "Civil Engineer",
    location: "Chennai, Tamil Nadu",
    rating: 4.9,
    experience: "7 years experience",
    image: "https://imgs.search.brave.com/Vma6kSW715FcvyG0smF_-xAyBq8IAMPAYCep-xhiRV8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wYXRl/bGVuZy5jb20vaW1h/Z2VzLzQ5NzJFbWFu/ZGlfU2Fua2FyYV9S/YW9fQk9ELnBuZw",
  },
  {
    id: 5,
    name: "Housejoy",
    profession: "Contractor",
    location: "Pune, Maharashtra",
    rating: 4.8,
    experience: "9 years experience",
    image: "https://imgs.search.brave.com/Etb8QmMTSFKKsGAc4lpn7k8JswK6nP85FExd_2kNspo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMua3JlYXRlY3Vi/ZS5jb20vdXNlZnVs/bC92ZW5kb3IvbG9n/by8zNTkwNy5wbmc",
  },
  {
    id: 6,
    name: "Vikram Joshi",
    profession: "Skilled Worker",
    location: "Jaipur, Rajasthan",
    rating: 4.6,
    experience: "12 years experience",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

export default function Professionals() {
  const [selectedProfession, setSelectedProfession] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfessionals = professionals.filter(professional => {
    const matchesProfession = selectedProfession === "all" || 
      professional.profession.toLowerCase().replace(/\s+/g, '-') === selectedProfession;
    const matchesLocation = selectedLocation === "all" || 
      professional.location.toLowerCase().includes(selectedLocation);
    const matchesSearch = searchTerm === "" || 
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.profession.toLowerCase().includes(searchTerm.toLowerCase());
    
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
              <SelectItem value="architect">Architect</SelectItem>
              <SelectItem value="interior-designer">Interior Designer</SelectItem>
              <SelectItem value="civil-engineer">Civil Engineer</SelectItem>
              <SelectItem value="contractor">Contractor</SelectItem>
              <SelectItem value="skilled-worker">Skilled Worker</SelectItem>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-muted-foreground">No professionals found matching your criteria.</p>
            </div>
          ) : (
            filteredProfessionals.map((professional) => (
            <Card key={professional.id} className="bg-card rounded-2xl shadow-soft hover:shadow-lg p-4 transition transform hover:scale-105">
              <CardContent className="p-0">
                <div className="text-center mb-4">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-1">{professional.name}</h3>
                  <p className="text-base font-semibold text-muted-foreground mb-1">{professional.profession}</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4" />
                    {professional.location}
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(professional.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm font-medium">{professional.rating}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{professional.experience}</p>
                  
                  <Link to={`/professional/${professional.id}`}>
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