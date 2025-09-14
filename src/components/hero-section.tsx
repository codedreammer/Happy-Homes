import { Button } from "@/components/ui/button";
import { Search, Sparkles, Users, Package } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern Indian home interior design" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#E2A80A]/10 via-[#E2A80A]/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Transform Your{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Home
                </span>{" "}
                with Expert{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Design
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl text-balance">
                Connect with India's finest interior designers, architects, and contractors. 
                Discover premium home products and bring your dream space to life.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-elegant hover-lift text-lg px-8 py-6"
                asChild
              >
                <Link to="/professionals">
                  <Users className="h-5 w-5 mr-2" />
                  Find Professionals
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hover-lift text-lg px-8 py-6 border-primary/20 hover:border-primary"
                asChild
              >
                <Link to="/products">
                  <Package className="h-5 w-5 mr-2" />
                  Browse Products
                </Link>
              </Button>
            </div>

            {/* Search bar */}
            <div className="pt-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for designers, architects..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background/80 backdrop-blur focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Right column - Stats/Features */}
          <div className="lg:justify-self-end animate-slide-up">
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "1000+", label: "Expert Professionals", icon: Users },
                { number: "500+", label: "Premium Products", icon: Package },
                { number: "50+", label: "Cities Covered", icon: Sparkles },
                { number: "10k+", label: "Happy Customers", icon: Search },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border hover-lift hover:shadow-warm"
                >
                  <stat.icon className="h-8 w-8 text-primary mb-3" />
                  <div className="text-2xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}