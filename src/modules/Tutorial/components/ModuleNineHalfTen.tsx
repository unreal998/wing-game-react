import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../selectors";
import { useTranslation } from "react-i18next";

export const ModuleNineHalfTen = () => {
  const currentModule = useSelector(selectCurrentModule());
  const { t } = useTranslation();

  if (currentModule !== 9 && currentModule !== 9.5 && currentModule !== 10) {
    return null;
  }

  return (
    <Typography
      sx={{
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        top: currentModule === 9.5 || currentModule === 10 ? "40%" : "30%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: 700,
        color: "white",
        textAlign: "center",
        whiteSpace: "pre-line",
      }}
    >
      {currentModule === 9 && t("tutorial.module9")}
      {currentModule === 9.5 && t("tutorial.module9.5")}
      {currentModule === 10 && t("tutorial.module10")}
    </Typography>
  );
};
