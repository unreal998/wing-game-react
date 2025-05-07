import axios from "axios";
import { SERVER_URL } from "../../shared/constants";
import { UserData } from "../../shared/types";

export const fetchResetTutorial = async (uid: UserData["id"]) => {
  const response = await axios.put(`${SERVER_URL}/user/clean-tutor?uid=${uid}`);
  return response.data.data;
};
