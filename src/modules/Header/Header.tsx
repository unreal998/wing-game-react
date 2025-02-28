import React, { useState } from "react";
import { AppBar, Box, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../shared/colors";
import Gear from "../../assets/gear.svg";
import Rechanle from "../../assets/Rectangle.svg";
import RechanleT from "../../assets/RectangleT.svg";
import USDT from "../../assets/usdt.svg";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100hv",
        height: "50px",
        backgroundColor: MAIN_COLORS.headerBG,
        borderRadius: "52px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: "14px",
        marginRight: "14px",
        marginTop: "24px",
      }}
    >
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
              |v|
            </Typography>
          </Box>
          <img src={RechanleT} alt="RechanleT" />
          <img src={Rechanle} alt="Rechanle" style={{ width: "55px" }} />
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
    </Box>
  );
};
export default Header;
