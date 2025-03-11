import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledBox = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll",
  scrollbarGutter: "stable",
  scrollbarWidth: "thin",
  scrollbarColor: `${MAIN_COLORS.activeTabColor} #FFFFFF0F`,
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: MAIN_COLORS.activeTabColor,
    borderRadius: "2px",
  },
  "&::-webkit-scrollbar-track": { backgroundColor: MAIN_COLORS.textColor },
});
