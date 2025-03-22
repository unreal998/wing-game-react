import { Box } from "@mui/material";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedCountry } from "./selectors";
import useSound from "use-sound";
import WindBlowing from "../../assets/sounds/windBlowing.mp3";
import BGSound from "../../assets/sounds/bgSound.mp3";
import { useLocation, useNavigate } from "react-router-dom";
import { AreaType } from "../../shared/types";

const countriesMapping = (countryName: AreaType) => {
  switch (countryName.name) {
    case "usa":
      return "/usa.glb";
    case "dk":
      return "/dania.glb";
    case "nr":
      return "/nitherland.glb";
    case "gr":
      return "/germany.glb";
    default:
      return "";
  }
};

const Model = () => {
  const location = useLocation();
  const selectedCountry = useSelector(selectSelectedCountry());
  const selectedCountryModelName = countriesMapping(selectedCountry);

  const { scene, animations } = useGLTF(selectedCountryModelName);
  const { actions } = useAnimations(animations, scene);
  const isAnimationPlaying = true;
  scene.position.set(0, 0, 0);

  const [cycleBGSound, setCycleBGSound] = useState(true);
  const [playSound, { stop }] = useSound(WindBlowing, {
    volume: 0.3,
    onend: () => setCycleBGSound(false),
  });

  useEffect(() => {
    if (!cycleBGSound && isAnimationPlaying && location.pathname === "/home") {
      playSound();
      setCycleBGSound(true);
    } else {
      stop();
    }
  }, [
    cycleBGSound,
    setCycleBGSound,
    playSound,
    isAnimationPlaying,
    location,
    stop,
  ]);

  useEffect(() => {
    if (isAnimationPlaying && location.pathname === "/home") {
      playSound();
      if (actions && Object.keys(actions).length > 0) {
        for (let key in actions) {
          actions[key]?.play();
        }
      }
    } else {
      stop();
      if (actions && Object.keys(actions).length > 0) {
        for (let key in actions) {
          actions[key]?.stop();
        }
      }
    }
  }, [isAnimationPlaying, actions, playSound, stop, location]);

  return <primitive object={scene} />;
};

export const Home = () => {
  const [cycleBGSound, setCycleBGSound] = useState(true);
  const navigate = useNavigate();
  const selectedCountry = useSelector(selectSelectedCountry());
  const [playSound] = useSound(BGSound, {
    volume: 0.7,
    onend: () => setCycleBGSound(false),
  });

  useEffect(() => {
    if (!selectedCountry.name) {
      navigate("/");
    }
  }, [navigate, selectedCountry]);

  useEffect(() => {
    if (!cycleBGSound) {
      playSound();
      setCycleBGSound(true);
    }
  }, [cycleBGSound, setCycleBGSound, playSound]);

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
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </Box>
  );
};
