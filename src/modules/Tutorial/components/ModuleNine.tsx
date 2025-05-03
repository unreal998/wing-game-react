import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../selectors";
import { useTranslation } from "react-i18next";

export const ModuleNineTen = () => {
  const currentModule = useSelector(selectCurrentModule());
  const { t } = useTranslation();

  if (currentModule !== 9 && currentModule !== 10) return null;

  return (
    <Typography
      sx={{
        // Styles for the text overlay
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        top: "35%",
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
      }}
    >
      {t("tutorial.module9")}
    </Typography>
  );
};
