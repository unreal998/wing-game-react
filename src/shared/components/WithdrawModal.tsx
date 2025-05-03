import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { MAIN_COLORS } from "../colors";
import { ModalStyled } from "./ModalStyled";
import { useTranslation } from "react-i18next";

type WithdrawModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (wallet: string, amount: string, tonMemo: string) => void;
};

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [withdrawWallet, setWithdrawWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [tonMemo, setTonMemo] = useState("");
  const { t } = useTranslation();

  const handleSubmit = () => {
    onSubmit(withdrawWallet, amount, tonMemo);
    setWithdrawWallet("");
    setAmount("");
    setTonMemo("");
    onClose();
  };

  return (
    <ModalStyled
      open={open}
      onClose={onClose}
      sx={{
        backgroundColor: MAIN_COLORS.blockBG,
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          backgroundColor: MAIN_COLORS.sectionBG,
          padding: "8px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Typography variant="h6" color="white">
          Withdraw
        </Typography>
        <TextField
          fullWidth
          label="Wallet Number"
          variant="outlined"
          value={withdrawWallet}
          onChange={(e) => setWithdrawWallet(e.target.value)}
        />
        <TextField
          fullWidth
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          fullWidth
          label="TON MEMO"
          variant="outlined"
          value={tonMemo}
          onChange={(e) => setTonMemo(e.target.value)}
        />
        <Stack direction="row" justifyContent="center" gap="20px">
          <Button
            sx={{
              border: `1px solid ${MAIN_COLORS.mainGreen}`,
              color: "white",
              backgroundColor: `${MAIN_COLORS.mainGreen}`,
              padding: "10px 20px",
            }}
            onClick={handleSubmit}
          >
            Send
          </Button>
          <Button
            sx={{
              border: `1px solid ${MAIN_COLORS.mainGreen}`,
              color: "white",
              backgroundColor: `${MAIN_COLORS.blockBG}`,
              padding: "10px 20px",
            }}
            onClick={onClose}
          >
            {t("Close")}
          </Button>
        </Stack>
      </Box>
    </ModalStyled>
  );
};
