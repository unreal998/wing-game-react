import { styled, TextField } from "@mui/material";
import { MAIN_COLORS } from "../colors";

export const WithdrawModalInput = styled(TextField)({
  fontSize: "16px",
  "& .MuiOutlinedInput-root": {
    color: MAIN_COLORS.subTextColor,
    outline: "none",
    borderRadius: "8px",
    backgroundColor: MAIN_COLORS.appBG,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${MAIN_COLORS.mainGreen}`,
  },
});
