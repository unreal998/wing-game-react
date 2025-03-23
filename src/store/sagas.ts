import { all } from "redux-saga/effects";
import { watchHeaderActions } from "../modules/Header/sagas";
import { watchWalletActions } from "../modules/Wallet/sagas";
import { watchHomeScreenActions } from "../modules/Home/sagas";
import { watchShopScreenActions } from "../modules/Shop/sagas";
import { watchReferalActions } from "../modules/Referal_temp/sagas";

export function* rootSaga() {
  yield all([
    watchHeaderActions(),
    watchWalletActions(),
    watchHomeScreenActions(),
    watchShopScreenActions(),
    watchReferalActions(),
  ]);
}
