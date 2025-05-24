import { useNavigate } from "react-router-dom";
import { StyledPlanetBox } from "./components/StyledPlanetBox";
import { StyledPlanetButton } from "./components/StyledPlanetButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCountry } from "../Home/slices";
import {
  selectAreasData,
  selectCountiresData,
  selectUserData,
} from "../Header/selectors";
import { AreaType } from "../../shared/types";
import { MAIN_COLORS } from "../../shared/colors";

import {
  selectCurrentModule,
  selectIsTutorialFinished,
} from "../Tutorial/selectors";
import { setCurrentModule } from "../Tutorial/slices";
import { buyCountry } from "../Referal_temp/slices";
import BuyCountryModal from "../../shared/components/BuyCountry";
import { useTranslation } from "react-i18next";
import footerButtonSound from "../../assets/sounds/footerButton.mp3";
import useSound from "use-sound";
import { LockOutlined } from "@mui/icons-material";
import { LockedCountryModal } from "./components/LockedCountryModal";
import { selectSoundEnabled } from "../Settings/selectors";
import { Stack, Typography } from "@mui/material";
import { heightProportion } from "../../shared/utils";
import { selectReferalData } from "../Referal_temp/selectors";
import { getReferalDataAction } from "../Referal_temp/slices";

export const Planet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const areasData = useSelector(selectAreasData());
  const countries = useSelector(selectCountiresData());
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const { t } = useTranslation();
  const soundEnabled = useSelector(selectSoundEnabled());
  const currentModule = useSelector(selectCurrentModule());
  const referalData = useSelector(selectReferalData());
  const [buyCountrieModalOpen, setBuyCountrieModalOpen] = useState(false);
  const [unavialableModalCountryData, setUnavialableModalCountryData] =
    useState<string>("");
  const userData = useSelector(selectUserData());
  const [countryToBuy, setCountryToBuy] = useState<AreaType | null>(null);

  useEffect(() => {
    if (userData?.telegramID) {
      dispatch(getReferalDataAction(userData.telegramID));
    }
  }, [dispatch, userData?.telegramID]);

  const handleButtonPress = useCallback(
    (selectedCountry: AreaType) => {
      dispatch(setSelectedCountry(selectedCountry));
      navigate("/home");
    },
    [dispatch, navigate],
  );

  const handleBuyCountry = useCallback(() => {
    if (countryToBuy && userData) {
      if (userData.TONBalance >= 1) {
        dispatch(
          buyCountry({ uid: userData?.id, countryName: countryToBuy.name }),
          setBuyCountrieModalOpen(false),
        );
      }
    }
  }, [dispatch, userData, countryToBuy]);

  const userCountiresData = useMemo(() => {
    if (!countries || !areasData || !userData || !referalData) return [];
    const hasTransactions = userData.transactions?.length >= 1;

    return areasData.map((area) => {
      const matchedCountry = countries.find(
        (country) => country.shortName === area.name,
      );

      const userReferalsLength = userData.referals?.length ?? 0;
      const referalDataLength = referalData.length;
      const requiredReferals = matchedCountry?.referalsToUnlock ?? 0;

      const referalsUnlocked =
        userReferalsLength >= requiredReferals &&
        referalDataLength >= requiredReferals;

      return {
        ...area,
        available: area.available && hasTransactions && referalsUnlocked,
        title: matchedCountry?.title,
      };
    });
  }, [countries, areasData, userData, referalData]);

  const getCoords = useCallback((index: number) => {
    switch (index) {
      case 0:
        return { top: "100px", left: "180px" };
      case 1:
        return { top: "40px", left: "120px" };
      case 2:
        return { top: "170px", left: "90px" };
      case 3:
        return { top: "100px", left: "50px" };
      default:
        return { top: "0px", left: "0px" };
    }
  }, []);
  const [playFooterSound] = useSound(footerButtonSound);

  const planetScreenSize = useMemo(() => heightProportion - 60, []);

  // console.log("userData.areas", userData?.areas);
  // console.log("userData.transaction", userData?.transactions.length);
  // console.log("userData.referals", userData?.referals.length);
  //console.log("referalData", referalData.length);
  // console.log("countries", countries);
  // console.log("areasData", areasData);

  return (
    <>
      <Stack
        gap={2}
        height={`${planetScreenSize}px`}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <StyledPlanetBox>
          {userCountiresData &&
            userCountiresData?.length &&
            userCountiresData.map((country, index) => (
              <StyledPlanetButton
                key={country.name}
                isBought={country.bought}
                sx={{
                  ...getCoords(index),
                  ...(!isTutorialFinished &&
                    currentModule === 3 && {
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
                  ...(!country.available && {
                    backgroundColor: "#9CA8CE",
                    boxShadow: "none",
                    animation: "none",
                    color: MAIN_COLORS.appBG,
                  }),
                }}
                onClick={() => {
                  if (soundEnabled) playFooterSound();
                  if (!country.available) {
                    setUnavialableModalCountryData(country.name);
                  } else {
                    if (currentModule === 3 || currentModule === 14) {
                      if (!isTutorialFinished && currentModule === 3) {
                        dispatch(setCurrentModule(0));
                      }

                      handleButtonPress(country);
                    } else if (isTutorialFinished && country.available) {
                      if (!country.bought) {
                        setBuyCountrieModalOpen(true);
                        setCountryToBuy(country);
                      } else {
                        handleButtonPress(country);
                      }
                    }
                  }
                }}
              >
                {!country.available && (
                  <LockOutlined
                    sx={{
                      width: "16px",
                      height: "16px",
                      marginBottom: "1px",
                    }}
                  />
                )}
                {t(`${country.title}`)}
              </StyledPlanetButton>
            ))}
        </StyledPlanetBox>
        <Typography textAlign="center" fontSize="16px">
          {t("selectYourCountry")}
        </Typography>
        <BuyCountryModal
          open={buyCountrieModalOpen}
          onClose={() => setBuyCountrieModalOpen(false)}
          onBuy={handleBuyCountry}
        />
        <LockedCountryModal
          open={unavialableModalCountryData !== ""}
          onClose={() => setUnavialableModalCountryData("")}
          countryName={unavialableModalCountryData || ""}
        />
      </Stack>
    </>
  );
};
