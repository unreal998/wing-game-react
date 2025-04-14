import React from "react";
import { Box, Typography, Modal, Button, Stack } from "@mui/material";
import { MAIN_COLORS } from "../../shared/colors";

type Props = {
  open: boolean;
  onClose: () => void;
  onBuy: () => void;
};

const BuyCountryModal: React.FC<Props> = ({ open, onClose, onBuy }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "80vw",
          maxWidth: "400px",
          bgcolor: MAIN_COLORS.missionTable,
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
          Do you want to buy that area?
        </Typography>
        <Typography mb={4}>
          That area will gain you the new opportunities
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "#ffffff22",
              },
            }}
          >
            No
          </Button>
          <Button
            onClick={onBuy}
            variant="contained"
            sx={{
              backgroundColor: "#4caf50",
              color: "white",
              "&:hover": {
                backgroundColor: "#43a047",
              },
            }}
          >
            Buy (1$)
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default BuyCountryModal;
