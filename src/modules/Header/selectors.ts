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

export const selectModificatorsData =
  () =>
  ({ headerSlice }: HeaderSliceStore) =>
    headerSlice.userData?.modifiers;

export const selectCountiresData =
  () =>
  ({ headerSlice }: HeaderSliceStore) =>
    headerSlice.countriesData;

export const selectUserSettings =
  () =>
  ({ headerSlice }: HeaderSliceStore) =>
    headerSlice.userData?.userSettings;

export const selectUserId =
  () =>
  ({ headerSlice }: HeaderSliceStore) =>
    headerSlice.userData?.id;

export const selectIncomeData =
  () =>
  ({ headerSlice }: HeaderSliceStore) => {
    return {
      kwtIncome: headerSlice.kwtIncome,
      tonIncome: headerSlice.tonIncome,
    };
  };
