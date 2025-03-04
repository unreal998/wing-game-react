import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledMain = styled(Box)({
  width: "100wv",
  height: "50px",
  backgroundColor: MAIN_COLORS.headerBG,
  borderRadius: "52px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: "14px",
  marginRight: "14px",
  marginTop: "2vh",
});
