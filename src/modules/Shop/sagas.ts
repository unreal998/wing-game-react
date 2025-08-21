import { call, put, takeLatest } from "redux-saga/effects";
import {
  getShopDataByArea,
  getShopDataByAreaSuccess,
  getShopDataByAreaFailure,
  buyItemAction,
  buyItemActionSuccess,
} from "./slices";
import { fetchBuyItem, fetchShopData } from "./api";
import { BuyItemType, ShopData } from "./types";
import { UserData } from "../../shared/types";
import { initActionSuccess } from "../Header/slices";
import { setSelectedCountry } from "../Home/slices";

function* handleShopScreenAction(action: { type: string; payload: string }) {
  try {
    const shopValues: ShopData[] = yield call(fetchShopData, action.payload);
    yield put(getShopDataByAreaSuccess(shopValues));
  } catch (err: any) {
    yield put(getShopDataByAreaFailure(err.toString()));
  }
}

function* handleBuyItem(action: { type: string; payload: BuyItemType }) {
  try {
    const userData: UserData = yield call(fetchBuyItem, action.payload);
    yield put(buyItemActionSuccess());
    yield put(initActionSuccess(userData));
    const selectedCountry = userData.areas.find(
      (area) => area.name === action.payload.selectedArea,
    );
    if (selectedCountry) {
      yield put(setSelectedCountry(selectedCountry));
    }
  } catch (err: any) {
    yield put(getShopDataByAreaFailure(err.toString()));
  }
}

export function* watchShopScreenActions() {
  yield takeLatest(getShopDataByArea.type, handleShopScreenAction);
  yield takeLatest(buyItemAction.type, handleBuyItem);
}
