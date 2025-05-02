import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

export type PowerButtonPressType = {
  uid: string;
  areaName: string;
};

export async function fetchPowerButtonPress(buttonData: PowerButtonPressType) {
  const request = await axios.post(
    `${SERVER_URL}/powerButtonPress?uid=${buttonData.uid}`,
    { areaName: buttonData.areaName },
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    },
  );
  return request.data.data;
}
