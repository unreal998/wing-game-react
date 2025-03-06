import { Box, Typography } from "@mui/material";
import React from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { heightProportion } from "../../shared/utils";
import { StyledBox } from "./components/StyledBox";
import Telegram from "../../assets/telegram.svg";
import Youtube from "../../assets/youtube.svg";
import { StyledSHIB } from "./components/StyledSHIB";
import { StyledBoxMission } from "./components/StyledBoxMissions";
import { StyledSubscrible } from "./components/StyledSubscrible";
import {
  missions,
  missionTitles,
} from "../../shared/components/missionComponent";
import { StyledBoxMissioHead } from "../referal/components/StyledBoxMissionHead";
import { StyledTypographyMissioHead } from "./components/StyledTypographyMissioHead";
import { StyledDailyMissions } from "./components/StyledDailyMissions";

const Missions = () => {
  return (
    <Box sx={{ padding: "5px 15px 0 15px", height: `${heightProportion}px` }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "24px", fontWeight: 700, paddingBottom: "8px" }}
        >
          Missions
        </Typography>

        <Box
          sx={{
            backgroundColor: MAIN_COLORS.referalBox,
            border: `1px solid  ${MAIN_COLORS.contentYellow}`,
            display: "flex",
            flexDirection: "column",
            borderRadius: "9px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              padding: "9px 45px 0px 45px",
            }}
          >
            234
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              padding: "0px 15px 9px 15px",
            }}
          >
            Your name coin
          </Typography>
        </Box>
      </Box>
      <StyledDailyMissions>
        {missionTitles.map((mission, index) => (
          <StyledBoxMissioHead key={index}>
            <StyledTypographyMissioHead sx={{ color: mission.color }}>
              {mission.text}
            </StyledTypographyMissioHead>
          </StyledBoxMissioHead>
        ))}
      </StyledDailyMissions>
      <StyledBox>
        {missions.map((mission, index) => (
          <StyledBoxMission key={index}>
            <img
              src={mission.img}
              alt="icon"
              style={{ padding: mission.padding }}
            />
            <Box sx={{ padding: mission.textPadding }}>
              <StyledSubscrible>
                Subscribe to Tron announcements
              </StyledSubscrible>
              <StyledSHIB>5,000 SHIB</StyledSHIB>
            </Box>
          </StyledBoxMission>
        ))}
      </StyledBox>
    </Box>
  );
};
export default Missions;
