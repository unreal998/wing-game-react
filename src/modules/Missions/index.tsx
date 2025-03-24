import { Box, Checkbox } from "@mui/material";
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
import { getMissionsDataAction } from "./slices";
import { selectUserData } from "../Header/selectors";

const Missions = () => {
  const [activeTab, setActiveTab] = useState(0);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NamedStyled>{t("Missions")}</NamedStyled>

        <InfoBox value={"234"} subtitle={t("TURX")} />
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
                  <StyledBoxMission key={idx}>
                    <Checkbox
                      disabled
                      checked={false}
                      style={{ padding: "10px" }}
                    />
                    <Box sx={{ padding: "10px 0px 10px 0px" }}>
                      <StyledSubscrible>
                        {t("Subscribe to Tron announcements")}
                      </StyledSubscrible>
                      <StyledSHIB>5,000 SHIB</StyledSHIB>
                    </Box>
                  </StyledBoxMission>
                ))}
            </StyledBox>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};
export default Missions;
