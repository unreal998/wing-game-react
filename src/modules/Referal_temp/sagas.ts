import { call, put, takeLatest } from "redux-saga/effects";
import {
  buyCountry,
  buyCountryFailure,
  buyCountrySuccess,
  getReferalDataAction,
  getReferalDataActionFailure,
  getReferalDataActionSuccess,
  getReferalChildrenAction,
  getReferalChildrenActionFailure,
  getReferalChildrenActionSuccess,
  setLoadingByParent,
  getUserReferalDataActionFailure,
  getUserReferalDataActionSuccess,
  getUserReferalDataAction,
} from "./slices";
import {
  fetchBuyCountryData,
  fetchReferalsData,
  fetchUserReferalCountData,
} from "./api";
import { ReferalData, ReferalsByLevelResponse } from "./types";
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

function* handleGetChildren(action: {
  type: string;
  payload: string | number;
}) {
  const tid = String(action.payload);
  try {
    yield put(setLoadingByParent({ tid, value: true }));
    const referalsDatas: ReferalData[] = yield call(fetchReferalsData, tid);
    yield put(
      getReferalChildrenActionSuccess({ tid, children: referalsDatas }),
    );
  } catch (err: any) {
    yield put(getReferalChildrenActionFailure({ tid, error: err.toString() }));
  } finally {
    yield put(setLoadingByParent({ tid, value: false }));
  }
}

function* handleGetUserReferalData(action: { type: string; payload: string }) {
  try {
    const referalsDatas: ReferalsByLevelResponse = yield call(
      fetchUserReferalCountData,
      action.payload,
    );
    yield put(getUserReferalDataActionSuccess(referalsDatas));
  } catch (err: any) {
    yield put(getUserReferalDataActionFailure(err.toString()));
  }
}

export function* watchReferalActions() {
  yield takeLatest(getReferalDataAction.type, handleReferalData);
  yield takeLatest(buyCountry.type, handleBuyCountryData);
  yield takeLatest(getReferalChildrenAction.type, handleGetChildren);
  yield takeLatest(getUserReferalDataAction.type, handleGetUserReferalData);
}
