import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

export const fetchReferalsData = async (uid: string) => {
  const response = await axios.get(`${SERVER_URL}/referal?uid=${uid}`);
  return response.data;
};
