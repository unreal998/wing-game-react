import {
  Box,
  Modal,
  TextField,
  Button,
  IconButton,
  Typography,
  Switch,
  Checkbox,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { StyledBasicBox } from "./components/StyledBasicBox";
import TON from "../../assets/ton.png";
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
import { useDispatch, useSelector } from "react-redux";
import { createWalletAction } from "./slices";
import { selectUserData } from "../Header/selectors";
import { selectWalletNumber } from "./selectors";
import Copy from "../../assets/copy.svg";
import CloseIcon from "@mui/icons-material/Close";

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

  const [value, setValue] = useState<number>(0);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawWallet, setWithdrawWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [checked, setChecked] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddWalletClick = () => {
    if (userData) {
      dispatch(createWalletAction(userData.id));
    }
  };

  const handleWithdrawRequest = () => {
    console.log("Запрос на вывод:", { withdrawWallet, amount, checked });
    setIsWithdrawOpen(false);
  };

  return (
    <MainBox>
      <NamedStyled>{t("Wallet")}</NamedStyled>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "8px",
        }}
      ></Box>

      <ButtonStyled onClick={() => setIsWithdrawOpen(true)}>
        <ButtonStyledTypography>{t("Withdraw funds")}</ButtonStyledTypography>
      </ButtonStyled>

      {/* Модальное окно вывода средств */}
      <Modal open={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <IconButton
            onClick={() => setIsWithdrawOpen(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" mb={2}>
            {t("Withdraw Request")}
          </Typography>
          <TextField
            fullWidth
            label={t("Wallet Number")}
            variant="outlined"
            value={withdrawWallet}
            onChange={(e) => setWithdrawWallet(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label={t("Amount")}
            variant="outlined"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box display="flex" alignItems="center" mb={2}>
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleWithdrawRequest}
          >
            {t("Send Request")}
          </Button>
        </Box>
      </Modal>

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
          {[
            { label: t("Wallet"), value: 0 },
            { label: t("History"), value: 1 },
          ].map(({ label, value }) => (
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
              src={TON}
              alt="ton"
              style={{ paddingTop: "15px", width: "88px" }}
            />
            {walletNumber ? (
              <WalletTypography>
                {t("Your wallet: ")} <br />
                <b style={{ fontSize: "10px" }}>{walletNumber}</b>
              </WalletTypography>
            ) : (
              <WalletTypography sx={{ fontSize: "12px" }}>
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
              <ButtonStyled onClick={handleAddWalletClick}>
                <ButtonStyledTypography>
                  {t("Create wallet")}
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
