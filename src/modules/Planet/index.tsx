import { Box } from "@mui/material";
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
import StepOne from "../Tutorial/components/StepOne";
import StepTwo from "../Tutorial/components/StepTwo";
import StepThree from "../Tutorial/components/StepThree";
import BuyCountryModal from "../../shared/components/BuyCountry";
import { buyCountry } from "../Referal_temp/slices";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { selectLoading } from "../Referal_temp/selectors";

export const Planet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const areasData = useSelector(selectAreasData());
  const countries = useSelector(selectCountiresData());
  const loading = useSelector(selectLoading());
  const [showModuleOne, setShowModuleOne] = useState(true);
  const [showModuleTwo, setShowModuleTwo] = useState(false);
  const [showModuleThree, setShowModuleThree] = useState(false);
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
    if (showModuleOne) {
      setShowModuleOne(false);
      setShowModuleTwo(true);
    } else if (showModuleTwo) {
      setShowModuleTwo(false);
      setShowModuleThree(true);
    }
  }, [showModuleOne, showModuleTwo]);

  const userCountiresData = useMemo(() => {
    if (!countries || !areasData) return [];
    return areasData.map((area) => ({
      ...area,
      title: countries.find((country) => country.shortName === area.name)
        ?.title,
    }));
  }, [countries, areasData]);

  const getCoords = useCallback((index: number) => {
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
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        marginTop: "-10px",
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
      <LoaderComponent loading={loading} />
      {(showModuleTwo || showModuleThree) && (
        <StepThree showModule={showModuleThree} />
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
                ...(showModuleThree && {
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
              disabled={!country.available}
              onClick={() => {
                if (showModuleThree && country.bought) {
                  handleButtonPress(country);
                }
                if (country.available && !country.bought) {
                  setBuyCountrieModalOpen(true);
                  setCountryToBuy(country);
                }
              }}
            >
              {country.title}
            </StyledPlanetButton>
          ))}
      </StyledPlanetBox>
      <BuyCountryModal
        open={buyCountrieModalOpen}
        onClose={() => setBuyCountrieModalOpen(false)}
        onBuy={handleBuyCountry}
      />
      {showModuleTwo && <StepTwo />}
      {showModuleOne && <StepOne onClick={handleModuleClick} />}
    </Box>
  );
};
