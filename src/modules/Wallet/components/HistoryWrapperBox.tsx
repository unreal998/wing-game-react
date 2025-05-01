import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const HistoryWrapperBox = styled(Box)({
  width: "100%",
  display: "flex",
  backgroundColor: MAIN_COLORS.blockBG,
  borderRadius: "12px",
  flexDirection: "column",
  alignItems: "left",
  padding: "8px",
  gap: "8px",
});
