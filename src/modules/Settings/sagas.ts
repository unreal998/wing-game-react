import { call, put, takeLatest } from "redux-saga/effects";
import {
  restartTutorialRequest,
  restartTutorialSuccess,
  restartTutorialFailure,
} from "./slices";
import { fetchCleanTutorial } from "./api";

function* handleRestartTutorial(action: { type: string; payload: string }) {
  try {
    yield call(fetchCleanTutorial, action.payload);
    yield put(restartTutorialSuccess());
  } catch (err: any) {
    yield put(restartTutorialFailure(err.toString()));
  }
}

export function* watchTutorialSaga() {
  yield takeLatest(restartTutorialRequest.type, handleRestartTutorial);
}
