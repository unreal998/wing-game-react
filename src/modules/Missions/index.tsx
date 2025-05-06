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
import { ModuleSevenEight } from "../Tutorial/components/ModuleSevenEight";
import { selectCurrentModule } from "../Tutorial/selectors";
import { setCurrentModule } from "../Tutorial/slices";
import { ModalComponent } from "../../shared/components/ModalComponent";
import { PopUpMainButton } from "../../shared/components/PopUpMainButton";

const Missions = () => {
  const loading = useSelector(selectMissionsLoading);
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<MissionsData | null>(
    null,
  );
  const missionTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  const { t } = useTranslation();
  const currentModule = useSelector(selectCurrentModule());
  const missions = useSelector(selectMissionsData()) as MissionsData[];
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData());

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

  const handleCompleteMission = useCallback(() => {
    if (
      !selectedMission ||
      !userData ||
      missionTimeoutRef.current !== undefined
    )
      return;
    missionTimeoutRef.current = setTimeout(() => {
      dispatch(
        completeMissionAction({ mission: selectedMission, uid: userData.id }),
      );
      setOpen(false);
      missionTimeoutRef.current = undefined;
    }, 5000);

    const url = extractUrl(selectedMission?.description || "");
    if (url) {
      window.open(url, "_blank");
    }
  }, [selectedMission, userData, missionTimeoutRef, dispatch]);

  return (
    <>
      {(currentModule === 7 || currentModule === 8) && (
        <Box
          onClick={() => {
            dispatch(setCurrentModule(8));
          }}
          width={"100vw"}
          height={"120vh"}
          position={"absolute"}
          zIndex={99}
          bgcolor={`rgba(0, 0, 0, 0.3)`}
          top={"-1vh"}
          sx={{ transition: "all 0.2s ease" }}
        >
          <ModuleSevenEight />
        </Box>
      )}
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
                        if (!mission.isSuccess) {
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
                          <StyledSubscrible>{mission.title}</StyledSubscrible>
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
                      {mission.isSuccess ? (
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
                      ) : (
                        <ButtonMissions>Go</ButtonMissions>
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
          title={selectedMission?.title || ""}
          subtitle={selectedMission?.description || ""}
          additionalbutton={
            <PopUpMainButton onClick={handleCompleteMission}>
              {t("start")}
            </PopUpMainButton>
          }
        />
      </Box>
    </>
  );
};

export default Missions;
