import { ButtonBase, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const ButtonMissions = styled(ButtonBase)({
  width: "68px",
  height: "36px",
  display: "flex",
  gap: "7px",
  padding: "12px",
  marginRight: "10px",
  border: `1px solid ${MAIN_COLORS.mainGreen}`,
  borderRadius: "8px",
  cursor: "pointer",
  "&.Mui-disabled": {
    backgroundColor: MAIN_COLORS.disabledButtonBGColor,
    color: MAIN_COLORS.appBG,
  },
});
