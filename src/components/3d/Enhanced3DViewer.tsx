import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';

interface Enhanced3DViewerProps {
  modelUrl?: string;
  productName?: string;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

function DefaultScene() {
  return (
    <group>
      {/* Main product representation */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.5, 1]} />
        <meshStandardMaterial color="#8B5A3C" />
      </mesh>
      
      {/* Decorative elements */}
      <mesh position={[-0.8, 0.8, 0.6]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#D69E2E" />
      </mesh>
      <mesh position={[0.8, 0.8, 0.6]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#D69E2E" />
      </mesh>
    </group>
  );
}

export function Enhanced3DViewer({ modelUrl, productName }: Enhanced3DViewerProps) {
  return (
    <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden relative" aria-label={`3D view of ${productName ?? 'product'}`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [4, 4, 4], fov: 50 }}
          shadows
          className="w-full h-full"
        >
          <Environment preset="studio" />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* Model or fallback */}
          {modelUrl ? (
            <Model url={modelUrl} />
          ) : (
            <DefaultScene />
          )}
          
          {/* Ground and shadows */}
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={4.5}
          />
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
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