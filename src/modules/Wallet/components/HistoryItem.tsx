import { Box, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";

interface HistoryItemProps {
  date: string;
  time: string;
  amount: string;
  label: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  date,
  time,
  amount,
  label,
}) => (
  <Box
    sx={{
      width: "100hv",
      marginRight: "15px",
      paddingLeft: "18px",
      paddingTop: "4px",
      paddingBottom: "4px",
      display: "flex",
      borderBottom: `1px solid ${MAIN_COLORS.mainGreyBG}`,
    }}
  >
    <Box sx={{ flex: 1.2 }}>
      <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>{date}</Typography>
      <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>{time}</Typography>
    </Box>
    <Box
      sx={{
        flex: 0.8,
        display: "flex",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Typography
        sx={{
          color: MAIN_COLORS.activeTabColor,
          fontSize: "14px",
          fontWeight: 700,
        }}
      >
        {amount}
      </Typography>
      <Typography
        sx={{
          color: MAIN_COLORS.textColor,
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
    </Box>
  </Box>
);

export default HistoryItem;
