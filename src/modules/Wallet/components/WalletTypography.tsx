import { styled, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const WalletTypography = styled(Typography)({
  fontSize: "13px",
  fontWeight: 400,
  color: MAIN_COLORS.subTextColor,
  fontFamily: "Roboto",
  textWrap: "wrap",
  lineBreak: "anywhere",
});
