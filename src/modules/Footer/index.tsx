import React from "react";
import { Box, Typography } from "@mui/material";
import Linked from "../../assets/link.svg";
import { MAIN_COLORS } from "../../shared/colors";
import Mission from "../../assets/mission.svg";
import Wind from "../../assets/wind.svg";
import Cart from "../../assets/cart-shopping.svg";
import Wallet from "../../assets/wallet.svg";
import { StyledFooterBoxes } from "./componets/StyledFooterBoxes";
import { StyledFooterBoxesTypography } from "./componets/StyledFooterBoxesTypography";
import { StyledCenterFooter } from "./componets/StyledCenterFooter";
import { StyledFooterBox } from "./componets/StyledFooterBox";

const Footer = () => {
  return (
    <StyledFooterBox>
      <StyledFooterBoxes>
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
      </StyledFooterBoxes>
      <StyledFooterBoxes>
        <img src={Mission} alt="mission" />
        <StyledFooterBoxesTypography>Mission</StyledFooterBoxesTypography>
      </StyledFooterBoxes>
      <StyledCenterFooter>
        <img src={Wind} alt=" wind " />
        <StyledFooterBoxesTypography>Home</StyledFooterBoxesTypography>
      </StyledCenterFooter>
      <StyledFooterBoxes>
        <img src={Cart} alt="cart" />
        <StyledFooterBoxesTypography>Shop</StyledFooterBoxesTypography>
      </StyledFooterBoxes>
      <StyledFooterBoxes>
        <img
          src={Wallet}
          alt=" wallet"
          style={{ marginBottom: "5px", paddingTop: "5px" }}
        />
        <StyledFooterBoxesTypography>Wallet</StyledFooterBoxesTypography>
      </StyledFooterBoxes>
      <Box></Box>
      <Box></Box>
    </StyledFooterBox>
  );
};
export default Footer;
