import { Box, styled } from "@mui/material";

export const StyledPlanetBox = styled(Box)({
  display: "flex",
  width: "100%",
  height: "120vw",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  gap: "10px",
  flexWrap: "wrap",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundPosition: "center",
  position: "absolute",
  // backgroundImage: `url(./Planet.png)`,
});
