import { styled, Tab } from "@mui/material";
import { MAIN_COLORS } from "../../shared/colors";

export const StyledTabMission = styled(Tab)({
  fontSize: "12px",
  fontWeight: 700,
  padding: "0 10px",
  color: MAIN_COLORS.textColor,
  border: MAIN_COLORS.dailyBorder,
  borderRadius: "5px",
  minHeight: "35px",
  "&.Mui-selected": {
    color: MAIN_COLORS.activeTabColor,
  },
});
