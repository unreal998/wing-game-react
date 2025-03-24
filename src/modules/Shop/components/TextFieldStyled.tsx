import { styled, TextField } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const TextFieldStyled = styled(TextField)({
  width: "45%",
  borderRadius: "4px",
  backgroundColor: MAIN_COLORS.mainGreyBG,
  "& .MuiOutlinedInput-root": {
    color: MAIN_COLORS.marketBox,
  },
  "& .Mui-disabled": {
    color: MAIN_COLORS.marketBox,
    "-webkit-text-fill-color": "white",
  },
  "@media (max-height: 732px)": {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
});
