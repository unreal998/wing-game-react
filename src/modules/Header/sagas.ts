import { call, put, takeLatest } from "redux-saga/effects";
import {
  initAction,
  initActionFailure,
  initActionSuccess,
  fetchCountriesActionSuccess,
  updateBalanceAction,
  updateBalanceActionSuccess,
  updateBalanceActionFailure,
} from "./slices";
import { County, UserData, UserInitData } from "../../shared/types";
import {
  fetchCountries,
  fetchInitData,
  fetchUserBalance,
  UserBalanceResponse,
} from "./api";
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

function* handleUpdateBalance(action: {
  type: string;
  payload: UserData["id"];
}) {
  try {
    const userBalance: UserBalanceResponse = yield call(
      fetchUserBalance,
      action.payload,
    );
    yield put(updateBalanceActionSuccess(userBalance));
  } catch (err: any) {
    yield put(updateBalanceActionFailure(err.toString()));
  }
}

export function* watchHeaderActions() {
  yield takeLatest(initAction.type, handleInit);
  yield takeLatest(updateBalanceAction.type, handleUpdateBalance);
}
