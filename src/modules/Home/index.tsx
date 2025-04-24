import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedCountry } from "./selectors";
import useSound from "use-sound";
import WindBlowing from "../../assets/sounds/windBlowing.mp3";
import BGSound from "../../assets/sounds/bgSound.mp3";
import { useNavigate } from "react-router-dom";
import { selectHomeLoading } from "./slices";
import LoaderComponent from "../../shared/components/LoaderComponent";
import Lottie from "lottie-react";

export const Home = () => {
  const loading = useSelector(selectHomeLoading);
  const [cycleBGSound, setCycleBGSound] = useState(true);
  const navigate = useNavigate();
  const selectedCountry = useSelector(selectSelectedCountry());
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
    if (!cycleBGSound) {
      playSound();
      setCycleBGSound(true);
    }
  }, [cycleBGSound, setCycleBGSound, playSound]);

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
          transform: "matrix(2.2, 0, 0, 2.2, 0, 0)",
        }}
      ></Box>
      <Lottie
        animationData={require(`../../assets/animations/windAnimation.json`)}
        loop
        style={{
          top: "240px",
          left: "0",
          position: "absolute",
          transform: "matrix(2.2, 0, 0, 2.2, 0, 0)",
        }}
      />
    </Box>
  );
};
