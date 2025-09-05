import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledModuleBox } from "./StyledModuleBox";
import WebApp from "@twa-dev/sdk";
import CloseIcon from "@mui/icons-material/Close";

function ModuleTwo({ onClose }: { onClose: (e: React.MouseEvent) => void }) {
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
        <Box
          position={"relative"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            onClick={onClose}
            sx={{
              position: "absolute",
              top: -8,
              right: -8,
              color: "#999999",
              zIndex: 10000,
            }}
          >
            <CloseIcon />
          </Box>
          <Typography>{t("tutorial.step3b")}</Typography>
        </Box>
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
