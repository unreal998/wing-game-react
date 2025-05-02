import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledBasicBox = styled(Box)({
  display: "flex",
  backgroundColor: MAIN_COLORS.blockBG,
  borderRadius: "12px",
  padding: "8px",
  gap: "8px",
  flexDirection: "column",
  overflowY: "scroll",
  scrollbarGutter: "stable",
  scrollbarWidth: "thin",
  scrollbarColor: `${MAIN_COLORS.mainGreen}`,
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: MAIN_COLORS.mainGreen,
    borderRadius: "2px",
  },
  "&::-webkit-scrollbar-track": { backgroundColor: MAIN_COLORS.textColor },
});
