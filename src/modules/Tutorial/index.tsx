import { useCallback } from "react";
import ModuleOne from "./components/ModuleOne";
import { setCurrentModule, setIsTutorialFinished } from "./slices";
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
import { selectUserId } from "../Header/selectors";
import { updateUserSettingsAction } from "../Header/slices";

export const Tutorial = () => {
  const dispatch = useDispatch();
  const currentModule = useSelector(selectCurrentModule());
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const uid = useSelector(selectUserId());

  const handleModuleClick = useCallback(() => {
    if (!isTutorialFinished) {
      if (currentModule === 16) {
        dispatch(setIsTutorialFinished(true));
      } else if (currentModule < 3) {
        dispatch(setCurrentModule(currentModule + 1));
      }
    }
  }, [isTutorialFinished, currentModule, dispatch]);

  const handleCloseTutorial = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (uid) {
      dispatch(
        updateUserSettingsAction({
          uid,
          settings: { isTutorialFinished: true },
        }),
      );
    }
    dispatch(setIsTutorialFinished(true));
  };

  if (isTutorialFinished) return null;

  return (
    <Box
      sx={{
        zIndex:
          currentModule !== 6 &&
          currentModule !== 8 &&
          currentModule !== 10 &&
          currentModule !== 12
            ? 9999
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
            <ModuleOne
              onClick={handleModuleClick}
              onClose={handleCloseTutorial}
            />
          )}
          {!isTutorialFinished && currentModule === 2 && (
            <ModuleTwo onClose={handleCloseTutorial} />
          )}
          {!isTutorialFinished && currentModule === 3 && (
            <ModuleThree onClose={handleCloseTutorial} />
          )}
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
            <ModuleFourFiveSix onClose={handleCloseTutorial} />
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
          <ModuleSevenEight onClose={handleCloseTutorial} />
        </Box>
      )}
      {!isTutorialFinished &&
        (currentModule === 9 ||
          currentModule === 9.5 ||
          currentModule === 10 ||
          currentModule === 11 ||
          currentModule === 11.5 ||
          currentModule === 12 ||
          currentModule === 13 ||
          currentModule === 14 ||
          currentModule === 15 ||
          currentModule === 16 ||
          currentModule === 17) && (
          <Box
            onClick={() => {
              if (currentModule === 9) {
                dispatch(setCurrentModule(9.5));
              } else if (currentModule === 9.5) {
                dispatch(setCurrentModule(10));
              } else if (currentModule === 11) {
                dispatch(setCurrentModule(11.5));
              } else if (currentModule === 11.5) {
                dispatch(setCurrentModule(12));
              } else if (currentModule === 13) {
                dispatch(setCurrentModule(14));
              } else if (currentModule === 14) {
                dispatch(setCurrentModule(15));
              } else if (currentModule === 15) {
                dispatch(setCurrentModule(16));
              } else if (currentModule === 16) {
                dispatch(setCurrentModule(17));
              } else if (currentModule === 17) {
                dispatch(setIsTutorialFinished(true));
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
            <ModuleNineHalfTen onClose={handleCloseTutorial} />
            <ModuleElevenTwelve onClose={handleCloseTutorial} />
            <ModuleThirteen onClose={handleCloseTutorial} />
          </Box>
        )}
    </Box>
  );
};
