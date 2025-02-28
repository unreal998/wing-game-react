import React from "react";
import { AppBar, Box } from "@mui/material";
import { Home } from "./modules/Home";
import { MAIN_COLORS } from "./shared/colors";
import Footer from "./modules/Footer";

const App = () => {
  return (
    <AppBar sx={{ height: "100%", backgroundColor: MAIN_COLORS.mainBG }}>
      <Box sx={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
        <Footer />
      </Box>
    </AppBar>
  );
};

export default App;
