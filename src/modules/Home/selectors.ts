import { homeSlice, HomeStateType } from "./slices";
import { HomeState } from "./types";

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

export const selectHomeErrors = (state: { homeSlice: HomeState }) =>
  state.homeSlice.errMessage;

export const selectLastSelectedCountry =
  () =>
  ({ homeSlice }: HomeSliceStore) =>
    homeSlice.lastSelectedCountry;
