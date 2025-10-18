import { useNavigate } from "react-router-dom";
import { StyledPlanetBox } from "./components/StyledPlanetBox";
import { StyledPlanetButton } from "./components/StyledPlanetButton";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
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
import { ModalComponent } from "../../shared/components/ModalComponent";
import { selectLowBalanceModalOpen } from "../Shop/selectors";
import { setLowBalanceModalOpen } from "../Shop/slices";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { selectLastSelectedCountry } from "../Home/selectors";

export const Planet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const areasData = useSelector(selectAreasData());
  const countries = useSelector(selectCountiresData());
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const { t } = useTranslation();
  const soundEnabled = useSelector(selectSoundEnabled());
  const currentModule = useSelector(selectCurrentModule());
  const [buyCountrieModalOpen, setBuyCountrieModalOpen] = useState(false);
  const [unavialableModalCountryData, setUnavialableModalCountryData] =
    useState<string>("");
  const userData = useSelector(selectUserData());
  const [countryToBuy, setCountryToBuy] = useState<AreaType | null>(null);
  const lowBalanceModalOpen = useSelector(selectLowBalanceModalOpen());
  const animationRef = useRef<LottieRefCurrentProps | null>(null);
  const lastSelectedCountry = useSelector(selectLastSelectedCountry());

  const handleModalClose = useCallback(() => {
    dispatch(setLowBalanceModalOpen(false));
  }, [dispatch]);

  const handleButtonPress = useCallback(
    (selectedCountry: AreaType) => {
      dispatch(setSelectedCountry(selectedCountry));
      navigate("/home");
    },
    [dispatch, navigate],
  );

  const price = useMemo(() => {
    if (countryToBuy && countries) {
      const selectedCountry = countries.find(
        (country) => countryToBuy.name === country.shortName,
      )?.unlockPrice;
      return selectedCountry || 0;
    }

    return 0;
  }, [countries, countryToBuy]);

  const handleBuyCountry = useCallback(() => {
    if (countryToBuy && userData && countries) {
      const selectedCountry = countries.find(
        (country) => countryToBuy.name === country.shortName,
      );
      if (
        selectedCountry &&
        userData.TONBalance >= selectedCountry.unlockPrice
      ) {
        dispatch(
          buyCountry({ uid: userData?.id, countryName: countryToBuy.name }),
          setBuyCountrieModalOpen(false),
        );
      } else {
        setBuyCountrieModalOpen(false);
        dispatch(setLowBalanceModalOpen(true));
      }
    }
  }, [dispatch, userData, countryToBuy, countries]);

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
        return { top: "120px", left: "180px" };
      case 1:
        return { top: "60px", left: "120px" };
      case 2:
        return { top: "190px", left: "90px" };
      case 3:
        return { top: "120px", left: "50px" };
      default:
        return { top: "0px", left: "0px" };
    }
  }, []);
  const [playFooterSound] = useSound(footerButtonSound);

  const planetScreenSize = useMemo(() => heightProportion - 60, []);

  const calculatePlanetSize = useCallback(() => {
    return `matrix(${window.innerWidth / 700 + 1}, 0, 0, ${window.innerWidth / 786 + 1}, 0, 0)`;
  }, []);

  calculatePlanetSize();

  return (
    <>
      <Stack
        gap={2}
        height={`${planetScreenSize}px`}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <StyledPlanetBox>
          <Lottie
            lottieRef={animationRef}
            animationData={require(`../../assets/animations/planet.json`)}
            loop
            style={{
              left: "0",
              position: "absolute",
              transform: calculatePlanetSize(),
            }}
          />
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
                      if (!country.bought && country.name !== "nl") {
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
                {lastSelectedCountry !== "" &&
                lastSelectedCountry === country.name ? (
                  <Stack direction="row" alignItems="center" gap={"2px"}>
                    <RoomOutlinedIcon sx={{ width: "18px", height: " 18px" }} />
                    {t(`${country.title}`)}
                  </Stack>
                ) : (
                  <>{t(`${country.title}`)}</>
                )}
              </StyledPlanetButton>
            ))}
          {lastSelectedCountry === "" ? (
            <Typography
              textAlign="center"
              fontSize="16px"
              zIndex={1000}
              alignSelf="flex-end"
            >
              {t("selectYourCountry")}
            </Typography>
          ) : (
            <Typography
              textAlign="center"
              fontSize="16px"
              zIndex={1000}
              alignSelf="flex-end"
            >
              {`${t("lastSelectedCountry")}: ${t(userCountiresData.find((country) => country.name === lastSelectedCountry)?.title || "")}`}
            </Typography>
          )}
        </StyledPlanetBox>
        <BuyCountryModal
          open={buyCountrieModalOpen}
          onClose={() => setBuyCountrieModalOpen(false)}
          onBuy={handleBuyCountry}
          price={price}
        />
        <ModalComponent
          openModal={lowBalanceModalOpen}
          title={t("lowBalance")}
          subtitle={t("lowBalanceContent")}
          handleCloseModal={handleModalClose}
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
