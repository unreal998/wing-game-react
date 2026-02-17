import { Avatar, Box, Slider, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { ProfitBox } from "./components/ProfitBox";
import { TabContext, TabList } from "@mui/lab";
import FooterButtonPress from "../../assets/sounds/footerButton.mp3";
import useSound from "use-sound";
import { useTranslation } from "react-i18next";
import { MainBox } from "../../shared/components/MainBox";
import { NamedStyled } from "../../shared/components/NameStyled";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLowBalanceModalOpen,
  selectShopData,
  selectWindValue,
} from "./selectors";
import {
  getShopDataByArea,
  selectShopLoading,
  setLowBalanceModalOpen,
  setWindValue,
} from "./slices";
import { selectSelectedCountry } from "../Home/selectors";
import { selectCountiresData, selectUserData } from "../Header/selectors";
import { ModalComponent } from "../../shared/components/ModalComponent";
import ModificatorsTable from "./components/ModificatorsTable";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { setCurrentModule } from "../Tutorial/slices";
import {
  selectCurrentModule,
  selectIsTutorialFinished,
} from "../Tutorial/selectors";
import { updateBalanceAction } from "../Header/slices";
import { StyledTab } from "../../shared/components/StyledTab";
import { StyledInputBox } from "../Referal_temp/components/StyledInputBox";
import { StyledInput } from "../Referal_temp/components/StyledInput";
import { countryFlags } from "./components/flag";
import { selectSoundEnabled } from "../Settings/selectors";
import { heightProportion } from "../../shared/utils";
import { ShopData, ShopValues } from "./types";
import { PopUpMainButton } from "../../shared/components/PopUpMainButton";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const { t } = useTranslation();
  const profitValues = useMemo(
    () => [
      { label: t("Profit per click"), multiplier: 63 },
      { label: t("Profit per day"), multiplier: 21 },
      { label: t("Profit per week"), multiplier: 3 },
      { label: t("Full profit"), multiplier: 1 },
    ],
    [t],
  );
  const loading = useSelector(selectShopLoading);
  const windValue = useSelector(selectWindValue());
  const [selectedScruberPosition, setSelectedScruberPosition] =
    useState<number>(0);
  const [tab, setTab] = useState(1);
  const shopValues = useSelector(selectShopData());
  const countries = useSelector(selectCountiresData());
  const selectedCountry = useSelector(selectSelectedCountry());
  const userData = useSelector(selectUserData());
  const dispatch = useDispatch();
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const [shopMarks, setShopMarks] = useState<
    { title: number; value: number; level: number }[]
  >([]);
  const lowBalanceModalOpen = useSelector(selectLowBalanceModalOpen());
  const soundEnabled = useSelector(selectSoundEnabled());
  const currentStep = useSelector(selectCurrentModule());
  const navigate = useNavigate();
  const [isBuyButtonBlocked] = useState(false);

  const sortedShopValues = useMemo(() => {
    return [...shopValues].sort((a, b) => a.id - b.id);
  }, [shopValues]);

  const countriesRangeArray = useMemo(() => {
    const countriesRange: { start: number; end: number; country: string }[] =
      [];
    sortedShopValues.forEach((value) => {
      const start = countriesRange[countriesRange.length - 1]?.end || 0;
      countriesRange.push({
        start: start + 1,
        end: start + value.values.length,
        country: value.area,
      });
    });
    return countriesRange;
  }, [sortedShopValues]);

  const handleModalClose = useCallback(() => {
    dispatch(setLowBalanceModalOpen(false));
  }, [dispatch]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const convertedShopValues: ShopValues[] = useMemo(() => {
    const valuesData: ShopValues[] = [];
    shopValues.forEach((shopValues: ShopData) => {
      valuesData.push(...shopValues.values);
    });
    return valuesData.sort((a, b) => a.price - b.price);
  }, [shopValues]);

  const selectedWindPowerIncome = useMemo(() => {
    if (convertedShopValues) {
      return (
        convertedShopValues.find((value, index) => index === windValue - 1) || {
          tonValue: 0,
          turxValue: 0,
          price: 0,
        }
      );
    } else {
      return {
        tonValue: 0,
        turxValue: 0,
        price: 0,
      };
    }
  }, [convertedShopValues, windValue]);

  const tableHeight = useMemo(() => heightProportion - 280, []);

  useEffect(() => {
    dispatch(setWindValue(0));
    if (selectedCountry.name) {
      dispatch(getShopDataByArea());
    }
    if (userData !== null) {
      dispatch(updateBalanceAction(userData.id));
    }
  }, [dispatch, userData, selectedCountry]);

  useEffect(() => {
    if (shopValues?.length) {
      const shopMarksFromModificator = convertedShopValues.map(
        (mark, index) => {
          return {
            title: index + 1,
            value: index + 1,
            level: index + 1,
          };
        },
      );
      setShopMarks([
        { title: 0, value: 0, level: 0 },
        ...shopMarksFromModificator,
      ]);
    }
  }, [shopValues, convertedShopValues]);

  const [playSound] = useSound(FooterButtonPress);

  const handleSoundClick = useCallback(() => {
    if (soundEnabled) playSound();
  }, [playSound, soundEnabled]);

  const selectedSliderCountry = useMemo(() => {
    if (countriesRangeArray.length > 0 && countries) {
      const countryInRange = countriesRangeArray.find(
        (range) => windValue >= range.start && windValue <= range.end,
      );
      if (countryInRange) {
        return countries.find(
          (country: any) => country.shortName === countryInRange.country,
        );
      }
      return null;
    }

    return null;
  }, [countries, windValue, countriesRangeArray]);

  const handleWindSlide = useCallback(
    (_: Event, newValue: number | number[]) => {
      const newSlideValue = newValue as number;
      dispatch(setWindValue(newSlideValue));
      const currentShopIndex = shopMarks.find(
        (mark) => mark.value === newSlideValue,
      );
      if (currentShopIndex) {
        setSelectedScruberPosition(currentShopIndex.level - 1);
      }
    },
    [dispatch, shopMarks],
  );

  const formatValue = (num: number) =>
    num.toFixed(3).replace(/(?:\.|,)?0+$/, "");

  return (
    <MainBox
      position={"relative"}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (!isTutorialFinished) {
          e.stopPropagation();
          e.preventDefault();
          dispatch(setCurrentModule(12));
        }
      }}
      sx={{
        "& *": {
          pointerEvents: !isTutorialFinished ? "none" : "auto",
        },
      }}
    >
      <LoaderComponent loading={loading} />
      <NamedStyled
        sx={{
          "@media (max-height: 670px)": {
            paddingTop: "0px",
          },
        }}
      >
        {t("Market")}
      </NamedStyled>
      <Stack
        sx={{
          justifyContent: "space-between",
          paddingTop: "8px",
          width: "100%",
          gap: "10px",
          "@media (max-height: 732px)": {
            padding: "0px",
          },
        }}
      >
        <Stack flexDirection="column" gap="10px">
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" gap="8px">
                <Avatar
                  src={
                    countryFlags[
                      (selectedSliderCountry?.shortName ||
                        "nl") as keyof typeof countryFlags
                    ]
                  }
                  alt={selectedSliderCountry?.shortName || "nl"}
                  sx={{ width: 24, height: 24 }}
                />

                <Typography fontWeight="600">
                  {t("Wind speed")} : {windValue}
                </Typography>
              </Box>
              <StyledInputBox sx={{ width: "20%" }}>
                <StyledInput
                  type="text"
                  value={
                    (windValue === 0
                      ? 0
                      : convertedShopValues[selectedScruberPosition]?.price ||
                        0) + " TON"
                  }
                  readOnly
                />
              </StyledInputBox>
            </Stack>
            <Slider
              aria-label="WindSpeed"
              value={windValue}
              marks={shopMarks}
              defaultValue={0}
              max={shopMarks.length - 1}
              sx={{
                color: MAIN_COLORS.mainGreen,
                "& .MuiSlider-rail": {
                  color: "black",
                },
                "& .Mui-active": {
                  boxShadow: "0 0 0 9px black",
                },
                "@media (max-height: 732px)": {
                  paddingTop: "0px",
                  paddingBottom: "0px",
                },
                ...(currentStep === 11.5 && {
                  animationName: "pulseTopBottom",
                  animationDuration: "2s",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  boxShadow: `0 -6px 15px ${MAIN_COLORS.mainGreen}, 0 6px 15px ${MAIN_COLORS.mainGreen}`,
                  "@keyframes pulseTopBottom": {
                    "0%": {
                      boxShadow: `0 -6px 15px ${MAIN_COLORS.mainGreen}, 0 6px 15px ${MAIN_COLORS.mainGreen}`,
                    },
                    "50%": {
                      boxShadow: `0 -10px 30px ${MAIN_COLORS.mainGreen}, 0 10px 30px ${MAIN_COLORS.mainGreen}`,
                    },
                    "100%": {
                      boxShadow: `0 -6px 15px ${MAIN_COLORS.mainGreen}, 0 6px 15px ${MAIN_COLORS.mainGreen}`,
                    },
                  },
                }),
              }}
              onChange={handleWindSlide}
            />
          </Box>
        </Stack>
        {!isBuyButtonBlocked && (
          <TabContext value={tab}>
            <TabList
              sx={{
                display: "flex",
                minHeight: "0px",
                "& .MuiTabs-list": {
                  gap: "10px",
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                "@media (max-height: 732px)": {
                  padding: "0px",
                },
              }}
              onChange={handleTabChange}
            >
              <StyledTab
                label={`TON ${t("profit")}`}
                value={1}
                key={0}
                onClick={handleSoundClick}
              />
              <StyledTab
                label={t("kW profit")}
                value={0}
                key={1}
                onClick={handleSoundClick}
              />
              <StyledTab
                label={t("History")}
                value={2}
                key={2}
                onClick={handleSoundClick}
              />
            </TabList>

            <TabContext value={tab}>
              {tab !== 2 && (
                <Stack gap="10px">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    gap="8px"
                    sx={{
                      "@media (max-height: 732px)": {
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      },
                    }}
                  >
                    {profitValues.map((row, rowIndex) => (
                      <ProfitBox
                        key={rowIndex}
                        value={formatValue(
                          tab === 0
                            ? +selectedWindPowerIncome.turxValue /
                                row.multiplier
                            : +selectedWindPowerIncome.tonValue /
                                row.multiplier,
                        )}
                        subtitle={row.label}
                      />
                    ))}
                  </Stack>
                </Stack>
              )}
            </TabContext>
            {tab === 2 &&
              (userData?.modifiers?.length ? (
                <ModificatorsTable modifiers={userData.modifiers} />
              ) : (
                <Typography textAlign="center" mt={2}>
                  {t("No bought modifiers yet")}
                </Typography>
              ))}
          </TabContext>
        )}
        {isBuyButtonBlocked && countries && (
          <Box
            sx={{
              backgroundColor: MAIN_COLORS.appBG,
              padding: "6px",
              borderRadius: "12px",
              zIndex: 100,
            }}
          >
            <Stack
              sx={{
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: MAIN_COLORS.sectionBG,
                gap: "8px",
                height: `${tableHeight}px`,
                "@media (max-width: 430px) and (max-height: 932px)": {
                  height: "240px",
                },
              }}
            >
              <Typography
                textAlign="center"
                fontSize="20px"
                fontWeight={600}
                color="white"
              >
                {t("shopWarningTitle")}
              </Typography>
              <Typography
                textAlign="center"
                fontSize="16px"
                fontWeight={600}
                color="white"
              >
                {t("shopWarningMessage")} {t("lockedCountryContent3")}:{" "}
                {t(selectedSliderCountry?.title || "")} {t("for")}{" "}
                {selectedSliderCountry?.unlockPrice} TON
                {`${t("lockedCountryContentShop")} ${(selectedSliderCountry?.referalsToUnlock || 0) - (userData?.referals?.length || 0)} ${t("friends")} \n`}
              </Typography>
              <Typography
                textAlign="center"
                fontSize="16px"
                fontWeight={600}
                color="white"
              >
                {t("lockedCountryContent2.3")}{" "}
                {selectedSliderCountry?.percent_income}% {t("and from")}{" "}
                {selectedSliderCountry?.basicBonusPerClick}{" "}
                {t("basicBonusPerClick")}
              </Typography>
            </Stack>
          </Box>
        )}
        <ModalComponent
          openModal={lowBalanceModalOpen}
          title={t("lowBalance")}
          subtitle={t("lowBalanceContent")}
          handleCloseModal={handleModalClose}
          additionalbutton={
            <PopUpMainButton onClick={() => navigate("/wallet")}>
              {t("fund")}
            </PopUpMainButton>
          }
        />
      </Stack>
    </MainBox>
  );
};

export default Shop;
