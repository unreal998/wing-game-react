import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledFlashBox = styled(Box)({
  gap: "9px",
  display: "flex",
  padding: "15px",
  borderRadius: "7px",
  width: "50%",
  alignItems: "center",
  backgroundColor: MAIN_COLORS.electrisityBoxBG,
});
