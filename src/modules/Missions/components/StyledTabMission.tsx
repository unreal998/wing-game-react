import { styled, Tab } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledTabMission = styled(Tab)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: 700,
  padding: "0 12px",
  minHeight: "35px",
  borderRadius: "10px",
  textTransform: "none",
  backgroundColor: "rgba(4, 53, 80, 1)",
  border: `1px solid ${MAIN_COLORS.activeTabColor}`,
  color: MAIN_COLORS.missionTable,

  "&.Mui-selected": {
    backgroundColor: MAIN_COLORS.activeTabColor,
    color: "black",
    border: "none",
  },
}));
