import { scoreSlice, ScoreStateType } from "./slice";

export type ScoreSliceStore = {
  [scoreSlice.name]: ScoreStateType;
};

export const selectScoreData =
  () =>
  ({ scoreSlice }: ScoreSliceStore) =>
    scoreSlice.scoreData;

export const selectLoading =
  () =>
  ({ scoreSlice }: ScoreSliceStore) =>
    scoreSlice.loading;
