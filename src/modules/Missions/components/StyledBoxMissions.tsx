import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledBoxMission = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  paddingLeft: "10px",
  margin: "5px",
  borderRadius: "5px",
  alignItems: "center",
  backgroundColor: MAIN_COLORS.sectionBG,
});
