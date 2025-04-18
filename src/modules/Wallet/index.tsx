import { Box, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { StyledBasicBox } from "./components/StyledBasicBox";
import TON from "../../assets/ton.png";
import { ButtonStyled } from "./components/ButtonStyled";
import { StyledTableBox } from "./components/StyledTableBox";
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
import { useDispatch, useSelector } from "react-redux";
import { createWalletAction, selectWalletLoading } from "./slices";
import { selectUserData } from "../Header/selectors";
import { selectWalletNumber } from "./selectors";
import Copy from "../../assets/copy.svg";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { WithdrawModal } from "../../shared/components/WithdrawModal";

const Wallet = () => {
  const loading = useSelector(selectWalletLoading);
  const { t } = useTranslation();
  const [playSound] = useSound(FooterButtonPress);
  const userData = useSelector(selectUserData());
  const walletNumber = useSelector(selectWalletNumber());
  const dispatch = useDispatch();

  const [value, setValue] = useState<number>(0);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddWalletClick = () => {
    if (userData) {
      dispatch(createWalletAction(userData.id));
    }
  };

  const handleWithdrawRequest = (
    wallet: string,
    amount: string,
    tonMemo: string,
  ) => {
    console.log("Запрос на вывод:", { wallet, amount, tonMemo });
    setIsWithdrawOpen(false);
  };

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

  return (
    <MainBox>
      <LoaderComponent loading={loading} />
      <Typography variant="h5">{t("Wallet")}</Typography>

      <ButtonStyled onClick={() => setIsWithdrawOpen(true)}>
        <ButtonStyledTypography>{t("Withdraw funds")}</ButtonStyledTypography>
      </ButtonStyled>

      <WithdrawModal
        open={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onSubmit={handleWithdrawRequest}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "8px",
        }}
      ></Box>

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
