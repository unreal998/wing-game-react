import { createSlice } from "@reduxjs/toolkit";
import { Mission, MissionDetails } from "../../shared/types";
type MissionsState = {
  loading: boolean;
  missions: Mission[];
  missionDetails: MissionDetails | null;
  message: string;
};

export const initialMissionsState: MissionsState = {
  loading: false,
  missions: [],
  missionDetails: null,
  message: "",
};

export const missionsSlice = createSlice({
  name: "missionsSlice",
  initialState: initialMissionsState,
  reducers: {
    getMissionsData: (state) => {
      state.loading = true;
    },

    getMissionsDataSuccess: (state, { payload }: { payload: Mission[] }) => {
      state.loading = false;
      state.missions = payload;
    },

    getMissionsDataFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.message = payload;
    },

    getMissionDetails: (state) => {
      state.loading = true;
    },

    getMissionDetailsSuccess: (
      state,
      { payload }: { payload: MissionDetails },
    ) => {
      state.loading = false;
      state.missionDetails = payload;
    },

    getMissionDetailsFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.message = payload;
    },
  },
});

export const {
  getMissionsData,
  getMissionsDataSuccess,
  getMissionsDataFailure,
  getMissionDetails,
  getMissionDetailsSuccess,
  getMissionDetailsFailure,
} = missionsSlice.actions;

export type MissionsStateType = typeof initialMissionsState;

export const selectMissionsLoading = (state: {
  missionsSlice: MissionsState;
}) => state.missionsSlice.loading;

export const selectMissions = (state: { missionsSlice: MissionsState }) =>
  state.missionsSlice.missions;

export const selectMissionDetails = (state: { missionsSlice: MissionsState }) =>
  state.missionsSlice.missionDetails;

export const selectMissionsError = (state: { missionsSlice: MissionsState }) =>
  state.missionsSlice.message;

export default missionsSlice.reducer;
