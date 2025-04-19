import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUserData } from "../../modules/Header/selectors"; //

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
  const { t } = useTranslation();

  const userData = useSelector(selectUserData());
  const tonBalance = userData?.TONBalance ?? 0;

  console.log("tonBalance", tonBalance);

  const [withdrawWallet, setWithdrawWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [tonMemo, setTonMemo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    if (!withdrawWallet.trim()) {
      return setError(t("Wallet number is required"));
    }

    if (!amount.trim()) {
      return setError(t("Amount is required"));
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return setError(t("Invalid amount"));
    }

    if (parsedAmount > tonBalance) {
      return setError(t("Amount exceeds your TON balance"));
    }

    onSubmit(withdrawWallet, amount, tonMemo);
    setWithdrawWallet("");
    setAmount("");
    setTonMemo("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
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
          onClick={onClose}
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
        <TextField
          fullWidth
          label={t("TON MEMO (optional)")}
          variant="outlined"
          value={tonMemo}
          onChange={(e) => setTonMemo(e.target.value)}
          sx={{ mb: 2 }}
        />

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {t("Send Request")}
        </Button>
      </Box>
    </Modal>
  );
};
