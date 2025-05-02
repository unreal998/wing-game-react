import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../selectors";
import { useTranslation } from "react-i18next";

export const ModuleElevenTwelve = () => {
  const { t } = useTranslation();
  const currentModule = useSelector(selectCurrentModule());

  if (currentModule !== 11 && currentModule !== 12) return null;

  return (
    <Typography
      sx={{
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        top: currentModule === 11 ? "100%" : "115%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        fontWeight: 700,
        color: "white",
        textAlign: "center",
      }}
    >
      {currentModule === 11 ? (
        <>{t("tutorial.step11")}</>
      ) : (
        <> {t("tutorial.step12")}</>
      )}
    </Typography>
  );
};
