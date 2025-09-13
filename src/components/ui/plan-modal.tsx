import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Share2, Eye, Ruler, Home } from "lucide-react";

interface PlanModalProps {
  product: {
    id: string;
    name: string;
    category: string;
  };
  trigger?: React.ReactNode;
}

export function PlanModal({ product, trigger }: PlanModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="gap-2">
      <FileText className="h-4 w-4" />
      View Plans
    </Button>
  );

  // Mock plan data - in real app, this would come from your database
  const planData = {
    floorPlan: "/placeholder.svg",
    elevations: ["/placeholder.svg", "/placeholder.svg"],
    sections: ["/placeholder.svg"],
    details: ["/placeholder.svg", "/placeholder.svg"],
    specifications: {
      dimensions: "120cm x 60cm x 45cm",
      material: "Premium Oak Wood",
      finish: "Natural Wood Stain",
      weight: "30kg",
      assembly: "Required"
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{product.name} - Technical Plans</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="floor-plan" className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="floor-plan" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Floor Plan
            </TabsTrigger>
            <TabsTrigger value="elevations" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Elevations
            </TabsTrigger>
            <TabsTrigger value="sections" className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Sections
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Details
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="floor-plan" className="flex-1 mt-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Floor Plan
                  <Badge variant="secondary">Scale 1:50</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                  <img 
                    src={planData.floorPlan} 
                    alt="Floor Plan"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {Object.entries(planData.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="elevations" className="flex-1 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {planData.elevations.map((elevation, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>Elevation {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                      <img 
                        src={elevation} 
                        alt={`Elevation ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sections" className="flex-1 mt-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Cross Sections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                  <img 
                    src={planData.sections[0]} 
                    alt="Cross Section"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="flex-1 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {planData.details.map((detail, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>Detail {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                      <img 
                        src={detail} 
                        alt={`Detail ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}