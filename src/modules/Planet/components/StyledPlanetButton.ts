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
    color: "black",
    borderRadius: "8px",
    backgroundColor: isBought ? MAIN_COLORS.mainGreen : MAIN_COLORS.gold,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
  }),
);
