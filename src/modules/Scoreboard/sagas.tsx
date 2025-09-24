import { call, put, takeLatest } from "redux-saga/effects";
import {
  getScoreDataAction,
  getScoreDataActionFailure,
  getScoreDataActionSuccess,
} from "./slice";
import { ScoreType } from "./types";
import { fetchScoreData } from "./api";

function* handleGetScoreData(action: { type: string; payload: string }) {
  try {
    const response: ScoreType[] = yield call(fetchScoreData, action.payload);
    yield put(getScoreDataActionSuccess(response));
  } catch (err: any) {
    yield put(getScoreDataActionFailure(err.toString()));
  }
}

export function* watchScoreboardSagas() {
  yield takeLatest(getScoreDataAction.type, handleGetScoreData);
}
