import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const TableBox = styled(Box)({
  display: "flex",
  backgroundColor: MAIN_COLORS.sectionBG,
  borderRadius: "8px",
  padding: "8px 12px",
  justifyContent: "space-between",
});
