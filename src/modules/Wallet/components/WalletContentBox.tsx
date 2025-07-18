import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const WalletContentBox = styled(Box)({
  width: "100%",
  display: "flex",
  backgroundColor: MAIN_COLORS.sectionBG,
  borderRadius: "12px",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "10px",
  padding: "32px 12px",
});
