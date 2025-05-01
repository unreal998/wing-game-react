import React, { useCallback, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../shared/colors";
import Gear from "../../assets/gear.svg";
import TON from "../../assets/ton.png";
import Flash from "../../assets/flash.png";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import FooterButtonPress from "../../assets/sounds/footerButton.mp3";
import WebApp from "@twa-dev/sdk";
import { StyledFlashBox } from "./components/StyledFlashBox";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "./selectors";
import { selectHeaderLoading, updateBalanceAction } from "./slices";
import LoaderComponent from "../../shared/components/LoaderComponent";

// const windSpeedByAreaName: Record<string, string> = {
//   nr: "~5.5–6.0 m/s",
//   dk: "~6.0–6.5 m/s",
//   gr: "~6.5–7.0 m/s",
//   usa: "~7.0–7.5 m/s",
// };

const Header = () => {
  const loading = useSelector(selectHeaderLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [playSound] = useSound(FooterButtonPress);
  const userData = useSelector(selectUserData());

  useEffect(() => {
    if (userData !== null) {
      dispatch(updateBalanceAction(userData.id));
    }
  }, [dispatch, userData]);

  const handleSoundClick = useCallback(() => {
    playSound();
    navigate("/settings");
  }, [playSound, navigate]);

  const isMobile =
    WebApp.platform &&
    WebApp.platform !== "unknown" &&
    WebApp.platform !== "tdesktop";

  // const activeArea = useMemo(() => {
  //   return userData?.areas?.find((area) => area.available) || { name: "nr" };
  // }, [userData]);

  // const currentWindSpeed =
  //   windSpeedByAreaName[activeArea.name] || windSpeedByAreaName["nr"];

  return (
    <Stack
      sx={{
        backgroundColor: MAIN_COLORS.blockBG,
        marginLeft: "14px",
        marginRight: "14px",
        marginTop: isMobile ? "11vh" : "2vh",
        borderRadius: "12px",
        padding: "15px",
        zIndex: 100,
        gap: "16px",
      }}
    >
      <LoaderComponent loading={loading} />
      <Stack width={"100%"} direction="row" justifyContent="space-between">
        <Typography sx={{ fontSize: "16px", fontWeight: 400 }}>
          {userData?.userName}
        </Typography>
        <img
          src={Gear}
          width="22px"
          height="22px"
          alt="gear"
          onClick={handleSoundClick}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" gap={"15px"}>
        <StyledFlashBox sx={{ width: "60%" }}>
          <Stack direction="row">
            <img height="22px" width="22px" src={Flash} alt="flash" />
            <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
              {userData?.WindBalance} kW
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            lvl {userData?.lvl}
          </Typography>
        </StyledFlashBox>

        {/* <Typography
            sx={{ fontSize: "11px", fontWeight: 500, color: "white" }}
          >
            {currentWindSpeed}
          </Typography> */}
        <StyledFlashBox sx={{ gap: "8px", width: "30%" }}>
          <img src={TON} alt="usdt" width="24px" height="24px" />
          <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
            {userData?.TONBalance}
          </Typography>
        </StyledFlashBox>
      </Stack>
    </Stack>
  );
};

export default Header;
