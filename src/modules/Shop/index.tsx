import { Box, Slider, Stack, Typography, TextField } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { ProfitBox } from "./components/ProfitBox";
import { TabContext, TabList } from "@mui/lab";
import FooterButtonPress from "../../assets/sounds/footerButton.mp3";
import useSound from "use-sound";
import { TabStyles } from "./components/TabStyles";
import { useTranslation } from "react-i18next";
import { MainBox } from "../../shared/components/MainBox";
import { NamedStyled } from "../../shared/components/NameStyled";
import { useDispatch, useSelector } from "react-redux";
import { selectShopData } from "./selectors";
import { getShopDataByArea, buyItemAction, selectShopLoading } from "./slices";
import { selectSelectedCountry } from "../Home/selectors";
import { selectUserData } from "../Header/selectors";
import { ModalComponent } from "../../shared/components/ModalComponent";
import { flag } from "./components/flag";
import ModificatorsTable from "./components/ModificatorsTable";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { ButtonShopStyled } from "./components/ButtonShopStyled";
import { ModuleElevenTwelve } from "../Tutorial/components/ModuleElevenTwelve";
import { setCurrentModule } from "../Tutorial/slices";
import { selectIsTutorialFinished } from "../Tutorial/selectors";
import { updateBalanceAction } from "../Header/slices";

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

  const buyModifier = useCallback(() => {
    const currentPrice = shopValues.find(
      (value) => value.speed === windValue,
    )?.price;
    if (currentPrice === undefined) return;
    if (userData === null) return;
    if (userData.TONBalance <= currentPrice) return;
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
  };

  const formatValue = (num: number) =>
    num.toFixed(3).replace(/(?:\.|,)?0+$/, "");

  return (
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
      <ModuleElevenTwelve />
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="80%"
        >
          <TextField
            variant="outlined"
            disabled
            sx={{ color: MAIN_COLORS.textColor }}
            placeholder={`${(shopValues[0]?.price || 0).toString()} TON`}
          />
          <img
            alt="flag"
            src={flag[selectedCountry.name]}
            style={{ width: "60px", paddingLeft: "10px" }}
          />
        </Stack>
        <Stack flexDirection="column" gap="10px">
          <Box>
            <Typography fontWeight="600">
              {t("Wind speed")} : {windValue}
            </Typography>
            <Slider
              aria-label="WindSpeed"
              value={windValue}
              marks={shopMarks}
              defaultValue={0}
              step={null}
              sx={{
                color: MAIN_COLORS.activeTabColor,
                "& .MuiSlider-rail": {
                  color: MAIN_COLORS.referalBox,
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
            <TabStyles
              label={"kW profit"}
              value={0}
              key={0}
              onClick={handleSoundClick}
            />
            <TabStyles
              label={`TON ${t("profit")}`}
              value={1}
              key={1}
              onClick={handleSoundClick}
            />
            <TabStyles
              label="Modificators"
              value={2}
              key={2}
              onClick={handleSoundClick}
            />
          </TabList>

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
                        ? +selectedWindPowerIncome.turxValue / row.multiplier
                        : +selectedWindPowerIncome.tonValue / row.multiplier,
                    )}
                    subtitle={row.label}
                  />
                ))}
              </Stack>
            </Stack>
          )}
        </TabContext>
        {tab === 2 && <ModificatorsTable modifiers={userData?.modifiers} />}

        <ButtonShopStyled
          onClick={buyModifier}
          sx={{ background: MAIN_COLORS.gold }}
        >
          {t("Buy wind speed")}
        </ButtonShopStyled>
      </Stack>
      <ModalComponent
        openModal={lowBalanceModalOpen}
        title="Low Balance"
        subtitle="You have not enough TON balance, please fund your TON balance"
        handleCloseModal={() => setLowBalanceModalOpen(false)}
      />
    </MainBox>
  );
};

export default Shop;
