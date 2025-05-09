import { Typography } from "@mui/material";
import { t } from "i18next";
import { StyledModuleBox } from "./StyledModuleBox";

export const ModuleThirteen = () => {
  return (
    <StyledModuleBox
      sx={{
        position: "absolute",
        top: "28%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {t("tutorial.module13h")}
      </Typography>
      <Typography
        sx={{
          pt: "8px",
          whiteSpace: "pre-line",
        }}
      >
        {t("tutorial.module13p1")}
      </Typography>
      <Typography
        sx={{
          pt: "8px",
          whiteSpace: "pre-line",
        }}
      >
        {t("tutorial.module13p2")}
      </Typography>
    </StyledModuleBox>
  );
};
