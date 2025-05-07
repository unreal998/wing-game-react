import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledPlanetBox } from "./components/StyledPlanetBox";
import { StyledPlanetButton } from "./components/StyledPlanetButton";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCountry } from "../Home/slices";
import {
  selectAreasData,
  selectCountiresData,
  selectUserData,
} from "../Header/selectors";
import { AreaType } from "../../shared/types";
import { MAIN_COLORS } from "../../shared/colors";

import ModuleOne from "../Tutorial/components/ModuleOne";
import ModuleTwo from "../Tutorial/components/ModuleTwo";
import ModuleThree from "../Tutorial/components/ModuleThree";
import {
  selectCurrentModule,
  selectIsTutorialFinished,
} from "../Tutorial/selectors";
import { setCurrentModule } from "../Tutorial/slices";
import { buyCountry } from "../Referal_temp/slices";
import BuyCountryModal from "../../shared/components/BuyCountry";
import { useTranslation } from "react-i18next";
import WebApp from "@twa-dev/sdk";

export const Planet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const areasData = useSelector(selectAreasData());
  const countries = useSelector(selectCountiresData());
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const { t } = useTranslation();

  const currentModule = useSelector(selectCurrentModule());

  const [buyCountrieModalOpen, setBuyCountrieModalOpen] = useState(false);
  const userData = useSelector(selectUserData());
  const [countryToBuy, setCountryToBuy] = useState<AreaType | null>(null);

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

  const handleModuleClick = useCallback(() => {
    if (!isTutorialFinished && currentModule < 3) {
      dispatch(setCurrentModule(currentModule + 1));
    }
  }, [isTutorialFinished, currentModule, dispatch]);

  const userCountiresData = useMemo(() => {
    if (!countries || !areasData) return [];
    return areasData.map((area) => ({
      ...area,
      title: countries.find((country) => country.shortName === area.name)
        ?.title,
    }));
  }, [countries, areasData]);

  const getCoords = useCallback((index: number) => {
    if (WebApp.platform !== "unknown" && WebApp.platform !== "tdesktop") {
      switch (index) {
        case 0:
          return { top: "50px", left: "180px" };
        case 1:
          return { top: "0px", left: "120px" };
        case 2:
          return { top: "100px", left: "90px" };
        case 3:
          return { top: "50px", left: "50px" };
        default:
          return { top: "0px", left: "0px" };
      }
    } else {
      switch (index) {
        case 0:
          return { top: "100px", left: "180px" };
        case 1:
          return { top: "40px", left: "120px" };
        case 2:
          return { top: "180px", left: "90px" };
        case 3:
          return { top: "100px", left: "50px" };
        default:
          return { top: "0px", left: "0px" };
      }
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0,
        animation: "fadeIn 1s forwards",
        "@keyframes fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
      onClick={handleModuleClick}
    >
      {!isTutorialFinished && currentModule >= 2 && (
        <ModuleThree showModule={currentModule === 3} />
      )}
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
              }}
              disabled={!country.available}
              onClick={() => {
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
              }}
            >
              {t(`${country.title}`)}
            </StyledPlanetButton>
          ))}
        <Typography
          color="white"
          sx={{
            position: "absolute",
            top: "320px",
          }}
        >
          {t("selectYourCountry")}
        </Typography>
      </StyledPlanetBox>
      <BuyCountryModal
        open={buyCountrieModalOpen}
        onClose={() => setBuyCountrieModalOpen(false)}
        onBuy={handleBuyCountry}
      />
      {!isTutorialFinished && currentModule === 2 && <ModuleTwo />}
      {!isTutorialFinished && currentModule === 1 && (
        <ModuleOne onClick={handleModuleClick} />
      )}
    </Box>
  );
};
