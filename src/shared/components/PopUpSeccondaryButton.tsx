import { Button, styled } from "@mui/material";
import { MAIN_COLORS } from "../colors";

export const PopUpSeccondaryButton = styled(Button)({
  fontSize: "16px",
  fontWeight: "600",
  border: `1px solid ${MAIN_COLORS.mainGreen}`,
  color: MAIN_COLORS.mainGreen,
  padding: "15px 16px",
  borderRadius: "8px",
});
