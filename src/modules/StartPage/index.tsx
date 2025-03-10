import { Box, Typography } from "@mui/material";
import React from "react";
import { Home } from "../Home";
import { MAIN_COLORS } from "../../shared/colors";

const StartPage = () => {
  return (
    <Box sx={{ height: "100%", width: "100vw" }}>
      <Home />
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "82%",
          paddingLeft: "33px",
          paddingRight: "33px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            paddingTop: "19px",
            paddingBootom: "19px",
            frontSide: "24px",
            fontWeight: 700,
            color: MAIN_COLORS.textColor,
          }}
        >
          Name app
        </Typography>
        <Box sx={{ width: "100%", display: "flex", paddingTop: "19px" }}>
          <Box
            sx={{
              flex: 1.1,
              height: "8px",
              backgroundColor: MAIN_COLORS.activeTabColor,
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
            }}
          />
          <Box
            sx={{
              flex: 0.9,
              height: "8px",
              backgroundColor: MAIN_COLORS.referalBottom,
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 300,
            color: MAIN_COLORS.textColor,
            paddingTop: "80px",
            paddingBottom: "26px",
          }}
        >
          1.34 version
        </Typography>
      </Box>
    </Box>
  );
};

export default StartPage;
