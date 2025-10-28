import { call, put, takeLatest } from "redux-saga/effects";
import {
  getInvestitionsDataAction,
  getInvestitionsDataActionFailure,
  getInvestitionsDataActionSuccess,
} from "./slice";
import { InvestitionsDataType } from "./types";
import { fetchInvestitionsData } from "./api";

function* handleInvestitionsData(action: {
  type: string;
  payload: { tid: number; selectedCountry: string };
}) {
  try {
    const investitionsData: InvestitionsDataType[] = yield call(
      fetchInvestitionsData,
      action.payload.tid,
      action.payload.selectedCountry,
    );
    yield put(getInvestitionsDataActionSuccess(investitionsData));
  } catch (err: any) {
    yield put(getInvestitionsDataActionFailure(err.toString()));
  }
}

export const watchInvestitionsData = function* () {
  yield takeLatest(getInvestitionsDataAction.type, handleInvestitionsData);
};
