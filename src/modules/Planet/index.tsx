import { Box } from "@mui/material";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { StyledPlanetBox } from "./components/StyledPlanetBox";
import { StyledButtonGame } from "./components/StyledButtonGame";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSelectedCountry } from "../Home/slices";

const countriesData = [
  {
    title: "USA",
    name: "usa",
  },
  {
    title: "Dania",
    name: "dr",
  },
  {
    title: "Netherlands",
    name: "nr",
  },
  {
    title: "Germany",
    name: "gr",
  },
];

const Model = () => {
  const { scene } = useGLTF("/earth.glb");
  scene.position.set(0, 0, 0);

  return <primitive object={scene} />;
};

export const Planet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonPress = useCallback(
    (selectedCountry: string) => {
      dispatch(setSelectedCountry(selectedCountry));
      navigate("/home");
    },
    [dispatch, navigate],
  );

  return (
    <Box sx={{ width: "100%", height: "80vh", marginTop: "-130px" }}>
      <Canvas
        camera={{
          position: [9, 2, 20],
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
        {countriesData.map((country, index) => (
          <StyledButtonGame
            key={country.name}
            onClick={() => handleButtonPress(country.name)}
          >
            {country.title}
          </StyledButtonGame>
        ))}
      </StyledPlanetBox>
    </Box>
  );
};
