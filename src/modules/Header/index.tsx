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
import { StyledImgBox } from "./components/StyledImgBox";
import { StyledBoxTable } from "./components/SledBoxTable";
import { StyledSchedule } from "./components/StyledSchedule";
import { StyledSubSchedule } from "./components/StyledSubSchedule";
import { StyledFlashBox } from "./components/StyledFlashBox";
import { StyledCurencyBox } from "./components/StyledCurrencyBox";

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
          <StyledBoxTable>
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
            <StyledSubSchedule>
              <StyledSchedule />
            </StyledSubSchedule>
          </StyledBoxTable>
        </Box>
        <StyledCurencyBox>
          <img src={USDT} alt="usdt" />
          <Typography
            sx={{ fontSize: "12px", fontWeight: 500, color: "white" }}
          >
            TON: 234
          </Typography>
        </StyledCurencyBox>
      </StyledMain>
      {location.pathname === "/" && (
        <StyledMain sx={{ gap: "20px" }}>
          <StyledFlashBox>
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
          </StyledFlashBox>
          <StyledImgBox>
            <img src={USDT} alt="usdt" />
            <Typography
              sx={{ fontSize: "14px", fontWeight: 600, color: "white" }}
            >
              234
            </Typography>
          </StyledImgBox>
        </StyledMain>
      )}
    </Stack>
  );
};
export default Header;
