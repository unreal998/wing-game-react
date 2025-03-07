import React, { useCallback, useEffect, useMemo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
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
import { useLocation, useNavigate } from "react-router-dom";
import useSound from "use-sound";
import FooterButtonPress from "./sounds/footerButton.mp3";
import PowerIcon from "./componets/PowerIcon";
import {
  selectDisabledPowerButton,
  selectNextPressTimeDelay,
} from "../Home/selectors";
import { useDispatch, useSelector } from "react-redux";
import { powerButtonPressed, setPressTimeDelay } from "../Home/slices";

const Footer = () => {
  const navigate = useNavigate();
  const [playSound] = useSound(FooterButtonPress);
  const location = useLocation();
  const nextPressButtonTimeDelay = useSelector(selectNextPressTimeDelay());
  const isButtonDisabled = useSelector(selectDisabledPowerButton());
  const dispatch = useDispatch();

  const handleNavigationChange = useCallback(
    (path: string) => {
      navigate(path);
      playSound();
    },
    [playSound, navigate],
  );

  const handlePushPower = useCallback(() => {
    dispatch(powerButtonPressed());
  }, [dispatch]);

  const calculateTime = useMemo(() => {
    const time = new Date(nextPressButtonTimeDelay);
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const seccount = time.getUTCSeconds();

    return `${hours}:${minutes}:${seccount}`;
  }, [nextPressButtonTimeDelay]);

  useEffect(() => {
    if (nextPressButtonTimeDelay > 0) {
      setTimeout(() => {
        dispatch(setPressTimeDelay(nextPressButtonTimeDelay - 1000));
      }, 1000);
    }
  }, [dispatch, nextPressButtonTimeDelay]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {location.pathname === "/" && (
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          marginBottom="10px"
        >
          <Typography
            sx={{
              color: MAIN_COLORS.textColor,
              fontSize: "12px",
              fontWeight: 400,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              padding: "12px",
              borderRadius: "7px",
            }}
          >
            {calculateTime} hour
          </Typography>
          <Button
            sx={{
              width: "80%",
              display: "flex",
              gap: "7px",
              padding: "12px",
              backgroundColor: MAIN_COLORS.activeTabColor,
              borderRadius: "10px",
              "&.Mui-disabled": {
                backgroundColor: "rgb(134 134 134)",
              },
            }}
            variant="contained"
            disabled={isButtonDisabled}
            onClick={handlePushPower}
          >
            <PowerIcon />
            <Typography
              sx={{
                color: "rgb(0, 0, 0)",
                fontSize: "20px",
                fontWeight: 400,
              }}
            >
              Push Power
            </Typography>
          </Button>
        </Stack>
      )}
      <StyledFooterBox>
        <StyledFooterBoxes onClick={() => handleNavigationChange("/referal")}>
          <img
            src={Linked}
            alt="linked"
            style={{ width: "22px", height: "22px" }}
          />
          <Typography
            sx={{
              color: MAIN_COLORS.activeTabColor,
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            Referal
          </Typography>
        </StyledFooterBoxes>
        <StyledFooterBoxes onClick={() => handleNavigationChange("/mission")}>
          <img src={Mission} alt="mission" />
          <StyledFooterBoxesTypography>Mission</StyledFooterBoxesTypography>
        </StyledFooterBoxes>
        <StyledCenterFooter onClick={() => handleNavigationChange("/")}>
          <img src={Wind} alt=" wind " />
          <StyledFooterBoxesTypography>Home</StyledFooterBoxesTypography>
        </StyledCenterFooter>
        <StyledFooterBoxes onClick={() => handleNavigationChange("/shop")}>
          <img src={Cart} alt="cart" />
          <StyledFooterBoxesTypography>Shop</StyledFooterBoxesTypography>
        </StyledFooterBoxes>
        <StyledFooterBoxes onClick={() => handleNavigationChange("/wallet")}>
          <img
            src={Wallet}
            alt=" wallet"
            style={{ marginBottom: "5px", paddingTop: "5px" }}
          />
          <StyledFooterBoxesTypography>Wallet</StyledFooterBoxesTypography>
        </StyledFooterBoxes>
      </StyledFooterBox>
    </Box>
  );
};
export default Footer;
