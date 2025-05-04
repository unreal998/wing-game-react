import { Button, styled } from "@mui/material";
import { MAIN_COLORS } from "../colors";

export const GameButtonComponent = styled(Button)(({ theme }) => ({
  paddingTop: "12px",
  paddingBottom: "12px",
  backgroundColor: MAIN_COLORS.mainGreen,
  borderRadius: "12px",
  width: "100%",
  fontSize: "18px",
  fontWeight: 800,
  textTransform: "uppercase",
  color: "black",
}));
