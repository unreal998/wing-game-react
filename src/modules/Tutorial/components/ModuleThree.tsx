import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MAIN_COLORS } from "../../../shared/colors";
import { StyledModuleBox } from "./StyledModuleBox";

function ModuleThree({ showModule }: { showModule: boolean }) {
  const { t } = useTranslation();
  return (
    <StyledModuleBox
      sx={{
        position: "absolute",
        top: 120,
        left: 0,
      }}
    >
      <Typography
        sx={{
          whiteSpace: "pre-line",
        }}
      >
        {showModule ? (
          <>
            {t("tutorial.step3a.before")} {t("Netherlands")}{" "}
            {t("tutorial.step3a.after")}
          </>
        ) : (
          t("tutorial.step3b")
        )}
      </Typography>
    </StyledModuleBox>
  );
}

export default ModuleThree;
