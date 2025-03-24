import { missionsSlice, MissionsStateType } from "./slices";

export type MissionsSliceStore = {
  [missionsSlice.name]: MissionsStateType;
};

export const selectMissionsData =
  () =>
  ({ missionsSlice }: MissionsSliceStore) =>
    missionsSlice.missionsData;
