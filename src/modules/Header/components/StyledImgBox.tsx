import { Box, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledImgBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "80px",
  backgroundColor: "rgba(217, 217, 217, 0.17)",
  border: `1px solid ${MAIN_COLORS.mainGreen}`,
  flexDirection: "row",
  borderRadius: "9px",
  alignItems: "center",
  padding: "10px 13px",
  gap: "10px",
});
