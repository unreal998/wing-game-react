import { call, put, takeLatest } from "redux-saga/effects";
import {
  getShopDataByArea,
  getShopDataByAreaSuccess,
  getShopDataByAreaFailure,
} from "./slices";
import { fetchShopData } from "./api";
import { ShopValues } from "./types";

function* handleShopScreenAction(action: { type: string; payload: string }) {
  try {
    const shopValues: ShopValues[] = yield call(fetchShopData, action.payload);
    yield put(getShopDataByAreaSuccess(shopValues));
  } catch (err: any) {
    yield put(getShopDataByAreaFailure(err.toString()));
  }
}

export function* watchShopScreenActions() {
  yield takeLatest(getShopDataByArea.type, handleShopScreenAction);
}
