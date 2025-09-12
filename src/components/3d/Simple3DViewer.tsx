import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Text } from '@react-three/drei';
import { Suspense } from 'react';

interface Simple3DViewerProps {
  productName?: string;
}

function ProductBox({ productName }: { productName?: string }) {
  return (
    <group>
      {/* Main product box */}
      <Box args={[2, 1.5, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B5A3C" />
      </Box>
      
      {/* Product label */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="#4A5568"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
      >
        {productName || "3D Product Preview"}
      </Text>
      
      {/* Small decorative elements */}
      <Box args={[0.2, 0.2, 0.2]} position={[-0.8, 0.8, 0.6]}>
        <meshStandardMaterial color="#D69E2E" />
      </Box>
      <Box args={[0.2, 0.2, 0.2]} position={[0.8, 0.8, 0.6]}>
        <meshStandardMaterial color="#D69E2E" />
      </Box>
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

export function Simple3DViewer({ productName }: Simple3DViewerProps) {
  return (
    <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [4, 4, 4], fov: 50 }}
          shadows
          className="w-full h-full"
        >
          <Lighting />
          <ProductBox productName={productName} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>
      
      {/* Controls overlay */}
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        Click & drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}