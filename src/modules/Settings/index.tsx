import React, { useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { StyledBasicBox } from "../Referal_temp/components/StyledBasicBox";
import { CustomSwitch } from "./components/CustomSwitch";
import { TabBoxSettings } from "./components/TableBoxSettings";
import { MainBox } from "../../shared/components/MainBox";
import { NamedStyled } from "../../shared/components/NameStyled";
import { SubMainBox } from "./components/SubMainBox";
import { useDispatch, useSelector } from "react-redux";
import LoaderComponent from "../../shared/components/LoaderComponent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import footerButtonSound from "../../assets/sounds/footerButton.mp3";
import useSound from "use-sound";
import {
  selectIsRoadmapOpen,
  selectIsTutorialRestarted,
  selectRoadmapText,
  selectSettingsLoading,
  selectSoundEnabled,
} from "./selectors";
import {
  getRoadmapTextAction,
  restartTutorialRequest,
  setRoadMapOpen,
  setSoundEnabled,
} from "./slices";
import { PopUpMainButton } from "../../shared/components/PopUpMainButton";
import { selectUserId } from "../Header/selectors";

const AccordionComponent = ({ block }: { block: string }) => {
  const headMatch = block.match(/<head>([\s\S]*?)<\/head>/);
  const bodyMatch = block.match(/<body>([\s\S]*?)<\/body>/);

  const head = headMatch ? headMatch[1].trim() : "";
  const body = bodyMatch ? bodyMatch[1].trim() : "";

  return (
    <Accordion
      sx={{
        border: "0px",
        backgroundColor: "rgba(4, 53, 80, 1)",
        color: "#fff",
        boxShadow: "0px 0px 0px 0px",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
        sx={{
          padding: "0px",
        }}
      >
        <Typography sx={{ fontWeight: "700" }}>{head}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{body}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const Settings = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectSettingsLoading());
  const soundEnabled = useSelector(selectSoundEnabled());
  const isRoadMapOpen = useSelector(selectIsRoadmapOpen());
  const { t, i18n } = useTranslation();

  const [playFooterSound] = useSound(footerButtonSound);
  const userId = useSelector(selectUserId());
  const roadmapText = useSelector(selectRoadmapText());
  const isTutorialRestarted = useSelector(selectIsTutorialRestarted());

  const closeRoadmapModal = useCallback(() => {
    dispatch(setRoadMapOpen(false));
  }, [dispatch]);

  const handleRestartTutorial = () => {
    if (!userId) return;
    dispatch(restartTutorialRequest(userId));
  };

  const handleSupportButton = () => {
    window.location.href = "https://t.me/turbinex_support";
  };

  useEffect(() => {
    if (isTutorialRestarted) {
      window.location.href = "/";
    }
  }, [isTutorialRestarted]);

  useEffect(() => {
    const language = i18n.language;
    const selectedLanguageLabel = language.split("-");
    dispatch(
      getRoadmapTextAction(
        selectedLanguageLabel[0] === "en" || selectedLanguageLabel[0] === "ru"
          ? selectedLanguageLabel[0]
          : "en",
      ),
    );
  }, [dispatch, i18n.language]);

  const generateRoadmaMarkup = useCallback((blocks: string[]) => {
    return blocks.map((block) =>
      block.includes("<list>") ? (
        <AccordionComponent key={block} block={block} />
      ) : (
        <Typography key={block}>{block}</Typography>
      ),
    );
  }, []);

  const parseRoadmapText = useCallback(
    (text: string) => {
      const blocks: string[] = [];
      let lastIndex = 0;

      const regex = /<list>[\s\S]*?<\/list>/g;
      let match;

      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          const before = text.slice(lastIndex, match.index).trim();
          if (before) blocks.push(before);
        }

        const listBlock = match[0].trim();
        blocks.push(listBlock);

        lastIndex = regex.lastIndex;
      }

      if (lastIndex < text.length) {
        const after = text.slice(lastIndex).trim();
        if (after) blocks.push(after);
      }

      return generateRoadmaMarkup(blocks);
    },
    [generateRoadmaMarkup],
  );

  return (
    <MainBox>
      <LoaderComponent loading={loading} />

      <SubMainBox>
        <NamedStyled paddingBottom="8px">{t("Settings")}</NamedStyled>
      </SubMainBox>

      <StyledBasicBox>
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
            justifyContent: "space-between",
          }}
        >
          <PopUpMainButton
            onClick={handleRestartTutorial}
            sx={{
              width: "45%",
            }}
          >
            {t("repeatTutorial")}
          </PopUpMainButton>
          <PopUpMainButton
            onClick={handleSupportButton}
            sx={{
              width: "45%",
            }}
          >
            {t("support")}
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

          <Stack
            direction="column"
            justifyContent="space-between"
            gap="10px"
            sx={{
              width: "100%",
              color: "#fff",
              whiteSpace: "pre-line",
            }}
          >
            {parseRoadmapText(roadmapText)}
          </Stack>
        </Box>
      </Modal>
    </MainBox>
  );
};

export default Settings;
