import { Switch, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const CustomSwitch = styled(Switch)(() => ({
  width: 56,
  height: 30,
  padding: 0,
  display: "flex",
  justifyContent: "center",

  "& .MuiSwitch-switchBase": {
    padding: 4,
    "&.Mui-checked": {
      transform: "translateX(26px)",
      color: MAIN_COLORS.activeTabColor,
      "& + .MuiSwitch-track": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    },
  },

  "& .MuiSwitch-thumb": {
    width: 20,
    height: 20,
    marginTop: "1px",
  },

  "& .MuiSwitch-track": {
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    opacity: 1,
  },
}));
