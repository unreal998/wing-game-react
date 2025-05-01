import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledFlashBox = styled(Box)({
  display: "flex",
  padding: "9px 15px",
  borderRadius: "7px",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: MAIN_COLORS.sectionBG,
});
