import { Button, styled } from "@mui/material";
import { MAIN_COLORS } from "./colors";

export const ButtonGame = styled(Button)({
  width: "80%",
  display: "flex",
  gap: "7px",
  padding: "12px",
  backgroundColor: MAIN_COLORS.activeTabColor,
  borderRadius: "10px",
  cursor: "pointer",
  "&.Mui-disabled": {
    backgroundColor: "rgb(134 134 134)",
  },
  boxShadow: `
                 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
                 0px -2px 4px 0px rgba(0, 0, 0, 1) inset,
                 0px 1px 4px 0px rgba(255, 255, 255, 0.14) inset
               `,
});
