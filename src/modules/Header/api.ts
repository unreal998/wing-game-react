import axios from "axios";
import { SERVER_URL } from "../../shared/constants";
import { UserInitData } from "../../shared/types";

export type UserBalanceResponse = {
  id: string;
  TONBalance: number;
  WindBalance: number;
};

export const fetchUserBalance = async (uid: string) => {
  const response = await axios.get(`${SERVER_URL}/user/balance?uid=${uid}`);
  return response.data.data;
};

export const fetchInitData = async (userData: UserInitData) => {
  const response = await axios.post(`${SERVER_URL}/init`, userData);
  return response.data;
};

export const fetchCountries = async () => {
  const response = await axios.get(`${SERVER_URL}/countries`);
  return response.data;
};
