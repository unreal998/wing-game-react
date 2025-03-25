import { Dialog, styled } from "@mui/material";
import { MAIN_COLORS } from "../colors";

export const ModalStyled = styled(Dialog)({
  "& .MuiPaper-root": {
    backgroundColor: MAIN_COLORS.modalBox,
    textAlign: "center",
    padding: "20px",
  },
});
