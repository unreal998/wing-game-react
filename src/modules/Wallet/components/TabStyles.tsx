import { styled, Tab } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const TabStyles = styled(Tab)({
  fontSize: "12px",
  fontWeight: 700,
  padding: "13px 16px",
  color: MAIN_COLORS.textColor,
  border: `1px solid ${MAIN_COLORS.mainGreen}`,
  borderRadius: "8px",
  minHeight: "35px",
  "&.Mui-selected": {
    backgroundColor: MAIN_COLORS.mainGreen,
    color: "black",
  },
});
