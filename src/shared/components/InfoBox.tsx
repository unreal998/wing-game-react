import { Box, Typography, styled } from "@mui/material";
import { MAIN_COLORS } from "../colors";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../../modules/Tutorial/selectors";

const StyledInfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: MAIN_COLORS.sectionBG,
  border: `1px solid ${MAIN_COLORS.mainGreen}`,
  display: "flex",
  flexDirection: "column",
  borderRadius: "9px",
  alignItems: "center",
  padding: "12px",
  minWidth: "85px",
  minHeight: "55px",
  fontFamily: "Roboto",
  letterSpacing: "0.5px",

  "&.pulse": {
    boxShadow: `0 0 8px ${MAIN_COLORS.mainGreen}`,
    animation: "pulseShadow 2s ease-in-out infinite",
  },

  "@keyframes pulseShadow": {
    "0%": {
      boxShadow: `0 0 8px ${MAIN_COLORS.mainGreen}`,
    },
    "50%": {
      boxShadow: `0 0 20px ${MAIN_COLORS.mainGreen}`,
    },
    "100%": {
      boxShadow: `0 0 8px ${MAIN_COLORS.mainGreen}`,
    },
  },
}));

export const InfoBox = ({
  value,
  subtitle,
  onClick,
}: {
  value: string;
  subtitle: string;
  onClick?: () => void;
}) => {
  const currentModule = useSelector(selectCurrentModule());
  const shouldPulse = currentModule === 9.5 && subtitle === "Referrals";

  return (
    <StyledInfoBox className={shouldPulse ? "pulse" : ""} onClick={onClick}>
      <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
        {value}
      </Typography>
      <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
        {subtitle}
      </Typography>
    </StyledInfoBox>
  );
};
