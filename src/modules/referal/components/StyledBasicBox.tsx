import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledBasicBox = styled(Box)({
  width: "100%",
  display: "flex",
  marginTop: "17px",
  border: `1px solid ${MAIN_COLORS.contentYellow}`,
  borderRadius: "5px",
  flexDirection: "column",
  overflowY: "scroll",
  scrollbarGutter: "stable",
  maxHeight: "374px",
  scrollbarWidth: "thin",
  scrollbarColor: `${MAIN_COLORS.contentYellow} #FFFFFF0F`,
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: MAIN_COLORS.contentYellow,
    borderRadius: "2px",
  },
  "&::-webkit-scrollbar-track": { backgroundColor: MAIN_COLORS.textColor },
});
