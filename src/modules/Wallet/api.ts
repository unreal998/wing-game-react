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

export const sendWithdrawRequest = async (
  uid: string,
  wallet: string,
  amount: string,
  tonMemo: string,
  tid: string,
) => {
  const response = await axios.post(`${SERVER_URL}/withdraw`, {
    uid,
    wallet,
    sum: parseFloat(amount),
    MEMO: tonMemo,
    status: "new",
    tid,
  });

  return response.data;
};
