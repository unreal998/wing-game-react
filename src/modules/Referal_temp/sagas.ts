import { call, put, takeLatest } from "redux-saga/effects";
import {
  buyCountry,
  buyCountryFailure,
  buyCountrySuccess,
  getReferalDataAction,
  getReferalDataActionFailure,
  getReferalDataActionSuccess,
  getSubReferalData,
  getSubReferalDataFailure,
  getSubReferalDataSuccess,
} from "./slices";
import { fetchBuyCountryData, fetchReferalsData } from "./api";
import { ReferalData } from "./types";
import { UserData } from "../../shared/types";
import { initActionSuccess } from "../Header/slices";

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
    const updatedUserData: UserData = yield call(
      fetchBuyCountryData,
      action.payload.uid,
      action.payload.countryName,
    );
    yield put(initActionSuccess(updatedUserData));
    yield put(buyCountrySuccess());
  } catch (err: any) {
    yield put(buyCountryFailure(err.toString()));
  }
}

function* handleGetSubReferalData(action: { type: string; payload: string }) {
  try {
    const referalsDatas: ReferalData[] = yield call(
      fetchReferalsData,
      action.payload,
    );
    yield put(getSubReferalDataSuccess(referalsDatas));
  } catch (err: any) {
    yield put(getSubReferalDataFailure(err.toString()));
  }
}

export function* watchReferalActions() {
  yield takeLatest(getReferalDataAction.type, handleReferalData);
  yield takeLatest(buyCountry.type, handleBuyCountryData);
  yield takeLatest(getSubReferalData.type, handleGetSubReferalData);
}
