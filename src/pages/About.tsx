import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/ui/navbar";
import { 
  Target, 
  Heart, 
  Users, 
  Lightbulb, 
  Award, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Handshake
} from "lucide-react";

const teamMembers = [
  {
    name: "Arjun Patel",
    role: "Co-Founder & CEO",
    bio: "Former architect with 12+ years in luxury home design. Alumni of IIT Delhi.",
    image: "/placeholder.svg"
  },
  {
    name: "Priya Sharma",
    role: "Co-Founder & CTO", 
    bio: "Tech entrepreneur focused on digital marketplaces. Previously at Flipkart.",
    image: "/placeholder.svg"
  },
  {
    name: "Raj Kumar",
    role: "Head of Design",
    bio: "Award-winning interior designer with expertise in contemporary Indian aesthetics.",
    image: "/placeholder.svg"
  },
  {
    name: "Meera Singh",
    role: "Head of Operations",
    bio: "Operations expert with deep understanding of Indian home goods market.",
    image: "/placeholder.svg"
  }
];

const coreValues = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Every professional is verified. Every product is authentic. Every transaction is secure."
  },
  {
    icon: Star,
    title: "Excellence in Craft", 
    description: "We celebrate traditional Indian craftsmanship while embracing modern design innovation."
  },
  {
    icon: Handshake,
    title: "Community First",
    description: "Building lasting relationships between homeowners, designers, and artisans across India."
  },
  {
    icon: Globe,
    title: "Accessible Luxury",
    description: "Making premium home design affordable and accessible to every Indian family."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Our Mission</h1>
          <p className="text-xl opacity-90 leading-relaxed">
            Transforming how India experiences home design through technology, 
            community, and authentic craftsmanship.
          </p>
        </div>
      </section>

      {/* Join Our Mission CTA */}
      <section className="py-16 bg-background/80 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Be part of India's design revolution. Whether you're a homeowner dreaming of the perfect space, 
              or a professional ready to showcase your craft — your journey starts here.
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary hover:shadow-elegant hover-lift">
                Get Started Today
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent/20 text-accent-foreground">Our Story</Badge>
              <h2 className="text-4xl font-bold mb-6">From Frustration to Innovation</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  It started with a simple problem: finding the right interior designer for a home in Delhi 
                  shouldn't take months of searching through endless WhatsApp groups and unreliable references.
                </p>
                <p>
                  As architects and homeowners ourselves, we experienced firsthand the fragmented nature of 
                  India's home design industry. Talented professionals struggled to reach clients. Quality 
                  products were hard to discover. Trust was built slowly, one referral at a time.
                </p>
                <p>
                  We realized technology could bridge these gaps — not by replacing the human touch that makes 
                  design special, but by making authentic connections easier to find and trust easier to build.
                </p>
                <p>
                  Today, we're proud to be India's fastest-growing platform for home design, connecting 
                  thousands of families with verified professionals and premium products across the country.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src="/placeholder.svg" 
                  alt="Our story" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm opacity-90">Happy Homes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Mission & Vision</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Driving India's design revolution through innovation, accessibility, and authentic craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-lift shadow-soft bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  To democratize access to exceptional home design by connecting every Indian family 
                  with verified professionals and authentic products through a trusted, technology-enabled platform.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">Make quality design accessible to all budgets</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">Empower local artisans and designers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">Build trust through transparency</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift shadow-soft bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  To become the definitive platform where India's rich design heritage meets modern innovation, 
                  creating beautiful, sustainable homes that reflect our diverse cultural identity.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">Lead India's design transformation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">Preserve traditional craftsmanship</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">Inspire sustainable living</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why This Matters in India */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary">Why India Needs This</Badge>
            <h2 className="text-4xl font-bold mb-6">Design Democracy for Bharat</h2>
          </div>
          
          <Card className="shadow-elegant border-none bg-gradient-to-br from-background to-background/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  India is home to over 250 million households, each with unique dreams for their living spaces. 
                  Yet the home design industry remains fragmented, with most families struggling to find 
                  reliable professionals and authentic products.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">70%</div>
                    <div className="text-sm">of families rely on word-of-mouth to find designers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">40%</div>
                    <div className="text-sm">report being unsatisfied with their home projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">85%</div>
                    <div className="text-sm">want more transparency in pricing and quality</div>
                  </div>
                </div>

                <p className="leading-relaxed mb-4">
                  Our platform addresses these challenges by leveraging technology to create trust, 
                  transparency, and accessibility. We're not just building a marketplace — we're 
                  nurturing an ecosystem where:
                </p>

                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start">
                    <Heart className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    Local artisans gain global reach while preserving traditional techniques
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    Middle-class families access premium design services at affordable prices
                  </li>
                  <li className="flex items-start">
                    <Award className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    Quality standards elevate the entire industry through verified ratings and reviews
                  </li>
                </ul>

                <p className="leading-relaxed mt-6">
                  This is about more than home improvement — it's about empowering millions of Indians 
                  to create spaces that truly reflect their aspirations, culture, and values.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-background/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide every decision we make and every relationship we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="hover-lift shadow-soft text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              The passionate individuals building India's design future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover-lift shadow-soft text-center group">
                <CardHeader className="pb-4">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-primary p-0.5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-background">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of satisfied homeowners who've discovered their perfect design partners through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/professionals">
              <Button size="lg" variant="secondary" className="hover-lift min-w-48">
                Find Professionals
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="secondary" className="hover-lift min-w-48">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}