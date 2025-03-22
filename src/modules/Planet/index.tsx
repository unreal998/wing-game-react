import { Box } from "@mui/material";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { StyledPlanetBox } from "./components/StyledPlanetBox";
import { StyledButtonGame } from "./components/StyledButtonGame";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCountry } from "../Home/slices";
import { selectAreasData } from "../Header/selectors";
import { AreaType } from "../../shared/types";

const Model = () => {
  const { scene } = useGLTF("/earth.glb");
  scene.position.set(0, 0, 0);

  return <primitive object={scene} />;
};

export const Planet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const areasData = useSelector(selectAreasData());

  const handleButtonPress = useCallback(
    (selectedCountry: AreaType) => {
      dispatch(setSelectedCountry(selectedCountry));
      navigate("/home");
    },
    [dispatch, navigate],
  );

  return (
    <Box sx={{ width: "100%", height: "80vh", marginTop: "-10px" }}>
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
        {areasData &&
          areasData?.length &&
          areasData.map((country, index) => (
            <StyledButtonGame
              key={country.name}
              disabled={!country.available}
              onClick={() => handleButtonPress(country)}
            >
              {country.title}
            </StyledButtonGame>
          ))}
      </StyledPlanetBox>
    </Box>
  );
};
