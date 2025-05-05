import { createSlice } from "@reduxjs/toolkit";

export type SettingsState = {
  loading: boolean;
  errorMessage: string;
  isRoadMapOpen: boolean;
};

export const initialSettingsState: SettingsState = {
  loading: false,
  errorMessage: "",
  isRoadMapOpen: false,
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
  },
});

export const {
  updateSettings,
  updateSettingsSuccess,
  updateSettingsFailure,
  setRoadMapOpen,
} = settingsSlice.actions;

export default settingsSlice.reducer;
