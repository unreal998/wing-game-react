import React from "react";
import { AppBar, Box } from "@mui/material";
import { Home } from "./modules/Home";
import Header from "./modules/Header/Header";
import { MAIN_COLORS } from "./shared/colors";

const App = () => {
  return (
    <AppBar sx={{ backgroundColor: MAIN_COLORS.mainBG }}>
      <Header />
    </AppBar>
  );
};

export default App;
