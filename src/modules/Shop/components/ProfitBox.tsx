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
        backgroundColor: MAIN_COLORS.sectionBG,
        display: "flex",
        flexDirection: "column",
        borderRadius: "9px",
        alignItems: "center",
        justifyContent: "center",
        width: "168px",
        height: "84px",
        "@media (max-height: 732px)": {
          height: "64px",
        },
      }}
    >
      <Typography
        sx={{
          color: MAIN_COLORS.mainGreen,
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
