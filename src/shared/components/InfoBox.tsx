import { Box, Typography } from "@mui/material";
import { MAIN_COLORS } from "../colors";

export const InfoBox = ({
  value,
  subtitle,
}: {
  value: string;
  subtitle: string;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: MAIN_COLORS.referalBox,
        border: `1px solid  ${MAIN_COLORS.activeTabColor}`,
        display: "flex",
        flexDirection: "column",
        borderRadius: "9px",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 700,
          padding: "9px 45px 0px 45px",
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 700,
          padding: "0px 15px 9px 15px",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
