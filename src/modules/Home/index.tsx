import { Box } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDisabledPowerButton,
  selectHomeLoading,
  selectSelectedCountry,
} from "./selectors";
import { useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useMediaQuery } from "@mui/material";
import { getIncomeDataAction } from "../Header/slices";
import { selectUserData, selectUserId } from "../Header/selectors";
import LoaderComponent from "../../shared/components/LoaderComponent";

export const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width: 376px)");
  const navigate = useNavigate();
  const selectedCountry = useSelector(selectSelectedCountry());
  const animationRef = useRef<LottieRefCurrentProps | null>(null);
  const isButtonDisabled = useSelector(selectDisabledPowerButton());
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId());
  const modifiers = useSelector(selectUserData())?.modifiers;
  const loading = useSelector(selectHomeLoading());

  const selectedCountryModifiers = useMemo(
    () => modifiers?.find((mod) => mod.areaName === selectedCountry.name),
    [modifiers, selectedCountry],
  );

  useEffect(() => {
    if (!selectedCountry.name) {
      navigate("/");
    }
  }, [dispatch, navigate, selectedCountry, userId]);

  useEffect(() => {
    if (
      selectedCountryModifiers?.boughtModifier &&
      selectedCountryModifiers.boughtModifier?.length > 0
    ) {
      const speed =
        selectedCountryModifiers.boughtModifier.reduce(
          (acc, mod) => acc + mod.speed,
          0,
        ) / 5;
      animationRef.current?.setSpeed(1 + speed);
    }
  }, [selectedCountryModifiers]);

  useEffect(() => {
    dispatch(
      getIncomeDataAction({
        uid: userId,
        country: selectedCountry.name,
      }),
    );
  }, [dispatch, userId, selectedCountry]);

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
