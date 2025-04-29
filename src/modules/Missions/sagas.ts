import { call, put, takeLatest } from "redux-saga/effects";
import {
  completeMissionAction,
  completeMissionActionFailure,
  completeMissionActionSuccess,
  getMissionsDataAction,
  getMissionsDataActionFailure,
  getMissionsDataActionSuccess,
} from "./slices";
import { fetchCompleteMission, fetchMissionsData } from "./api";
import { MissionsData, MissionByTypeRequestType } from "./types";
import { UserData } from "../../shared/types";
import { initActionSuccess } from "../Header/slices";

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

function* handleCompleteMission(action: {
  type: string;
  payload: {
    uid: string;
    mission: MissionsData;
  };
}) {
  try {
    const updatedUser: UserData = yield call(
      fetchCompleteMission,
      action.payload,
    );
    yield put(initActionSuccess(updatedUser));
    const updatedMissions: MissionsData[] = yield call(fetchMissionsData, {
      uid: action.payload.uid,
      type: action.payload.mission.type,
    });
    yield put(completeMissionActionSuccess(updatedMissions));
  } catch (err: any) {
    yield put(completeMissionActionFailure(err.toString()));
  }
}

export function* watchMissionsActions() {
  yield takeLatest(getMissionsDataAction.type, handleMissionsData);
  yield takeLatest(completeMissionAction.type, handleCompleteMission);
}
