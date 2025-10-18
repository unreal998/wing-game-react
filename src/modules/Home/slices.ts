import { createSlice } from "@reduxjs/toolkit";
import { AreaType } from "../../shared/types";
import { PowerButtonPressType } from "./api";
import { HomeState } from "./types";

export const initialHomeState: HomeState = {
  nextPressTimeDelay: 0,
  disabledPowerButton: false,
  lastSelectedCountry: "",
  selectedCountry: {
    name: "",
    available: false,
    lastButtonPress: 0,
    nextButtonPress: 0,
    bought: false,
  },
  loading: false,
  errMessage: "",
};

export const homeSlice = createSlice({
  name: "homeSlice",
  initialState: initialHomeState,
  reducers: {
    powerButtonPressed: (
      state,
      { payload }: { payload: PowerButtonPressType },
    ) => {
      state.loading = true;
    },
    powerButtonPressedSuccess: (state) => {
      state.loading = false;
    },
    powerButtonPressedFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errMessage = payload;
    },
    setPressTimeDelay: (state, { payload }: { payload: number }) => {
      state.nextPressTimeDelay = payload > 0 ? payload : 0;
      if (payload <= 0) {
        state.disabledPowerButton = false;
      }
    },
    setSelectedCountry: (state, { payload }: { payload: AreaType }) => {
      state.selectedCountry = payload;
      state.nextPressTimeDelay =
        payload.nextButtonPress - Date.now() > 0
          ? payload.nextButtonPress - Date.now()
          : 0;
      state.disabledPowerButton = payload.nextButtonPress - Date.now() > 0;
    },
    clearSelectedCountry: (state) => {
      state.lastSelectedCountry = state.selectedCountry.name;
      state.selectedCountry = {
        name: "",
        available: false,
        lastButtonPress: 0,
        nextButtonPress: 0,
        bought: false,
      };
      state.nextPressTimeDelay = 0;
      state.disabledPowerButton = false;
    },
  },
});

export const {
  powerButtonPressed,
  powerButtonPressedSuccess,
  powerButtonPressedFailure,
  setPressTimeDelay,
  setSelectedCountry,
  clearSelectedCountry,
} = homeSlice.actions;

export const selectHomeLoading = (state: { homeSlice: HomeState }) =>
  state.homeSlice.loading;

export type HomeStateType = typeof initialHomeState;

export default homeSlice.reducer;
