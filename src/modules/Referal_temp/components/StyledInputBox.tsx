import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledInputBox = styled(Box)({
  width: "100%",
  border: `1px solid ${MAIN_COLORS.activeTabColor}`,
  borderRadius: "9px",
  backgroundColor: "rgba(217, 217, 217, 0.12)",
  padding: "19px 21px",
});
