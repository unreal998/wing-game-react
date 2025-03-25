import { styled, TextField } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const TextFieldStyled = styled(TextField)({
  width: "45%",
  borderRadius: "4px",
  "& .MuiOutlinedInput-root": {
    backgroundColor: MAIN_COLORS.mainGreyBG,
    color: MAIN_COLORS.marketBox, // Цвет текста
  },
  "& .MuiOutlinedInput-input": {
    color: MAIN_COLORS.marketBox, // Цвет ввода
  },
  "& .Mui-disabled": {
    color: MAIN_COLORS.marketBox,
    "-webkit-text-fill-color": "white",
    opacity: 1, // Нужно для корректного отображения
  },
  "@media (max-height: 732px)": {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
});
