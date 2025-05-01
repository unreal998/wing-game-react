import { Box, Modal, Button, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { heightProportion } from "../../shared/utils";
import { StyledBox } from "./components/StyledBox";
import { StyledSHIB } from "./components/StyledSHIB";
import { StyledBoxMission } from "./components/StyledBoxMissions";
import { StyledSubscrible } from "./components/StyledSubscrible";
import { StyledTabMission } from "./components/StyledTabMission";

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

import { ModuleSevenEight } from "../Tutorial/components/ModuleSevenEight";
import { setCurrentModule } from "../Tutorial/slices";
import { selectIsTutorialFinished } from "../Tutorial/selectors";
import { MissionsData } from "./types";
import { updateBalanceAction } from "../Header/slices";

const Missions = () => {
  const loading = useSelector(selectMissionsLoading);
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [missionLoading, setMissionLoading] = useState(false);
  const isTutorialFinished = useSelector(selectIsTutorialFinished());
  const [selectedMission, setSelectedMission] = useState<MissionsData | null>(
    null,
  );

  const { t } = useTranslation();

  const missions = useSelector(selectMissionsData());

  const dispatch = useDispatch();
  const userData = useSelector(selectUserData());

  const missionTitles = useMemo(
    () => [
      { text: t("Daily missions"), type: "daily" },
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

  const handleMission = useCallback(() => {
    if (selectedMission?.isSuccess === true) return;
    if (selectedMission === null) return;
    if (selectedMission.specType) return;
    if (!userData) return;
    setMissionLoading((prev) => !prev);
    setTimeout(() => {
      setMissionLoading((prev) => !prev);
      setOpen((prev) => !prev);
      dispatch(
        completeMissionAction({
          uid: userData?.id,
          mission: selectedMission,
        }),
      );
    }, 3000);
  }, [selectedMission, userData, dispatch, setMissionLoading]);

  return (
    <Box
      onClick={(e) => {
        if (!isTutorialFinished) {
          e.stopPropagation();
          e.preventDefault();
          dispatch(setCurrentModule(8));
        }
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "5px 15px 0 15px",
        height: `${heightProportion}px`,
        gap: "15px",
        position: "relative",
        "& *": {
          pointerEvents: !isTutorialFinished ? "none" : "auto",
        },
      }}
    >
      <ModuleSevenEight />
      <LoaderComponent loading={loading} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NamedStyled>{t("Missions")}</NamedStyled>
      </Box>

      <TabContext value={activeTab.toString()}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <TabList
            sx={{
              display: "flex",
              minHeight: "0px",
              "& .MuiTabs-list": {
                gap: "10px",
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
            onChange={handleTabChange}
          >
            {missionTitles.map((mission, index) => (
              <StyledTabMission
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
              padding: 0,
            }}
            value={index.toString()}
            key={index}
          >
            <StyledBox
              height={`${wrapperHeight}px`}
              sx={{ "@media (max-height: 670px)": { height: "325px" } }}
            >
              {missions &&
                missions.map((mission, idx) => (
                  <StyledBoxMission
                    key={idx}
                    onClick={() => handleOpen(mission)}
                  >
                    <Box sx={{ padding: "10px 0px 10px 0px" }}>
                      <StyledSubscrible>{mission.title}</StyledSubscrible>
                      <StyledSHIB>
                        {mission.reward} {mission.coin}
                      </StyledSHIB>
                    </Box>
                  </StyledBoxMission>
                ))}
            </StyledBox>
          </TabPanel>
        ))}
      </TabContext>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <>
          <Box
            sx={{
              position: "relative",
              width: "70%",
              maxWidth: "500px",
              maxHeight: "70vh",
              overflowY: "auto",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedMission && (
              <>
                <Typography variant="h5" component="h2" gutterBottom>
                  {selectedMission.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedMission.description}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {selectedMission.type}
                </Typography>
                {!missionLoading && (
                  <Button variant="contained" onClick={() => handleMission()}>
                    {t("start")}
                  </Button>
                )}
              </>
            )}
          </Box>
        </>
      </Modal>
    </Box>
  );
};

export default Missions;
