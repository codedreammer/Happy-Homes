import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Package, 
  Home, 
  Shield, 
  Sparkles, 
  TrendingUp,
  Award,
  Globe,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Expert Professionals",
      description: "Connect with verified interior designers, architects, and contractors across India.",
      stats: "1000+ Professionals"
    },
    {
      icon: Package,
      title: "Premium Products",
      description: "Discover high-quality furniture, tiles, lighting, and home decor from trusted vendors.",
      stats: "500+ Products"
    },
    {
      icon: Shield,
      title: "Verified Quality",
      description: "All professionals and products are verified for quality and authenticity.",
      stats: "100% Verified"
    },
    {
      icon: Award,
      title: "Best Prices",
      description: "Get competitive prices and exclusive deals on premium home design products.",
      stats: "Best Rates"
    }
  ];

  const categories = [
    { name: "Interior Designers", count: "300+", color: "bg-primary" },
    { name: "Architects", count: "250+", color: "bg-accent" },
    { name: "Contractors", count: "400+", color: "bg-primary-glow" },
    { name: "Decorators", count: "150+", color: "bg-secondary" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose DesifyHub?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              India's most trusted platform connecting homeowners with design professionals and premium products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover-lift shadow-soft hover:shadow-warm">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <Badge variant="secondary" className="mx-auto">
                    {feature.stats}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect professional for your home design needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => (
              <Card key={index} className="hover-lift shadow-soft hover:shadow-warm cursor-pointer bg-[#4A4A7A] border-[#4A4A7A]">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 opacity-20`}>
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1 text-white">{category.name}</h3>
                  <p className="text-sm text-white/70">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-gradient-primary hover:shadow-elegant hover-lift" asChild>
              <Link to="/professionals">
                Explore All Professionals
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Sparkles className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Home?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of satisfied customers who found their perfect design professionals through DesifyHub
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-6 hover-lift"
                asChild
              >
                <Link to="/professionals">Find Professionals</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 hover-lift border-white/40 text-white bg-white/20 hover:bg-white/30"
                asChild
              >
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-primary-foreground/20">
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="opacity-80">Cities Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">10k+</div>
                <div className="opacity-80">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="opacity-80">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Home className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Happy House
                </span>
              </div>
              <p className="text-muted-foreground">
                India's premier platform for connecting homeowners with design professionals and premium home products.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/professionals" className="hover:text-primary">Find Professionals</Link></li>
                <li><Link to="/products" className="hover:text-primary">Browse Products</Link></li>
                <li><Link to="/auth" className="hover:text-primary">Sign Up</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Globe className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <TrendingUp className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Award className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Happy House. All rights reserved. Built with ❤️ in India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
