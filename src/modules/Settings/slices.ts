import { createSlice } from "@reduxjs/toolkit";

export type SettingsState = {
  loading: boolean;
  errorMessage: string;
  isRoadMapOpen: boolean;
  error: string | null;
  isTutorialRestarted: boolean;
  soundEnabled: boolean;
};

export const initialSettingsState: SettingsState = {
  loading: false,
  errorMessage: "",
  isRoadMapOpen: false,
  error: null,
  isTutorialRestarted: false,
  soundEnabled: true,
};

export const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState: initialSettingsState,
  reducers: {
    setRoadMapOpen: (state, { payload }: { payload: boolean }) => {
      state.isRoadMapOpen = payload;
    },
    updateSettings: (state) => {
      state.loading = true;
    },
    updateSettingsSuccess: (state) => {
      state.loading = false;
    },
    updateSettingsFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
    restartTutorialRequest: (state, { payload }: { payload: string }) => {
      state.loading = true;
      state.error = null;
    },
    restartTutorialSuccess: (state) => {
      state.loading = false;
      state.isTutorialRestarted = true;
    },
    restartTutorialFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.error = payload;
    },
    setSoundEnabled: (state, { payload }: { payload: boolean }) => {
      state.soundEnabled = payload;
    },
  },
});

export const {
  updateSettings,
  updateSettingsSuccess,
  updateSettingsFailure,
  setRoadMapOpen,
  restartTutorialRequest,
  restartTutorialSuccess,
  restartTutorialFailure,
  setSoundEnabled,
} = settingsSlice.actions;

export default settingsSlice.reducer;
