import React, { useCallback, useEffect, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../shared/colors";
import Gear from "../../assets/gear.svg";
import TON from "../../assets/ton.png";
import Flash from "../../assets/flash.svg";
import { useLocation, useNavigate } from "react-router-dom";
import useSound from "use-sound";
import FooterButtonPress from "../../assets/sounds/footerButton.mp3";
import WebApp from "@twa-dev/sdk";
import { StyledFlashBox } from "./components/StyledFlashBox";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "./selectors";
import {
  selectHeaderLoading,
  updateBalanceAction,
  updateDailyMissionsAction,
} from "./slices";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { clearSelectedCountry } from "../Home/slices";
import { selectCurrentModule } from "../Tutorial/selectors";
import { setCurrentModule } from "../Tutorial/slices";
import switchSound from "../../assets/sounds/switch.mp3";
import { selectSoundEnabled } from "../Settings/selectors";

const Header = () => {
  const loading = useSelector(selectHeaderLoading);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [playSound] = useSound(FooterButtonPress);
  const userData = useSelector(selectUserData());
  const currentModule = useSelector(selectCurrentModule());
  const [playSwitchSound] = useSound(switchSound);
  const soundEnabled = useSelector(selectSoundEnabled());

  useEffect(() => {
    if (userData !== null) {
      dispatch(updateBalanceAction(userData.id));
    }
  }, [dispatch, userData]);

  const handleSoundClick = useCallback(() => {
    if (soundEnabled) playSound();
    if (currentModule === 14) {
      dispatch(setCurrentModule(15));
    }
    navigate("/settings");
  }, [playSound, navigate, soundEnabled, dispatch, currentModule]);

  const handleEarthClick = useCallback(() => {
    switch (currentModule) {
      case 4:
        return dispatch(setCurrentModule(5));
      case 5:
        return dispatch(setCurrentModule(5.5));
      case 5.5:
        return dispatch(setCurrentModule(6));
      default:
        navigate("/");
        dispatch(clearSelectedCountry());
    }
  }, [navigate, dispatch, currentModule]);

  useEffect(() => {
    const oneDay = 24 * 60 * 60 * 1000;
    const nextDayMidnight = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1,
      0,
      1, // +1 minute for no rase condition
      0,
    );

    const timeToMidnight =
      nextDayMidnight.getMilliseconds() - new Date().getMilliseconds();

    let everyDayInterval: NodeJS.Timer;
    const timer = setTimeout(() => {
      dispatch(updateDailyMissionsAction());
      everyDayInterval = setInterval(() => {
        dispatch(updateDailyMissionsAction());
      }, oneDay);
    }, timeToMidnight);

    return () => {
      clearTimeout(timer);
      if (everyDayInterval) clearInterval(everyDayInterval);
    };
  }, []);

  const isMobile = useMemo(
    () =>
      WebApp.platform &&
      WebApp.platform !== "unknown" &&
      WebApp.platform !== "tdesktop",
    [],
  );

  return (
    <Stack
      sx={{
        zIndex: currentModule === 14 ? 999999 : 100,
        marginLeft: "14px",
        marginRight: "14px",
        gap: "12px",
      }}
    >
      <Stack
        sx={{
          backgroundColor: MAIN_COLORS.blockBG,
          marginTop: isMobile ? "11vh" : "2vh",
          borderRadius: "12px",
          padding: "15px",
          gap: "16px",
        }}
      >
        <LoaderComponent loading={loading} />
        <Stack width={"100%"} direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: "16px", fontWeight: 400 }}>
            {userData?.userName}
          </Typography>
          <Box
            onClick={handleSoundClick}
            sx={{
              ...(currentModule === 14 && {
                borderRadius: "50%",
                padding: "6px 6px 4px 6px",
                boxShadow: `0 0 10px ${MAIN_COLORS.mainGreen}`,
                animationName: "pulseShadow",
                animationDuration: "2s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                "@keyframes pulseShadow": {
                  "0%": {
                    boxShadow: `0 0 10px ${MAIN_COLORS.mainGreen}`,
                  },
                  "50%": {
                    boxShadow: `0 0 60px ${MAIN_COLORS.mainGreen}`,
                  },
                  "100%": {
                    boxShadow: `0 0 10px ${MAIN_COLORS.mainGreen}`,
                  },
                },
              }),
            }}
          >
            <img
              src={Gear}
              width="22px"
              height="22px"
              alt="gear"
              style={{
                zIndex: 999999,
                cursor: "pointer",
              }}
            />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={"15px"}>
          <StyledFlashBox sx={{ width: "40%" }}>
            <Stack direction="row" gap="3px">
              <img height="22px" width="22px" src={Flash} alt="flash" />
              <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                {Math.floor((userData?.WindBalance || 0) * 1000) / 1000}
              </Typography>
            </Stack>
          </StyledFlashBox>

          <StyledFlashBox sx={{ gap: "8px", width: "30%" }}>
            <img src={TON} alt="usdt" width="24px" height="24px" />
            <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
              {Math.floor((userData?.TONBalance || 0) * 1000) / 1000}
            </Typography>
          </StyledFlashBox>
        </Stack>
      </Stack>
      {location.pathname === "/home" && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            sx={{
              padding: "15px",
              backgroundColor: MAIN_COLORS.sectionBG,
              borderRadius: "12px",
              ...(currentModule === 5.5 && {
                boxShadow: `0 0 4px ${MAIN_COLORS.mainGreen}`,
                animationName: "pulseShadow",
                animationDuration: "2s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                "@keyframes pulseShadow": {
                  "0%": {
                    boxShadow: `0 0 10px ${MAIN_COLORS.mainGreen}`,
                  },
                  "50%": {
                    boxShadow: `0 0 30px ${MAIN_COLORS.mainGreen}`,
                  },
                  "100%": {
                    boxShadow: `0 0 10px ${MAIN_COLORS.mainGreen}`,
                  },
                },
              }),
            }}
            onClick={() => {
              if (soundEnabled) playSwitchSound();
              handleEarthClick();
            }}
          >
            <Box
              sx={{
                width: "24px",
                height: "24px",
                backgroundImage: `url(./planetIcon.svg)`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></Box>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export default Header;
