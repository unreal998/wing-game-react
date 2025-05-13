import React, { useCallback, useState } from "react";
import { Typography, Stack } from "@mui/material";
import { MAIN_COLORS } from "../colors";
import { ModalStyled } from "./ModalStyled";
import { useTranslation } from "react-i18next";
import { WithdrawModalInput } from "./WithdrawModalInput";
import { PopUpMainButton } from "./PopUpMainButton";
import { PopUpSeccondaryButton } from "./PopUpSeccondaryButton";
import { useSelector } from "react-redux";
import { selectUserData } from "../../modules/Header/selectors";

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
  const { t } = useTranslation();
  const userData = useSelector(selectUserData());

  const amountNum = parseFloat(amount);

  const isSubmitDisabled =
    !withdrawWallet.trim() ||
    !amount ||
    isNaN(amountNum) ||
    amountNum <= 0 ||
    amountNum > userTonBalance;

  const handleSubmit = () => {
    if (isSubmitDisabled) return;

    onSubmit(withdrawWallet, amount, tonMemo);
    setWithdrawWallet("");
    setAmount("");
    setTonMemo("");
    onClose();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = parseFloat(value);

    if (isNaN(num) || num < 0) {
      setAmount("");
    } else if (num > userTonBalance) {
      setAmount(userTonBalance.toString());
    } else {
      setAmount(value);
    }
  };

  const handleMAX = useCallback(() => {
    if (userData) {
      setAmount(userData.TONBalance.toString());
    }
  }, [userData]);

  return (
    <ModalStyled
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: MAIN_COLORS.sectionBG,
          padding: "24px 12px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "85%",
        },
      }}
    >
      <Typography variant="h6" color="white">
        {t("Withdraw")}
      </Typography>

      <Stack alignItems="flex-start" gap="10px">
        <Typography fontSize="14px" color={MAIN_COLORS.mainGreen}>
          {t("Wallet Number")}
        </Typography>
        <WithdrawModalInput
          fullWidth
          variant="outlined"
          value={withdrawWallet}
          onChange={(e) => setWithdrawWallet(e.target.value)}
        />
      </Stack>

      <Stack alignItems="flex-start" gap="10px">
        <Typography fontSize="14px" color={MAIN_COLORS.mainGreen}>
          TON {t("Amount")}
        </Typography>
        <Stack
          direction="row"
          gap="10px"
          justifyContent="space-between"
          width="100%"
        >
          <WithdrawModalInput
            fullWidth
            variant="outlined"
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
          <PopUpMainButton onClick={handleMAX}>{"MAX"}</PopUpMainButton>
        </Stack>
      </Stack>

      <Stack alignItems="flex-start" gap="5px">
        <Typography fontSize="14px" color={MAIN_COLORS.mainGreen}>
          TON {t("MEMO")}
        </Typography>
        <WithdrawModalInput
          fullWidth
          variant="outlined"
          value={tonMemo}
          onChange={(e) => setTonMemo(e.target.value)}
        />
      </Stack>

      <Stack direction="row" justifyContent="center" gap="20px">
        <PopUpSeccondaryButton onClick={onClose}>
          {t("Close")}
        </PopUpSeccondaryButton>
        <PopUpMainButton onClick={handleSubmit} disabled={isSubmitDisabled}>
          {t("Send")}
        </PopUpMainButton>
      </Stack>
    </ModalStyled>
  );
};
