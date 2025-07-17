import { call, put, takeLatest } from "redux-saga/effects";
import {
  createWalletAction,
  createWalletActionFailure,
  createWalletActionSuccess,
  getHistoryAction,
  getHistoryActionFailure,
  getHistorySuccess,
  sendWithdrawRequestAction,
  sendWithdrawRequestSuccess,
  sendWithdrawRequestFailure,
} from "./slices";
import {
  fetchCreateWallet,
  fetchHistoryData,
  sendWithdrawRequest,
} from "./api";
import { HistoryType } from "../../shared/types";

function* handleCreateWallet(action: { type: string; payload: string }) {
  try {
    const walletNumber: string = yield call(fetchCreateWallet, action.payload);
    yield put(createWalletActionSuccess(walletNumber));
  } catch (err: any) {
    yield put(createWalletActionFailure(err.toString()));
  }
}

function* handleGetHistoryData(action: { type: string; payload: string }) {
  try {
    const historyData: HistoryType[] = yield call(
      fetchHistoryData,
      action.payload,
    );
    yield put(getHistorySuccess(historyData));
  } catch (err: any) {
    yield put(getHistoryActionFailure(err.toString()));
  }
}

function* handleSendWithdrawRequest(action: {
  type: string;
  payload: {
    uid: string;
    wallet: string;
    amount: string;
    tonMemo: string;
    tid: string;
  };
}) {
  try {
    const { uid, wallet, amount, tonMemo, tid } = action.payload;
    yield call(sendWithdrawRequest, uid, wallet, amount, tonMemo, tid); // ⬅️ передаємо
    yield put(sendWithdrawRequestSuccess());
    yield put(getHistoryAction(uid));
  } catch (err: any) {
    yield put(sendWithdrawRequestFailure(err.toString()));
  }
}

export function* watchWalletActions() {
  yield takeLatest(createWalletAction.type, handleCreateWallet);
  yield takeLatest(getHistoryAction.type, handleGetHistoryData);
  yield takeLatest(sendWithdrawRequestAction.type, handleSendWithdrawRequest);
}
