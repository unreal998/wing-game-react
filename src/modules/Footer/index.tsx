import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Stack, Typography } from "@mui/material";
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
  const [showModuleFour, setShowModuleFour] = useState(false);
  const [showModuleFive, setShowModuleFive] = useState(false);

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
    setShowModuleFour(false);
    setShowModuleFive(true);
    if (userData) {
      dispatch(
        powerButtonPressed({
          uid: userData?.id,
          areaName: selectedCountry.name,
        }),
      );
    }
  }, [dispatch, userData, selectedCountry]);

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
    if (location.pathname === "/home") {
      setShowModuleFour(true);
    } else {
      setShowModuleFour(false);
    }
  }, [location.pathname]);

  return (
    <>
      {(showModuleFour || showModuleFive) && (
        <Typography
          sx={{
            padding: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            position: "absolute",
            width: "80%",
            top: showModuleFour ? "60%" : "50%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: showModuleFour ? "24px" : "16px",
            fontWeight: 700,
            color: "white",
            textAlign: showModuleFour ? "center" : "left",
          }}
        >
          {showModuleFour && "Эта кнопка - твой главный источник энергии!"}
          {showModuleFive && (
            <>
              - Жмёшь раз в 12 часов → получаешь Kw (это внутренняя валюта,
              "киловатты").
              <br />- Чем больше улучшений купишь в магазине → тем больше Kw за
              клик!
            </>
          )}
        </Typography>
      )}

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
                ...(showModuleFour && {
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
            const isDisabledOnHome = location.pathname === "/" && path !== "/";

            const Component = isCenter ? StyledCenterFooter : StyledFooterBoxes;

            return (
              <Component
                key={path}
                onClick={() =>
                  !isDisabledOnHome && handleNavigationChange(path)
                }
                style={{
                  opacity: isDisabledOnHome ? 0.5 : 1,
                  pointerEvents: isDisabledOnHome ? "none" : "auto",
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
