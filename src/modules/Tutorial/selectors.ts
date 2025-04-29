import { tutorialSlice, TutorialStateType } from "./slices";

export type TutorialSliceStore = {
  [tutorialSlice.name]: TutorialStateType;
};

export const selectShowModuleOne =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleOne;

export const selectShowModuleTwo =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleTwo;

export const selectShowModuleThree =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleThree;

export const selectShowModuleFour =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleFour;

export const selectShowModuleFive =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleFive;

export const selectShowModuleSix =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleSix;

export const selectShowModuleSeven =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleSeven;

export const selectShowModuleEight =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleEight;

export const selectShowModuleNine =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleNine;

export const selectShowModuleTen =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleTen;

export const selectShowModuleEleven =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleEleven;

export const selectShowModuleTwelve =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleTwelve;

export const selectShowModuleThirteen =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleThirteen;

export const selectShowModuleFourteen =
  () =>
  ({ tutorialSlice }: TutorialSliceStore) =>
    tutorialSlice.showModuleFourteen;
