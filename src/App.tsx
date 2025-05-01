import React, { useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { MAIN_COLORS } from "./shared/colors";
import Referal from "./modules/Referal_temp";
import { Box } from "@mui/material";
import Header from "./modules/Header";
import Settings from "./modules/Settings";
import { Home } from "./modules/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Missions from "./modules/Missions";
import Wallet from "./modules/Wallet";
import Shop from "./modules/Shop";
import { Planet } from "./modules/Planet";
import { useDispatch, useSelector } from "react-redux";
import { initAction } from "./modules/Header/slices";
import { UserInitData } from "./shared/types";
import { WebAppInitData } from "@twa-dev/types";
import { USER_MOCK_TELEGRAM_DATA } from "./shared/constants";
import ErrorPopup from "./shared/components/ErrorPopup";
import { selectSelectedCountry } from "./modules/Home/selectors";
import Lottie from "lottie-react";
import Footer from "./modules/Footer";
import {
  selectCurrentModule,
  selectIsTutorialFinished,
} from "./modules/Tutorial/selectors";
import { setIsTutorialFinished } from "./modules/Tutorial/slices";

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
  const location = useLocation();
  const dispatch = useDispatch();
  const selectedCountry = useSelector(selectSelectedCountry());
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const currentStep = useSelector(selectCurrentModule());

  useEffect(() => {
    if (localStorage.getItem("isTutorialFinished") === "true") {
      dispatch(setIsTutorialFinished(true));
    }
    if (currentStep === 14) {
      localStorage.setItem("isTutorialFinished", "true");
      dispatch(setIsTutorialFinished(true));
    }
  }, [currentStep, dispatch, isTutorialFinished]);

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
        backgroundImage: `${
          selectedCountry.name ? `url(./${selectedCountry.name}BG.png)` : "none"
        }`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        color: "white",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Header />
      <ErrorPopup />
      <Box sx={{ flexGrow: 1, zIndex: 100 }}>
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
      {selectedCountry?.name && (
        <Box
          sx={{
            position: "absolute",
            top: "240px",
            left: 0,
            zIndex: 0,
            transform: "matrix(2.2, 0, 0, 2.2, 0, 0)",
          }}
        >
          {location.pathname !== "/home" && location.pathname !== "/" && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#01121DD9",
                zIndex: 1,
              }}
            />
          )}
          <Lottie
            animationData={require(
              `./assets/animations/${selectedCountry.name}Anim.json`,
            )}
            loop
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default App;
