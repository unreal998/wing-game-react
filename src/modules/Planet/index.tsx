import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledPlanetBox } from "./components/StyledPlanetBox";
import { StyledPlanetButton } from "./components/StyledPlanetButton";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCountry } from "../Home/slices";
import { selectAreasData, selectCountiresData } from "../Header/selectors";
import { AreaType } from "../../shared/types";

export const Planet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const areasData = useSelector(selectAreasData());
  const countries = useSelector(selectCountiresData());

  const handleButtonPress = useCallback(
    (selectedCountry: AreaType) => {
      dispatch(setSelectedCountry(selectedCountry));
      navigate("/home");
    },
    [dispatch, navigate],
  );

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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StyledPlanetBox>
        {userCountiresData &&
          userCountiresData?.length &&
          userCountiresData.map((country, index) => (
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
