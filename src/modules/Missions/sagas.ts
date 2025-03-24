import { call, put, takeLatest } from "redux-saga/effects";
import {
  getMissionsDataAction,
  getMissionsDataActionFailure,
  getMissionsDataActionSuccess,
} from "./slices";
import { fetchMissionsData } from "./api";
import { MissionsData, MissionByTypeRequestType } from "./types";

function* handleMissionsData(action: {
  type: string;
  payload: MissionByTypeRequestType;
}) {
  try {
    const referalsDatas: MissionsData[] = yield call(
      fetchMissionsData,
      action.payload,
    );
    yield put(getMissionsDataActionSuccess(referalsDatas));
  } catch (err: any) {
    yield put(getMissionsDataActionFailure(err.toString()));
  }
}

export function* watchMissionsActions() {
  yield takeLatest(getMissionsDataAction.type, handleMissionsData);
}
