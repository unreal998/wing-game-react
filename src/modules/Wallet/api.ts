import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

export const fetchCreateWallet = async (uid: string) => {
  const response = await axios.post(`${SERVER_URL}/wallet/create?uid=${uid}`);
  return response.data;
};

export const fetchWithdrawData = async (uid: string) => {
  const response = await axios.get(`${SERVER_URL}/withdraw?uid=${uid}`);
  return response.data.data;
};
