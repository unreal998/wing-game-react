import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../selectors";
import { useTranslation } from "react-i18next";
import { StyledModuleBox } from "./StyledModuleBox";
import Hint from "./Hint";
import CloseIcon from "@mui/icons-material/Close";

export const ModuleElevenTwelve = ({
  onClose,
}: {
  onClose: (e: React.MouseEvent) => void;
}) => {
  const { t } = useTranslation();
  const currentModule = useSelector(selectCurrentModule());

  if (currentModule !== 11 && currentModule !== 11.5 && currentModule !== 12)
    return null;

  const getText = () => {
    switch (currentModule) {
      case 11:
        return t("tutorial.module11h");
      case 11.5:
        return t("tutorial.module11_5h");
      case 12:
        return t("tutorial.module12");
      default:
        return "";
    }
  };

  return (
    <StyledModuleBox
      sx={{
        position: "absolute",
        left: "-0.9%",
        top:
          currentModule === 11 ? "18%" : currentModule === 11.5 ? "27%" : "35%",
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
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {getText()}
        </Typography>

        {currentModule === 11 && (
          <>
            <Typography sx={{ pt: "8px", whiteSpace: "pre-line" }}>
              {t("tutorial.module11")}
            </Typography>
            <Hint />
          </>
        )}

        {currentModule === 11.5 && <Hint />}
      </Box>
    </StyledModuleBox>
  );
};
