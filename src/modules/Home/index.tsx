import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDisabledPowerButton, selectSelectedCountry } from "./selectors";
import { useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useMediaQuery } from "@mui/material";
import { getIncomeDataAction } from "../Header/slices";
import { selectUserId } from "../Header/selectors";

export const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width: 376px)");
  const navigate = useNavigate();
  const selectedCountry = useSelector(selectSelectedCountry());
  const animationRef = useRef<LottieRefCurrentProps | null>(null);
  const isButtonDisabled = useSelector(selectDisabledPowerButton());
  const dispatch = useDispatch();
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
            : "matrix(2, 0, 0, 2, 0, 0)",
        }}
      />
    </>
  );
};
