import { Box, Stack } from "@mui/material";
import { WalletContentBox } from "./WalletContentBox";
import { MAIN_COLORS } from "../../../shared/colors";
import { WalletTypography } from "./WalletTypography";
import Copy from "../../../assets/copy.svg";
import TON from "../../../assets/ton.png";
import { useTranslation } from "react-i18next";
import { GameButtonComponent } from "../../../shared/components/GameButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { createWalletAction } from "../slices";
import { selectUserData } from "../../Header/selectors";
import { selectWalletNumber } from "../selectors";
import { useCallback } from "react";

export const WalletComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData());
  const walletNumber = useSelector(selectWalletNumber());

  const handleAddWalletClick = () => {
    if (userData) {
      dispatch(createWalletAction(userData.id));
    }
  };

  const handleCopyClick = useCallback(() => {
    if (walletNumber) {
      navigator.clipboard
        .writeText(walletNumber)
        .then(() => console.log("Wallet number copied!"))
        .catch((err) => console.error("Failed to copy: ", err));
    }
  }, [walletNumber]);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: MAIN_COLORS.blockBG,
        padding: "8px",
        borderRadius: "12px",
      }}
    >
      <WalletContentBox>
        <img
          src={TON}
          alt="ton"
          style={{ paddingTop: "15px", width: "88px" }}
        />
        <Stack direction="row">
          {walletNumber ? (
            <Stack>
              <WalletTypography>{t("Your wallet:")}</WalletTypography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                gap={"10px"}
              >
                <WalletTypography>{walletNumber}</WalletTypography>
                <Box onClick={handleCopyClick}>
                  <img
                    src={Copy}
                    alt="Copy"
                    style={{ width: "16px", height: "16px" }}
                  />
                </Box>
              </Stack>
            </Stack>
          ) : (
            <WalletTypography>{t("Connect")}</WalletTypography>
          )}
        </Stack>

        {!walletNumber && (
          <GameButtonComponent
            sx={{
              paddtingTop: "12px",
              paddingBottom: "12px",
              backgroundColor: MAIN_COLORS.mainGreen,
              borderRadius: "12px",
              width: "100%",
            }}
            onClick={handleAddWalletClick}
          >
            {t("Create wallet")}
          </GameButtonComponent>
        )}
      </WalletContentBox>
    </Box>
  );
};
