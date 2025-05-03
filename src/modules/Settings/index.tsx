import React, { useState } from "react";
import { Box, Typography, Modal, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { StyledBasicBox } from "../Referal_temp/components/StyledBasicBox";
import { CustomSwitch } from "./components/CustomSwitch";
import LanguageSelector from "../../shared/components/LanguageSelector";
import { TabBoxSettings } from "./components/TableBoxSettings";
import { MainBox } from "../../shared/components/MainBox";
import { NamedStyled } from "../../shared/components/NameStyled";
import { SubMainBox } from "./components/SubMainBox";
import { selectSettingsLoading } from "./slices";
import { useSelector } from "react-redux";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { MAIN_COLORS } from "../../shared/colors";

const Settings = () => {
  const loading = useSelector(selectSettingsLoading);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

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
            onChange={() => setSoundEnabled(!soundEnabled)}
          />
        </TabBoxSettings>

        <Box>
          <Button
            onClick={() => setRoadmapOpen(true)}
            variant="text"
            sx={{ color: MAIN_COLORS.mainGreen }}
          >
            Roadmap
          </Button>
        </Box>
      </StyledBasicBox>

      <Modal open={roadmapOpen} onClose={() => setRoadmapOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxHeight: "80vh",
            overflowY: "auto",
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" gutterBottom>
              Roadmap
            </Typography>
            <IconButton onClick={() => setRoadmapOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
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
