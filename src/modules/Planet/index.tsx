import { Box } from "@mui/material";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Model = () => {
  const location = useLocation();
  const { scene, animations } = useGLTF("/usa.glb");
  const { actions } = useAnimations(animations, scene);
  scene.position.set(0, 0, 0);

  return <primitive object={scene} />;
};

export const Planet = () => {
  return (
    <Box sx={{ width: "100%", height: "80vh" }}>
      <Canvas
        camera={{
          position: [9, 2, 0],
          rotation: [10, 45, 20],
          scale: [1, 1, 1],
        }}
      >
        <directionalLight intensity={2} position={[8, 5.5, 0]} />
        <directionalLight intensity={2} position={[-8, 5.5, 0]} />
        <directionalLight intensity={2} position={[0, 5.5, 8]} />
        <directionalLight intensity={2} position={[0, 5.5, -8]} />
        <Model />
        <OrbitControls />
      </Canvas>
    </Box>
  );
};
