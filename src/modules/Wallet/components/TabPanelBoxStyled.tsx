import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const TabPanelBoxStyled = styled(Box)({
  width: "100hv",
  marginRight: "15px",
  paddingLeft: "18px",
  paddingTop: "5px",
  paddingBottom: "5px",
  display: "flex",
  borderBottom: `1px solid ${MAIN_COLORS.mainGreyBG}`,
});
