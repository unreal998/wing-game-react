import React from "react";
import { MAIN_COLORS } from "./shared/colors";
import Referal from "./modules/referal";
import { AppBar } from "@mui/material";
import Footer from "./modules/Footer";
import Header from "./modules/Header";
import Settings from "./modules/Settings";

const App = () => {
  return (
    <AppBar sx={{ height: "100%", backgroundColor: MAIN_COLORS.mainBG }}>
      <Settings />
    </AppBar>
  );
};

export default App;
