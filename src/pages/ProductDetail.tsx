import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  model_url?: string;
  category: string;
  description: string;
  price: number;
  vendor: string;
  images: string[];
  specifications: any;
  is_featured: boolean;
}
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Heart, Package, Star, Lock, Eye, ShoppingCart } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { useToast } from "@/hooks/use-toast";

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
        .select("id, name, category, description, price, vendor, images, specifications, is_featured")
        .eq("id", String(id))
        .single();

      if (error) throw error;

      if (data) {
        setProduct(data as Product);    
      }
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
          .eq("product_id", String(id));
        

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
            product_id: String(id),
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

        {/* 3D Viewer Section */}
        {product.model_url && (
          <div className="mt-16 space-y-8">
            <Card className="hover-lift shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  3D Viewer
                </CardTitle>
                <CardDescription>
                  Explore this product in interactive 3D
                </CardDescription>
              </CardHeader>
              <CardContent>
                <model-viewer
                  src={product.model_url}
                  camera-controls
                  auto-rotate
                  style={{ width: '100%', height: '400px' }}
                  alt={product.name}
                ></model-viewer>
              </CardContent>
            </Card>

            {/* AR Section - Pro Only */}
            <Card className="hover-lift shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  AR Viewer
                  <Badge className="ml-2 bg-gradient-primary text-primary-foreground">Pro</Badge>
                </CardTitle>
                <CardDescription>
                  View this product in your space with augmented reality
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user ? (
                  <model-viewer
                    src={product.model_url}
                    ar
                    ar-modes="scene-viewer quick-look webxr"
                    camera-controls
                    auto-rotate
                    style={{ width: '100%', height: '400px' }}
                    alt={product.name}
                  ></model-viewer>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">This feature is only available for Pro members</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Upgrade to Pro to access AR viewing and see how products look in your space
                    </p>
                    <Link to="/subscribe">
                      <Button className="bg-gradient-primary hover:shadow-elegant hover-lift">
                        Upgrade to Pro
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}