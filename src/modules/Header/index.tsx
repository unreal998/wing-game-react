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
import { selectHeaderLoading, updateBalanceAction } from "./slices";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { clearSelectedCountry } from "../Home/slices";
import {
  selectCurrentModule,
  selectIsTutorialFinished,
} from "../Tutorial/selectors";
import { setCurrentModule } from "../Tutorial/slices";

const Header = () => {
  const loading = useSelector(selectHeaderLoading);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [playSound] = useSound(FooterButtonPress);
  const userData = useSelector(selectUserData());
  const currentModule = useSelector(selectCurrentModule());
  const isTutorialFinished = useSelector(selectIsTutorialFinished());

  useEffect(() => {
    if (userData !== null) {
      dispatch(updateBalanceAction(userData.id));
    }
  }, [dispatch, userData]);

  const handleSoundClick = useCallback(() => {
    playSound();
    navigate("/settings");
  }, [playSound, navigate]);

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
        zIndex: 100,
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
          <img
            src={Gear}
            width="22px"
            height="22px"
            alt="gear"
            onClick={handleSoundClick}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={"15px"}>
          <StyledFlashBox sx={{ width: "60%" }}>
            <Stack direction="row" gap="3px">
              <img height="22px" width="22px" src={Flash} alt="flash" />
              <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                {userData?.WindBalance?.toFixed(2) || 0}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              lvl {userData?.lvl}
            </Typography>
          </StyledFlashBox>

          <StyledFlashBox sx={{ gap: "8px", width: "30%" }}>
            <img src={TON} alt="usdt" width="24px" height="24px" />
            <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
              {userData?.TONBalance?.toFixed(2) || 0}
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
            onClick={handleEarthClick}
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
