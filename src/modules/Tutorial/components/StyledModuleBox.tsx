import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledModuleBox = styled(Box)({
  backgroundColor: MAIN_COLORS.sectionBG,
  margin: "20px",
  padding: "16px",
  borderRadius: "10px",
  border: `6px solid ${MAIN_COLORS.blockBG2}`,
  zIndex: 999999,
  width: "80vw",
});
