import React from "react";
import { Box, Typography } from "@mui/material";
import Linked from "../../assets/link.svg";
import { MAIN_COLORS } from "../../shared/colors";
import Mission from "../../assets/mission.svg";
import Wind from "../../assets/wind.svg";
import Cart from "../../assets/cart-shopping.svg";
import Wallet from "../../assets/wallet.svg";

const Footer = () => {
  return (
    <Box
      sx={{
        height: "91.5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <img
          src={Linked}
          alt="linked"
          style={{ width: "22px", height: "22px" }}
        />
        <Typography
          sx={{
            color: MAIN_COLORS.contentYellow,
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          Referal
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <img src={Mission} alt="mission" />
        <Typography
          sx={{
            color: MAIN_COLORS.footerText,
            fontSize: "12px",
            fontWeight: 400,
          }}
        >
          Mission
        </Typography>
      </Box>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          border: `1px solid  ${MAIN_COLORS.contentYellow}`,
          borderBottom: "none",
          borderTopLeftRadius: "52%",
          borderTopRightRadius: "52%",
        }}
      >
        <img src={Wind} alt=" wind " />
        <Typography
          sx={{
            color: MAIN_COLORS.witeText,
            fontSize: "12px",
            fontWeight: 400,
          }}
        >
          Home
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <img src={Cart} alt="cart" />
        <Typography
          sx={{
            color: MAIN_COLORS.footerText,
            fontSize: "12px",
            fontWeight: 400,
          }}
        >
          Shop
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <img
          src={Wallet}
          alt=" wallet"
          style={{ marginBottom: "5px", paddingTop: "5px" }}
        />
        <Typography
          sx={{
            color: MAIN_COLORS.footerText,
            fontSize: "12px",
            fontWeight: 400,
          }}
        >
          Wallet
        </Typography>
      </Box>
      <Box></Box>
      <Box></Box>
    </Box>
  );
};
export default Footer;
