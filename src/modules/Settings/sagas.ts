import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  restartTutorialRequest,
  restartTutorialSuccess,
  restartTutorialFailure,
  setSoundEnabled,
  getRoadmapTextAction,
  getRoadmapTextActionSuccess,
  getRoadmapTextActionFailure,
} from "./slices";
import { fetchGetRoadmap, updateUserSettings } from "./api";
import { selectUserId } from "../Header/selectors";
import { SagaIterator } from "redux-saga";

function* handleRestartTutorial(action: { type: string; payload: string }) {
  try {
    yield call(updateUserSettings, action.payload, {
      isTutorialFinished: false,
    });
    yield put(restartTutorialSuccess());
  } catch (err: any) {
    yield put(restartTutorialFailure(err.toString()));
  }
}

function* handleSetSoundEnabled(action: {
  type: string;
  payload: boolean;
}): SagaIterator {
  const uid: string = yield select(selectUserId());
  yield call(updateUserSettings, uid, { soundEnabled: action.payload });
}

function* handleGetRoadmap(action: { type: string; payload: string }) {
  try {
    const roadmapText: string = yield call(fetchGetRoadmap, action.payload);
    yield put(getRoadmapTextActionSuccess(roadmapText));
  } catch (err: any) {
    yield put(getRoadmapTextActionFailure(err.toString()));
  }
}

export function* watchTutorialSaga() {
  yield takeLatest(restartTutorialRequest.type, handleRestartTutorial);
  yield takeLatest(setSoundEnabled.type, handleSetSoundEnabled);
  yield takeLatest(getRoadmapTextAction.type, handleGetRoadmap);
}
