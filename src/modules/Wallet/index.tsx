import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useSound from "use-sound";
import { useTranslation } from "react-i18next";
import { StyledTab } from "../../shared/components/StyledTab";
import { MainBox } from "../../shared/components/MainBox";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWalletLoading,
  sendWithdrawRequestAction,
  setWithdrawModalOpen,
} from "./slices";
import { selectUserData } from "../Header/selectors";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { WithdrawModal } from "../../shared/components/WithdrawModal";
import Switch from "../../assets/sounds/switch.mp3";
import { updateBalanceAction } from "../Header/slices";
import { WalletComponent } from "./components/WalletComponent";
import { HistoryComponent } from "./components/HistoryComponent";
import { selectIsWithdrawOpen } from "./selectors";
import { selectSoundEnabled } from "../Settings/selectors";

const Wallet = () => {
  const loading = useSelector(selectWalletLoading);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const soundEnabled = useSelector(selectSoundEnabled());
  const [playTabSwitchSound] = useSound(Switch);
  const userData = useSelector(selectUserData());
  const isWithdrawModalOpen = useSelector(selectIsWithdrawOpen());

  useEffect(() => {
    if (userData) {
      dispatch(updateBalanceAction(userData.id));
    }
  }, [dispatch, userData]);

  const [value, setValue] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (soundEnabled) playTabSwitchSound();
    setValue(newValue);
  };

  const handleWithdrawClose = () => {
    dispatch(setWithdrawModalOpen(false));
  };

  const handleWithdrawRequest = (
    wallet: string,
    amount: string,
    tonMemo: string,
  ) => {
    if (userData) {
      dispatch(
        sendWithdrawRequestAction({
          uid: userData.id,
          wallet,
          amount,
          tonMemo,
          tid: userData.telegramID.toString(),
        }),
      );
      dispatch(setWithdrawModalOpen(false));
    }
  };

  return (
    <MainBox
      position={"relative"}
      sx={{
        marginTop: "20px",
      }}
    >
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
          <WalletComponent />
        </TabPanel>

        <TabPanel sx={{ padding: 0, marginTop: "15px" }} value={1}>
          <HistoryComponent />
        </TabPanel>
      </TabContext>

      <WithdrawModal
        open={isWithdrawModalOpen}
        onClose={handleWithdrawClose}
        onSubmit={handleWithdrawRequest}
        userTonBalance={
          (userData && userData.withdrawLimit > userData.TONBalance
            ? userData.TONBalance
            : userData?.withdrawLimit) || 0
        }
      />
    </MainBox>
  );
};
export default Wallet;
