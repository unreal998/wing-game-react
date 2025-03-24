import axios from "axios";
import { SERVER_URL } from "../../shared/constants";
import { MissionByTypeRequestType } from "./types";

export const fetchMissionsData = async (
  missionData: MissionByTypeRequestType,
) => {
  const response = await axios.get(
    `${SERVER_URL}/missions?type=${missionData.type}&uid=${missionData.uid}`,
  );
  return response.data.missionsData;
};
