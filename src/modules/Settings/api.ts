import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

export async function updateUserSettings(uid: string, settings: object) {
  const response = await axios.post(
    `${SERVER_URL}/user/settings?uid=${uid}`,
    settings,
  );
  return response.data;
}
