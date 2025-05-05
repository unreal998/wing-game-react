import { Switch, styled } from "@mui/material";

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
      "& .MuiSwitch-thumb": {
        backgroundColor: "rgba(99, 238, 106, 1)",
      },
    },
  },

  "& .MuiSwitch-thumb": {
    width: 20,
    height: 20,
    marginTop: "1px",
    backgroundColor: "rgba(11, 88, 15, 1)",
  },

  "& .MuiSwitch-track": {
    borderRadius: 15,
    backgroundColor: "rgba(8, 32, 47, 1) !important",
    opacity: 1,
  },
}));
