import React, { useCallback, useEffect, useMemo } from "react";
import { Stack } from "@mui/material";
import { MAIN_COLORS } from "../../shared/colors";
import { StyledFooterBoxes } from "./componets/StyledFooterBoxes";
import { StyledFooterBoxesTypography } from "./componets/StyledFooterBoxesTypography";
import { StyledCenterFooter } from "./componets/StyledCenterFooter";
import { StyledFooterBox } from "./componets/StyledFooterBox";
import { useLocation, useNavigate } from "react-router-dom";
import useSound from "use-sound";
import FooterButtonPress from "../../assets/sounds/footerButton.mp3";
import PowerIcon from "./componets/PowerIcon";
import {
  selectDisabledPowerButton,
  selectNextPressTimeDelay,
  selectSelectedCountry,
} from "../Home/selectors";
import { useDispatch, useSelector } from "react-redux";
import { powerButtonPressed, setPressTimeDelay } from "../Home/slices";
import { useTranslation } from "react-i18next";
import PowerIconActive from "./componets/PowerIconActive";
import { ButtonGame } from "../../shared/components/ButtonGame";
import { StyledTime } from "./componets/StyledTime";
import { StyledTypographyButton } from "./componets/StyledTypographyButton";
import { StyledMainBox } from "./componets/StyledMainBox";
import { footerTabs } from "../../shared/components/FooterTabs";
import { selectUserData } from "../Header/selectors";
import WindBlowing from "../../assets/sounds/windBlowing.mp3";

import {
  selectCurrentModule,
  selectIsTutorialFinished,
} from "../Tutorial/selectors";
import { setCurrentModule } from "../Tutorial/slices";
import { ModuleFourFiveSix } from "../Tutorial/components/ModuleFourFiveSix";

