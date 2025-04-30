import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function ModuleThree({ showModule }: { showModule: boolean }) {
  const { t } = useTranslation();
  return (
    <Typography
      sx={{
        color: "white",
        fontSize: "20px",
        fontWeight: 700,
        textAlign: "center",
        margin: "0 10px",
        zIndex: 2,
      }}
    >
      {showModule ? t("tutorial.step3a") : t("tutorial.step3b")}
    </Typography>
  );
}

export default ModuleThree;
