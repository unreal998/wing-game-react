import { call, put, takeLatest } from "redux-saga/effects";
import {
  resetTutorialAction,
  resetTutorialActionFailure,
  resetTutorialActionSuccess,
} from "../Header/slices";
import { fetchResetTutorial } from "./api";
import { UserData } from "../../shared/types";
import { setCurrentModule, setIsTutorialFinished } from "../Tutorial/slices";

function* handleResetTutorial(action: {
  type: string;
  payload: UserData["id"];
}) {
  try {
    yield call(fetchResetTutorial, action.payload);
    yield put(setCurrentModule(1));
    yield put(setIsTutorialFinished(false));
    yield put(resetTutorialActionSuccess());
  } catch (err: any) {
    yield put(resetTutorialActionFailure(err.toString()));
  }
}

export function* watchSettingsActions() {
  yield takeLatest(resetTutorialAction.type, handleResetTutorial);
}
