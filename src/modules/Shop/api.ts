import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

export async function fetchShopData(areaName: string) {
  const request = await axios.get(`${SERVER_URL}/modifier?area=${areaName}`);
  return request.data.data.values;
}
