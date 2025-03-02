import React from "react";
import { AppBar } from "@mui/material";
import Header from "./modules/Header";
import { MAIN_COLORS } from "./shared/colors";

const App = () => {
  return (
    <AppBar sx={{ backgroundColor: MAIN_COLORS.mainBG }}>
      <Header />
    </AppBar>
  );
};

export default App;
