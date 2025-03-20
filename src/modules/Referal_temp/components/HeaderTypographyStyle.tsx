import { styled, Typography } from "@mui/material";

export const HeaderTypographyStyle = styled(Typography)({
  fontSize: "16px",
  fontWeight: 600,
  paddingBottom: "9px",
  "@media (max-height: 670px)": {
    paddingBottom: "0px",
  },
});
