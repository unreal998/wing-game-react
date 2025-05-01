import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { StyledBasicBox } from "./components/StyledBasicBox";
import TON from "../../assets/ton.png";
import { StyledTableBox } from "./components/StyledTableBox";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useSound from "use-sound";
import { useTranslation } from "react-i18next";
import HistoryItem from "./components/HistoryItem";
import { StyledTab } from "../../shared/components/StyledTab";
import { WalletTypography } from "./components/WalletTypography";
import { ButtonStyledTypography } from "./components/ButtonStyledTypography";
import { TabPanelBoxStyled } from "./components/TabPanelBoxStyled";
import { MainBox } from "../../shared/components/MainBox";
import { useDispatch, useSelector } from "react-redux";
import {
  createWalletAction,
  getWithdrawAction,
  selectWalletLoading,
} from "./slices";
import { selectUserData } from "../Header/selectors";
import { selectWalletNumber, selectWithdrawData } from "./selectors";
import Copy from "../../assets/copy.svg";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { WithdrawModal } from "../../shared/components/WithdrawModal";
import { ModuleThirteen } from "../Tutorial/components/ModuleThirteen";
import {
  selectCurrentModule,
  selectIsTutorialFinished,
} from "../Tutorial/selectors";
import { setCurrentModule } from "../Tutorial/slices";
import Switch from "../../assets/sounds/switch.mp3";
import { MAIN_COLORS } from "../../shared/colors";

const Wallet = () => {
  const loading = useSelector(selectWalletLoading);
  const { t } = useTranslation();
  const userData = useSelector(selectUserData());
  const walletNumber = useSelector(selectWalletNumber());
  const withdrawData = useSelector(selectWithdrawData());
  const dispatch = useDispatch();
  const [playTabSwitchSound] = useSound(Switch);
  const isTutorialFinished = useSelector(selectIsTutorialFinished());

  const currentModule = useSelector(selectCurrentModule());

  useEffect(() => {
    if (userData && !withdrawData) dispatch(getWithdrawAction(userData.id));
  }, [dispatch, withdrawData, userData]);

  const [value, setValue] = useState<number>(0);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    playTabSwitchSound();
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

  const formatMinutes = (dateVal: any) => {
    const minutes = new Date(dateVal || 0).getMinutes();
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
  };

  return (
    <MainBox
      position={"relative"}
      onClick={(e) => {
        if (!isTutorialFinished) {
          e.stopPropagation();
          e.preventDefault();
          dispatch(setCurrentModule(14));
        }
      }}
      sx={{
        "& *": {
          pointerEvents: !isTutorialFinished ? "none" : "auto",
        },
      }}
    >
      {currentModule === 13 && <ModuleThirteen />}
      <LoaderComponent loading={loading} />

      <TabContext value={value}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={"8px"}
          width={"100%"}
        >
          <Typography variant="h5">{t("Wallet")}</Typography>
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
              <StyledTab key={value} label={label} value={value} />
            ))}
          </TabList>
        </Stack>

        <TabPanel sx={{ padding: 0, marginTop: "15px" }} value={0}>
          <Box
            sx={{
              backgroundColor: MAIN_COLORS.blockBG,
              padding: "8px",
              borderRadius: "12px",
            }}
          >
            <StyledBasicBox>
              <img
                src={TON}
                alt="ton"
                style={{ paddingTop: "15px", width: "88px" }}
              />
              {walletNumber ? (
                <WalletTypography>
                  {t("Your wallet:")} <br />
                  {walletNumber}
                </WalletTypography>
              ) : (
                <WalletTypography>{t("Connect")}</WalletTypography>
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
                <Button
                  sx={{
                    paddtingTop: "12px",
                    paddingBottom: "12px",
                    backgroundColor: MAIN_COLORS.mainGreen,
                    borderRadius: "12px",
                    width: "100%",
                  }}
                  onClick={handleAddWalletClick}
                >
                  <ButtonStyledTypography>
                    {t("Create wallet")}
                  </ButtonStyledTypography>
                </Button>
              )}
            </StyledBasicBox>
          </Box>
        </TabPanel>

        <TabPanel sx={{ padding: 0, marginTop: "15px" }} value={1}>
          <StyledTableBox sx={{ marginTop: "5px" }}>
            <TabPanelBoxStyled>
              <Typography sx={{ fontSize: "16px", fontWeight: 900 }}>
                {t("History")}
              </Typography>
            </TabPanelBoxStyled>
            {withdrawData.map((withdraw, i) => (
              <HistoryItem
                key={i}
                date={new Date(withdraw.created_at || 0).toLocaleDateString()}
                time={`${new Date(withdraw.created_at || 0).getHours()}:${formatMinutes(withdraw.created_at)}`}
                amount={`${withdraw.sum} TON`}
                label={withdraw.status}
              />
            ))}
          </StyledTableBox>
        </TabPanel>
      </TabContext>
      <WithdrawModal
        open={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onSubmit={handleWithdrawRequest}
      />
      <Button onClick={() => setIsWithdrawOpen(true)}>
        <ButtonStyledTypography>{t("Withdraw funds")}</ButtonStyledTypography>
      </Button>
    </MainBox>
  );
};
export default Wallet;
