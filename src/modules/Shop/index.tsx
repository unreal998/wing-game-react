import { Box, Slider, Stack, Typography } from "@mui/material";
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
import { selectShopData } from "./selectors";
import { getShopDataByArea, buyItemAction, selectShopLoading } from "./slices";
import { selectSelectedCountry } from "../Home/selectors";
import { selectUserData } from "../Header/selectors";
import { ModalComponent } from "../../shared/components/ModalComponent";
import ModificatorsTable from "./components/ModificatorsTable";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { ModuleElevenTwelve } from "../Tutorial/components/ModuleElevenTwelve";
import { setCurrentModule } from "../Tutorial/slices";
import {
  selectCurrentModule,
  selectIsTutorialFinished,
} from "../Tutorial/selectors";
import { updateBalanceAction } from "../Header/slices";
import { StyledTab } from "../../shared/components/StyledTab";
import { GameButtonComponent } from "../../shared/components/GameButtonComponent";
import { StyledInputBox } from "../Referal_temp/components/StyledInputBox";
import { StyledInput } from "../Referal_temp/components/StyledInput";

const profitValues = [
  { label: "Profit per click", multiplier: 42 },
  { label: "Profit per day", multiplier: 21 },
  { label: "Profit per week", multiplier: 3 },
  { label: "Full profit", multiplier: 1 },
];

const Shop = () => {
  const loading = useSelector(selectShopLoading);
  const { t } = useTranslation();
  const [windValue, setWindValue] = useState<number>(0);
  const [selectedScruberPosition, setSelectedScruberPosition] =
    useState<number>(0);
  const [tab, setTab] = useState(0);
  const shopValues = useSelector(selectShopData());
  const selectedCountry = useSelector(selectSelectedCountry());
  const userData = useSelector(selectUserData());
  const dispatch = useDispatch();
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const [shopMarks, setShopMarks] = useState<
    { title: number; value: number; level: number }[]
  >([]);
  const [lowBalanceModalOpen, setLowBalanceModalOpen] = useState(false);
  const currentModule = useSelector(selectCurrentModule());

  const buyModifier = useCallback(() => {
    const currentPrice = shopValues.find(
      (value) => value.speed === windValue,
    )?.price;
    if (currentPrice === undefined) return;
    if (userData === null) return;
    if (userData.TONBalance <= currentPrice) setLowBalanceModalOpen(true);
    dispatch(
      buyItemAction({
        windSpeed: windValue,
        selectedArea: selectedCountry.name,
        uid: !!userData ? userData.id : "",
      }),
    );
  }, [dispatch, userData, shopValues, windValue, selectedCountry]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const selectedWindPowerIncome = useMemo(() => {
    return (
      shopValues.find((value) => value.speed === windValue) || {
        tonValue: 0,
        turxValue: 0,
        price: 0,
        speed: 0,
      }
    );
  }, [shopValues, windValue]);

  useEffect(() => {
    if (userData !== null) {
      dispatch(updateBalanceAction(userData.id));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (!shopValues?.length) {
      dispatch(getShopDataByArea(selectedCountry.name));
    } else {
      const shopMarksFromModificator = shopValues.map((mark, index) => {
        return {
          title: mark.speed,
          value: mark.speed,
          level: index + 1,
        };
      });
      setShopMarks([
        { title: 0, value: 0, level: 0 },
        ...shopMarksFromModificator,
      ]);
    }
  }, [shopValues, dispatch, selectedCountry]);

  const [playSound] = useSound(FooterButtonPress);

  const handleSoundClick = useCallback(() => {
    playSound();
  }, [playSound]);

  const handleWindSlide = (event: Event, newValue: number | number[]) => {
    const newSlideValue = newValue as number;
    setWindValue(newSlideValue);
    const currentShopIndex = shopMarks.find(
      (mark) => mark.value === newSlideValue,
    );
    if (currentShopIndex) {
      setSelectedScruberPosition(currentShopIndex.level - 1);
    }
  };

  const formatValue = (num: number) =>
    num.toFixed(3).replace(/(?:\.|,)?0+$/, "");

  return (
    <>
      {(currentModule === 11 || currentModule === 12) && (
        <Box
          onClick={() => {
            dispatch(setCurrentModule(12));
          }}
          width={"100vw"}
          height={"120vh"}
          position={"absolute"}
          zIndex={9}
          bgcolor={`rgba(0, 0, 0, 0.4)`}
          top={"-1vh"}
          sx={{
            transition: "all 0.2s ease",
          }}
        >
          <ModuleElevenTwelve />
        </Box>
      )}
      <MainBox
        position={"relative"}
        onClick={(e) => {
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
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="600">
                  {t("Wind speed")} : {windValue}
                </Typography>
                <StyledInputBox
                  sx={{
                    width: "20%",
                  }}
                >
                  <StyledInput
                    type="text"
                    value={
                      (
                        shopValues[selectedScruberPosition]?.price || 0
                      ).toString() + " TON"
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
                step={null}
                sx={{
                  color: MAIN_COLORS.activeTabColor,
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
                }}
                onChange={handleWindSlide}
              />
            </Box>
          </Stack>
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
                label={"kW profit"}
                value={0}
                key={0}
                onClick={handleSoundClick}
              />
              <StyledTab
                label={`TON ${t("profit")}`}
                value={1}
                key={1}
                onClick={handleSoundClick}
              />
              <StyledTab
                label="History"
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
            {tab === 2 && <ModificatorsTable modifiers={userData?.modifiers} />}

            <GameButtonComponent onClick={buyModifier}>
              {t("Buy wind speed")}
            </GameButtonComponent>
          </TabContext>
          <ModalComponent
            openModal={lowBalanceModalOpen}
            title="Low Balance"
            subtitle="You have not enough TON balance, please fund your TON balance"
            handleCloseModal={() => setLowBalanceModalOpen(false)}
          />
        </Stack>
      </MainBox>
    </>
  );
};

export default Shop;
