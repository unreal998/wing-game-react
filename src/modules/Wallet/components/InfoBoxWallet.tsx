import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const InfoBoxWallet = styled(Box)(({ theme }) => ({
  backgroundColor: MAIN_COLORS.referalBox,
  border: `1px solid  ${MAIN_COLORS.activeTabColor}`,
  display: "flex",
  borderRadius: "9px",
  alignItems: "center",
}));
