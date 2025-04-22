import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { ButtonGame } from "../../shared/components/ButtonGame";
import { StyledTime } from "./componets/StyledTime";
import { StyledTypographyButton } from "./componets/StyledTypographyButton";
import { StyledMainBox } from "./componets/StyledMainBox";
import { footerTabs } from "../../shared/components/FooterTabs";
import { selectUserData } from "../Header/selectors";
import { selectModificatorsData } from "../Header/selectors";
import { ModalComponent } from "../../shared/components/ModalComponent";
import { StyledButtonGame } from "../Planet/components/StyledButtonGame";

const Footer = ({ isDisabled }: { isDisabled: boolean }) => {
  const navigate = useNavigate();
  const [playSound] = useSound(FooterButtonPress);
  const location = useLocation();
  const nextPressButtonTimeDelay = useSelector(selectNextPressTimeDelay());
  const isButtonDisabled = useSelector(selectDisabledPowerButton());
  const dispatch = useDispatch();
  const selectedCountry = useSelector(selectSelectedCountry());
  const userData = useSelector(selectUserData());
  const modificatorsData = useSelector(selectModificatorsData());
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);

  const handleNavigationChange = useCallback(
    (path: string) => {
      if (!selectedCountry.name) {
        navigate("/");
      } else {
        navigate(path);
      }
      playSound();
    },
    [playSound, navigate, selectedCountry],
  );

  const handlePushPower = useCallback(() => {
    if (userData) {
      const selectedCountryData = modificatorsData?.find(
        (modificator) => modificator?.areaName === selectedCountry?.name,
      );

      const isWindSpeedZero = selectedCountryData
        ? selectedCountryData.boughtModifier?.speed === 0
        : false;

      if (isWindSpeedZero) {
        setOpenModal(true);
      } else {
        dispatch(
          powerButtonPressed({
            uid: userData?.id,
            areaName: selectedCountry.name,
          }),
        );
      }
    }
  }, [dispatch, userData, selectedCountry, modificatorsData]);

  const handleShopButton = useCallback(() => {
    setOpenModal(false);
    navigate("/shop");
  }, [navigate]);

  const calculateTime = useMemo(() => {
    const totalSeconds = Math.floor(nextPressButtonTimeDelay / 1000);
    const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const ss = String(totalSeconds % 60).padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  }, [nextPressButtonTimeDelay]);

  useEffect(() => {
    if (nextPressButtonTimeDelay > 0) {
      setTimeout(() => {
        dispatch(setPressTimeDelay(nextPressButtonTimeDelay - 1000));
      }, 1000);
    }
  }, [dispatch, nextPressButtonTimeDelay]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <StyledMainBox>
      {location.pathname === "/home" && (
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          marginBottom="10px"
        >
          <StyledTime>
            {calculateTime} {t("remain")}
          </StyledTime>
          <ButtonGame
            disabled={isButtonDisabled}
            variant="contained"
            onClick={handlePushPower}
          >
            {isButtonDisabled ? <PowerIcon /> : <PowerIconActive />}
            <StyledTypographyButton>{t("Push Power")}</StyledTypographyButton>
          </ButtonGame>
        </Stack>
      )}
      <ModalComponent
        title={t("Buy wind speed")}
        subtitle={t("Your wind speed is zero. Please purchase to proceed.")}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        additionalbutton={
          <StyledButtonGame onClick={handleShopButton}>
            To Shop
          </StyledButtonGame>
        }
      />
      <StyledFooterBox>
        {footerTabs.map(({ path, icon, activeIcon, label, isCenter }) => {
          const isActive = location.pathname === path;
          const isDisabledOnHome = location.pathname === "/" && path !== "/";

          const Component = isCenter ? StyledCenterFooter : StyledFooterBoxes;

          return (
            <Component
              key={path}
              onClick={() => !isDisabledOnHome && handleNavigationChange(path)}
              style={{
                opacity: isDisabledOnHome ? 0.5 : 1,
                pointerEvents: isDisabledOnHome ? "none" : "auto",
              }}
            >
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
