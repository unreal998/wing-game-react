import { Box, Slider, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { ProfitBox } from "./components/ProfitBox";
import { TabContext, TabList } from "@mui/lab";
import FooterButtonPress from "../../assets/sounds/footerButton.mp3";
import useSound from "use-sound";
import { ButtonGame } from "../../shared/components/ButtonGame";
import { TabStyles } from "./components/TabStyles";
import { useTranslation } from "react-i18next";
import { TextFieldStyled } from "./components/TextFieldStyled";
import { MainBox } from "../../shared/components/MainBox";
import { NamedStyled } from "../../shared/components/NameStyled";
import { useDispatch, useSelector } from "react-redux";
import { selectShopData } from "./selectors";
import { getShopDataByArea } from "./slices";
import { selectSelectedCountry } from "../Home/selectors";
import { selectModificatorsData } from "../Header/selectors";

const profitValues = [
  { label: "Profit per click", multiplier: 1 },
  { label: "Profit per day", multiplier: 2 },
  { label: "Profit per week", multiplier: 14 },
  { label: "Profit per month", multiplier: 60 },
];

const Shop = () => {
  const { t } = useTranslation();
  const [windValue, setWindValue] = useState<number>(0);
  const [tab, setTab] = useState(0);
  const shopValues = useSelector(selectShopData());
  const selectedCountry = useSelector(selectSelectedCountry());
  const selectModificators = useSelector(selectModificatorsData());
  const dispatch = useDispatch();
  const [shopMarks, setShopMarks] = useState<
    { title: number; value: number; level: number }[]
  >([]);

  const selectedAreaMidificator = useMemo(() => {
    if (selectModificators?.length && selectedCountry) {
      return selectModificators?.find(
        (modificator) => modificator.areaName === selectedCountry.name,
      )?.windSpeed;
    }
  }, [selectModificators, selectedCountry]);

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
  }, [shopValues, dispatch, selectedCountry, setShopMarks]);

  const [playSound] = useSound(FooterButtonPress);

  const handleSoundClick = useCallback(() => {
    playSound();
  }, [playSound]);

  const handleWindSlide = (event: Event, newValue: number | number[]) => {
    const newSlideValue = newValue as number;
    if (selectedAreaMidificator !== undefined) {
      setWindValue(
        newSlideValue < selectedAreaMidificator
          ? selectedAreaMidificator
          : newSlideValue,
      );
    }
  };

  const formatValue = (num: number) =>
    num.toFixed(3).replace(/(?:\.|,)?0+$/, "");

  return (
    <MainBox>
      <NamedStyled
        sx={{
          "@media (max-height: 670px)": {
            paddingTop: "0px",
          },
        }}
      >
        {t("Market")}{" "}
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
          <TextFieldStyled
            variant="outlined"
            disabled
            sx={{ color: MAIN_COLORS.marketBox }}
            placeholder={`${(selectedWindPowerIncome?.price || 0).toString()} TON`}
          ></TextFieldStyled>
        </Stack>
        <Stack flexDirection="column" gap="10px">
          <Box>
            <Typography fontWeight="600">
              {t("Wind speed")}: {`${windValue}`}
            </Typography>
            <Slider
              aria-label="WindSpeed"
              value={windValue}
              marks={shopMarks}
              defaultValue={selectedAreaMidificator || 0}
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
              label={t("TURX profit")}
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
          </TabList>
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
                      ? +selectedWindPowerIncome.turxValue * row.multiplier
                      : +selectedWindPowerIncome.tonValue * row.multiplier,
                  )}
                  subtitle={row.label}
                />
              ))}
            </Stack>
          </Stack>
        </TabContext>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <ButtonGame variant="contained" onClick={() => {}}>
            <Typography
              sx={{
                color: "rgb(0, 0, 0)",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              {t("Buy")}
            </Typography>
          </ButtonGame>
        </Box>
      </Stack>
    </MainBox>
  );
};
export default Shop;
