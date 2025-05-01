import { styled, Tab } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const TabStyles = styled(Tab)({
  fontSize: "12px",
  fontWeight: 700,
  padding: "0px 10px",
  color: MAIN_COLORS.textColor,
  border: `1px solid ${MAIN_COLORS.mainGreen}`,
  borderRadius: "5px",
  minHeight: "35px",
  "&.Mui-selected": {
    color: MAIN_COLORS.activeTabColor,
  },
});
