import { call, put, takeLatest } from "redux-saga/effects";
import { initAction, initActionFailure, initActionSuccess } from "./slices";
import { UserData, UserInitData } from "../../shared/types";
import { fetchInitData } from "./api";

function* handleInit(action: { type: string; payload: UserInitData }) {
  try {
    const userData: UserData = yield call(fetchInitData, action.payload);
    yield put(initActionSuccess(userData));
  } catch (err: any) {
    yield put(initActionFailure(err.toString()));
  }
}

export function* watchHeaderActions() {
  yield takeLatest(initAction.type, handleInit);
}
