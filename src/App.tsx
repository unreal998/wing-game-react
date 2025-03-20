import React, { useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { MAIN_COLORS } from "./shared/colors";
import Referal from "./modules/Referal_temp";
import { Box } from "@mui/material";
import Footer from "./modules/Footer";
import Header from "./modules/Header";
import Settings from "./modules/Settings";
import { Home } from "./modules/Home";
import { Route, Routes } from "react-router-dom";
import Missions from "./modules/Missions";
import Wallet from "./modules/Wallet";
import Shop from "./modules/Shop";
import { Planet } from "./modules/Planet";
import { useDispatch } from "react-redux";
import { initAction } from "./modules/Header/slices";
import { UserInitData } from "./shared/types";
import { WebAppInitData } from "@twa-dev/types";
import { USER_MOCK_TELEGRAM_DATA } from "./shared/constants";

function convertToUserData(
  userData: WebAppInitData["user"] | undefined,
): UserInitData {
  if (!userData) {
    return USER_MOCK_TELEGRAM_DATA;
  }
  return {
    telegramID: userData.id,
    firstName: userData.first_name,
    lastName: userData.last_name || "",
    userName: userData.username || "",
    language: userData.language_code || "",
  };
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      if (WebApp.platform !== "unknown" && WebApp.platform !== "tdesktop") {
        WebApp.requestFullscreen();
        WebApp.disableVerticalSwipes();
      }
      WebApp.lockOrientation();
      const userTelegramData = WebApp.initDataUnsafe?.user;
      const userInitData = convertToUserData(userTelegramData);
      if (userInitData) {
        dispatch(initAction(userInitData));
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

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
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Planet />} />
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
