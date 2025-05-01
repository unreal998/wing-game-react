import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const HistoryWrapperBox = styled(Box)({
  width: "95%",
  display: "flex",
  backgroundColor: MAIN_COLORS.blockBG,
  borderRadius: "12px",
  flexDirection: "column",
  alignItems: "left",
  padding: "8px",
  gap: "8px",
  overflowY: "scroll",
  scrollbarGutter: "stable",
  scrollbarWidth: "thin",
  scrollbarColor: `${MAIN_COLORS.mainGreen}`,
  "&::-webkit-scrollbar": {
    width: "4px",
    backgroundColor: MAIN_COLORS.mainGreen,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: MAIN_COLORS.mainGreen,
    borderRadius: "2px",
  },
  "&::-webkit-scrollbar-track": { backgroundColor: MAIN_COLORS.mainGreen },
});
