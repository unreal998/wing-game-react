import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

export async function updateUserSettings(uid: string, settings: object) {
  const response = await axios.post(
    `${SERVER_URL}/user/settings?uid=${uid}`,
    settings,
  );
  return response.data;
}

export async function fetchGetRoadmap(lng: string) {
  const response = await axios.get(`${SERVER_URL}/roadmap?lng=${lng}`);
  return response.data;
}
