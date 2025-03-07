import { Box } from "@mui/material";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDisabledPowerButton } from "./selectors";

const Model = () => {
  const { scene, animations } = useGLTF("/dania.glb");
  const { actions } = useAnimations(animations, scene);
  const isAnimationPlaying = useSelector(selectDisabledPowerButton());
  scene.position.set(0, 0, 0);

  useEffect(() => {
    if (isAnimationPlaying) {
      if (actions && Object.keys(actions).length > 0) {
        for (let key in actions) {
          actions[key]?.play();
        }
      }
    } else {
      if (actions && Object.keys(actions).length > 0) {
        for (let key in actions) {
          actions[key]?.stop();
        }
      }
    }
  }, [isAnimationPlaying, actions]);

  return <primitive object={scene} />;
};

export const Home = () => {
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
