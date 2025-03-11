import { Button, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const ButtonStyled = styled(Button)({
  height: "45px",
  width: "233px",
  backgroundColor: MAIN_COLORS.activeTabColor,
  borderRadius: "10px",
  color: "black",
  textTransform: "none",
  marginBottom: "15px",
  boxShadow: `
       0px 4px 4px 0px rgba(0, 0, 0, 0.25),
       0px -2px 4px 0px rgba(0, 0, 0, 1) inset,
       0px 1px 4px 0px rgba(255, 255, 255, 0.14) inset
     `,
});
