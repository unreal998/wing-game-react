import React from "react";
import { Box } from "@mui/material";
import { Home } from "./modules/Home";


const App = () => {

  return (
    <Box sx={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <Home />
    </Box>
  );
};

export default App;
