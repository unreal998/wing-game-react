import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../selectors";
import { useTranslation } from "react-i18next";
import { StyledModuleBox } from "./StyledModuleBox";
import Hint from "./Hint";
import WebApp from "@twa-dev/sdk";

export const ModuleSevenEight = () => {
  const { t } = useTranslation();
  const currentModule = useSelector(selectCurrentModule());

  if (currentModule !== 7 && currentModule !== 8) return null;

  return (
    <StyledModuleBox
      sx={{
        position: "absolute",
        top:
          WebApp.platform !== "unknown" && WebApp.platform !== "tdesktop"
            ? "37%"
            : "23%",
        left: "-0.9%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ fontSize: "24px", fontWeight: "bold", pb: "8px" }}>
        {currentModule === 7
          ? t("tutorial.module7.header")
          : t("tutorial.module8")}
      </Typography>
      {currentModule === 7 && (
        <>
          <Typography sx={{ padding: "6px 0" }}>
            {t("tutorial.module7.p1")}
          </Typography>
          <Typography>{t("tutorial.module7.p2")}</Typography>
          <Hint />
        </>
      )}
    </StyledModuleBox>
  );
};
