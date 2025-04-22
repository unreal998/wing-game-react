import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledPlanetBox } from "./components/StyledPlanetBox";
import { StyledPlanetButton } from "./components/StyledPlanetButton";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCountry } from "../Home/slices";
import { selectAreasData } from "../Header/selectors";
import { AreaType } from "../../shared/types";

export const Planet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const areasData = useSelector(selectAreasData());

  const handleButtonPress = useCallback(
    (selectedCountry: AreaType) => {
      dispatch(setSelectedCountry(selectedCountry));
      navigate("/home");
    },
    [dispatch, navigate],
  );

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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StyledPlanetBox>
        {areasData &&
          areasData?.length &&
          areasData.map((country, index) => (
            <StyledPlanetButton
              key={country.name}
              sx={{
                ...getCoords(index),
              }}
              disabled={!country.available}
              onClick={() => handleButtonPress(country)}
            >
              {country.title}
            </StyledPlanetButton>
          ))}
      </StyledPlanetBox>
    </Box>
  );
};
