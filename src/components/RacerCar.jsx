import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";

const Car = React.memo(({ position }) => {
  const car = useGLTF("./classic_car/scene.gltf");

  return (
    <mesh position={position}>
      <ambientLight intensity={0.3} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.2}
        penumbra={1}
        intensity={2.0} // Slightly reduce intensity
        color="purple"
        castShadow
      />
      <pointLight intensity={1.2} color="orange" /> {/* Reduced intensity */}
      <hemisphereLight intensity={0.1} groundColor="blue" /> {/* Reduced intensity */}

      <primitive
        object={car.scene}
        scale={2.38}
        rotation={[0, Math.PI / 2, 0]} // Rotate the car 90 degrees
      />

      <directionalLight
        intensity={0.3} // Reduced intensity
        position={[0, 10, 0]}
        color="white"
        castShadow
      />
    </mesh>
  );
});

const CarCanvas = () => {
  // memoizing camera configuration to prevent unnecessary recalculations
  const cameraConfig = useMemo(() => ({ position: [20, 3, 5], fov: 25 }), []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Canvas
        frameloop="demand" // Render only when necessary
        shadows
        dpr={[1, 1.5]} // Reduce dpr for better performance
        camera={cameraConfig}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Car />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default CarCanvas;
