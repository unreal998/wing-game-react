import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCurrentModule } from "../slices";
import { selectCurrentModule } from "../selectors";
import { useTranslation } from "react-i18next";

export const ModuleFourFiveSix = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const currentModule = useSelector(selectCurrentModule());

  useEffect(() => {
    if (currentModule === 5) {
      const timer = setTimeout(() => {
        dispatch(setCurrentModule(6));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentModule, dispatch]);

  if (currentModule < 4 || currentModule > 6) return null;

  const getText = () => {
    switch (currentModule) {
      case 4:
        return <>{t("tutorial.step4")}</>;
      case 5:
        return <>{t("tutorial.step5")}</>;
      case 6:
        return <>{t("tutorial.step6")}</>;
      default:
        return null;
    }
  };

  return (
    <Typography
      sx={{
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        top: currentModule === 4 ? "60%" : "50%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: currentModule === 4 ? "24px" : "16px",
        fontWeight: 700,
        color: "white",
        textAlign: currentModule === 4 ? "center" : "left",
      }}
    >
      {getText()}
    </Typography>
  );
};
