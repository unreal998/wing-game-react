import { all } from "redux-saga/effects";
import { watchHeaderActions } from "../modules/Header/sagas";
import { watchWalletActions } from "../modules/Wallet/sagas";

export function* rootSaga() {
  yield all([watchHeaderActions(), watchWalletActions()]);
}