const Footer = () => {
  const navigate = useNavigate();
  const [playSound] = useSound(FooterButtonPress);
  const location = useLocation();
  const nextPressButtonTimeDelay = useSelector(selectNextPressTimeDelay());
  const isButtonDisabled = useSelector(selectDisabledPowerButton());
  const dispatch = useDispatch();
  const selectedCountry = useSelector(selectSelectedCountry());
  const userData = useSelector(selectUserData());
  const { t } = useTranslation();
  const [playWindSound] = useSound(WindBlowing);
  const isTutorialFinished = useSelector(selectIsTutorialFinished());

  const currentModule = useSelector(selectCurrentModule());
  const isAnyModuleActive = currentModule !== 0;

  const handleNavigationChange = useCallback(
    (path: string) => {
      if (!selectedCountry.name) {
        navigate("/");
      } else {
        navigate(path);
      }
      playSound();
    },
    [playSound, navigate, selectedCountry],
  );

  const handlePushPower = useCallback(() => {
    if (!isTutorialFinished && currentModule === 4) {
      dispatch(setCurrentModule(5));
    }
    playWindSound();
    if (userData) {
      dispatch(
        powerButtonPressed({
          uid: userData.id,
          areaName: selectedCountry.name,
        }),
      );
    }
  }, [
    isTutorialFinished,
    currentModule,
    playWindSound,
    userData,
    dispatch,
    selectedCountry.name,
  ]);

  const calculateTime = useMemo(() => {
    const totalSeconds = Math.floor(nextPressButtonTimeDelay / 1000);
    const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const ss = String(totalSeconds % 60).padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  }, [nextPressButtonTimeDelay]);

  useEffect(() => {
    if (nextPressButtonTimeDelay > 0) {
      setTimeout(() => {
        dispatch(setPressTimeDelay(nextPressButtonTimeDelay - 1000));
      }, 1000);
    }
  }, [dispatch, nextPressButtonTimeDelay]);

  useEffect(() => {
    if (
      !isTutorialFinished &&
      currentModule <= 4 &&
      location.pathname === "/home"
    ) {
      dispatch(setCurrentModule(4));
    }
  }, [currentModule, dispatch, isTutorialFinished, location.pathname]);

  return (
    <>
      <ModuleFourFiveSix />
      <StyledMainBox>
        {location.pathname === "/home" && (
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            marginBottom="10px"
          >
            <StyledTime>
              {calculateTime} {t("remain")}
            </StyledTime>
            <ButtonGame
              disabled={isButtonDisabled}
              variant="contained"
              onClick={handlePushPower}
              sx={{
                ...(currentModule === 4 && {
                  boxShadow: `0 0 10px ${MAIN_COLORS.activeTabColor}`,
                  animationName: "pulseShadow",
                  animationDuration: "2s",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  "@keyframes pulseShadow": {
                    "0%": {
                      boxShadow: `0 0 10px ${MAIN_COLORS.activeTabColor}`,
                    },
                    "50%": {
                      boxShadow: `0 0 60px ${MAIN_COLORS.activeTabColor}`,
                    },
                    "100%": {
                      boxShadow: `0 0 10px ${MAIN_COLORS.activeTabColor}`,
                    },
                  },
                }),
              }}
            >
              {isButtonDisabled ? <PowerIcon /> : <PowerIconActive />}
              <StyledTypographyButton>{t("Push Power")}</StyledTypographyButton>
            </ButtonGame>
          </Stack>
        )}
        <StyledFooterBox>
          {footerTabs.map(({ path, icon, activeIcon, label, isCenter }) => {
            const isActive = location.pathname === path;

            const isSpecialActive =
              !isTutorialFinished &&
              ((path === "/missions" && currentModule === 6) ||
                (path === "/referal" && currentModule === 8) ||
                (path === "/shop" && currentModule === 10) ||
                (path === "/wallet" && currentModule === 12));

            const isDisabled =
              isAnyModuleActive &&
              !isTutorialFinished &&
              !(
                (path === "/missions" && currentModule === 6) ||
                (path === "/referal" && currentModule === 8) ||
                (path === "/shop" && currentModule === 10) ||
                (path === "/wallet" && currentModule === 12)
              );

            const Component = isCenter ? StyledCenterFooter : StyledFooterBoxes;

            return (
              <Component
                key={path}
                onClick={() => {
                  if (!isDisabled) {
                    handleNavigationChange(path);
                    if (!isTutorialFinished) {
                      if (path === "/missions" && currentModule === 6) {
                        dispatch(setCurrentModule(7));
                      }
                      if (path === "/referal" && currentModule === 8) {
                        dispatch(setCurrentModule(9));
                      }
                      if (path === "/shop" && currentModule === 10) {
                        dispatch(setCurrentModule(11));
                      }
                      if (path === "/wallet" && currentModule === 12) {
                        dispatch(setCurrentModule(13));
                      }
                    }
                  }
                }}
                style={{
                  opacity: isDisabled ? 0.5 : 1,
                  pointerEvents: isDisabled ? "none" : "auto",
                  borderRadius: isSpecialActive ? "50%" : undefined,
                  ...(isSpecialActive
                    ? {
                        padding: "20px 0",
                        boxShadow: `0 0 4px ${MAIN_COLORS.activeTabColor}`,
                        animationName: "pulseShadow",
                        animationDuration: "2s",
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                        "@keyframes pulseShadow": {
                          "0%": {
                            boxShadow: `0 0 5px ${MAIN_COLORS.activeTabColor}`,
                          },
                          "50%": {
                            boxShadow: `0 0 15px ${MAIN_COLORS.activeTabColor}`,
                          },
                          "100%": {
                            boxShadow: `0 0 5px ${MAIN_COLORS.activeTabColor}`,
                          },
                        },
                      }
                    : {}),
                }}
              >
                <img src={isActive ? activeIcon : icon} alt={label} />
                <StyledFooterBoxesTypography
                  sx={{
                    color: isActive
                      ? MAIN_COLORS.activeTabColor
                      : MAIN_COLORS.missionTable,
                  }}
                >
                  {t(label)}
                </StyledFooterBoxesTypography>
              </Component>
            );
          })}
        </StyledFooterBox>
      </StyledMainBox>
    </>
  );
};

export default Footer;
