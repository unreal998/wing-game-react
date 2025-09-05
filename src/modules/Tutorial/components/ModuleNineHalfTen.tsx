import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../selectors";
import { useTranslation } from "react-i18next";
import { StyledModuleBox } from "./StyledModuleBox";
import Hint from "./Hint";
import CloseIcon from "@mui/icons-material/Close";

export const ModuleNineHalfTen = ({
  onClose,
}: {
  onClose: (e: React.MouseEvent) => void;
}) => {
  const currentModule = useSelector(selectCurrentModule());
  const { t } = useTranslation();

  if (currentModule !== 9 && currentModule !== 9.5 && currentModule !== 10) {
    return null;
  }

  return (
    <StyledModuleBox
      sx={{
        position: "absolute",
        left: "-0.9%",
        top: currentModule === 9 ? "23%" : "35%",
      }}
    >
      <Box
        position={"relative"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {" "}
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
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            whiteSpace: "pre-line",
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
        {(currentModule === 9 || currentModule === 9.5) && <Hint />}
      </Box>
    </StyledModuleBox>
  );
};
