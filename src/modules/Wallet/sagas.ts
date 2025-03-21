import { call, put, takeLatest } from "redux-saga/effects";
import {
  createWalletAction,
  createWalletActionFailure,
  createWalletActionSuccess,
} from "./slices";
import { fetchCreateWallet } from "./api";

function* handleCreateWallet(action: { type: string; payload: string }) {
  try {
    const walletNumber: string = yield call(fetchCreateWallet, action.payload);
    yield put(createWalletActionSuccess(walletNumber));
  } catch (err: any) {
    yield put(createWalletActionFailure(err.toString()));
  }
}

export function* watchWalletActions() {
  yield takeLatest(createWalletAction.type, handleCreateWallet);
}
