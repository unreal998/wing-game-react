import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledInputBox = styled(Box)({
  width: "100%",
  border: `1px solid ${MAIN_COLORS.mainGreen}`,
  borderRadius: "8px",
  backgroundColor: MAIN_COLORS.blockBG,
  padding: "8px 16px",
});
