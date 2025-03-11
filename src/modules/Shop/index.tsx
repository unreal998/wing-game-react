import { Box, Slider, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { ProfitBox } from "./components/ProfitBox";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import FooterButtonPress from "../../assets/sounds/footerButton.mp3";
import useSound from "use-sound";
import { ButtonGame } from "../../shared/ButtonGame";
import { TabStyles } from "./components/TabStyles";
import { useTranslation } from "react-i18next";
import { ButtonShopStyled } from "./components/ButtonShopStyled";
import { TextFieldStyled } from "./components/TextFieldStyled";

const Shop = () => {
  const { t } = useTranslation();
  const [generatorValue, setGeneratorValue] = useState<number>(30);
  const [generatorCountValue, setGeneratorCountValue] = useState<number>(30);
  const [value, setValue] = useState(0);

  const [playSound] = useSound(FooterButtonPress);

  const handleSoundClick = useCallback(() => {
    playSound();
  }, [playSound]);

  const [selectedValue, setSelectedValue] = useState<string>("TON");

  const handleGeneratorsSlide = (event: Event, newValue: number | number[]) => {
    setGeneratorValue(newValue as number);
  };

  const handleNumberOfGeneratorsSlide = (
    event: Event,
    newValue: number | number[],
  ) => {
    setGeneratorCountValue(newValue as number);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const globalCalculationSumm = useMemo(() => {
    const currency = selectedValue === "TON" ? 20 : 1;
    return generatorCountValue * currency * (generatorValue / 10);
  }, [generatorCountValue, selectedValue, generatorValue]);

  const globalCalculationEnergy = useMemo(() => {
    return (generatorCountValue * (generatorValue / 1000)).toFixed(3);
  }, [generatorCountValue, generatorValue]);

  return (
    <Box sx={{ padding: "5px 15px 0 15px" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
        {" "}
        {t("Market")}{" "}
      </Typography>
      <Stack
        sx={{
          justifyContent: "space-between",
          paddingTop: "8px",
          width: "100%",
          gap: "10px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Stack gap="5px" direction="row">
            <ButtonShopStyled
              sx={{
                border:
                  selectedValue === "TON"
                    ? `1px solid ${MAIN_COLORS.activeTabColor}`
                    : "none",
              }}
              onClick={() => setSelectedValue("TON")}
            >
              TON
            </ButtonShopStyled>
            <ButtonShopStyled
              sx={{
                border:
                  selectedValue === "USD"
                    ? `1px solid ${MAIN_COLORS.activeTabColor}`
                    : "none",
              }}
              onClick={() => setSelectedValue("USD")}
            >
              USD
            </ButtonShopStyled>
          </Stack>
          <TextFieldStyled
            variant="outlined"
            placeholder={`${globalCalculationSumm.toString()} ${selectedValue}`}
          ></TextFieldStyled>
        </Stack>
        <Stack flexDirection="column" gap="10px">
          <Box>
            <Typography fontWeight="600">
              {t("Cost of all generators")} (TRON): {`${generatorValue}`}
            </Typography>
            <Slider
              aria-label="Generator"
              value={generatorValue}
              sx={{
                color: MAIN_COLORS.activeTabColor,
                "& .MuiSlider-rail": {
                  color: MAIN_COLORS.referalBox,
                },
                "& .Mui-active": {
                  boxShadow: "0 0 0 9px black",
                },
              }}
              onChange={handleGeneratorsSlide}
            />
          </Box>
          <Box>
            <Typography fontWeight="600">
              {t("Number of generators")}: {`${generatorCountValue}`}
            </Typography>
            <Slider
              aria-label="Generator Count"
              value={generatorCountValue}
              sx={{
                color: MAIN_COLORS.activeTabColor,
                "& .MuiSlider-rail": {
                  color: MAIN_COLORS.referalBox,
                },
                "& .Mui-active": {
                  boxShadow: "0 0 0 9px black",
                },
              }}
              onChange={handleNumberOfGeneratorsSlide}
            />
          </Box>
        </Stack>
        <TabContext value={value}>
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
            }}
            onChange={handleTabChange}
          >
            <TabStyles
              label={t("Energy profit")}
              value={0}
              key={0}
              onClick={handleSoundClick}
            />
            <TabStyles
              label={`${selectedValue} ${t("profit")}`}
              value={1}
              key={1}
              onClick={handleSoundClick}
            />
          </TabList>
          <TabPanel sx={{ padding: 0, marginTop: "10px" }} value={0}>
            <Box
              display="flex"
              flexDirection="column"
              padding="10px"
              bgcolor={MAIN_COLORS.mainGreyBG}
              gap="15px"
              borderRadius="5px"
            >
              <Typography fontWeight="400">
                {t("Energy produced per hour")}:{" "}
                {<b>{(+globalCalculationEnergy / 60).toFixed(5)} MWh</b>}
              </Typography>
              <Typography fontWeight="400">
                {t("Energy produced per day")}:{" "}
                {<b>{globalCalculationEnergy} MWh</b>}
              </Typography>
              <Typography fontWeight="400">
                {t("Energy produced per week")}:{" "}
                {<b>{+globalCalculationEnergy * 7} MWh</b>}
              </Typography>
              <Typography fontWeight="400">
                {t("Energy produced per month")}:{" "}
                {<b>{+globalCalculationEnergy * 30} MWh</b>}
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel sx={{ padding: 0, marginTop: "10px" }} value={1}>
            <Stack gap="10px">
              <Stack gap="10px">
                <Stack direction="row" justifyContent="space-between">
                  <ProfitBox
                    value={(
                      +globalCalculationEnergy *
                      (selectedValue === "TON" ? 20 : 1)
                    ).toString()}
                    subtitle="Profit per day"
                  ></ProfitBox>
                  <ProfitBox
                    value={(
                      +globalCalculationEnergy *
                      (selectedValue === "TON" ? 20 : 1) *
                      7
                    ).toString()}
                    subtitle="Profit per week"
                  ></ProfitBox>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <ProfitBox
                    value={(
                      +globalCalculationEnergy *
                      (selectedValue === "TON" ? 20 : 1) *
                      30
                    ).toString()}
                    subtitle="Profit per month"
                  ></ProfitBox>
                  <ProfitBox
                    value={(
                      +globalCalculationEnergy *
                      (selectedValue === "TON" ? 20 : 1) *
                      365
                    ).toString()}
                    subtitle="Profit per year"
                  ></ProfitBox>
                </Stack>
              </Stack>
            </Stack>
          </TabPanel>
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
    </Box>
  );
};
export default Shop;
