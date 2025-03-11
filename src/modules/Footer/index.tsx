import React, { useCallback, useEffect, useMemo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Linked from "../../assets/link.svg";
import LinkedActive from "../../assets/linkActive.svg";
import { MAIN_COLORS } from "../../shared/colors";
import Mission from "../../assets/mission.svg";
import MissionActive from "../../assets/missionActive.svg";
import Wind from "../../assets/wind.svg";
import WindActive from "../../assets/windActive.svg";
import Cart from "../../assets/cart-shopping.svg";
import CartActive from "../../assets/cart-shoppingActive.svg";
import Wallet from "../../assets/wallet.svg";
import WalletActive from "../../assets/walletActive.svg";
import { StyledFooterBoxes } from "./componets/StyledFooterBoxes";
import { StyledFooterBoxesTypography } from "./componets/StyledFooterBoxesTypography";
import { StyledCenterFooter } from "./componets/StyledCenterFooter";
import { StyledFooterBox } from "./componets/StyledFooterBox";
import { useLocation, useNavigate } from "react-router-dom";
import useSound from "use-sound";
import FooterButtonPress from "../../assets/sounds/footerButton.mp3";
import PowerIcon from "./componets/PowerIcon";
import {
  selectDisabledPowerButton,
  selectNextPressTimeDelay,
} from "../Home/selectors";
import { useDispatch, useSelector } from "react-redux";
import { powerButtonPressed, setPressTimeDelay } from "../Home/slices";
import { useTranslation } from "react-i18next";
import PowerIconActive from "./componets/PowerIconActive";

const Footer = () => {
  const navigate = useNavigate();
  const [playSound] = useSound(FooterButtonPress);
  const location = useLocation();
  const nextPressButtonTimeDelay = useSelector(selectNextPressTimeDelay());
  const isButtonDisabled = useSelector(selectDisabledPowerButton());
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
              fontSize: "16px",
              fontWeight: 600,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              padding: "12px",
              borderRadius: "7px",
            }}
          >
            {calculateTime} {t("hour")}
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
              boxShadow: `
              0px 4px 4px 0px rgba(0, 0, 0, 0.25),
              0px -2px 4px 0px rgba(0, 0, 0, 1) inset,
              0px 1px 4px 0px rgba(255, 255, 255, 0.14) inset
              `,
            }}
            variant="contained"
            disabled={isButtonDisabled}
            onClick={handlePushPower}
          >
            {isButtonDisabled ? <PowerIcon /> : <PowerIconActive />}
            <Typography
              sx={{
                color: "rgb(0, 0, 0)",
                fontSize: "20px",
                fontWeight: 600,
                fontStyle: "italic",
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
            src={location.pathname === "/referal" ? LinkedActive : Linked}
            alt="linked"
            style={{ width: "22px", height: "22px" }}
          />
          <Typography
            sx={{
              color:
                location.pathname === "/referal"
                  ? MAIN_COLORS.activeTabColor
                  : MAIN_COLORS.missionTable,
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {t("Referal")}
          </Typography>
        </StyledFooterBoxes>
        <StyledFooterBoxes onClick={() => handleNavigationChange("/missions")}>
          <img
            src={location.pathname === "/missions" ? MissionActive : Mission}
            alt="mission"
          />
          <StyledFooterBoxesTypography
            sx={{
              color:
                location.pathname === "/missions"
                  ? MAIN_COLORS.activeTabColor
                  : MAIN_COLORS.missionTable,
            }}
          >
            Mission
          </StyledFooterBoxesTypography>
        </StyledFooterBoxes>
        <StyledCenterFooter onClick={() => handleNavigationChange("/")}>
          <img
            src={location.pathname === "/" ? WindActive : Wind}
            alt=" wind "
          />
          <StyledFooterBoxesTypography
            sx={{
              color:
                location.pathname === "/"
                  ? MAIN_COLORS.activeTabColor
                  : MAIN_COLORS.missionTable,
            }}
          >
            Home
          </StyledFooterBoxesTypography>
        </StyledCenterFooter>
        <StyledFooterBoxes onClick={() => handleNavigationChange("/shop")}>
          <img
            src={location.pathname === "/shop" ? CartActive : Cart}
            alt="cart"
          />
          <StyledFooterBoxesTypography
            sx={{
              color:
                location.pathname === "/shop"
                  ? MAIN_COLORS.activeTabColor
                  : MAIN_COLORS.missionTable,
            }}
          >
            Shop
          </StyledFooterBoxesTypography>
        </StyledFooterBoxes>
        <StyledFooterBoxes onClick={() => handleNavigationChange("/wallet")}>
          <img
            src={location.pathname === "/wallet" ? WalletActive : Wallet}
            alt=" wallet"
            style={{ marginBottom: "5px", paddingTop: "5px" }}
          />
          <StyledFooterBoxesTypography
            sx={{
              color:
                location.pathname === "/wallet"
                  ? MAIN_COLORS.activeTabColor
                  : MAIN_COLORS.missionTable,
            }}
          >
            Wallet
          </StyledFooterBoxesTypography>
        </StyledFooterBoxes>
      </StyledFooterBox>
    </Box>
  );
};
export default Footer;
