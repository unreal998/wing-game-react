import { call, put, takeLatest } from "redux-saga/effects";
import {
  initAction,
  initActionFailure,
  initActionSuccess,
  fetchCountriesActionSuccess,
  updateBalanceAction,
  updateBalanceActionSuccess,
  updateBalanceActionFailure,
  updateUserSettingsAction,
  updateUserSettingsActionSuccess,
  updateUserSettingsActionFailure,
  updateIncomeDataActionSuccess,
  getIncomeDataAction,
  updateDailyMissionsAction,
  updateDailyMissionsActionSuccess,
  updateDailyMissionsActionFailure,
  getIncomeDataFailure,
} from "./slices";
import {
  County,
  IncomeDataType,
  UserData,
  UserInitData,
} from "../../shared/types";
import {
  fetchCountries,
  fetchInitData,
  fetchUserBalance,
  fetchUserIncome,
  updateUserSettingsApi,
  UserBalanceResponse,
} from "./api";
import { createWalletActionSuccess } from "../Wallet/slices";
import { fetchCreateWallet } from "../Wallet/api";

function* handleInit(action: { type: string; payload: UserInitData }) {
  try {
    const userData: UserData = yield call(fetchInitData, action.payload);

    yield put(initActionSuccess(userData));

    if (!userData.wallet) {
      const walletNumber: string = yield call(fetchCreateWallet, userData.id);
      yield put(createWalletActionSuccess(walletNumber));
    } else {
      yield put(createWalletActionSuccess(userData.wallet));
    }

    const countriesData: County[] = yield call(fetchCountries);
    yield put(fetchCountriesActionSuccess(countriesData));
  } catch (err: any) {
    console.log("INIT ERROR:", err.toString());
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

function* handleUpdateUserSettings(action: { type: string; payload: any }) {
  try {
    yield call(
      updateUserSettingsApi,
      action.payload.uid,
      action.payload.settings,
    );
    yield put(updateUserSettingsActionSuccess());
  } catch (err: any) {
    yield put(updateUserSettingsActionFailure(err.toString()));
  }
}

function* handleGetIncomeData(action: { type: string; payload: any }) {
  try {
    const incomeData: IncomeDataType = yield call(
      fetchUserIncome,
      action.payload.uid,
      action.payload.country,
    );

    yield put(updateIncomeDataActionSuccess(incomeData));
  } catch (err: any) {
    yield put(getIncomeDataFailure(err.toString()));
  }
}

function* handleUpdateDailyMissions() {
  try {
    yield put(updateDailyMissionsActionSuccess());
  } catch (err: any) {
    yield put(updateDailyMissionsActionFailure(err.toString()));
  }
}

export function* watchHeaderActions() {
  yield takeLatest(initAction.type, handleInit);
  yield takeLatest(updateBalanceAction.type, handleUpdateBalance);
  yield takeLatest(updateUserSettingsAction.type, handleUpdateUserSettings);
  yield takeLatest(getIncomeDataAction.type, handleGetIncomeData);
  yield takeLatest(updateDailyMissionsAction.type, handleUpdateDailyMissions);
}
