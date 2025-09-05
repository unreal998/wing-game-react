import { Box, Typography } from "@mui/material";
import { t } from "i18next";
import { StyledModuleBox } from "./StyledModuleBox";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../selectors";
import CloseIcon from "@mui/icons-material/Close";

export const ModuleThirteen = ({
  onClose,
}: {
  onClose: (e: React.MouseEvent) => void;
}) => {
  const currentModule = useSelector(selectCurrentModule());

  if (
    currentModule !== 13 &&
    currentModule !== 14 &&
    currentModule !== 15 &&
    currentModule !== 16
  )
    return null;

  return (
    <StyledModuleBox
      sx={{
        position: "absolute",
        top: currentModule === 13 ? "28%" : "40%",
        left: "-0.9%",
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
        {currentModule === 13 && (
          <>
            <Typography
              sx={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
            >
              {t("tutorial.module13h")}
            </Typography>
            <Typography sx={{ pt: "8px", whiteSpace: "pre-line" }}>
              {t("tutorial.module13p1")}
            </Typography>
            <Typography sx={{ pt: "8px", whiteSpace: "pre-line" }}>
              {t("tutorial.module13p2")}
            </Typography>
          </>
        )}
        {currentModule === 14 && (
          <>
            <Typography
              sx={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
            >
              {t("tutorial.module14")}
            </Typography>
          </>
        )}
        {currentModule === 15 && (
          <>
            <Typography
              sx={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
            >
              {t("tutorial.module15")}
            </Typography>
          </>
        )}

        {currentModule === 16 && (
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              whiteSpace: "pre-line",
            }}
          >
            We create a green future together
          </Typography>
        )}
      </Box>
    </StyledModuleBox>
  );
};
