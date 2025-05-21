import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
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
import { StyledTypographyButton } from "./componets/StyledTypographyButton";
import { StyledMainBox } from "./componets/StyledMainBox";
import { footerTabs } from "../../shared/components/FooterTabs";
import {
  selectCountiresData,
  selectIncomeData,
  selectUserData,
} from "../Header/selectors";
import WindBlowing from "../../assets/sounds/windBlowing.mp3";
import RoadmapIcon from "../../assets/roadmap.svg";
import {
  selectCurrentModule,
  selectIsTutorialFinished,
} from "../Tutorial/selectors";
import { setCurrentModule } from "../Tutorial/slices";
import { ReferalInputComponent } from "../Referal_temp/components/ReferalInputComponent";
import { GameButtonComponent } from "../../shared/components/GameButtonComponent";
import { setWithdrawModalOpen } from "../Wallet/slices";
import { setRoadMapOpen } from "../Settings/slices";
import footerButtonSound from "../../assets/sounds/footerButton.mp3";
import { buyItemAction, setLowBalanceModalOpen } from "../Shop/slices";
import { selectShopData, selectWindValue } from "../Shop/selectors";
import { selectSoundEnabled } from "../Settings/selectors";
import { ConfirmBuyModal } from "./componets/ConfirmBuyModal";
import { ModalComponent } from "../../shared/components/ModalComponent";
import { PopUpMainButton } from "../../shared/components/PopUpMainButton";

