import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledModuleBox } from "./StyledModuleBox";
import WebApp from "@twa-dev/sdk";
import CloseIcon from "@mui/icons-material/Close";

function ModuleThree({ onClose }: { onClose: (e: React.MouseEvent) => void }) {
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
      </Box>
    </StyledModuleBox>
  );
}

export default ModuleThree;
