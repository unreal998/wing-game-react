import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledModuleBox } from "./StyledModuleBox";

function ModuleOne({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "90vh",
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2222,
      }}
    >
      <StyledModuleBox>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            pb: "10px",
            textAlign: "center",
          }}
        >
          {t("tutorial.step1.header")}
        </Typography>
        <Typography
          sx={{
            pb: "6px",
          }}
        >
          {t("tutorial.step1.p1")}
        </Typography>
        <Typography>{t("tutorial.step1.p2")}</Typography>
      </StyledModuleBox>
    </Box>
  );
}

export default ModuleOne;
