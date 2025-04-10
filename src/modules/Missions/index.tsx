import { Box, Checkbox, Modal, Button, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useEffect, useMemo, useState } from "react";
import { heightProportion } from "../../shared/utils";
import { StyledBox } from "./components/StyledBox";
import { StyledSHIB } from "./components/StyledSHIB";
import { StyledBoxMission } from "./components/StyledBoxMissions";
import { StyledSubscrible } from "./components/StyledSubscrible";
import { InfoBox } from "../../shared/components/InfoBox";
import { StyledTabMission } from "./components/StyledTabMission";

import { useTranslation } from "react-i18next";
import { NamedStyled } from "../../shared/components/NameStyled";
import { useDispatch, useSelector } from "react-redux";
import { selectMissionsData } from "./selectors";
import { getMissionsDataAction, selectMissionsLoading } from "./slices";
import { selectUserData } from "../Header/selectors";
import LoaderComponent from "../../shared/components/LoaderComponent";

type MissionType = {
  title: string;
  description: string;
  type: string;
  reward: string;
  coin: string;
  img: string;
};

const Missions = () => {
  const loading = useSelector(selectMissionsLoading);
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<MissionType | null>(
    null,
  );

  const { t } = useTranslation();

  const missions = useSelector(
    selectMissionsData(),
  ) as unknown as MissionType[];

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

  const handleOpen = (mission: MissionType) => {
    setSelectedMission(mission);
    setOpen(true);
  };

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
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
                    <img
                      src={mission.img !== null ? mission.img : ""}
                      style={{ width: "26px", height: "26px" }}
                      alt="mission image"
                    />
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
                <Button variant="contained" onClick={() => setOpen(false)}>
                  {t("start")}
                </Button>
              </>
            )}
          </Box>
        </>
      </Modal>
    </Box>
  );
};

export default Missions;
