import { call, put, takeLatest } from "redux-saga/effects";
import { powerButtonPressed, setSelectedCountry } from "./slices";
import { fetchPowerButtonPress, PowerButtonPressType } from "./api";
import { UserData } from "../../shared/types";
import { initActionFailure, initActionSuccess } from "../Header/slices";

function* handlePushButtonPress(action: {
  type: string;
  payload: PowerButtonPressType;
}) {
  try {
    const userData: UserData = yield call(
      fetchPowerButtonPress,
      action.payload,
    );
    yield put(initActionSuccess(userData));
    const selectedCountry = userData.areas.find(
      (area) => area.name === action.payload.areaName,
    );
    if (selectedCountry) {
      yield put(setSelectedCountry(selectedCountry));
    }
  } catch (err: any) {
    yield put(initActionFailure(err.toString()));
  }
}

export function* watchHomeScreenActions() {
  yield takeLatest(powerButtonPressed.type, handlePushButtonPress);
}
