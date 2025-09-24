import { createSlice } from "@reduxjs/toolkit";
import { ScoreType } from "./types";

export type ScoreStateType = {
  scoreData: ScoreType[];
  loading: boolean;
  errMessage: string;
};

export const initialScoreState: ScoreStateType = {
  scoreData: [],
  loading: false,
  errMessage: "",
};

export const scoreSlice = createSlice({
  name: "scoreSlice",
  initialState: initialScoreState,
  reducers: {
    getScoreDataAction: (state, { payload }: { payload: string }) => {
      state.loading = true;
    },
    getScoreDataActionSuccess: (
      state,
      { payload }: { payload: ScoreType[] },
    ) => {
      state.loading = false;
      state.scoreData = payload;
    },
    getScoreDataActionFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errMessage = payload;
    },
  },
});

export const {
  getScoreDataAction,
  getScoreDataActionSuccess,
  getScoreDataActionFailure,
} = scoreSlice.actions;
