import { settingsSlice, SettingsState } from "./slices";

export type SettingsSliceStore = {
  [settingsSlice.name]: SettingsState;
};

export const selectIsRoadmapOpen =
  () =>
  ({ settingsSlice }: SettingsSliceStore) =>
    settingsSlice.isRoadMapOpen;

export const selectSettingsLoading =
  () =>
  ({ settingsSlice }: SettingsSliceStore) =>
    settingsSlice.loading;

export const selectSettingsError =
  () =>
  ({ settingsSlice }: SettingsSliceStore) =>
    settingsSlice.errorMessage;
