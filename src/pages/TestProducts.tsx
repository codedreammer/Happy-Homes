import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";
import { addTestProducts } from "@/utils/add-test-products";
import { useToast } from "@/hooks/use-toast";

export default function TestProducts() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddProducts = async () => {
    setLoading(true);
    try {
      await addTestProducts();
      toast({
        title: "Success",
        description: "Test products with 3D models added successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add test products.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Card>
          <CardHeader>
            <CardTitle>Add Test Products with 3D Models</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Click the button below to add test products with 3D model URLs to your database.
              These products will have working model-viewer components.
            </p>
            <Button 
              onClick={handleAddProducts} 
              disabled={loading}
              className="bg-gradient-primary"
            >
              {loading ? "Adding..." : "Add Test Products"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}