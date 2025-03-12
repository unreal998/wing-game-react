import {
  Box,
  Button,
  Drawer,
  Stack,
  Switch,
  Tab,
  Typography,
} from "@mui/material";
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

  const [walletNumber, setWalletNumber] = useState("");

  const handleAddWalletClick = useCallback(() => {
    setWalletNumber("TSzuyCCUbSDSQUDxfCVMty24z4GkncMxw4");
    setAddWalletModalOpen(false);
  }, []);

  return (
    <Box sx={{ padding: "5px 15px 0 15px" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
        {" "}
        {t("Wallet")}{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "8px",
        }}
      >
        <InfoBox value={"234"} subtitle={t("Your name coin")} />
        <Box
          sx={{
            backgroundColor: MAIN_COLORS.referalBox,
            border: `1px solid  ${MAIN_COLORS.activeTabColor}`,
            display: "flex",
            borderRadius: "9px",
            alignItems: "center",
          }}
        >
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
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "9px",
          paddingTop: "15px",
          paddingBottom: "15px",
        }}
      >
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
      </Box>
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
            label={t("Wallet")}
            value={0}
            key={0}
            onClick={handleSoundClick}
          />
          <Tab
            sx={tabStyles}
            label={t("History")}
            value={1}
            key={1}
            onClick={handleSoundClick}
          />
        </TabList>
        <TabPanel sx={{ padding: 0, marginTop: "15px" }} value={0}>
          <StyledBasicBox>
            <img
              src={Mask}
              alt="mask"
              style={{ paddingTop: "15px", width: "88px" }}
            />
            {walletNumber ? (
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  paddingLeft: "28px",
                  paddingRight: "28px",
                  paddingTop: "15px",
                  paddingBottom: "15px",
                }}
              >
                Your wallet: <br /> <br />
                <b>{walletNumber}</b>
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 400,
                  paddingLeft: "28px",
                  paddingRight: "28px",
                  paddingTop: "15px",
                  paddingBottom: "15px",
                }}
              >
                {t("Connect")}
              </Typography>
            )}
            {!walletNumber && (
              <ButtonStyled onClick={() => setAddWalletModalOpen(true)}>
                <Typography
                  sx={{
                    color: "inherit",
                    fontSize: "12px",
                    fontWeight: 400,
                    textTransform: "uppercase",
                  }}
                >
                  Connect wallet
                </Typography>
              </ButtonStyled>
            )}
          </StyledBasicBox>
          <Drawer
            open={addWalletModalOpen}
            anchor="bottom"
            sx={{
              "& .MuiDrawer-paper": {
                margin: "0px 10px",
                borderRadius: "10px",
                backgroundColor: "#031C2B",
              },
            }}
          >
            <Stack
              direction="column"
              padding="7px 20px"
              color="white"
              alignItems="center"
              justifyContent="center"
              gap="20px"
            >
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
                {" "}
                {t("Connect your wallet")}
              </Typography>
              <Box
                display="flex"
                width="100%"
                alignItems="center"
                justifyContent="center"
              >
                <ButtonGame
                  sx={{
                    padding: "15px 20px",
                    textTransform: "none",
                  }}
                  variant="contained"
                  onClick={() => {}}
                >
                  <Typography
                    sx={{
                      color: "rgb(0, 0, 0)",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {t("Open wallet in telegram")}
                  </Typography>
                </ButtonGame>
              </Box>
              <Stack
                direction="row"
                justifyContent="space-around"
                width="100%"
                paddingBottom="35px"
              >
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
              </Stack>
            </Stack>
          </Drawer>
        </TabPanel>
        <TabPanel sx={{ padding: 0, marginTop: "15px" }} value={1}>
          <StyledTableBox sx={{ marginTop: "5px" }}>
            <Box
              sx={{
                width: "100hv",
                marginRight: "15px",
                paddingLeft: "18px",
                paddingTop: "5px",
                paddingBottom: "5px",
                display: "flex",
                borderBottom: `1px solid ${MAIN_COLORS.mainGreyBG}`,
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: 900 }}>
                {t("History")}
              </Typography>
            </Box>

            {[...Array(3)].map((_, i) => (
              <HistoryItem
                key={i}
                date="2024.06.04"
                time="18:02"
                amount="5,000"
                label={t("BONUS")}
              />
            ))}
          </StyledTableBox>
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default Wallet;
