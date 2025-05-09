import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../selectors";
import { useTranslation } from "react-i18next";
import { StyledModuleBox } from "./StyledModuleBox";

export const ModuleNineHalfTen = () => {
  const currentModule = useSelector(selectCurrentModule());
  const { t } = useTranslation();

  if (currentModule !== 9 && currentModule !== 9.5 && currentModule !== 10) {
    return null;
  }

  return (
    <StyledModuleBox
      sx={{
        position: "absolute",
        top: currentModule === 9 ? "23%" : "35%",
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
        {currentModule === 9
          ? t("tutorial.module9h")
          : currentModule === 9.5
            ? t("tutorial.module9.5")
            : t("tutorial.module10")}
      </Typography>
      {currentModule === 9 && (
        <Typography
          sx={{
            pt: "8px",
            whiteSpace: "pre-line",
          }}
        >
          {t("tutorial.module9")}
        </Typography>
      )}
    </StyledModuleBox>
  );
};
