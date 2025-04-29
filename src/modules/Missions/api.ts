import axios from "axios";
import { SERVER_URL } from "../../shared/constants";
import {
  CompleteMissionRequestType,
  MissionByTypeRequestType,
  MissionsData,
} from "./types";

export const fetchMissionsData = async (
  missionData: MissionByTypeRequestType,
) => {
  const response = await axios.get(
    `${SERVER_URL}/missions?type=${missionData.type}&uid=${missionData.uid}`,
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
  );
  return response.data;
};
