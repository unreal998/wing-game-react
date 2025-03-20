import { Box } from "@mui/material";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDisabledPowerButton, selectSelectedCountry } from "./selectors";
import useSound from "use-sound";
import WindBlowing from "../../assets/sounds/windBlowing.mp3";
import BGSound from "../../assets/sounds/bgSound.mp3";
import { useLocation } from "react-router-dom";

const countriesMapping = (countryName: string) => {
  switch (countryName) {
    case "usa":
      return "/usa.glb";
    case "dr":
      return "/dania.glb";
    case "nr":
      return "/netherlands.glb";
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
  const [cycleBGSound, setCycleBGSound] = useState(true);
  const { actions } = useAnimations(animations, scene);
  const isAnimationPlaying = useSelector(selectDisabledPowerButton());
  scene.position.set(0, 0, 0);
  const [playSound, { stop }] = useSound(WindBlowing, {
    volume: 0.3,
    onend: () => setCycleBGSound(false),
  });

  useEffect(() => {
    if (!cycleBGSound && isAnimationPlaying && location.pathname === "/") {
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
    if (isAnimationPlaying && location.pathname === "/") {
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
  const [playSound] = useSound(BGSound, {
    volume: 0.7,
    onend: () => setCycleBGSound(false),
  });

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
