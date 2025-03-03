import React from "react";
import { MAIN_COLORS } from "./shared/colors";
import Referal from "./modules/referal";
import { AppBar, Box } from "@mui/material";
import { Home } from "./modules/Home";
import Footer from "./modules/Footer";
import Header from "./modules/Header";

const App = () => {
  return (
    <AppBar sx={{ height: "100%", backgroundColor: MAIN_COLORS.mainBG }}>
      <Header />
      <Referal />
      <Footer />
    </AppBar>
  );
};

export default App;
