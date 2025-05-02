import { Box, Modal, Button, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useEffect, useMemo, useState } from "react";
import { heightProportion } from "../../shared/utils";
import { StyledBox } from "./components/StyledBox";
import { StyledSHIB } from "./components/StyledSHIB";
import { StyledBoxMission } from "./components/StyledBoxMissions";
import { StyledSubscrible } from "./components/StyledSubscrible";
import { useTranslation } from "react-i18next";
import { NamedStyled } from "../../shared/components/NameStyled";
import { useDispatch, useSelector } from "react-redux";
import { selectMissionsData } from "./selectors";
import { getMissionsDataAction, selectMissionsLoading } from "./slices";
import { selectUserData } from "../Header/selectors";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { ButtonMissions } from "./components/ButtonMissions";
import { StyledTab } from "../../shared/components/StyledTab";
import { MissionsData } from "./types";
import { MAIN_COLORS } from "../../shared/colors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { updateBalanceAction } from "../Header/slices";
import Flash from "../../assets/flash.svg";
import { GameButtonComponent } from "../../shared/components/GameButtonComponent";

const Missions = () => {
  const loading = useSelector(selectMissionsLoading);
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<MissionsData | null>(
    null,
  );

  const { t } = useTranslation();

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
              />
            ))}
          </TabList>
        </Box>
        {missionTitles.map((_, index) => (
          <TabPanel
            sx={{
              padding: "8px 20px 8px 8px",
              backgroundColor: "rgba(8, 32, 47, 1)",
              borderRadius: "12px",
              height: `${wrapperHeight - 30}px`,
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: MAIN_COLORS.mainGreen,
                borderRadius: "8px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: MAIN_COLORS.mainGreen,
              },
              scrollbarWidth: "thin",
              scrollbarColor: `${MAIN_COLORS.mainGreen} transparent`,
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
                          + {mission.reward}{" "}
                          <span style={{ color: "#C6C6C8" }}>
                            {mission.coin}
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
                          sx={{ color: MAIN_COLORS.textColor, fontWeight: 600 }}
                        >
                          Done
                        </Typography>
                        <CheckCircleOutlineIcon
                          sx={{ color: MAIN_COLORS.activeTabColor }}
                        />
                      </Box>
                    ) : (
                      <ButtonMissions>Go</ButtonMissions>
                    )}
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
              width: "90%",
              maxWidth: "500px",
              maxHeight: "70vh",
              overflowX: "hidden",
              overflowY: "auto",
              bgcolor: MAIN_COLORS.appBG,
              boxShadow: 24,
              p: "8px",
              borderRadius: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: MAIN_COLORS.sectionBG,
                padding: "24px 30px",
                borderRadius: "12px",
                gap: "10px",
              }}
            >
              {selectedMission && (
                <>
                  <Typography
                    textAlign="center"
                    color="white"
                    variant="h5"
                    component="h2"
                    gutterBottom
                  >
                    {selectedMission.title}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      lineBreak: "anywhere",
                      color: "white",
                    }}
                    variant="body1"
                    gutterBottom
                  >
                    {selectedMission.description}
                  </Typography>
                  <Button
                    sx={{
                      border: `1px solid ${MAIN_COLORS.mainGreen}`,
                      color: "white",
                      backgroundColor: `${MAIN_COLORS.blockBG}`,
                      padding: "10px 20px",
                    }}
                    onClick={() => setOpen(false)}
                  >
                    {t("start")}
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </>
      </Modal>
    </Box>
  );
};

export default Missions;
