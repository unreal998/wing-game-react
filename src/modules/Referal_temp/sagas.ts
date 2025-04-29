import { call, put, takeLatest } from "redux-saga/effects";
import {
  buyCountry,
  getReferalDataAction,
  getReferalDataActionFailure,
  getReferalDataActionSuccess,
} from "./slices";
import { fetchBuyCountryData, fetchReferalsData } from "./api";
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

function* handleBuyCountryData(action: {
  type: string;
  payload: { uid: string; countryName: string };
}) {
  try {
    yield call(
      fetchBuyCountryData,
      action.payload.uid,
      action.payload.countryName,
    );
  } catch (err: any) {
    yield put(getReferalDataActionFailure(err.toString()));
  }
}

export function* watchReferalActions() {
  yield takeLatest(getReferalDataAction.type, handleReferalData);
  yield takeLatest(buyCountry.type, handleBuyCountryData);
}
