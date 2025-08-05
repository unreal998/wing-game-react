import React, { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import "./global.css";
import { MAIN_COLORS } from "./shared/colors";
import Referal from "./modules/Referal_temp";
import { Box, useMediaQuery } from "@mui/material";
import Header from "./modules/Header";
import Settings from "./modules/Settings";
import { Home } from "./modules/Home";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Missions from "./modules/Missions";
import Wallet from "./modules/Wallet";
import Shop from "./modules/Shop";
import { Planet } from "./modules/Planet";
import { useDispatch, useSelector } from "react-redux";
import { initAction, updateUserSettingsAction } from "./modules/Header/slices";
import { UserInitData } from "./shared/types";
import { WebAppInitData } from "@twa-dev/types";
import { USER_MOCK_TELEGRAM_DATA } from "./shared/constants";
import ErrorPopup from "./shared/components/ErrorPopup";
import { selectSelectedCountry } from "./modules/Home/selectors";
import Footer from "./modules/Footer";
import {
  selectCurrentModule,
  selectIsTutorialFinished,
} from "./modules/Tutorial/selectors";
import { setIsTutorialFinished } from "./modules/Tutorial/slices";
import { selectUserId, selectUserSettings } from "./modules/Header/selectors";
import Lottie from "lottie-react";
import { Tutorial } from "./modules/Tutorial";
import { selectSoundEnabled } from "./modules/Settings/selectors";
import { setSoundEnabled } from "./modules/Settings/slices";
import { clearSelectedCountry } from "./modules/Home/slices";
import { ModalComponent } from "./shared/components/ModalComponent";
import { selectErrors } from "./shared/selectErrors";
import { useTranslation } from "react-i18next";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedCountry = useSelector(selectSelectedCountry());
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const currentStep = useSelector(selectCurrentModule());
  const isSmallScreen = useMediaQuery("(max-width: 376px)");
  const userSettings = useSelector(selectUserSettings());
  const userId = useSelector(selectUserId());
  const soundEnabled = useSelector(selectSoundEnabled());
  const [openError, setOpenError] = useState(false);
  const errors = useSelector(selectErrors);

  const activeErrors = errors.filter((e) => e.trim() !== "");

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (userSettings?.isTutorialFinished) {
      dispatch(setIsTutorialFinished(true));
    }
    if (currentStep === 17) {
      dispatch(setIsTutorialFinished(true));
      dispatch(
        updateUserSettingsAction({
          uid: userId,
          settings: { isTutorialFinished: true },
        }),
      );
    }
  }, [currentStep, dispatch, isTutorialFinished, userSettings, userId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        navigate("/");
        dispatch(clearSelectedCountry());
      } else if (document.visibilityState === "visible") {
        navigate("/");
        dispatch(clearSelectedCountry());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    if (typeof userSettings?.soundEnabled === "boolean") {
      dispatch(setSoundEnabled(userSettings.soundEnabled));
    }
  }, [userSettings?.soundEnabled, dispatch]);

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

  useEffect(() => {
    if (activeErrors.length > 0) {
      setOpenError(true);
    }
  }, [activeErrors]);

  const handleCloseErrorModal = () => {
    setOpenError(false);
    dispatch(clearSelectedCountry());
    navigate("/");
    window.location.reload();
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: MAIN_COLORS.appBG,
        backgroundImage: `${
          selectedCountry.name
            ? `url(./${selectedCountry.name}BG.png)`
            : "url(./PlanetBG.jpg)"
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
      <Box sx={{ flexGrow: 1, zIndex: 99 }}>
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

      {selectedCountry?.name && (
        <Box
          sx={{
            position: "absolute",
            top: "220px",
            left: 0,
            zIndex: 0,
            transform: isSmallScreen
              ? "matrix(1.6, 0, 0, 1.6, 0, 0)"
              : "matrix(2.2, 0, 0, 2.2, 0, 0)",
          }}
        >
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
      <Tutorial />
      <ModalComponent
        openModal={openError}
        handleCloseModal={handleCloseErrorModal}
        title={t("errTitle")}
        subtitle={activeErrors.join("\n")}
      />
    </Box>
  );
};

export default App;
