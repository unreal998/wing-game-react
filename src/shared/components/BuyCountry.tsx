import React from "react";
import { Box, Typography, Modal, Button, Stack } from "@mui/material";
import { MAIN_COLORS } from "../../shared/colors";
import { useTranslation } from "react-i18next";
import footerButtonSound from "../../assets/sounds/footerButton.mp3";

type Props = {
  open: boolean;
  onClose: () => void;
  onBuy: () => void;
};

const BuyCountryModal: React.FC<Props> = ({ open, onClose, onBuy }) => {
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "80vw",
          maxWidth: "400px",
          bgcolor: MAIN_COLORS.appBG,
          color: "white",
          p: 4,
          borderRadius: 4,
          boxShadow: 20,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {t("doYouWhantToBuy")}
        </Typography>
        <Typography mb={4}>{t("newOpportunities")}</Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            onClick={() => {
              new Audio(footerButtonSound).play();
              onClose();
            }}
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "#ffffff22",
              },
            }}
          >
            {t("No")}
          </Button>

          <Button
            onClick={() => {
              new Audio(footerButtonSound).play();
              onBuy();
            }}
            variant="contained"
            sx={{
              backgroundColor: "#4caf50",
              color: "white",
              "&:hover": {
                backgroundColor: "#43a047",
              },
            }}
          >
            {t("buy")} (1 TON)
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default BuyCountryModal;
