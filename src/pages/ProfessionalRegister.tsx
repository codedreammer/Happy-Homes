import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/ui/navbar";
import { Upload, User, MapPin, Briefcase, Phone, Mail } from "lucide-react";

export default function ProfessionalRegister() {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    experience: "",
    location: "",
    email: "",
    phone: "",
    portfolio: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />
      
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-card rounded-2xl shadow-soft">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-primary mb-2">
              Register as a Professional
            </CardTitle>
            <p className="text-xl font-semibold text-muted-foreground leading-relaxed">
              Join DesifyHub and connect with homeowners looking for your expertise
            </p>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Profession
                </Label>
                <Select onValueChange={(value) => setFormData({ ...formData, profession: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="architect">Architect</SelectItem>
                    <SelectItem value="interior-designer">Interior Designer</SelectItem>
                    <SelectItem value="civil-engineer">Civil Engineer</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="skilled-worker">Skilled Worker</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g., 5"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location (City)
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Mumbai, Maharashtra"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Portfolio Upload
                </Label>
                <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-primary transition-colors">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload your portfolio or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                  <input
                    id="portfolio"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.files?.[0] || null })}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-elegant hover-lift"
              >
                Register as Professional
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}