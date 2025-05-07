import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDisabledPowerButton, selectSelectedCountry } from "./selectors";
import { useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useMediaQuery } from "@mui/material";
import {
  selectCurrentModule,
  selectIsTutorialFinished,
} from "../Tutorial/selectors";
import { ModuleFourFiveSix } from "../Tutorial/components/ModuleFourFiveSix";
import { setCurrentModule } from "../Tutorial/slices";
import { getIncomeDataAction } from "../Header/slices";
import { selectUserId } from "../Header/selectors";

export const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width: 376px)");
  const navigate = useNavigate();
  const selectedCountry = useSelector(selectSelectedCountry());
  const animationRef = useRef<LottieRefCurrentProps | null>(null);
  const isButtonDisabled = useSelector(selectDisabledPowerButton());
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const dispatch = useDispatch();
  const currentModule = useSelector(selectCurrentModule());
  const userId = useSelector(selectUserId());

  useEffect(() => {
    if (!selectedCountry.name) {
      navigate("/");
    }
    if (userId) {
      dispatch(
        getIncomeDataAction({
          uid: userId,
          country: selectedCountry.name,
        }),
      );
    }
  }, [dispatch, navigate, selectedCountry, userId]);

  useEffect(() => {
    if (animationRef.current) {
      if (!isButtonDisabled) {
        animationRef.current.stop();
      } else {
        animationRef.current.play();
      }
    }
  }, [isButtonDisabled]);

  return (
    <>
      {(currentModule === 4 || currentModule === 5 || currentModule === 6) &&
        !isTutorialFinished && (
          <Box
            onClick={() => {
              if (currentModule === 4) {
                dispatch(setCurrentModule(5));
              } else if (currentModule === 5) {
                dispatch(setCurrentModule(6));
              }
            }}
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 9,
            }}
          >
            <ModuleFourFiveSix />
          </Box>
        )}

      <Box
        sx={{
          backgroundImage: `url(./windModel.png)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          transform: isSmallScreen
            ? "matrix(1.6, 0, 0, 1.6, 0, 0)"
            : "matrix(2.2, 0, 0, 2.2, 0, 0)",
        }}
      ></Box>
      <Lottie
        lottieRef={animationRef}
        animationData={require(`../../assets/animations/windAnimation.json`)}
        loop
        style={{
          top: isSmallScreen ? "220px" : "280px",
          left: "0",
          position: "absolute",
          transform: isSmallScreen
            ? "matrix(1.6, 0, 0, 1.6, 0, 0)"
            : "matrix(1.8, 0, 0, 1.8, 0, 0)",
        }}
      />
    </>
  );
};
