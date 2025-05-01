import { call, put, takeLatest } from "redux-saga/effects";
import {
  createWalletAction,
  createWalletActionFailure,
  createWalletActionSuccess,
  getWithdrawAction,
  getWithdrawActionFailure,
  getWithdrawActionSuccess,
  sendWithdrawRequestAction,
  sendWithdrawRequestSuccess,
  sendWithdrawRequestFailure,
} from "./slices";
import {
  fetchCreateWallet,
  fetchWithdrawData,
  sendWithdrawRequest,
} from "./api";
import { Withdraw } from "../../shared/types";

function* handleCreateWallet(action: { type: string; payload: string }) {
  try {
    const walletNumber: string = yield call(fetchCreateWallet, action.payload);
    yield put(createWalletActionSuccess(walletNumber));
  } catch (err: any) {
    yield put(createWalletActionFailure(err.toString()));
  }
}

function* handleGetWithdrawData(action: { type: string; payload: string }) {
  try {
    console.log("handleGetWithdrawData ACTION:", action);
    const withdrawData: Withdraw[] = yield call(
      fetchWithdrawData,
      action.payload,
    );
    yield put(getWithdrawActionSuccess(withdrawData));
  } catch (err: any) {
    yield put(getWithdrawActionFailure(err.toString()));
  }
}

function* handleSendWithdrawRequest(action: {
  type: string;
  payload: { uid: string; wallet: string; amount: string; tonMemo: string };
}) {
  try {
    const { uid, wallet, amount, tonMemo } = action.payload;
    yield call(sendWithdrawRequest, uid, wallet, amount, tonMemo);
    yield put(sendWithdrawRequestSuccess());
    yield put(getWithdrawAction(uid));
  } catch (err: any) {
    yield put(sendWithdrawRequestFailure(err.toString()));
  }
}

export function* watchWalletActions() {
  yield takeLatest(createWalletAction.type, handleCreateWallet);
  yield takeLatest(getWithdrawAction.type, handleGetWithdrawData);
  yield takeLatest(sendWithdrawRequestAction.type, handleSendWithdrawRequest);
}
