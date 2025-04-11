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
import { selectModificatorsData, selectUserData } from "../Header/selectors";
import { ModalComponent } from "../../shared/components/ModalComponent";
import { flag } from "./components/flag";
import ModificatorsTable from "./components/ModificatorsTable";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { ButtonShopStyled } from "./components/ButtonShopStyled";

const profitValues = [
  { label: "Profit per click", multiplier: 1 },
  { label: "Profit per day", multiplier: 2 },
  { label: "Profit per week", multiplier: 14 },
  { label: "Profit per month", multiplier: 60 },
];

const Shop = () => {
  const loading = useSelector(selectShopLoading);
  const { t } = useTranslation();
  const [windValue, setWindValue] = useState<number>(0);
  const [tab, setTab] = useState(0);
  const shopValues = useSelector(selectShopData());
  const selectedCountry = useSelector(selectSelectedCountry());
  const selectModificators = useSelector(selectModificatorsData());
  const userData = useSelector(selectUserData());
  const dispatch = useDispatch();
  const [lowBalanceModalOpen, setLowBalanceModalOpen] = useState(false);

  const availableWindSpeeds = useMemo(() => {
    return shopValues.map((item) => item.speed);
  }, [shopValues]);

  const buyModifier = useCallback(() => {
    const currentPrice = shopValues.find(
      (value) => value.speed === windValue,
    )?.price;
    if (
      currentPrice === undefined ||
      userData === null ||
      userData.TONBalance <= currentPrice
    )
      return;

    dispatch(
      buyItemAction({
        windSpeed: windValue,
        selectedArea: selectedCountry.name,
        uid: userData.id,
      }),
    );
  }, [dispatch, userData, shopValues, windValue, selectedCountry]);

  useEffect(() => {
    if (!shopValues.length) {
      dispatch(getShopDataByArea(selectedCountry.name));
    }
  }, [shopValues, dispatch, selectedCountry]);

  const [playSound] = useSound(FooterButtonPress);

  const handleSoundClick = useCallback(() => {
    playSound();
  }, [playSound]);

  const handleWindSlide = (event: Event, newValue: number | number[]) => {
    setWindValue(newValue as number);
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

  const shopMarks = useMemo(() => {
    return shopValues.map((mark, index) => ({
      title: mark.speed,
      value: mark.speed,
      level: index + 1,
    }));
  }, [shopValues]);

  const formatValue = (num: number) =>
    num.toFixed(3).replace(/(?:\.|,)?0+$/, "");

  return (
    <MainBox>
      <LoaderComponent loading={loading} />
      <NamedStyled>{t("Market")}</NamedStyled>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            variant="outlined"
            disabled
            value={`${selectedWindPowerIncome.price} TON`}
            sx={{ color: MAIN_COLORS.textColor }}
          />
          <img
            src={flag[selectedCountry.name]}
            alt="flag"
            style={{ width: "60px" }}
          />
        </Stack>

        <Box>
          <Typography fontWeight="600">
            {t("Wind speed")}: {windValue}
          </Typography>
          <Slider
            aria-label="WindSpeed"
            value={windValue}
            step={null}
            marks={shopMarks}
            min={Math.min(...availableWindSpeeds)}
            max={Math.max(...availableWindSpeeds)}
            onChange={handleWindSlide}
            sx={{
              color: MAIN_COLORS.activeTabColor,
              "& .MuiSlider-rail": {
                color: MAIN_COLORS.referalBox,
              },
              "& .Mui-active": {
                boxShadow: "0 0 0 9px black",
              },
            }}
          />
        </Box>

        <TabContext value={tab}>
          <TabList
            onChange={(_, newValue) => setTab(newValue)}
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
          >
            <TabStyles
              label={t("TURX profit")}
              value={0}
              onClick={handleSoundClick}
            />
            <TabStyles
              label={`TON ${t("profit")}`}
              value={1}
              onClick={handleSoundClick}
            />
            <TabStyles
              label="Modificators"
              value={2}
              onClick={handleSoundClick}
            />
          </TabList>

          {tab !== 2 && (
            <Stack gap={2}>
              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
                gap={2}
              >
                {profitValues.map((row, index) => (
                  <Box
                    key={index}
                    sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "130px" }}
                  >
                    <ProfitBox
                      value={formatValue(
                        tab === 0
                          ? selectedWindPowerIncome.turxValue * row.multiplier
                          : selectedWindPowerIncome.tonValue * row.multiplier,
                      )}
                      subtitle={row.label}
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>
          )}
        </TabContext>

        {tab === 2 && <ModificatorsTable modifiers={userData?.modifiers} />}

        {tab !== 2 && (
          <ButtonShopStyled
            onClick={buyModifier}
            sx={{ background: MAIN_COLORS.gold }}
          >
            {t("Buy wind speed")}
          </ButtonShopStyled>
        )}
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
