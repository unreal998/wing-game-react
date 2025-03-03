import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";

const Model = () => {
  const { scene, animations } = useGLTF("/dania.glb");
  const { actions } = useAnimations(animations, scene);
  scene.position.set(-0, -2, 0);
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      for (let key in actions) {
        actions[key]?.play();
      }
    }
  }, [actions]);

  return <primitive object={scene} />;
};

export const Home = () => {
  return (
    <Canvas camera={{ position: [7, 4, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Model />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};
