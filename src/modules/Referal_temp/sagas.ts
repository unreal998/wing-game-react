import { call, put, takeLatest } from "redux-saga/effects";
import {
  getReferalDataAction,
  getReferalDataActionFailure,
  getReferalDataActionSuccess,
} from "./slices";
import { fetchReferalsData } from "./api";
import { ReferalData } from "./types";

function* handleReferalData(action: { type: string; payload: string }) {
  try {
    const referalsDatas: ReferalData[] = yield call(
      fetchReferalsData,
      action.payload,
    );
    yield put(getReferalDataActionSuccess(referalsDatas));
  } catch (err: any) {
    yield put(getReferalDataActionFailure(err.toString()));
  }
}

export function* watchReferalActions() {
  yield takeLatest(getReferalDataAction.type, handleReferalData);
}
