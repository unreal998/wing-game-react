import { Box, Typography } from "@mui/material";
import { MAIN_COLORS } from "../colors";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../../modules/Tutorial/selectors";

export const InfoBox = ({
  value,
  subtitle,
}: {
  value: string;
  subtitle: string;
}) => {
  const currentModule = useSelector(selectCurrentModule());

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
        ...(currentModule === 9.5 &&
          subtitle === "Refferals" && {
            boxShadow: `0 0 1px ${MAIN_COLORS.activeTabColor}`,
            animationName: "pulseShadow",
            animationDuration: "2s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            "@keyframes pulseShadow": {
              "0%": {
                boxShadow: `0 0 8px ${MAIN_COLORS.activeTabColor}`,
              },
              "50%": {
                boxShadow: `0 0 20px ${MAIN_COLORS.activeTabColor}`,
              },
              "100%": {
                boxShadow: `0 0 8px ${MAIN_COLORS.activeTabColor}`,
              },
            },
          }),
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
