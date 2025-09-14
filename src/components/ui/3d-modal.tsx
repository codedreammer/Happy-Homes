import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Maximize, RotateCcw } from "lucide-react";
import { Enhanced3DViewer } from "@/components/3d/Enhanced3DViewer";

interface Product3DModalProps {
  product: {
    id: string;
    name: string;
    model_url?: string;
    images: string[];
  };
  trigger?: React.ReactNode;
}

export function Product3DModal({ product, trigger }: Product3DModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"3d" | "ar">("3d");

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="gap-2">
      <Eye className="h-4 w-4" />
      View in 3D
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{product.name} - 3D Viewer</span>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "3d" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("3d")}
              >
                3D View
              </Button>
              <Button
                variant={viewMode === "ar" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("ar")}
              >
                AR View
                <Badge className="ml-1 text-xs bg-gradient-primary">Live</Badge>
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 relative">
          {product.model_url ? (
            <div className="h-full">
              {viewMode === "3d" ? (
                <model-viewer
                  src={product.model_url}
                  camera-controls
                  auto-rotate
                  ar
                  ar-modes="scene-viewer webxr quick-look"
                  ar-placement="floor"
                  loading="eager"
                  style={{ width: '100%', height: '100%' }}
                  alt={product.name}
                ></model-viewer>
              ) : (
                <div className="h-full">
                  <model-viewer
                    src={product.model_url || "/chesterfield-sofa.glb"}
                    camera-controls
                    auto-rotate
                    ar
                    ar-modes="scene-viewer webxr quick-look"
                    ar-placement="floor"
                    loading="eager"
                    style={{ width: '100%', height: '100%' }}
                    alt={`${product.name} in AR`}
                  ></model-viewer>
                  
                  {/* AR Controls overlay */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-2 rounded-lg">
                    <p className="mb-2">✨ AR Mode Active</p>
                    <p className="text-xs">Tap AR button to place in your space</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full">
              <Enhanced3DViewer productName={product.name} />
            </div>
          )}
          
          {/* Controls overlay */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-3 py-2 rounded-lg flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            <span>
              {viewMode === "ar" 
                ? "Tap AR button • Point camera at floor" 
                : "Click & drag to rotate • Scroll to zoom"
              }
            </span>
          </div>
          
          <div className="absolute bottom-4 right-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <Maximize className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}