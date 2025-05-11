import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledModuleBox } from "./StyledModuleBox";
import WebApp from "@twa-dev/sdk";

function ModuleThree() {
  const { t } = useTranslation();
  return (
    <StyledModuleBox
      sx={{
        position: "absolute",
        top:
          WebApp.platform !== "unknown" && WebApp.platform !== "tdesktop"
            ? 70
            : 30,
        left: 0,
      }}
    >
      <Typography
        sx={{
          whiteSpace: "pre-line",
        }}
      >
        <>
          {t("tutorial.step3a.before")} {t("Netherlands")}{" "}
          {t("tutorial.step3a.after")}
        </>
      </Typography>
    </StyledModuleBox>
  );
}

export default ModuleThree;
