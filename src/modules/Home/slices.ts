import { createSlice } from "@reduxjs/toolkit";

type HomeState = {
  nextPressTimeDelay: number;
  disabledPowerButton: boolean;
  selectedCountry: string;
};

export const initialHomeState: HomeState = {
  nextPressTimeDelay: 20000,
  disabledPowerButton: true,
  selectedCountry: "",
};

export const homeSlice = createSlice({
  name: "homeSlice",
  initialState: initialHomeState,
  reducers: {
    powerButtonPressed: (state) => {
      state.nextPressTimeDelay = 4320000;
      state.disabledPowerButton = true;
    },
    setPressTimeDelay: (state, { payload }: { payload: number }) => {
      state.nextPressTimeDelay = payload;
      if (payload <= 0) {
        state.disabledPowerButton = false;
      }
    },
    setSelectedCountry: (state, { payload }: { payload: string }) => {
      state.selectedCountry = payload;
    },
  },
});

export const { powerButtonPressed, setPressTimeDelay, setSelectedCountry } =
  homeSlice.actions;

export type HomeStateType = typeof initialHomeState;
