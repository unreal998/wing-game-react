import { useCallback } from "react";
import ModuleOne from "./components/ModuleOne";
import { setCurrentModule } from "./slices";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentModule, selectIsTutorialFinished } from "./selectors";
import ModuleTwo from "./components/ModuleTwo";
import ModuleThree from "./components/ModuleThree";
import { Box } from "@mui/material";
import { ModuleFourFiveSix } from "./components/ModuleFourFiveSix";
import { ModuleSevenEight } from "./components/ModuleSevenEight";
import { ModuleNineHalfTen } from "./components/ModuleNineHalfTen";
import { ModuleElevenTwelve } from "./components/ModuleElevenTwelve";
import { ModuleThirteen } from "./components/ModuleThirteen";

export const Tutorial = () => {
  const dispatch = useDispatch();
  const currentModule = useSelector(selectCurrentModule());
  const isTutorialFinished = useSelector(selectIsTutorialFinished());

  const handleModuleClick = useCallback(() => {
    if (!isTutorialFinished && currentModule < 3) {
      dispatch(setCurrentModule(currentModule + 1));
    }
  }, [isTutorialFinished, currentModule, dispatch]);

  return (
    <Box
      sx={{
        zIndex:
          currentModule !== 6 &&
          currentModule !== 8 &&
          currentModule !== 10 &&
          currentModule !== 12
            ? 999999
            : 99,
      }}
      onClick={handleModuleClick}
    >
      {!isTutorialFinished && currentModule <= 3 && (
        <Box
          sx={{
            width: "100%",
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0,
            animation: "fadeIn 1s forwards",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          {!isTutorialFinished && currentModule === 1 && (
            <ModuleOne onClick={handleModuleClick} />
          )}
          {!isTutorialFinished && currentModule === 2 && <ModuleTwo />}
          {!isTutorialFinished && currentModule === 3 && <ModuleThree />}
        </Box>
      )}
      {(currentModule === 4 ||
        currentModule === 5 ||
        currentModule === 5.5 ||
        currentModule === 6) &&
        !isTutorialFinished && (
          <Box
            onClick={() => {
              if (currentModule === 4) {
                dispatch(setCurrentModule(5));
              } else if (currentModule === 5) {
                dispatch(setCurrentModule(5.5));
              } else if (currentModule === 5.5) {
                dispatch(setCurrentModule(6));
              }
            }}
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              backgroundColor:
                currentModule !== 6 ? "rgba(0, 0, 0, 0.1)" : "none",
            }}
          >
            <ModuleFourFiveSix />
          </Box>
        )}
      {(currentModule === 7 || currentModule === 8) && (
        <Box
          onClick={() => {
            dispatch(setCurrentModule(8));
          }}
          width={"100vw"}
          height={"120vh"}
          position={"absolute"}
          zIndex={99}
          bgcolor={`rgba(0, 0, 0, 0.3)`}
          top={"-1vh"}
          sx={{ transition: "all 0.2s ease" }}
        >
          <ModuleSevenEight />
        </Box>
      )}
      {(currentModule === 9 ||
        currentModule === 9.5 ||
        currentModule === 10 ||
        currentModule === 11 ||
        currentModule === 12 ||
        currentModule === 13) && (
        <Box
          onClick={() => {
            if (currentModule === 9) {
              dispatch(setCurrentModule(9.5));
            } else if (currentModule === 9.5) {
              dispatch(setCurrentModule(10));
            } else if (currentModule === 11) {
              dispatch(setCurrentModule(12));
            } else if (currentModule === 13) {
              dispatch(setCurrentModule(14));
            }
          }}
          width={"100vw"}
          height={"120vh"}
          position={"absolute"}
          bgcolor={`rgba(0, 0, 0, 0.${currentModule === 9 ? "4" : "2"}3)`}
          top={"-1vh"}
          sx={{
            transition: "all 0.2s ease",
          }}
        >
          <ModuleNineHalfTen />
          <ModuleElevenTwelve />
          <ModuleThirteen />
        </Box>
      )}
    </Box>
  );
};
