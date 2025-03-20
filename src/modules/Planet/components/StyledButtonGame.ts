import { styled } from "@mui/material";
import { ButtonGame } from "../../../shared/ButtonGame";
import { MAIN_COLORS } from "../../../shared/colors";

export const StyledButtonGame = styled(ButtonGame)({
  fontSize: "16px",
  width: "40%",
  fontWeight: 900,
  textTransform: "capitalize",
  color: MAIN_COLORS.textColor,
});
