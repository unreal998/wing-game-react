import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function StepTwo() {
  const { t } = useTranslation();

  return (
    <Typography
      sx={{
        color: "white",
        fontSize: "16px",
        fontWeight: 600,
        textAlign: "center",
        margin: "20px 20px 0",
        zIndex: 2,
      }}
    >
      {t("tutorial.step2")}
    </Typography>
  );
}

export default StepTwo;
