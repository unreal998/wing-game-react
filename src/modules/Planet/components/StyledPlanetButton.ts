import { Button, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledPlanetButton = styled(Button)({
  top: "0",
  left: "0",
  position: "absolute",
  fontSize: "16px",
  fontWeight: 900,
  textTransform: "capitalize",
  color: MAIN_COLORS.textColor,
  backgroundColor: MAIN_COLORS.activeTabColor,
  "&.Mui-disabled": {
    backgroundColor: "rgb(134 134 134)",
  },
});
