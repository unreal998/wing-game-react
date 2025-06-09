import axios from "axios";
import { SERVER_URL } from "../../shared/constants";
import { CompleteMissionRequestType, MissionByTypeRequestType } from "./types";

export const fetchMissionsData = async (
  missionData: MissionByTypeRequestType,
) => {
  const response = await axios.get(
    `${SERVER_URL}/missions?type=${missionData.type}&uid=${missionData.uid}`,
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    },
  );
  return response.data.missionsData;
};

export const fetchCompleteMission = async ({
  uid,
  mission,
}: CompleteMissionRequestType) => {
  const response = await axios.post(
    `${SERVER_URL}/missions/complete?uid=${uid}`,
    mission,
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    },
  );
  return response.data;
};

export const fetchGetRewardMission = async ({
  uid,
  mission,
}: CompleteMissionRequestType) => {
  const response = await axios.post(
    `${SERVER_URL}/missions/reward?uid=${uid}`,
    mission,
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    },
  );
  return response.data;
};
