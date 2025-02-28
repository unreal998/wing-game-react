import React from "react";
import { AppBar } from "@mui/material";
import { Home } from "./modules/Home";
import { MAIN_COLORS } from "./shared/colors";
import Footer from "./modules/Footer";

const App = () => {
  return (
    <AppBar sx={{ backgroundColor: MAIN_COLORS.mainBG }}>
      <Footer />
    </AppBar>
  );
};

export default App;
