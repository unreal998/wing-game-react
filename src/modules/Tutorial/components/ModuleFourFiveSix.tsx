import { Typography } from "@mui/material";
import { selectCurrentModule } from "../selectors";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrentModule } from "../slices";

export const ModuleFourFiveSix = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentModule = useSelector(selectCurrentModule());

  if (currentModule < 4 || currentModule > 6) return null;

  const getText = () => {
    switch (currentModule) {
      case 4:
        return t("tutorial.module4");
      case 5:
        return (
          <>
            {t("tutorial.module5.line1")}
            <br />
            {t("tutorial.module5.line2")}
          </>
        );
      case 6:
        return t("tutorial.module6");
      default:
        return null;
    }
  };

  const handleChangeModule = () => {
    if (currentModule === 5) dispatch(setCurrentModule(6));
  };

  return (
    <Typography
      onClick={handleChangeModule}
      sx={{
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: "10px",
        position: "absolute",
        width: "80%",
        top: "45%",
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
