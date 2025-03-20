import { homeSlice, HomeStateType } from "./slices";

export type HomeSliceStore = {
  [homeSlice.name]: HomeStateType;
};

export const selectNextPressTimeDelay =
  () =>
  ({ homeSlice }: HomeSliceStore) =>
    homeSlice.nextPressTimeDelay;

export const selectDisabledPowerButton =
  () =>
  ({ homeSlice }: HomeSliceStore) =>
    homeSlice.disabledPowerButton;

export const selectSelectedCountry =
  () =>
  ({ homeSlice }: HomeSliceStore) =>
    homeSlice.selectedCountry;
