import { createSlice } from "@reduxjs/toolkit";
import { AreaType } from "../../shared/types";
import { PowerButtonPressType } from "./api";

type HomeState = {
  nextPressTimeDelay: number;
  disabledPowerButton: boolean;
  selectedCountry: AreaType;
  loading: boolean;
};

export const initialHomeState: HomeState = {
  nextPressTimeDelay: 0,
  disabledPowerButton: false,
  selectedCountry: {
    title: "",
    name: "",
    available: false,
    lastButtonPress: 0,
    nextButtonPress: 0,
    bought: false,
    referalsToUnlock: 0,
  },
  loading: false,
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
    powerButtonPressedFailure: (state) => {
      state.loading = false;
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
  },
});

export const {
  powerButtonPressed,
  powerButtonPressedSuccess,
  powerButtonPressedFailure,
  setPressTimeDelay,
  setSelectedCountry,
} = homeSlice.actions;

export const selectHomeLoading = (state: { homeSlice: HomeState }) =>
  state.homeSlice.loading;

export type HomeStateType = typeof initialHomeState;

export default homeSlice.reducer;
