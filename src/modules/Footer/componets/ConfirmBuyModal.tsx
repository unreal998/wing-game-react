// components/ConfirmBuyModal.tsx
import React from "react";
import { Modal, Box, Typography, Stack, Button } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";
import { useTranslation } from "react-i18next";

interface ConfirmBuyModalProps {
  open: boolean;
  windValue: number;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmBuyModal: React.FC<ConfirmBuyModalProps> = ({
  open,
  windValue,
  onConfirm,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: MAIN_COLORS.sectionBG,
          borderRadius: 2,
          p: 3,
          width: 280,
          textAlign: "center",
        }}
      >
        <Typography fontSize="16px" mb={2} color="#fff">
          {t("Are you sure you want to buy wind speed")} {windValue}?
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            sx={{ bgcolor: MAIN_COLORS.mainGreen }}
            onClick={onConfirm}
          >
            {t("Buy")}
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderColor: MAIN_COLORS.mainGreen,
              color: "#fff",
              "&:hover": { borderColor: MAIN_COLORS.mainGreen },
            }}
            onClick={onClose}
          >
            {t("Cancel")}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
