import { styled, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledTime = styled(Typography)({
  color: MAIN_COLORS.textColor,
  fontSize: "16px",
  fontWeight: 600,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: "12px",
  borderRadius: "7px",
});
