import { styled, Tab } from "@mui/material";
import { MAIN_COLORS } from "../colors";

export const StyledTab = styled(Tab)({
  fontSize: "12px",
  fontWeight: 700,
  padding: "13px 16px",
  color: MAIN_COLORS.textColor,
  border: `1px solid ${MAIN_COLORS.mainGreen}`,
  borderRadius: "8px",
  minHeight: "auto",
  minWidth: "auto",
  "&.Mui-selected": {
    backgroundColor: MAIN_COLORS.mainGreen,
    color: "black",
  },
  "@media (max-width: 346px)": {
    fontSize: "10px",
    padding: "9px 11px",
    width: "64px",
  },
});
