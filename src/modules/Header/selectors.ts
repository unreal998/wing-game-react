import { headerSlice, HeaderStateType } from "./slices";

export type HeaderSliceStore = {
  [headerSlice.name]: HeaderStateType;
};

export const selectUserData =
  () =>
  ({ headerSlice }: HeaderSliceStore) =>
    headerSlice.userData;

export const selectAreasData =
  () =>
  ({ headerSlice }: HeaderSliceStore) =>
    headerSlice.userData?.areas;
