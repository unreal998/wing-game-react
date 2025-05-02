import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

export const fetchCreateWallet = async (uid: string) => {
  const response = await axios.post(`${SERVER_URL}/wallet/create?uid=${uid}`, {
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  });
  return response.data;
};

export const fetchWithdrawData = async (uid: string) => {
  const response = await axios.get(`${SERVER_URL}/withdraw?uid=${uid}`, {
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  });
  return response.data.data;
};

export const sendWithdrawRequest = async (
  uid: string,
  wallet: string,
  amount: string,
  tonMemo: string,
) => {
  const tid = "123456789";
  const response = await axios.post(
    `${SERVER_URL}/withdraw`,
    {
      uid,
      wallet,
      sum: parseFloat(amount),
      MEMO: tonMemo,
      status: "new",
      tid,
    },
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    },
  );

  return response.data;
};
