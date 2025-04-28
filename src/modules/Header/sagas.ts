import { call, put, takeLatest } from "redux-saga/effects";
import {
  initAction,
  initActionFailure,
  initActionSuccess,
  fetchCountriesActionSuccess,
} from "./slices";
import { County, UserData, UserInitData } from "../../shared/types";
import { fetchCountries, fetchInitData } from "./api";
import { createWalletActionSuccess } from "../Wallet/slices";

function* handleInit(action: { type: string; payload: UserInitData }) {
  try {
    const userData: UserData = yield call(fetchInitData, action.payload);

    yield put(initActionSuccess(userData));

    yield put(createWalletActionSuccess(userData.wallet));

    const countriesData: County[] = yield call(fetchCountries);
    yield put(fetchCountriesActionSuccess(countriesData));
  } catch (err: any) {
    yield put(initActionFailure(err.toString()));
  }
}

export function* watchHeaderActions() {
  yield takeLatest(initAction.type, handleInit);
}
