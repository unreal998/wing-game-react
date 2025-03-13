import { Box } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useMemo, useState } from "react";
import { heightProportion } from "../../shared/utils";
import { StyledBox } from "./components/StyledBox";
import { StyledSHIB } from "./components/StyledSHIB";
import { StyledBoxMission } from "./components/StyledBoxMissions";
import { StyledSubscrible } from "./components/StyledSubscrible";
import { missions } from "../../shared/mocks/missionComponentMocks";
import { InfoBox } from "../../shared/components/InfoBox";
import { StyledTabMission } from "./components/StyledTabMission";

import { useTranslation } from "react-i18next";
import { NamedStyled } from "../../shared/components/NameStyled";

const Missions = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  const missionTitles = [
    { text: t("Daily missions") },
    { text: t("Daily bonus") },
    { text: t("Quests") },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const wrapperHeight = useMemo(() => {
    return heightProportion - 170;
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

        <InfoBox value={"234"} subtitle={t("Your name coin")} />
      </Box>

      <TabContext value={value.toString()}>
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
            <StyledBox height={`${wrapperHeight}px`}>
              {missions.map((mission, idx) => (
                <StyledBoxMission key={idx}>
                  <img
                    src={mission.img}
                    alt="icon"
                    style={{ padding: mission.padding }}
                  />
                  <Box sx={{ padding: mission.textPadding }}>
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
