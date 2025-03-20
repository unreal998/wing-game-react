import { all } from "redux-saga/effects";
import { watchHeaderActions } from "../modules/Header/sagas";

export function* rootSaga() {
  yield all([watchHeaderActions()]);
}
