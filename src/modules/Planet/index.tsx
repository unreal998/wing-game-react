import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledPlanetBox } from "./components/StyledPlanetBox";
import { StyledPlanetButton } from "./components/StyledPlanetButton";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCountry } from "../Home/slices";
import { selectAreasData, selectCountiresData } from "../Header/selectors";
import { AreaType } from "../../shared/types";
import { MAIN_COLORS } from "../../shared/colors";
import ModuleOne from "../Tutorial/components/ModuleOne";
import ModuleTwo from "../Tutorial/components/ModuleTwo";
import ModuleThree from "../Tutorial/components/ModuleThree";
import { selectCurrentModule } from "../Tutorial/selectors";
import { setCurrentModule } from "../Tutorial/slices";

export const Planet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const areasData = useSelector(selectAreasData());
  const countries = useSelector(selectCountiresData());

  const currentModule = useSelector(selectCurrentModule());

  const handleButtonPress = useCallback(
    (selectedCountry: AreaType) => {
      dispatch(setSelectedCountry(selectedCountry));
      navigate("/home");
    },
    [dispatch, navigate],
  );

  const handleModuleClick = useCallback(() => {
    if (currentModule < 3) {
      dispatch(setCurrentModule(currentModule + 1));
    }
  }, [dispatch, currentModule]);

  const userCountiresData = useMemo(() => {
    if (!countries || !areasData) return [];
    return areasData.map((area) => ({
      ...area,
      title: countries.find((country) => country.shortName === area.name)
        ?.title,
    }));
  }, [countries, areasData]);

  const getCoords = useCallback((index: number) => {
    switch (index) {
      case 0:
        return { top: "100px", left: "180px" };
      case 1:
        return { top: "40px", left: "120px" };
      case 2:
        return { top: "180px", left: "90px" };
      case 3:
        return { top: "100px", left: "50px" };
      default:
        return { top: "0px", left: "0px" };
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        marginTop: "-10px",
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
      onClick={handleModuleClick}
    >
      {currentModule >= 2 && <ModuleThree showModule={currentModule === 3} />}

      <StyledPlanetBox>
        {userCountiresData &&
          userCountiresData?.length &&
          userCountiresData.map((country, index) => (
            <StyledPlanetButton
              key={country.name}
              sx={{
                ...getCoords(index),
                ...(currentModule === 3 && {
                  boxShadow: `0 0 10px ${MAIN_COLORS.activeTabColor}`,
                  animationName: "pulseShadow",
                  animationDuration: "2s",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  "@keyframes pulseShadow": {
                    "0%": {
                      boxShadow: `0 0 10px ${MAIN_COLORS.activeTabColor}`,
                    },
                    "50%": {
                      boxShadow: `0 0 60px ${MAIN_COLORS.activeTabColor}`,
                    },
                    "100%": {
                      boxShadow: `0 0 10px ${MAIN_COLORS.activeTabColor}`,
                    },
                  },
                }),
                "&.Mui-disabled": {
                  backgroundColor: "rgb(134 134 134)",
                  boxShadow: "none",
                  animation: "none",
                },
              }}
              disabled={!country.available}
              onClick={() => {
                if (currentModule === 3) {
                  dispatch(setCurrentModule(0));
                  handleButtonPress(country);
                }
              }}
            >
              {country.title}
            </StyledPlanetButton>
          ))}
      </StyledPlanetBox>
      {currentModule === 2 && <ModuleTwo />}
      {currentModule === 1 && <ModuleOne onClick={handleModuleClick} />}
    </Box>
  );
};
