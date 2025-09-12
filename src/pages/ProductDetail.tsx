import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Heart, Package, Star, Lock, Eye, ShoppingCart } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { useToast } from "@/hooks/use-toast";
import { Simple3DViewer } from "@/components/3d/Simple3DViewer";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  vendor: string;
  images: string[];
  specifications: any;
  is_featured: boolean;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProduct();
      if (user) {
        checkWishlistStatus();
      }
    }
  }, [id, user]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast({
        title: "Error",
        description: "Failed to load product details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkWishlistStatus = async () => {
    if (!user || !id) return;
    
    try {
      const { data, error } = await supabase
        .from("client_wishlist")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setIsInWishlist(!!data);
    } catch (error) {
      console.error("Error checking wishlist:", error);
    }
  };

  const toggleWishlist = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your wishlist.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isInWishlist) {
        const { error } = await supabase
          .from("client_wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", id);

        if (error) throw error;
        setIsInWishlist(false);
        toast({
          title: "Removed from wishlist",
          description: "Product removed from your wishlist.",
        });
      } else {
        const { error } = await supabase
          .from("client_wishlist")
          .insert({
            user_id: user.id,
            product_id: id,
          });

        if (error) throw error;
        setIsInWishlist(true);
        toast({
          title: "Added to wishlist",
          description: "Product added to your wishlist.",
        });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to update wishlist.",
        variant: "destructive",
      });
    }
  };

  const formatCategory = (category: string) => {
    return category.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-6 bg-muted rounded w-1/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Link 
          to="/products" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                {product.is_featured && (
                  <Badge className="bg-accent text-accent-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="secondary">{formatCategory(product.category)}</Badge>
                <span className="text-sm text-muted-foreground">by {product.vendor}</span>
              </div>
              
              <div className="text-3xl font-bold text-primary mb-6">
                {formatCurrency(product.price)}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1">
                        <span className="text-sm text-muted-foreground capitalize">
                          {key.replace(/_/g, " ")}:
                        </span>
                        <span className="text-sm font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-3">
                <Button 
                  className="flex-1 bg-gradient-primary hover:shadow-elegant hover-lift"
                  size="lg"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Contact Vendor
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleWishlist}
                  className="hover-lift"
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      isInWishlist ? 'fill-destructive text-destructive' : ''
                    }`} 
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Viewer & AR Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 3D Product Viewer */}
            <Card className="hover-lift shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  3D Product Viewer
                </CardTitle>
                <CardDescription>
                  Explore this product in 3D to see every detail
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square rounded-lg overflow-hidden relative">
                  <Simple3DViewer productName={product.name} />
                </div>
              </CardContent>
            </Card>

          {/* AR Viewer - Premium Feature */}
          <Card className="hover-lift shadow-soft relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 z-0"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  AR Preview
                </div>
                <Badge className="bg-gradient-primary text-primary-foreground">
                  <Lock className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              </CardTitle>
              <CardDescription>
                See how this product looks in your space with AR technology
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg flex items-center justify-center text-center p-8 border border-dashed border-primary/20">
                <div>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                    <Lock className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">Upgrade to Access AR Preview</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Visualize this product in your own space using augmented reality
                  </p>
                  <Button variant="outline" className="hover-lift">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}