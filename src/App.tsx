import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box, Button } from "@mui/material";

const Model = () => {
  const model  = useGLTF("/dania.glb");
  return <primitive object={model.scene} />;
};

export const App = () => {
  const [color, setColor] = useState("blue");

  return (
    <Box sx={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Three.js сцена */}
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Model />
        <OrbitControls />
      </Canvas>

      {/* Кнопка поверх сцени */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none", // Не блокує сцену
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: color,
            pointerEvents: "auto",
          }}
          onClick={() => setColor(color === "blue" ? "red" : "blue")}
        >
          Змінити колір
        </Button>
      </Box>
    </Box>
  );
};

export default App;
