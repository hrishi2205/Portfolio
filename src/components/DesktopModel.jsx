import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// This component loads your GLTF model
const Model = () => {
  // The path '/dekstop_pc/scene.gltf' points to the public directory
  const { scene } = useGLTF("/desktop_pc/scene.gltf");
  return (
    <primitive
      object={scene}
      scale={0.4}
      position={[1, 0.5, 0]}
      rotation={[0, -Math.PI / 2, 0]}
    />
  ); // Adjust scale as needed
};

export const DesktopModel = () => {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 8], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.8} />

        <Model />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8} // Faster spin
        />
      </Suspense>
    </Canvas>
  );
};
