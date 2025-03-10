import React, { useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { MAIN_COLORS } from "./shared/colors";
import Referal from "./modules/referal";
import { Box } from "@mui/material";
import Footer from "./modules/Footer";
import Header from "./modules/Header";
import Settings from "./modules/Settings";
import { Home } from "./modules/Home";
import { Route, Routes } from "react-router-dom";
import Missions from "./modules/Missions";
import Wallet from "./modules/Wallet";
import Shop from "./modules/Shop";
import "./i18n";

const App = () => {
  useEffect(() => {
    try {
      if (WebApp.platform !== "unknown" && WebApp.platform !== "tdesktop") {
        WebApp.requestFullscreen();
        WebApp.disableVerticalSwipes();
      }
      WebApp.lockOrientation();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: MAIN_COLORS.mainBG,
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/referal" element={<Referal />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
