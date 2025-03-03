import React, { useState } from "react";
import { AppBar, Box, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../shared/colors";
import Gear from "../../assets/gear.svg";
import USDT from "../../assets/usdt.svg";
import { StyledMain } from "./components/StyledMain";

const Header = () => {
  return (
    <StyledMain>
      <Box
        sx={{ gap: "9px", display: "flex", paddingLeft: "19px", width: "50vh" }}
      >
        <img src={Gear} alt="gear" />
        <Box
          sx={{
            width: "100%",
            paddingTop: "7px",
            paddingBottom: "7px",
            paddingRight: "22px",
            borderRight: `1px solid ${MAIN_COLORS.border}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              color: MAIN_COLORS.textColor,
              gap: "35px",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
              Dev948
            </Typography>
            <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
              LVL:23
            </Typography>
          </Box>
          <Box
            sx={{
              width: "96px",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              height: "3px",
              borderRadius: "34px",
            }}
          >
            <Box
              sx={{
                width: "34%",
                height: "100%",
                backgroundColor: "#63EE6A",
                borderRadius: "34px",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          gap: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "50vh",
        }}
      >
        <img src={USDT} alt="usdt" />
        <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
          TON: 234
        </Typography>
      </Box>
    </StyledMain>
  );
};
export default Header;
