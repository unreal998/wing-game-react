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
        backgroundColor: MAIN_COLORS.sectionBG,
        border: `1px solid  ${MAIN_COLORS.activeTabColor}`,
        display: "flex",
        flexDirection: "column",
        borderRadius: "9px",
        alignItems: "center",
        padding: "12px",
        minWidth: "85px",
        minHeight: "55px",
        fontFamily: "Roboto",
        letterSpacing: "0.5px",
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 700,
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 400,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
