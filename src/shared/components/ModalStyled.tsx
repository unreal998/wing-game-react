import { Dialog, styled } from "@mui/material";
import { MAIN_COLORS } from "../colors";

export const ModalStyled = styled(Dialog)({
  "& .MuiPaper-root": {
    backgroundColor: MAIN_COLORS.appBG,
    textAlign: "center",
    padding: "8px",
    borderRadius: "12px",
  },
});
