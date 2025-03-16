import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const TabPanelBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  bgcolor: MAIN_COLORS.mainGreyBG,
  gap: "15px",
  borderRadius: "5px",
  "@media (max-height: 732px)": {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
});
