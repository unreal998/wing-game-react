import React from "react";
import { AppBar } from "@mui/material";
import { MAIN_COLORS } from "./shared/colors";
import Referal from "./modules/referal";

const App = () => {
  return (
    <AppBar sx={{ height: "100%", backgroundColor: MAIN_COLORS.mainBG }}>
      <Referal />
    </AppBar>
  );
};

export default App;
