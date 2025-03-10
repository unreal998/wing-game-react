import React from "react";
import { MAIN_COLORS } from "./shared/colors";
import Referal from "./modules/referal";
import { AppBar, Box } from "@mui/material";
import Footer from "./modules/Footer";
import Header from "./modules/Header";
import { Home } from "./modules/Home";
import { Route, Routes } from "react-router-dom";
import StartPage from "./modules/StartPage";

const App = () => {
  return (
    <AppBar sx={{ height: "100%", backgroundColor: MAIN_COLORS.mainBG }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<StartPage />} />
        <Route path="/referal" element={<Referal />} />
        <Route path="/wallet" element={<Home />} />
        <Route path="/shop" element={<Home />} />
        <Route path="/settings" element={<Home />} />
        <Route path="/missions" element={<Home />} />
      </Routes>
      <Footer />
    </AppBar>
  );
};

export default App;
