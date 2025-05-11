import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledModuleBox } from "./StyledModuleBox";
import WebApp from "@twa-dev/sdk";

function ModuleTwo() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <StyledModuleBox
        sx={{
          position: "absolute",
          top:
            WebApp.platform !== "unknown" && WebApp.platform !== "tdesktop"
              ? "10%"
              : "5%",
        }}
      >
        <Typography>{t("tutorial.step3b")}</Typography>
      </StyledModuleBox>
      <StyledModuleBox
        sx={{
          position: "absolute",
          bottom: "10%",
        }}
      >
        <Typography>{t("tutorial.step2")}</Typography>
      </StyledModuleBox>
    </Box>
  );
}

export default ModuleTwo;
