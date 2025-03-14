import { Button, styled } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const ButtonShopStyled = styled(Button)({
  color: "white",
  bgcolor: MAIN_COLORS.mainGreyBG,
  borderRadius: "4px",
  padding: "8px 14px",
  fontWeight: "800",
});
