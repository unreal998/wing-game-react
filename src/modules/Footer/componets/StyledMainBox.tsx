import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledMainBox = styled(Box)({
  position: "fixed",
  bottom: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  zIndex: 100,
  backgroundColor: MAIN_COLORS.headerBG,
});
