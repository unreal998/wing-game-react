import React, { useState } from "react";
import { TextField, Button, Typography, Stack } from "@mui/material";
import { MAIN_COLORS } from "../colors";
import { ModalStyled } from "./ModalStyled";
import { useTranslation } from "react-i18next";
import footerButtonSound from "../../assets/sounds/footerButton.mp3";

type WithdrawModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (wallet: string, amount: string, tonMemo: string) => void;
  userTonBalance: number;
};

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  open,
  onClose,
  onSubmit,
  userTonBalance,
}) => {
  const [withdrawWallet, setWithdrawWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [tonMemo, setTonMemo] = useState("");
  const [lowBalanceOpen, setLowBalanceOpen] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum > userTonBalance) {
      setLowBalanceOpen(true);
      return;
    }

    onSubmit(withdrawWallet, amount, tonMemo);
    setWithdrawWallet("");
    setAmount("");
    setTonMemo("");
    onClose();
  };

  return (
    <>
      <ModalStyled
        open={open}
        onClose={onClose}
        sx={{
          backgroundColor: MAIN_COLORS.blockBG,
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        <Stack
          sx={{
            backgroundColor: MAIN_COLORS.sectionBG,
            padding: "20px 15px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography variant="h6" color="white">
            {t("Withdraw")}
          </Typography>

          <Stack alignItems="flex-start" gap="5px">
            <Typography color="white">{t("Wallet Number")}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={withdrawWallet}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: MAIN_COLORS.subTextColor,
                  border: `1px solid ${MAIN_COLORS.appBG}`,
                  outline: "none",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: `1px solid ${MAIN_COLORS.mainGreen}`,
                },
              }}
              onChange={(e) => setWithdrawWallet(e.target.value)}
            />
          </Stack>

          <Stack alignItems="flex-start" gap="5px">
            <Typography color="white">TON {t("Amount")}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={amount}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: MAIN_COLORS.subTextColor,
                  border: `1px solid ${MAIN_COLORS.appBG}`,
                  outline: "none",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: `1px solid ${MAIN_COLORS.mainGreen}`,
                },
              }}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Stack>

          <Stack alignItems="flex-start" gap="5px">
            <Typography color="white">TON {t("MEMO")}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={tonMemo}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: MAIN_COLORS.subTextColor,
                  border: `1px solid ${MAIN_COLORS.appBG}`,
                  outline: "none",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: `1px solid ${MAIN_COLORS.mainGreen}`,
                },
              }}
              onChange={(e) => setTonMemo(e.target.value)}
            />
          </Stack>

          <Stack direction="row" justifyContent="center" gap="20px">
            <Button
              sx={{
                border: `1px solid ${MAIN_COLORS.mainGreen}`,
                color: "white",
                backgroundColor: `${MAIN_COLORS.mainGreen}`,
                padding: "10px 20px",
              }}
              onClick={() => {
                new Audio(footerButtonSound).play();
                handleSubmit();
              }}
            >
              {t("Send")}
            </Button>

            <Button
              sx={{
                border: `1px solid ${MAIN_COLORS.mainGreen}`,
                color: "white",
                backgroundColor: `${MAIN_COLORS.blockBG}`,
                padding: "10px 20px",
              }}
              onClick={() => {
                new Audio(footerButtonSound).play();
                onClose();
              }}
            >
              {t("Close")}
            </Button>
          </Stack>
        </Stack>
      </ModalStyled>

      {/* Low Balance Modal */}
      <ModalStyled
        open={lowBalanceOpen}
        onClose={() => setLowBalanceOpen(false)}
        sx={{
          backgroundColor: MAIN_COLORS.blockBG,
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        <Stack
          sx={{
            backgroundColor: MAIN_COLORS.sectionBG,
            padding: "20px",
            borderRadius: "8px",
            gap: "20px",
          }}
          alignItems="center"
        >
          <Typography variant="h6" color="white">
            {t("Low Balance")}
          </Typography>
          <Typography color="white" textAlign="center">
            {t("Your TON balance is too low to proceed with this withdrawal.")}
          </Typography>
          <Button
            onClick={() => {
              new Audio(footerButtonSound).play();
              setLowBalanceOpen(false);
            }}
            sx={{
              border: `1px solid ${MAIN_COLORS.mainGreen}`,
              color: "white",
              backgroundColor: MAIN_COLORS.mainGreen,
              padding: "8px 16px",
            }}
          >
            OK
          </Button>
          <Button
            onClick={() => {
              new Audio(footerButtonSound).play();
              setLowBalanceOpen(false);
            }}
            sx={{
              border: `1px solid ${MAIN_COLORS.mainGreen}`,
              color: "white",
              backgroundColor: MAIN_COLORS.mainGreen,
              padding: "8px 16px",
            }}
          >
            OK
          </Button>
        </Stack>
      </ModalStyled>
    </>
  );
};
