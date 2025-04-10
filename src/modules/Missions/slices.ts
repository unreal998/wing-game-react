import { createSlice } from "@reduxjs/toolkit";
import { MissionByTypeRequestType, MissionsData } from "./types";

type MissionsState = {
  missionsData: MissionsData[];
  loading: boolean;
  errMessage: string;
};

export const initialMissionsState: MissionsState = {
  missionsData: [],
  loading: false,
  errMessage: "",
};

export const missionsSlice = createSlice({
  name: "missionsSlice",
  initialState: initialMissionsState,
  reducers: {
    getMissionsDataAction: (
      state,
      { payload }: { payload: MissionByTypeRequestType },
    ) => {
      state.loading = true;
    },
    getMissionsDataActionSuccess: (
      state,
      { payload }: { payload: MissionsData[] },
    ) => {
      state.loading = false;
      state.missionsData = payload;
    },
    getMissionsDataActionFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errMessage = payload;
    },
  },
});

export const {
  getMissionsDataAction,
  getMissionsDataActionSuccess,
  getMissionsDataActionFailure,
} = missionsSlice.actions;

export type MissionsStateType = typeof initialMissionsState;

export const selectMissionsLoading = (state: {
  missionsSlice: MissionsState;
}) => state.missionsSlice.loading;

export default missionsSlice.reducer;
