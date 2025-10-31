import { useCallback, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import "./global.css";
import { MAIN_COLORS } from "./shared/colors";
import Referal from "./modules/Referal_temp";
import { Box, Button, useMediaQuery } from "@mui/material";
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
import { selectSelectedCountry } from "./modules/Home/selectors";
import Footer from "./modules/Footer";
import {
  selectCurrentModule,
  selectIsTutorialFinished,
} from "./modules/Tutorial/selectors";
import { setIsTutorialFinished } from "./modules/Tutorial/slices";
import {
  selectUserData,
  selectUserId,
  selectUserSettings,
} from "./modules/Header/selectors";
import Lottie from "lottie-react";
import { Tutorial } from "./modules/Tutorial";
import { setSoundEnabled } from "./modules/Settings/slices";
import { clearSelectedCountry } from "./modules/Home/slices";
import { ModalComponent } from "./shared/components/ModalComponent";
import { selectErrors } from "./shared/selectErrors";
import { useTranslation } from "react-i18next";
import LoaderComponent from "./shared/components/LoaderComponent";
import { PopUpMainButton } from "./shared/components/PopUpMainButton";
import { completeMissionAction } from "./modules/Missions/slices";
import { Scoreboard } from "./modules/Scoreboard";
import Investitions from "./modules/Investitions";

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
  const userData = useSelector(selectUserData());
  const booting = !userData;
  const { t } = useTranslation();
  const selectedCountry = useSelector(selectSelectedCountry());
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const currentStep = useSelector(selectCurrentModule());
  const isSmallScreen = useMediaQuery("(max-width: 376px)");
  const userSettings = useSelector(selectUserSettings());
  const userId = useSelector(selectUserId());
  const [openError, setOpenError] = useState(false);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
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

  const triggerSubscribeModal = () => {
    setTimeout(() => {
      setSubscribeModalOpen(true);
    }, 90000);
  };

  const handleNavigate = useCallback(() => {
    if (!userId) return;

    dispatch(
      completeMissionAction({
        mission: {
          id: 138,
          status: "new",
        },
        uid: userId,
      }),
    );

    setTimeout(() => {
      window.location.href = "https://t.me/TurbineX_channel";
    }, 1000);

    setSubscribeModalOpen(false);
  }, [userId, dispatch]);

  useEffect(() => {
    if (userData) {
      const subscribeMisssion = userData.missions.find((m) => m.id === 138);
      if (!subscribeMisssion) {
        triggerSubscribeModal();
      }
    }
  }, [userData]);

  return (
    <>
      <LoaderComponent loading={booting} />
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
            <Route path="/investitions" element={<Investitions />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
          </Routes>
        </Box>
        {location.pathname !== "/" && <Footer />}

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
        {!booting && <Tutorial />}
        <ModalComponent
          openModal={openError}
          handleCloseModal={handleCloseErrorModal}
          title={t("errTitle")}
          subtitle={activeErrors.join("\n")}
        />
        <ModalComponent
          openModal={subscribeModalOpen}
          handleCloseModal={() => {
            setSubscribeModalOpen(false);
            triggerSubscribeModal();
          }}
          title={t("subscribeTitle")}
          subtitle={t("subscribeSubtitle")}
          additionalbutton={
            <PopUpMainButton onClick={handleNavigate}>
              {t("subscribe")}
            </PopUpMainButton>
          }
        />
      </Box>
    </>
  );
};

export default App;
