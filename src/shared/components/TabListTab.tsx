import { Tab } from "@mui/material";
import { MAIN_COLORS } from "../colors";

export const TabListTab = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  return (
    <Tab
      sx={{
        fontSize: "12px",
        fontWeight: 700,
        padding: "0 10px",
        color: MAIN_COLORS.textColor,
        border: MAIN_COLORS.dailyBorder,
        borderRadius: "5px",
        minHeight: "35px",
        "& .MuiButtonBase-root-MuiTab-root.Mui-selected": {
          color: MAIN_COLORS.activeTabColor,
        },
      }}
      label={label}
      value={value}
      key={value}
    />
  );
};
