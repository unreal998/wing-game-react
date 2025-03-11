import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const TableBox = styled(Box)({
  display: "flex",
  borderBottom: `1px solid ${MAIN_COLORS.mainGreyBG}`,
  marginLeft: "16px",
  marginRight: "10px",
});
