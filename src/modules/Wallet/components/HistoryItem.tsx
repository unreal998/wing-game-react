import { Box, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

interface HistoryItemProps {
  date: string;
  time: string;
  amount: string;
  status: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  date,
  time,
  amount,
  status,
}) => (
  <Box
    sx={{
      width: "100hv",
      padding: "13px",
      display: "flex",
      backgroundColor: MAIN_COLORS.sectionBG,
      borderRadius: "8px",
      justifyContent: "space-between",
      color: MAIN_COLORS.subTextColor,
      fontSize: "12px",
    }}
  >
    <Typography sx={{ fontSize: "12px" }}>
      {date} {time}
    </Typography>
    <Typography
      sx={{
        color: MAIN_COLORS.mainGreen,
        fontSize: "14px",
        fontWeight: 600,
      }}
    >
      {amount}
    </Typography>
    <Typography>{status.toUpperCase()}</Typography>
  </Box>
);

export default HistoryItem;
