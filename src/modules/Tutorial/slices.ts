import { createSlice } from "@reduxjs/toolkit";

type TutorialState = {
  showModuleOne: boolean;
  showModuleTwo: boolean;
  showModuleThree: boolean;
  showModuleFour: boolean;
  showModuleFive: boolean;
  showModuleSix: boolean;
  showModuleSeven: boolean;
  showModuleEight: boolean;
  showModuleNine: boolean;
  showModuleTen: boolean;
  showModuleEleven: boolean;
  showModuleTwelve: boolean;
  showModuleThirteen: boolean;
  showModuleFourteen: boolean;
};

const initialTutorialState: TutorialState = {
  showModuleOne: true,
  showModuleTwo: false,
  showModuleThree: false,
  showModuleFour: false,
  showModuleFive: false,
  showModuleSix: false,
  showModuleSeven: false,
  showModuleEight: false,
  showModuleNine: false,
  showModuleTen: false,
  showModuleEleven: false,
  showModuleTwelve: false,
  showModuleThirteen: false,
  showModuleFourteen: false,
};

export const tutorialSlice = createSlice({
  name: "tutorialSlice",
  initialState: initialTutorialState,
  reducers: {
    setShowModuleOne: (state, { payload }: { payload: boolean }) => {
      state.showModuleOne = payload;
    },
    setShowModuleTwo: (state, { payload }: { payload: boolean }) => {
      state.showModuleTwo = payload;
    },
    setShowModuleThree: (state, { payload }: { payload: boolean }) => {
      state.showModuleThree = payload;
    },
    setShowModuleFour: (state, { payload }: { payload: boolean }) => {
      state.showModuleFour = payload;
    },
    setShowModuleFive: (state, { payload }: { payload: boolean }) => {
      state.showModuleFive = payload;
    },
    setShowModuleSix: (state, { payload }: { payload: boolean }) => {
      state.showModuleSix = payload;
    },
    setShowModuleSeven: (state, { payload }: { payload: boolean }) => {
      state.showModuleSeven = payload;
    },
    setShowModuleEight: (state, { payload }: { payload: boolean }) => {
      state.showModuleEight = payload;
    },
    setShowModuleNine: (state, { payload }: { payload: boolean }) => {
      state.showModuleNine = payload;
    },
    setShowModuleTen: (state, { payload }: { payload: boolean }) => {
      state.showModuleTen = payload;
    },
    setShowModuleEleven: (state, { payload }: { payload: boolean }) => {
      state.showModuleEleven = payload;
    },
    setShowModuleTwelve: (state, { payload }: { payload: boolean }) => {
      state.showModuleTwelve = payload;
    },
    setShowModuleThirteen: (state, { payload }: { payload: boolean }) => {
      state.showModuleThirteen = payload;
    },
    setShowModuleFourteen: (state, { payload }: { payload: boolean }) => {
      state.showModuleFourteen = payload;
    },
  },
});

export const {
  setShowModuleOne,
  setShowModuleTwo,
  setShowModuleThree,
  setShowModuleFour,
  setShowModuleFive,
  setShowModuleSix,
  setShowModuleSeven,
  setShowModuleEight,
  setShowModuleNine,
  setShowModuleTen,
  setShowModuleEleven,
  setShowModuleTwelve,
  setShowModuleThirteen,
  setShowModuleFourteen,
} = tutorialSlice.actions;

export type TutorialStateType = typeof initialTutorialState;
