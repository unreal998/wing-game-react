import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentModule, selectIsTutorialFinished } from "../selectors";
import { setCurrentModule } from "../slices";

function Hint() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentModule = useSelector(selectCurrentModule());
  const isTutorialFinished = useSelector(selectIsTutorialFinished());

  const nextTutorialModuleMap: Record<number, number> = {
    1: 2,
    4: 5,
    5: 5.5,
    5.5: 6,
    6: 7,
    8: 9,
    9: 9.5,
    9.5: 10,
    10: 11,
    11: 12,
    12: 13,
    13: 14,
  };

  const handleClick = () => {
    if (!isTutorialFinished && currentModule in nextTutorialModuleMap) {
      dispatch(setCurrentModule(nextTutorialModuleMap[currentModule]));
    }
  };

  return (
    <Typography onClick={handleClick} mt={2} textAlign={"center"}>
      {t("tutorial.hint")}
    </Typography>
  );
}

export default Hint;
