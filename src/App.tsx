import React from "react";
import { AppBar } from "@mui/material";
import Header from "./modules/Header";
import { MAIN_COLORS } from "./shared/colors";
import Wallet from "./modules/Wallet";

const App = () => {
  return (
    <AppBar sx={{ backgroundColor: MAIN_COLORS.mainBG }}>
      <Header />
      <Wallet />
    </AppBar>
  );
};

export default App;
