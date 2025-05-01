import { tutorialSlice, TutorialStateType } from "./slices";

export type TutorialSliceStore = {
  [tutorialSlice.name]: TutorialStateType;
};

export const selectCurrentModule =
  () =>
  ({ tutorialSlice }: { tutorialSlice: TutorialStateType }) =>
    tutorialSlice.currentModule;

export const selectIsTutorialFinished =
  () =>
  ({ tutorialSlice }: { tutorialSlice: TutorialStateType }) =>
    tutorialSlice.isFinished;
