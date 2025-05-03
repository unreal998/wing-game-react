import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function Hint() {
  const { t } = useTranslation();
  return (
    <Typography
      sx={{
        padding: "10px",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        top: "-50px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        color: "white",
        textAlign: "center",
      }}
    >
      {t("tutorial.hint")}
    </Typography>
  );
}

export default Hint;
