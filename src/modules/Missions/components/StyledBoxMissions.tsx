import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledBoxMission = styled(Box)({
  display: "flex",
  justifyContent: "start",
  border: MAIN_COLORS.dailyBorder,
  marginBottom: "5px",
  borderRadius: "5px",
  alignItems: "center",
});
