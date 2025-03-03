import React from "react";
import { AppBar, Box } from "@mui/material";
import { Home } from "./modules/Home";
import { MAIN_COLORS } from "./shared/colors";
import Footer from "./modules/Footer";
import Header from "./modules/Header";

const App = () => {
  return (
    <AppBar sx={{ height: "100%", backgroundColor: MAIN_COLORS.mainBG }}>
      <Header />
      <Footer />
    </AppBar>
  );
};

export default App;
