import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledCenterFooter = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "7px",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  border: `1px solid  ${MAIN_COLORS.activeTabColor}`,
  borderBottom: "none",
  borderTopLeftRadius: "52%",
  borderTopRightRadius: "52%",
});
