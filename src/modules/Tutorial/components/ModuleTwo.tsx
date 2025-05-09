import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledModuleBox } from "./StyledModuleBox";

function ModuleTwo() {
  const { t } = useTranslation();

  return (
    <StyledModuleBox
      sx={{
        position: "absolute",
        bottom: "10%",
      }}
    >
      <Typography>{t("tutorial.step2")}</Typography>
    </StyledModuleBox>
  );
}

export default ModuleTwo;
