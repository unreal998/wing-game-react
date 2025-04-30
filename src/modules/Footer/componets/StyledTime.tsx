import { styled, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledTime = styled(Typography)({
  color: MAIN_COLORS.textColor,
  fontSize: "24px",
  fontWeight: 600,
  backgroundColor: " rgba(1, 18, 29, 0.4)",
  padding: "12px 0 12px 0",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  width: "95vw",
  backdropFilter: "blur(12px)",
});
