import { createSlice } from "@reduxjs/toolkit";

type TutorialState = {
  currentModule: number;
  isFinished: boolean;
};

const initialTutorialState: TutorialState = {
  currentModule: 1,
  isFinished: false,
};

export const tutorialSlice = createSlice({
  name: "tutorialSlice",
  initialState: initialTutorialState,
  reducers: {
    setCurrentModule: (state, { payload }: { payload: number }) => {
      state.currentModule = payload;
    },
    setIsTutorialFinished: (state, { payload }: { payload: boolean }) => {
      state.isFinished = payload;
    },
  },
});

export const { setCurrentModule, setIsTutorialFinished } =
  tutorialSlice.actions;

export type TutorialStateType = typeof initialTutorialState;
