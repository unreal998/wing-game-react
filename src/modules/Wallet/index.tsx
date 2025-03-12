import { Box, Drawer, Stack, Switch, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { MAIN_COLORS } from "../../shared/colors";
import USDT from "../../assets/usdt.svg";
import { StyledBasicBox } from "./components/StyledBasicBox";
import Mask from "../../assets/Mask.svg";
import { ButtonStyled } from "./components/ButtonStyled";
import { StyledTableBox } from "./components/StyledTableBox";
import { InfoBox } from "../../shared/components/InfoBox";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import FooterButtonPress from "../../assets/sounds/footerButton.mp3";
import useSound from "use-sound";
import Tonkeeper from "../../assets/Tonkeeper.png";
import TelegramWallet from "../../assets/TelegramWallet.png";
import { useTranslation } from "react-i18next";
import HistoryItem from "./components/HistoryItem";
import { ButtonGame } from "../../shared/ButtonGame";
import { TabStyles } from "./components/TabStyles";
import { WalletTypography } from "./components/WalletTypography";
import { StackWallet } from "./components/StackWallet";
import { ButtonGameBox } from "./components/ButtonGameBox";
import { ButtonGameTypography } from "./components/ButtonGameTypography";
import { StackWalletStyle } from "./components/StackWalletStyle";
import { ButtonStyledTypography } from "./components/ButtonStyledTypography";
import { TabPanelBoxStyled } from "./components/TabPanelBoxStyled";
import { MainBox } from "../../shared/MainBox";
import { NamedStyled } from "../../shared/components/NameStyled";
import { BoxPayot } from "./components/BoxPayot";
import { DrawerWallet } from "./components/DrawerWallet";
import { InfoBoxWallet } from "./components/InfoBoxWallet";

const Wallet = () => {
  const { t } = useTranslation();
  const [playSound] = useSound(FooterButtonPress);
  const [addWalletModalOpen, setAddWalletModalOpen] = useState(false);
  const wallets = [
    {
      src: TelegramWallet,
      alt: "telegram wallet",
      label: t("telegram wallet"),
    },
    { src: Tonkeeper, alt: "tonkeeper", label: t("Tonkeeper") },
  ];

  const handleSoundClick = useCallback(() => {
    playSound();
  }, [playSound]);

  const [value, setValue] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const tabs = [
    { label: t("Wallet"), value: 0 },
    { label: t("History"), value: 1 },
  ];

  const [walletNumber, setWalletNumber] = useState("");

  const handleAddWalletClick = useCallback(() => {
    setWalletNumber("TSzuyCCUbSDSQUDxfCVMty24z4GkncMxw4");
    setAddWalletModalOpen(false);
  }, []);

  return (
    <MainBox>
      <NamedStyled>{t("Wallet")} </NamedStyled>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "8px",
        }}
      >
        <InfoBox value={"234"} subtitle={t("Your name coin")} />
        <InfoBoxWallet>
          <Box sx={{ paddingLeft: "14px" }}>
            <img src={USDT} alt="usdt" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                padding: "9px 26px 0px 26px",
              }}
            >
              234
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: 700, paddingBottom: "9px" }}
            >
              TON
            </Typography>
          </Box>
        </InfoBoxWallet>
      </Box>
      <BoxPayot>
        <Typography
          sx={{
            color: MAIN_COLORS.textColor,
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          {t("Auto payout")}
        </Typography>
        <Switch
          sx={{
            alignItems: "center",
            display: "flex",
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: MAIN_COLORS.activeTabColor,
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: MAIN_COLORS.checkboxTrack,
              height: "21px",
            },
          }}
        />
      </BoxPayot>
      <TabContext value={value}>
        <TabList
          sx={{
            display: "flex",
            minHeight: "0px",
            "& .MuiTabs-list": { gap: "10px" },
            "& .MuiTabs-indicator": { display: "none" },
          }}
          onChange={handleTabChange}
        >
          {tabs.map(({ label, value }) => (
            <TabStyles
              key={value}
              label={label}
              value={value}
              onClick={handleSoundClick}
            />
          ))}
        </TabList>
        <TabPanel sx={{ padding: 0, marginTop: "15px" }} value={0}>
          <StyledBasicBox>
            <img
              src={Mask}
              alt="mask"
              style={{ paddingTop: "15px", width: "88px" }}
            />
            {walletNumber ? (
              <WalletTypography>
                {t(" Your wallet: ")} <br /> <br />
                <b>{walletNumber}</b>
              </WalletTypography>
            ) : (
              <WalletTypography
                sx={{
                  fontSize: "12px",
                }}
              >
                {t("Connect")}
              </WalletTypography>
            )}
            {!walletNumber && (
              <ButtonStyled onClick={() => setAddWalletModalOpen(true)}>
                <ButtonStyledTypography>
                  {t("Connect wallet")}
                </ButtonStyledTypography>
              </ButtonStyled>
            )}
          </StyledBasicBox>
          <DrawerWallet open={addWalletModalOpen} anchor="bottom">
            <StackWallet>
              <Box width="100%" display="flex" justifyContent="flex-end">
                <Box
                  bgcolor={MAIN_COLORS.basicBox}
                  padding="6px"
                  borderRadius="100%"
                  onClick={() => setAddWalletModalOpen(false)}
                >
                  <CloseIcon sx={{ color: MAIN_COLORS.missionTable }} />
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {t("Connect your wallet")}
              </Typography>
              <ButtonGameBox>
                <ButtonGame
                  sx={{
                    padding: "15px 20px",
                    textTransform: "none",
                  }}
                  variant="contained"
                  onClick={() => {}}
                >
                  <ButtonGameTypography>
                    {t("Open wallet in telegram")}
                  </ButtonGameTypography>
                </ButtonGame>
              </ButtonGameBox>
              <StackWalletStyle>
                {wallets.map(({ src, alt, label }, index) => (
                  <Stack
                    key={index}
                    gap="10px"
                    alignItems="center"
                    onClick={handleAddWalletClick}
                  >
                    <img width="55px" height="55px" src={src} alt={alt} />
                    <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
                  </Stack>
                ))}
              </StackWalletStyle>
            </StackWallet>
          </DrawerWallet>
        </TabPanel>
        <TabPanel sx={{ padding: 0, marginTop: "15px" }} value={1}>
          <StyledTableBox sx={{ marginTop: "5px" }}>
            <TabPanelBoxStyled>
              <Typography sx={{ fontSize: "16px", fontWeight: 900 }}>
                {t("History")}
              </Typography>
            </TabPanelBoxStyled>
            {[...Array(3)].map((_, i) => (
              <HistoryItem
                key={i}
                date="2025.03.12"
                time="18:02"
                amount="5,000"
                label={t("BONUS")}
              />
            ))}
          </StyledTableBox>
        </TabPanel>
      </TabContext>
    </MainBox>
  );
};
export default Wallet;
