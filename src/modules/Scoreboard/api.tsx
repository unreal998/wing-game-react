import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

export const fetchScoreData = async (uid: string) => {
  const responce = await axios.get(`${SERVER_URL}/scoreboard?uid=${uid}`, {
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  });
  return responce.data;
};
