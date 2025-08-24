import { Box, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { heightProportion } from "../../shared/utils";
import { StyledSHIB } from "./components/StyledSHIB";
import { StyledBoxMission } from "./components/StyledBoxMissions";
import { StyledSubscrible } from "./components/StyledSubscrible";
import { useTranslation } from "react-i18next";
import { NamedStyled } from "../../shared/components/NameStyled";
import { useDispatch, useSelector } from "react-redux";
import { selectMissionsData } from "./selectors";
import {
  completeMissionAction,
  getMissionsDataAction,
  getRewardRequest,
  selectMissionsLoading,
} from "./slices";
import { selectUserData } from "../Header/selectors";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { ButtonMissions } from "./components/ButtonMissions";
import { StyledTab } from "../../shared/components/StyledTab";
import { MissionsData } from "./types";
import { MAIN_COLORS } from "../../shared/colors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { updateBalanceAction } from "../Header/slices";
import Flash from "../../assets/flash.svg";
import { ModalComponent } from "../../shared/components/ModalComponent";
import footerButtonSound from "../../assets/sounds/footerButton.mp3";
import useSound from "use-sound";
import { PopUpMainButton } from "../../shared/components/PopUpMainButton";
import { selectSoundEnabled } from "../Settings/selectors";

const Missions = () => {
  const loading = useSelector(selectMissionsLoading);
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<MissionsData | null>(
    null,
  );
  const missionTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  const { t, i18n } = useTranslation();
  const missions = useSelector(selectMissionsData()) as MissionsData[];
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData());
  const soundEnabled = useSelector(selectSoundEnabled());

  const missionTitles = useMemo(
    () => [
      { text: t("Daily"), type: "daily" },
      { text: t("Quests"), type: "quest" },
    ],
    [t],
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (userData) {
      dispatch(updateBalanceAction(userData.id));
      dispatch(
        getMissionsDataAction({
          type: missionTitles[activeTab].type,
          uid: userData.id,
        }),
      );
    }
  }, [missionTitles, activeTab, dispatch, userData]);

  const wrapperHeight = useMemo(() => {
    return heightProportion - 100;
  }, []);

  const handleOpen = (mission: MissionsData) => {
    setSelectedMission(mission);
    setOpen(true);
  };

  const extractUrl = (text: string): string | null => {
    const match = text.match(/https?:\/\/[^"]+/);
    return match ? match[0] : null;
  };

  const handleGetReward = useCallback(
    (mission: MissionsData) => {
      if (userData) {
        dispatch(getRewardRequest({ mission, uid: userData.id }));
      }
    },
    [dispatch, userData],
  );

  const handleCompleteMission = useCallback(() => {
    setOpen(false);
    if (
      !selectedMission ||
      !userData ||
      selectedMission.specType ||
      missionTimeoutRef.current !== undefined
    )
      return;
    missionTimeoutRef.current = setTimeout(() => {
      dispatch(
        completeMissionAction({ mission: selectedMission, uid: userData.id }),
      );
      setOpen(false);
      missionTimeoutRef.current = undefined;
    }, 15000);

    const url = extractUrl(selectedMission?.description[i18n.language] || "");
    if (url) {
      window.open(url, "_blank");
    }
  }, [selectedMission, userData, missionTimeoutRef, dispatch]);
  const [playFooterSound] = useSound(footerButtonSound);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "5px 15px 0 15px",
        height: `${heightProportion}px`,
        gap: "15px",
      }}
    >
      <LoaderComponent loading={loading} />

      <TabContext value={activeTab.toString()}>
        <Box sx={{ borderColor: "divider" }}>
          <TabList
            sx={{
              display: "flex",
              minHeight: "0px",
              "& .MuiTabs-list": { gap: "8px" },
              "& .MuiTabs-indicator": { display: "none" },
            }}
            onChange={handleTabChange}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
              }}
            >
              <NamedStyled>{t("Missions")}</NamedStyled>
            </Box>
            {missionTitles.map((mission, index) => (
              <StyledTab
                sx={{ marginTop: "10px", justifyContent: "space-between" }}
                label={mission.text}
                value={index.toString()}
                key={index}
                onClick={() => {
                  if (soundEnabled) playFooterSound();
                }}
              />
            ))}
          </TabList>
        </Box>
        {missionTitles.map((_, index) => (
          <TabPanel
            sx={{
              marginBottom: "20px",
              padding: "8px 8px 2px ",
              backgroundColor: "rgba(8, 32, 47, 1)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
            value={index.toString()}
            key={index}
          >
            <Box
              height={`${wrapperHeight}px`}
              sx={{
                "@media (max-height: 670px)": { height: "325px" },
                overflowY: "auto",
                scrollbarWidth: "thin",
                paddingBottom: "10px",
                scrollbarColor: `${MAIN_COLORS.mainGreen} transparent`,
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: MAIN_COLORS.mainGreen,
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {missions &&
                missions.map((mission, idx) => (
                  <StyledBoxMission
                    key={idx}
                    onClick={() => {
                      if (soundEnabled) playFooterSound();
                      if (mission.status === "new") {
                        handleOpen(mission);
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ padding: "10px 0px 10px 0px" }}>
                        <StyledSubscrible>
                          {mission.title[i18n.language]}
                        </StyledSubscrible>
                        <StyledSHIB>
                          <img
                            height="20px"
                            width="20px"
                            src={Flash}
                            alt="flash"
                          />
                          + {mission.reward}
                          <span style={{ color: "#C6C6C8" }}>
                            {mission.coin === "TURX" ? t("kW") : mission.coin}
                          </span>
                        </StyledSHIB>
                      </Box>
                    </Box>
                    {mission.status === "completed" ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          paddingRight: "10px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: MAIN_COLORS.textColor,
                            fontWeight: 600,
                          }}
                        >
                          Done
                        </Typography>
                        <CheckCircleOutlineIcon
                          sx={{ color: MAIN_COLORS.mainGreen }}
                        />
                      </Box>
                    ) : mission.status === "finished" ? (
                      <ButtonMissions
                        sx={{
                          width: "100px",
                        }}
                        onClick={() => {
                          if (soundEnabled) handleGetReward(mission);
                        }}
                      >
                        {t("getReward")}
                      </ButtonMissions>
                    ) : (
                      <ButtonMissions
                        onClick={() => {
                          if (soundEnabled) playFooterSound();
                        }}
                      >
                        Go
                      </ButtonMissions>
                    )}
                  </StyledBoxMission>
                ))}
            </Box>
          </TabPanel>
        ))}
      </TabContext>

      <ModalComponent
        openModal={open}
        handleCloseModal={() => setOpen(false)}
        title={selectedMission?.title[i18n.language] || ""}
        subtitle={selectedMission?.description[i18n.language] || ""}
        additionalbutton={
          !selectedMission?.specType && (
            <PopUpMainButton
              onClick={() => {
                if (soundEnabled) playFooterSound();
                handleCompleteMission();
              }}
            >
              {t("start")}
            </PopUpMainButton>
          )
        }
      />
    </Box>
  );
};

export default Missions;
