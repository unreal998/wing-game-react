import { styled, TextField } from "@mui/material";
import { MAIN_COLORS } from "../colors";

export const WithdrawModalInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: MAIN_COLORS.subTextColor,
    border: `1px solid ${MAIN_COLORS.mainGreen}`,
    outline: "none",
    borderRadius: "8px",
    backgroundColor: MAIN_COLORS.appBG,
  },
});
