import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

export const fetchReferalsData = async (uid: string) => {
  const response = await axios.get(`${SERVER_URL}/referal?uid=${uid}`, {
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  });
  return response.data;
};

export const fetchBuyCountryData = async (uid: string, countryName: string) => {
  const response = await axios.post(
    `${SERVER_URL}/user/buyCountry`,
    {
      uid,
      countryName,
    },
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    },
  );

  return response.data.data;
};
