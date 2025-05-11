import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../selectors";
import { useTranslation } from "react-i18next";
import { StyledModuleBox } from "./StyledModuleBox";

export const ModuleNineTen = () => {
  const currentModule = useSelector(selectCurrentModule());
  const { t } = useTranslation();

  if (currentModule !== 9 && currentModule !== 10) return null;

  return (
    <StyledModuleBox>
      <Typography sx={{ fontSize: "24px", fontWeight: "bold", pb: "8px" }}>
        {t("tutorial.module9h")}
      </Typography>
      <Typography>{t("tutorial.module9")}</Typography>
    </StyledModuleBox>
  );
};
