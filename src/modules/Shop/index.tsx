import {
  Box,
  Button,
  Slider,
  Stack,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { ProfitBox } from "./components/ProfitBox";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import FooterButtonPress from "../../assets/sounds/footerButton.mp3";
import useSound from "use-sound";

const tabStyles = {
  fontSize: "12px",
  fontWeight: 700,
  padding: "0 10px",
  color: MAIN_COLORS.textColor,
  border: MAIN_COLORS.dailyBorder,
  borderRadius: "5px",
  minHeight: "35px",
  "&.Mui-selected": {
    color: MAIN_COLORS.activeTabColor,
  },
};

const Shop = () => {
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
      <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>Market</Typography>
      <Stack
        sx={{
          justifyContent: "space-between",
          paddingTop: "8px",
          width: "100%",
          gap: "15px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Stack gap="5px" direction="row">
            <Button
              sx={{
                color: "white",
                bgcolor: MAIN_COLORS.mainGreyBG,
                borderRadius: "4px",
                padding: "8px 14px",
                fontWeight: "800",
                border:
                  selectedValue === "TON"
                    ? `1px solid ${MAIN_COLORS.activeTabColor}`
                    : "none",
              }}
              onClick={() => setSelectedValue("TON")}
            >
              TON
            </Button>
            <Button
              sx={{
                color: "white",
                bgcolor: MAIN_COLORS.mainGreyBG,
                borderRadius: "4px",
                padding: "8px 14px",
                fontWeight: "800",
                border:
                  selectedValue === "USD"
                    ? `1px solid ${MAIN_COLORS.activeTabColor}`
                    : "none",
              }}
              onClick={() => setSelectedValue("USD")}
            >
              USD
            </Button>
          </Stack>
          <TextField
            sx={{
              width: "45%",
              borderRadius: "4px",
              backgroundColor: MAIN_COLORS.mainGreyBG,
              "& .MuiOutlinedInput-root": {
                color: MAIN_COLORS.missionTable,
              },
            }}
            variant="outlined"
            placeholder={`${globalCalculationSumm.toString()} ${selectedValue}`}
          ></TextField>
        </Stack>
        <Stack flexDirection="column" gap="10px">
          <Box>
            <Typography fontWeight="600">
              Cost of all generators (TRON): {`${generatorValue}`}
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
              Number of generators: {`${generatorCountValue}`}
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
            <Tab
              sx={tabStyles}
              label={"Energy profit"}
              value={0}
              key={0}
              onClick={handleSoundClick}
            />
            <Tab
              sx={tabStyles}
              label={`${selectedValue} profit`}
              value={1}
              key={1}
              onClick={handleSoundClick}
            />
          </TabList>
          <TabPanel sx={{ padding: 0, marginTop: "15px" }} value={0}>
            <Box
              display="flex"
              flexDirection="column"
              padding="10px"
              bgcolor={MAIN_COLORS.mainGreyBG}
              gap="15px"
              borderRadius="5px"
            >
              <Typography fontWeight="400">
                Energy produced per hour:{" "}
                {<b>{(+globalCalculationEnergy / 60).toFixed(5)} MWh</b>}
              </Typography>
              <Typography fontWeight="400">
                Energy produced per day: {<b>{globalCalculationEnergy} MWh</b>}
              </Typography>
              <Typography fontWeight="400">
                Energy produced per week:{" "}
                {<b>{+globalCalculationEnergy * 7} MWh</b>}
              </Typography>
              <Typography fontWeight="400">
                Energy produced per month:{" "}
                {<b>{+globalCalculationEnergy * 30} MWh</b>}
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel sx={{ padding: 0, marginTop: "15px" }} value={1}>
            <Stack gap="10px">
              <Typography fontWeight="600">
                Profit in {selectedValue}
              </Typography>
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
          <Button
            sx={{
              width: "80%",
              display: "flex",
              gap: "7px",
              padding: "12px",
              backgroundColor: MAIN_COLORS.activeTabColor,
              borderRadius: "10px",
              "&.Mui-disabled": {
                backgroundColor: "rgb(134 134 134)",
              },
            }}
            variant="contained"
            onClick={() => {}}
          >
            <Typography
              sx={{
                color: "rgb(0, 0, 0)",
                fontSize: "20px",
                fontWeight: 400,
              }}
            >
              Buy
            </Typography>
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
export default Shop;
