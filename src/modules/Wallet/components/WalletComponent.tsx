import { Box, Stack, Typography } from "@mui/material";
import { WalletContentBox } from "./WalletContentBox";
import { MAIN_COLORS } from "../../../shared/colors";
import { WalletTypography } from "./WalletTypography";
import Copy from "../../../assets/copy.svg";
import Checkmark from "../../../assets/checkmark.png";
import TON from "../../../assets/ton.png";
import { useTranslation } from "react-i18next";
import { GameButtonComponent } from "../../../shared/components/GameButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { createWalletAction } from "../slices";
import { selectUserData } from "../../Header/selectors";
import { useCallback, useState } from "react";
import { StyledInputBox } from "../../Referal_temp/components/StyledInputBox";
import { StyledInput } from "../../Referal_temp/components/StyledInput";
import { selectWalletNumber } from "../selectors";

export const WalletComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData());
  const walletNumber = useSelector(selectWalletNumber());
  const [isClicked, setIsClicked] = useState(false);

  const handleAddWalletClick = () => {
    if (userData) {
      dispatch(createWalletAction(userData.id));
    }
  };

  const throttleMarkIcon = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 3000);
  }, []);

  const handleCopyClick = useCallback(() => {
    throttleMarkIcon();
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
        <img src={TON} alt="ton" style={{ width: "88px" }} />
        {walletNumber && (
          <Typography
            sx={{
              color: MAIN_COLORS.missionTable,
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {t("To refill your balance, use the address below")}
          </Typography>
        )}
        <Stack direction="row">
          {walletNumber ? (
            <Stack gap="12px">
              <WalletTypography>{t("Your wallet:")}</WalletTypography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                gap={"10px"}
              >
                <Box
                  sx={{ display: "flex", gap: "15px", alignItems: "center" }}
                >
                  <StyledInputBox>
                    <StyledInput
                      type="text"
                      sx={{
                        textOverflow: "ellipsis",
                      }}
                      value={walletNumber}
                      readOnly
                    />
                  </StyledInputBox>
                  <img
                    onClick={handleCopyClick}
                    src={isClicked ? Checkmark : Copy}
                    alt="Copy"
                    style={{ width: "16px", height: "16px", cursor: "pointer" }}
                  />
                </Box>
              </Stack>
            </Stack>
          ) : (
            <Typography
              sx={{
                color: MAIN_COLORS.missionTable,
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              {t("Connect")}
            </Typography>
          )}
        </Stack>
        {!walletNumber && (
          <GameButtonComponent
            sx={{
              paddtingTop: "8px",
              paddingBottom: "8px",
              backgroundColor: MAIN_COLORS.mainGreen,
              borderRadius: "12px",
              width: "100%",
            }}
            onClick={handleAddWalletClick}
          >
            {t("create wallet")}
          </GameButtonComponent>
        )}
      </WalletContentBox>
    </Box>
  );
};
