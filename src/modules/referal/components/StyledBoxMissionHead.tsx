import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledBoxMissioHead = styled(Box)({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: MAIN_COLORS.dailyBorder,
  borderRadius: "5px",
});
