import axios from "axios";
import { SERVER_URL } from "../../shared/constants";
import { UserInitData } from "../../shared/types";

export type UserBalanceResponse = {
  id: string;
  TONBalance: number;
  WindBalance: number;
  withdrawLimit: number;
};

export const fetchUserBalance = async (uid: string) => {
  const response = await axios.get(`${SERVER_URL}/user/balance?uid=${uid}`, {
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  });
  return response.data.data;
};

export const fetchUserIncome = async (uid: string, country: string) => {
  const response = await axios.get(
    `${SERVER_URL}/user/income?uid=${uid}&country=${country}`,
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    },
  );
  return response.data;
};

export const fetchInitData = async (userData: UserInitData) => {
  const response = await axios.post(`${SERVER_URL}/init`, userData, {
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  });

  return response.data;
};

export const fetchCountries = async () => {
  const response = await axios.get(`${SERVER_URL}/countries`, {
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  });
  return response.data;
};

export const updateUserSettingsApi = async (uid: any, userSettings: any) => {
  const response = await axios.post(
    `${SERVER_URL}/user/settings?uid=${uid}`,
    userSettings,
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    },
  );
  return response.data;
};
