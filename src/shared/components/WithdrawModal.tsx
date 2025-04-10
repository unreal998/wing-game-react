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

  const handleSubmit = () => {
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
          Withdraw Request
        </Typography>
        <TextField
          fullWidth
          label="Wallet Number"
          variant="outlined"
          value={withdrawWallet}
          onChange={(e) => setWithdrawWallet(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="TON MEMO"
          variant="outlined"
          value={tonMemo}
          onChange={(e) => setTonMemo(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Send Request
        </Button>
      </Box>
    </Modal>
  );
};
