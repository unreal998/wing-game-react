import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

export async function fetchCleanTutorial(uid: string) {
  const response = await axios.put(`${SERVER_URL}/user/clean-tutor?uid=${uid}`);
  return response.data.data;
}
