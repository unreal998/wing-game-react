import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

export const fetchCreateWallet = async (uid: string) => {
  const response = await axios.post(`${SERVER_URL}/wallet/create?uid=${uid}`);
  return response.data;
};
