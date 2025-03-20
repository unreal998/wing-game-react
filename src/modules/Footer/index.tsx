import React, { useCallback, useEffect, useMemo } from "react";
import { Stack } from "@mui/material";
import { MAIN_COLORS } from "../../shared/colors";
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
  selectSelectedCountry,
} from "../Home/selectors";
import { useDispatch, useSelector } from "react-redux";
import { powerButtonPressed, setPressTimeDelay } from "../Home/slices";
import { useTranslation } from "react-i18next";
import PowerIconActive from "./componets/PowerIconActive";
import { ButtonGame } from "../../shared/ButtonGame";
import { StyledTime } from "./componets/StyledTime";
import { StyledTypographyButton } from "./componets/StyledTypographyButton";
import { StyledMainBox } from "./componets/StyledMainBox";
import { footerTabs } from "../../shared/components/FooterTabs";

const Footer = () => {
  const navigate = useNavigate();
  const [playSound] = useSound(FooterButtonPress);
  const location = useLocation();
  const nextPressButtonTimeDelay = useSelector(selectNextPressTimeDelay());
  const isButtonDisabled = useSelector(selectDisabledPowerButton());
  const dispatch = useDispatch();
  const selectedCountry = useSelector(selectSelectedCountry());
  const { t } = useTranslation();

  const handleNavigationChange = useCallback(
    (path: string) => {
      if (path === "/home" && !selectedCountry) {
        navigate("/");
      } else {
        navigate(path);
      }
      playSound();
    },
    [playSound, navigate, selectedCountry],
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
    <StyledMainBox>
      {location.pathname === "/" && (
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          marginBottom="10px"
        >
          <StyledTime>
            {calculateTime} {t("hour")}
          </StyledTime>
          <ButtonGame
            variant="contained"
            disabled={isButtonDisabled}
            onClick={handlePushPower}
          >
            {isButtonDisabled ? <PowerIcon /> : <PowerIconActive />}
            <StyledTypographyButton>{t("Push Power")}</StyledTypographyButton>
          </ButtonGame>
        </Stack>
      )}
      <StyledFooterBox>
        {footerTabs.map(({ path, icon, activeIcon, label, isCenter }) => {
          const isActive = location.pathname === path;
          const Component = isCenter ? StyledCenterFooter : StyledFooterBoxes;

          return (
            <Component key={path} onClick={() => handleNavigationChange(path)}>
              <img src={isActive ? activeIcon : icon} alt={label} />
              <StyledFooterBoxesTypography
                sx={{
                  color: isActive
                    ? MAIN_COLORS.activeTabColor
                    : MAIN_COLORS.missionTable,
                }}
              >
                {t(label)}
              </StyledFooterBoxesTypography>
            </Component>
          );
        })}
      </StyledFooterBox>
    </StyledMainBox>
  );
};
export default Footer;
