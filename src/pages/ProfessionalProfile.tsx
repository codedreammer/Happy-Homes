import { useParams } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, Mail, Calendar, Award } from "lucide-react";

const professionals = [
  {
    id: 1,
    name: "Canna Khosla",
    profession: "Interior Designer",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    experience: "8 years experience",
    image: "https://imgs.search.brave.com/TDVh93qIHs-TWgvd3Ow6CyD7HPxFJ721wIZqaFwzdKs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXJjaGl0ZWN0YW5k/aW50ZXJpb3JzaW5k/aWEuY29tL2Nsb3Vk/LzIwMjEvMTEvMTUv/Q2FubmEuanBn",
    phone: "+91 98765 43210",
    email: "canna@designstudio.com",
    about: "Award-winning interior designer with 8 years of experience in residential and commercial projects. Specializes in modern and contemporary designs.",
    services: ["Interior Design", "Space Planning", "3D Visualization", "Furniture Selection"],
    projects: 45
  },
  {
    id: 2,
    name: "Shimul Javeri Kadri",
    profession: "Architect",
    location: "Bangalore, Karnataka",
    rating: 4.8,
    experience: "6 years experience",
    image: "https://imgs.search.brave.com/leLfHHpLwEGqAdd-07LFthSvm8gD5l5C4LjZJ9SwvZY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYXJjaGl0ZWN0/dXJlcGx1c2Rlc2ln/bi5pbi93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wMy8xMzEy/MjgxMy9TaGltdWwt/SmF2ZXJpLUthZHJp/LUZvdW5kaW5nLVBh/cnRuZXItU0pLLUFy/Y2hpdGVjdHMtaW5z/aWRlLWltYWdlLTU3/Ni14LTcyMC12ZXJ0/aWNhbC5qcGc",
    phone: "+91 87654 32109",
    email: "shimul@sjkarchitects.com",
    about: "Innovative architect focused on sustainable design and modern architecture. Expert in residential and commercial building design.",
    services: ["Architectural Design", "Planning Permission", "3D Modeling", "Project Management"],
    projects: 32
  }
];

export default function ProfessionalProfile() {
  const { id } = useParams();
  const professional = professionals.find(p => p.id === parseInt(id || "1"));

  if (!professional) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Professional Not Found</h1>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <img
                src={professional.image}
                alt={professional.name}
                className="w-48 h-48 rounded-full mx-auto md:mx-0 object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{professional.name}</h1>
                    <Badge className="mb-2">{professional.profession}</Badge>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      {professional.location}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{professional.rating}</span>
                      <span className="text-muted-foreground">• {professional.experience}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="bg-gradient-primary">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">{professional.about}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-medium">{professional.projects} Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {professional.services.map((service, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>{professional.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>{professional.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{professional.location}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}