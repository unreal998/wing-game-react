import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Model = () => {
    const model  = useGLTF("/dania.glb");
    return <primitive object={model.scene} />;
};

export const Home = () => {
    return (
        <Canvas camera={{ position: [0, 2, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <Model />
            <OrbitControls />
        </Canvas>
    );
};  