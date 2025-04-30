import { createSlice } from "@reduxjs/toolkit";

type TutorialState = {
  currentModule: number;
};

const initialTutorialState: TutorialState = {
  currentModule: 1,
};

export const tutorialSlice = createSlice({
  name: "tutorialSlice",
  initialState: initialTutorialState,
  reducers: {
    setCurrentModule: (state, { payload }: { payload: number }) => {
      state.currentModule = payload;
    },
  },
});

export const { setCurrentModule } = tutorialSlice.actions;

export type TutorialStateType = typeof initialTutorialState;
