import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useSound from "use-sound";
import { useTranslation } from "react-i18next";
import { StyledTab } from "../../shared/components/StyledTab";
import { GameButtonComponent } from "../../shared/components/GameButtonComponent";
import { MainBox } from "../../shared/components/MainBox";
import { useDispatch, useSelector } from "react-redux";
import {
  createWalletAction,
  getWithdrawAction,
  selectWalletLoading,
  sendWithdrawRequestAction,
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
import { updateBalanceAction } from "../Header/slices";
import { WalletComponent } from "./components/WalletComponent";
import { HistoryComponent } from "./components/HistoryComponent";
import { selectUserData } from "../Header/selectors";

const Wallet = () => {
  const loading = useSelector(selectWalletLoading);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [playTabSwitchSound] = useSound(Switch);
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const userData = useSelector(selectUserData());
  const currentModule = useSelector(selectCurrentModule());

  useEffect(() => {
    if (userData) {
      dispatch(updateBalanceAction(userData.id));
    }
  }, [dispatch, userData]);

  const [value, setValue] = useState<number>(0);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    playTabSwitchSound();
    setValue(newValue);
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
        }),
      );
      setIsWithdrawOpen(false);
    }
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
        marginTop: "20px",
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
          <WalletComponent />
        </TabPanel>

        <TabPanel sx={{ padding: 0, marginTop: "15px" }} value={1}>
          <HistoryComponent />
        </TabPanel>
      </TabContext>
      <GameButtonComponent onClick={() => setIsWithdrawOpen(true)}>
        {t("Withdraw funds")}
      </GameButtonComponent>
      <WithdrawModal
        open={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onSubmit={handleWithdrawRequest}
      />
    </MainBox>
  );
};
export default Wallet;
