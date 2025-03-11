import { createSlice } from "@reduxjs/toolkit";

type HomeState = {
  nextPressTimeDelay: number;
  disabledPowerButton: boolean;
};

export const initialHomeState: HomeState = {
  nextPressTimeDelay: 20000,
  disabledPowerButton: true,
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
  },
});

export const { powerButtonPressed, setPressTimeDelay } = homeSlice.actions;

export type HomeStateType = typeof initialHomeState;
