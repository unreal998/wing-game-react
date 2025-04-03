import { createSlice } from "@reduxjs/toolkit";

type SettingsState = {
  loading: boolean;
  errorMessage: string;
};

export const initialSettingsState: SettingsState = {
  loading: false,
  errorMessage: "",
};

export const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState: initialSettingsState,
  reducers: {
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

export const { updateSettings, updateSettingsSuccess, updateSettingsFailure } =
  settingsSlice.actions;

export type SettingsStateType = typeof initialSettingsState;

export const selectSettingsLoading = (state: {
  settingsSlice: SettingsState;
}) => state.settingsSlice.loading;

export const selectSettingsError = (state: { settingsSlice: SettingsState }) =>
  state.settingsSlice.errorMessage;

export default settingsSlice.reducer;