const Footer = () => {
  const navigate = useNavigate();
  const [playSound] = useSound(FooterButtonPress);
  const location = useLocation();
  const nextPressButtonTimeDelay = useSelector(selectNextPressTimeDelay());
  const isButtonDisabled = useSelector(selectDisabledPowerButton());
  const dispatch = useDispatch();
  const soundEnabled = useSelector(selectSoundEnabled());
  const selectedCountry = useSelector(selectSelectedCountry());
  const userData = useSelector(selectUserData());
  const { t } = useTranslation();
  const [playWindSound, { sound: windSound }] = useSound(WindBlowing);
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const currentModule = useSelector(selectCurrentModule());
  const incomeData = useSelector(selectIncomeData());
  const isAnyModuleActive = currentModule !== 0;
  const [playFooterButtonSound] = useSound(footerButtonSound);
  const windValue = useSelector(selectWindValue());
  const shopValues = useSelector(selectShopData());
  const countries = useSelector(selectCountiresData());
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (
      location.pathname === "/home" &&
      isButtonDisabled &&
      windSound &&
      soundEnabled
    ) {
      const handleEnd = () => {
        if (soundEnabled) windSound.play();
      };

      windSound.play();
      windSound.on("end", handleEnd);

      return () => {
        windSound.off("end", handleEnd);
        windSound.stop();
      };
    }
  }, [location.pathname, isButtonDisabled, windSound, soundEnabled]);

  const handleOpenRoadmap = useCallback(() => {
    dispatch(setRoadMapOpen(true));
  }, [dispatch]);

  const handleNavigationChange = useCallback(
    (path: string) => {
      if (!selectedCountry.name) {
        navigate("/");
      } else {
        navigate(path);
      }
      if (soundEnabled) playSound();
    },
    [playSound, navigate, selectedCountry, soundEnabled],
  );

  const handlePushPower = useCallback(() => {
    if (!isTutorialFinished && currentModule === 4) {
      dispatch(setCurrentModule(5));
    }
    if (soundEnabled) playWindSound();
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
    soundEnabled,
  ]);

  const buyModifier = useCallback(() => {
    const currentPrice = shopValues.find(
      (value, index) => index === windValue,
    )?.price;
    if (currentPrice === undefined) return;
    if (userData === null) return;
    if (userData.TONBalance <= currentPrice)
      dispatch(setLowBalanceModalOpen(true));
    dispatch(
      buyItemAction({
        windSpeed: windValue,
        selectedArea: selectedCountry.name,
        uid: !!userData ? userData.id : "",
      }),
    );
  }, [dispatch, userData, shopValues, windValue, selectedCountry]);

  const calculateTime = useMemo(() => {
    const totalSeconds = Math.floor(nextPressButtonTimeDelay / 1000);
    const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const ss = String(totalSeconds % 60).padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  }, [nextPressButtonTimeDelay]);

  useEffect(() => {
    if (nextPressButtonTimeDelay <= 0) return;

    const timeout = setTimeout(() => {
      dispatch(setPressTimeDelay(nextPressButtonTimeDelay - 1000));
    }, 1000);

    return () => clearTimeout(timeout);
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

  const handleWithdrawOpen = () => {
    dispatch(setWithdrawModalOpen(true));
  };

  const currentAviailableMods = useMemo(() => {
    if (countries) {
      const currentCountryIndex = countries.findIndex((countrie) => {
        return countrie.shortName === selectedCountry.name;
      });
      return (currentCountryIndex + 1) * 4;
    }
    return 0;
  }, [shopValues, selectedCountry]);

  return (
    <>
      <StyledMainBox
        onClick={() => {
          if (currentModule === 4) {
            dispatch(setCurrentModule(5));
          } else if (currentModule === 5) {
            dispatch(setCurrentModule(6));
          }
        }}
      >
        {!isTutorialFinished && currentModule === 1 && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(2px)",
              zIndex: 1,
            }}
          />
        )}
        {location.pathname === "/home" && (
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            marginBottom="10px"
            gap="8px"
          >
            <Stack direction="row" gap={"8px"} width={"90%"}>
              <Stack
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                  backgroundColor: MAIN_COLORS.blockBG,
                  padding: "9px 24px",
                  borderRadius: "12px",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  width: "60%",
                  flex: "2",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  {t("remain")}
                </Typography>
                <Typography fontSize="24px" fontWeight="700">
                  {calculateTime}
                </Typography>
              </Stack>
              <Box
                sx={{
                  backgroundColor: MAIN_COLORS.sectionBG,
                  padding: "12px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  flex: "1",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    "@media (max-width: 338px)": {
                      fontSize: "11px",
                    },
                  }}
                >
                  + {(+incomeData.kwtIncome).toFixed(2)} {t("kW")}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    "@media (max-width: 338px)": {
                      fontSize: "11px",
                    },
                  }}
                >
                  + {(+incomeData.tonIncome).toFixed(2)} TON
                </Typography>
              </Box>
            </Stack>

            <GameButtonComponent
              disabled={isButtonDisabled}
              variant="contained"
              onClick={() => {
                if (soundEnabled) playFooterButtonSound();
                handlePushPower();
              }}
              sx={{
                padding: "15px",
                width: "90%",
                ...(currentModule === 4 && {
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
              <PowerIcon />
              <StyledTypographyButton>{t("Push Power")}</StyledTypographyButton>
            </GameButtonComponent>
          </Stack>
        )}
        {location.pathname === "/referal" && <ReferalInputComponent />}
        {location.pathname === "/settings" && (
          <GameButtonComponent
            onClick={() => {
              if (soundEnabled) playFooterButtonSound();
              handleOpenRoadmap();
            }}
            sx={{
              margin: "15px",
              width: "93%",
            }}
          >
            <img
              src={RoadmapIcon}
              alt="RoadmapIcon"
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            {t("Roadmap")}
          </GameButtonComponent>
        )}
        {location.pathname === "/wallet" && (
          <GameButtonComponent
            sx={{
              width: "93%",
              margin: "15px",
            }}
            onClick={() => {
              if (soundEnabled) playFooterButtonSound();
              handleWithdrawOpen();
            }}
          >
            <PowerIcon />
            <Typography fontSize="20px" fontWeight="800" marginLeft="6px">
              {t("Withdraw funds")}
            </Typography>
          </GameButtonComponent>
        )}
        {location.pathname === "/shop" && (
          <>
            <GameButtonComponent
              onClick={() => setConfirmOpen(true)}
              disabled={windValue === 0 || windValue > currentAviailableMods}
              sx={{
                backgroundColor: MAIN_COLORS.mainGreen,
                cursor: windValue === 0 ? "not-allowed" : "pointer",
                margin: "15px",
                width: "93%",
                "@media (max-height: 667px)": {
                  marginBottom: "5px",
                },
              }}
            >
              {t("Buy wind speed")}
            </GameButtonComponent>

            <ModalComponent
              title={t("Buy wind speed")}
              subtitle={
                t("Do you whant to buy:") +
                windValue +
                t(" for ") +
                (shopValues[windValue]?.price || 0) +
                " TON"
              }
              openModal={confirmOpen}
              handleCloseModal={() => setConfirmOpen(false)}
              additionalbutton={
                <PopUpMainButton
                  onClick={() => {
                    {
                      buyModifier();
                      setConfirmOpen(false);
                    }
                  }}
                >
                  {t("Buy")}
                </PopUpMainButton>
              }
            />
          </>
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
                    if (soundEnabled) playFooterButtonSound();
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
                        boxShadow: `0 0 4px ${MAIN_COLORS.mainGreen}`,
                        animationName: "pulseShadow",
                        animationDuration: "2s",
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                        "@keyframes pulseShadow": {
                          "0%": {
                            boxShadow: `0 0 5px ${MAIN_COLORS.mainGreen}`,
                          },
                          "50%": {
                            boxShadow: `0 0 15px ${MAIN_COLORS.mainGreen}`,
                          },
                          "100%": {
                            boxShadow: `0 0 5px ${MAIN_COLORS.mainGreen}`,
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
                      ? MAIN_COLORS.mainGreen
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
