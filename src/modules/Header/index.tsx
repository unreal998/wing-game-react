import React, { useCallback } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../shared/colors";
import Gear from "../../assets/gear.svg";
import USDT from "../../assets/usdt.svg";
import Flash from "../../assets/flash.png";
import { StyledMain } from "./components/StyledMain";
import { useLocation, useNavigate } from "react-router-dom";
import useSound from "use-sound";
import FooterButtonPress from "../../assets/sounds/footerButton.mp3";
import WebApp from "@twa-dev/sdk";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [playSound] = useSound(FooterButtonPress);

  const handleSoundClick = useCallback(() => {
    playSound();
    navigate("/settings");
  }, [playSound, navigate]);

  const isMobile =
    WebApp.platform &&
    WebApp.platform !== "unknown" &&
    WebApp.platform !== "tdesktop";

  return (
    <Stack
      sx={{
        backgroundColor: MAIN_COLORS.headerBG,
        marginLeft: "14px",
        marginRight: "14px",
        marginTop: isMobile ? "11vh" : "2vh",
        borderRadius: "12px",
        padding: "11px",
      }}
    >
      <StyledMain>
        <Box
          sx={{
            gap: "9px",
            display: "flex",
            paddingLeft: "19px",
            width: "50vh",
          }}
        >
          <img src={Gear} alt="gear" onClick={handleSoundClick} />
          <Box
            sx={{
              width: "100%",
              paddingTop: "7px",
              paddingBottom: "7px",
              paddingRight: "22px",
              borderRight: `1px solid ${MAIN_COLORS.mainGreyBG}`,
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
          <Typography
            sx={{ fontSize: "12px", fontWeight: 500, color: "white" }}
          >
            TON: 234
          </Typography>
        </Box>
      </StyledMain>
      {location.pathname === "/" && (
        <StyledMain sx={{ gap: "20px" }}>
          <Box
            sx={{
              gap: "9px",
              display: "flex",
              padding: "15px",
              borderRadius: "7px",
              width: "50%",
              alignItems: "center",
              backgroundColor: MAIN_COLORS.electrisityBoxBG,
            }}
          >
            <img src={Flash} alt="flash" />
            <Box
              sx={{
                display: "flex",
                color: MAIN_COLORS.textColor,
                gap: "35px",
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                442.8593 Kwt
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "80px",
              backgroundColor: "rgba(217, 217, 217, 0.17)",
              border: `1px solid ${MAIN_COLORS.activeTabColor}`,
              flexDirection: "row",
              borderRadius: "9px",
              alignItems: "center",
              padding: "10px 13px",
              gap: "10px",
            }}
          >
            <img src={USDT} alt="usdt" />
            <Typography
              sx={{ fontSize: "14px", fontWeight: 600, color: "white" }}
            >
              234
            </Typography>
          </Box>
        </StyledMain>
      )}
    </Stack>
  );
};
export default Header;
