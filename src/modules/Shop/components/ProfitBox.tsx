import { Box, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

export const ProfitBox = ({
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
        display: "flex",
        flexDirection: "column",
        borderRadius: "9px",
        alignItems: "center",
        justifyContent: "center",
        padding: "15px 40px",
      }}
    >
      <Typography
        sx={{
          color: MAIN_COLORS.activeTabColor,
          fontSize: "24px",
          fontWeight: 700,
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          color: MAIN_COLORS.missionTable,
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
