import { styled, TextField } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const TextFieldStyled = styled(TextField)({
  width: "45%",
  borderRadius: "4px",
  backgroundColor: MAIN_COLORS.mainGreyBG,
  "& .MuiOutlinedInput-root": {
    color: MAIN_COLORS.missionTable,
  },
});
