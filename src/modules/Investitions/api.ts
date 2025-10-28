import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

export const fetchInvestitionsData = async (
  tid: number,
  selectedCountry: string,
) => {
  const response = await axios.get(
    `${SERVER_URL}/investitions?tid=${tid}&selectedCountry=${selectedCountry}`,
  );
  return response.data;
};
