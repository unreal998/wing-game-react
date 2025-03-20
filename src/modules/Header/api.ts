import axios from "axios";
import { SERVER_URL } from "../../shared/constants";
import { UserInitData } from "../../shared/types";

export const fetchInitData = async (userData: UserInitData) => {
  const response = await axios.post(`${SERVER_URL}/init`, userData);
  return response.data;
};
