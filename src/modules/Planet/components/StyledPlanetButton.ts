import { Button, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledPlanetButton = styled(Button)<{ isBought: boolean }>(
  ({ isBought }) => ({
    top: "0",
    left: "0",
    position: "absolute",
    fontSize: "16px",
    fontWeight: 900,
    textTransform: "capitalize",
    color: MAIN_COLORS.textColor,
    backgroundColor: isBought ? MAIN_COLORS.activeTabColor : MAIN_COLORS.gold,
    "&.Mui-disabled": {
      backgroundColor: "rgb(134 134 134)",
      boxShadow: "none",
      animation: "none",
    },
  }),
);
