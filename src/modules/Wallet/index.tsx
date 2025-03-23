import { Box, Switch, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
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
import { useTranslation } from "react-i18next";
import HistoryItem from "./components/HistoryItem";
import { TabStyles } from "./components/TabStyles";
import { WalletTypography } from "./components/WalletTypography";
import { ButtonStyledTypography } from "./components/ButtonStyledTypography";
import { TabPanelBoxStyled } from "./components/TabPanelBoxStyled";
import { MainBox } from "../../shared/components/MainBox";
import { NamedStyled } from "../../shared/components/NameStyled";
import { BoxPayot } from "./components/BoxPayot";
import { InfoBoxWallet } from "./components/InfoBoxWallet";
import { useDispatch, useSelector } from "react-redux";
import { createWalletAction } from "./slices";
import { selectUserData } from "../Header/selectors";
import { selectWalletNumber } from "./selectors";
import { StyledCopy } from "../Referal_temp/components/StyledCopy";
import Copy from "../../assets/copy.svg";
import Earth from "../../assets/earth.png";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const { t } = useTranslation();
  const [playSound] = useSound(FooterButtonPress);
  const userData = useSelector(selectUserData());
  const walletNumber = useSelector(selectWalletNumber());
  const dispatch = useDispatch();
  const handleCopyClick = useCallback(() => {
    if (walletNumber) {
      navigator.clipboard
        .writeText(walletNumber)
        .then(() => console.log("Wallet number copied!"))
        .catch((err) => console.error("Failed to copy: ", err));
    }
  }, [walletNumber]);

  const handleSoundClick = useCallback(() => {
    playSound();
  }, [playSound]);

  const navigate = useNavigate();

  const handleEarthClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const tabs = [
    { label: t("Wallet"), value: 0 },
    { label: t("History"), value: 1 },
  ];

  const handleAddWalletClick = useCallback(() => {
    if (userData) {
      dispatch(createWalletAction(userData.id));
    }
  }, [dispatch, userData]);

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
        <InfoBox value={String(userData?.WindBalance)} subtitle={t("TURX")} />
        <InfoBoxWallet sx={{ border: "none", backgroundColor: "transparent" }}>
          <img
            src={Earth}
            alt="earth"
            style={{
              width: "26px",
              height: "26px",
              cursor: "pointer",
              paddingRight: "10px",
            }}
            onClick={handleEarthClick}
          />
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
                <b style={{ fontSize: "10px" }}>{walletNumber}</b>
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
            {walletNumber && (
              <Box
                onClick={handleCopyClick}
                sx={{ cursor: "pointer", paddingBottom: "10px" }}
              >
                <img
                  src={Copy}
                  alt="Copy"
                  style={{ width: "16px", height: "16px" }}
                />
              </Box>
            )}

            {!walletNumber && (
              <ButtonStyled onClick={() => handleAddWalletClick()}>
                <ButtonStyledTypography>
                  {t("Connect wallet")}
                </ButtonStyledTypography>
              </ButtonStyled>
            )}
          </StyledBasicBox>
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
