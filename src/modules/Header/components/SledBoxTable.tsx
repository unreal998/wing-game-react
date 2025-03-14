import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledBoxTable = styled(Box)({
  width: "100%",
  paddingTop: "7px",
  paddingBottom: "7px",
  paddingRight: "22px",
  borderRight: `1px solid ${MAIN_COLORS.mainGreyBG}`,
});
