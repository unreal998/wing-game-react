import { styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledInput = styled("input")({
  width: "100%",
  background: "transparent",
  border: "none",
  outline: "none",
  color: MAIN_COLORS.mainGreen,
  fontSize: "14px",
  fontWeight: 400,
});
