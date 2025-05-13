import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { StyledBasicBox } from "../Referal_temp/components/StyledBasicBox";
import { CustomSwitch } from "./components/CustomSwitch";
import LanguageSelector from "../../shared/components/LanguageSelector";
import { TabBoxSettings } from "./components/TableBoxSettings";
import { MainBox } from "../../shared/components/MainBox";
import { NamedStyled } from "../../shared/components/NameStyled";
import { SubMainBox } from "./components/SubMainBox";
import { useDispatch, useSelector } from "react-redux";
import LoaderComponent from "../../shared/components/LoaderComponent";

import footerButtonSound from "../../assets/sounds/footerButton.mp3";
import useSound from "use-sound";
import {
  selectIsRoadmapOpen,
  selectIsTutorialRestarted,
  selectSettingsLoading,
  selectSoundEnabled,
} from "./selectors";
import {
  restartTutorialRequest,
  setRoadMapOpen,
  setSoundEnabled,
} from "./slices";
import { PopUpMainButton } from "../../shared/components/PopUpMainButton";
import { selectUserId } from "../Header/selectors";

const Settings = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectSettingsLoading());
  const soundEnabled = useSelector(selectSoundEnabled());
  const isRoadMapOpen = useSelector(selectIsRoadmapOpen());
  const { t, i18n } = useTranslation();

  const [playFooterSound] = useSound(footerButtonSound);
  const userId = useSelector(selectUserId());
  const isTutorialRestarted = useSelector(selectIsTutorialRestarted());

  const closeRoadmapModal = useCallback(() => {
    dispatch(setRoadMapOpen(false));
  }, [dispatch]);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const handleRestartTutorial = () => {
    if (!userId) return;
    dispatch(restartTutorialRequest(userId));
  };

  useEffect(() => {
    if (isTutorialRestarted) {
      window.location.href = "/";
    }
  }, [isTutorialRestarted]);

  return (
    <MainBox>
      <LoaderComponent loading={loading} />

      <SubMainBox>
        <NamedStyled paddingBottom="8px">{t("Settings")}</NamedStyled>
      </SubMainBox>

      <StyledBasicBox>
        <TabBoxSettings>
          <Typography
            sx={{
              paddingTop: "10px",
              paddingBottom: "10px",
              textTransform: "capitalize",
            }}
          >
            {t("Language")}:
          </Typography>
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </TabBoxSettings>

        <TabBoxSettings justifyContent="space-between">
          <Typography sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
            {t("Sound")}
          </Typography>
          <CustomSwitch
            checked={soundEnabled}
            onChange={() => {
              const newValue = !soundEnabled;
              if (newValue) playFooterSound();
              dispatch(setSoundEnabled(newValue));
            }}
          />
        </TabBoxSettings>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <PopUpMainButton
            onClick={handleRestartTutorial}
            sx={{
              width: "60%",
            }}
          >
            {t("repeatTutorial")}
          </PopUpMainButton>
        </Box>
      </StyledBasicBox>

      <Modal open={isRoadMapOpen} onClose={closeRoadmapModal}>
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxHeight: "80vh",
            overflowY: "auto",
            bgcolor: "rgba(4, 53, 80, 1)",
            p: 3,
            borderRadius: 2,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "rgba(106, 218, 67, 1)" }}
            >
              {t("Roadmap")}
            </Typography>
            <IconButton onClick={closeRoadmapModal}>
              <CloseIcon sx={{ color: "rgba(106, 218, 67, 1)" }} />
            </IconButton>
          </Box>

          <Typography
            variant="body2"
            sx={{
              whiteSpace: "pre-line",
              color: "#fff",
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6]
              .map((i) => t(`roadmap.text${i === 0 ? "" : i}`))
              .join("\n\n")}
          </Typography>
        </Box>
      </Modal>
    </MainBox>
  );
};

export default Settings;
