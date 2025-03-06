import { Box, Typography } from "@mui/material";
import React from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { heightProportion } from "../../shared/utils";

const Missions = () => {
  return (
    <Box sx={{ padding: "15px 15px 0 15px", height: `${heightProportion}px` }}>
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
      <Box
        sx={{ display: "flex", width: "100%", paddingTop: "10px", gap: "8px" }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: MAIN_COLORS.dailyBorder,
            borderRadius: "5px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              paddingTop: "10px",
              paddingBottom: "10px",
              color: MAIN_COLORS.contentYellow,
            }}
          >
            Daily missions
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: MAIN_COLORS.dailyBorder,
            borderRadius: "5px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              paddingTop: "10px",
              paddingBottom: "10px",
              color: MAIN_COLORS.textColor,
            }}
          >
            Daily bonus
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: MAIN_COLORS.dailyBorder,
            borderRadius: "5px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              paddingTop: "10px",
              paddingBottom: "10px",
              color: MAIN_COLORS.textColor,
            }}
          >
            Quests
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Missions;
