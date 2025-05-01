import { styled, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledSHIB = styled(Typography)({
  fontSize: "12px",
  fontWeight: 600,
  color: MAIN_COLORS.textColor,
  display: "flex",
  alignItems: "center",
  gap: "5px",
});
