import { all } from "redux-saga/effects";
import { watchHeaderActions } from "../modules/Header/sagas";
import { watchWalletActions } from "../modules/Wallet/sagas";
import { watchHomeScreenActions } from "../modules/Home/sagas";

export function* rootSaga() {
  yield all([
    watchHeaderActions(),
    watchWalletActions(),
    watchHomeScreenActions(),
  ]);
}
