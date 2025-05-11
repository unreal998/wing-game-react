import { Typography } from "@mui/material";
import { selectCurrentModule } from "../selectors";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrentModule } from "../slices";
import { StyledModuleBox } from "./StyledModuleBox";
import Hint from "./Hint";

export const ModuleFourFiveSix = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentModule = useSelector(selectCurrentModule());

  if (currentModule < 4 || currentModule > 6) return null;

  const getText = () => {
    switch (currentModule) {
      case 4:
        return t("tutorial.step4");
      case 5:
        return t("tutorial.step5");
      case 5.5:
        return t("tutorial.step5.5");
      case 6:
        return t("tutorial.step6");
      default:
        return null;
    }
  };

  const handleChangeModule = () => {
    if (currentModule === 5) dispatch(setCurrentModule(6));
  };

  return (
    <StyledModuleBox
      sx={{
        position: "absolute",
        top: "29%",
        left: "-0.9%",
      }}
    >
      <Typography
        onClick={handleChangeModule}
        sx={{
          whiteSpace: "pre-line",
          fontSize: currentModule === 4 ? "24px" : "16px",
          fontWeight: currentModule === 4 ? "bold" : "normal",
          textAlign: currentModule === 4 ? "center" : "left",
        }}
      >
        {getText()}
      </Typography>
      {(currentModule === 4 ||
        currentModule === 5 ||
        currentModule === 5.5) && <Hint />}
    </StyledModuleBox>
  );
};
