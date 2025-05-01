import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectDisabledPowerButton, selectSelectedCountry } from "./selectors";
import useSound from "use-sound";
import BGSound from "../../assets/sounds/bgSound.mp3";
import { useNavigate } from "react-router-dom";
import { selectHomeLoading } from "./slices";
import LoaderComponent from "../../shared/components/LoaderComponent";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useMediaQuery } from "@mui/material";

export const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width: 376px)");
  const loading = useSelector(selectHomeLoading);
  const [cycleBGSound, setCycleBGSound] = useState(true);
  const navigate = useNavigate();
  const selectedCountry = useSelector(selectSelectedCountry());
  const animationRef = useRef<LottieRefCurrentProps | null>(null);
  const isButtonDisabled = useSelector(selectDisabledPowerButton());
  const [playSound] = useSound(BGSound, {
    volume: 0.7,
    onend: () => setCycleBGSound(false),
  });

  useEffect(() => {
    if (!selectedCountry.name) {
      navigate("/");
    }
  }, [navigate, selectedCountry]);

  useEffect(() => {
    if (animationRef.current) {
      if (!isButtonDisabled) {
        animationRef.current.stop();
      } else {
        animationRef.current.play();
      }
    }
    if (!cycleBGSound) {
      playSound();
      setCycleBGSound(true);
    }
  }, [cycleBGSound, setCycleBGSound, playSound, isButtonDisabled]);

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <LoaderComponent loading={loading} />
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
          top: "220px",
          left: "0",
          position: "absolute",
          transform: isSmallScreen
            ? "matrix(1.6, 0, 0, 1.6, 0, 0)"
            : "matrix(2.2, 0, 0, 2.2, 0, 0)",
        }}
      />
    </Box>
  );
};
