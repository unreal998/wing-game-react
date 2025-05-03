import { Typography } from "@mui/material";
import { t } from "i18next";

export const ModuleThirteen = () => {
  return (
    <Typography
      sx={{
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        bottom: "20%",
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
        whiteSpace: "pre-line",
      }}
    >
      {t("tutorial.module13")}
    </Typography>
  );
};
