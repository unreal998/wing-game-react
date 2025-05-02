import axios from "axios";
import { SERVER_URL } from "../../shared/constants";
import { BuyItemType } from "./types";

export async function fetchShopData(areaName: string) {
  const request = await axios.get(`${SERVER_URL}/modifier?area=${areaName}`, {
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  });
  return request.data.data.values;
}

export async function fetchBuyItem(buyItemData: BuyItemType) {
  const request = await axios.post(`${SERVER_URL}/modifier/buy`, buyItemData, {
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  });
  return request.data.data;
}
