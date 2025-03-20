import { Box } from "@mui/material";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ButtonGame } from "../../shared/ButtonGame";
import { useNavigate } from "react-router-dom";
import { StyledPlanetBox } from "./components/StyledPlanetBox";
import { StyledButtonGame } from "./components/StyledButtonGame";

const Model = () => {
  const location = useLocation();
  const { scene, animations } = useGLTF("/usa.glb");
  const { actions } = useAnimations(animations, scene);
  scene.position.set(0, 0, 0);

  return <primitive object={scene} />;
};

export const Planet = () => {
  const navigate = useNavigate();

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

      <StyledPlanetBox>
        {[
          ["USA", "Dania"],
          ["Netherlands", "Germany"],
        ].map((row, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              gap: "10px",
            }}
          >
            {row.map((country) => (
              <StyledButtonGame key={country} onClick={() => navigate("/")}>
                {country}
              </StyledButtonGame>
            ))}
          </Box>
        ))}
      </StyledPlanetBox>
    </Box>
  );
};
