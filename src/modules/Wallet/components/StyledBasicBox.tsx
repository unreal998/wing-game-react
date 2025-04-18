import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledBasicBox = styled(Box)({
  width: "100%",
  display: "flex",
  border: `1px solid ${MAIN_COLORS.activeTabColor}`,
  backgroundColor: MAIN_COLORS.basicBox,
  borderRadius: "5px",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});
