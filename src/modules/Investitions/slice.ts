import { createSlice } from "@reduxjs/toolkit";
import { InvestitionsDataType } from "./types";

export type InvestitionsStateType = {
  loading: boolean;
  investitionsData: InvestitionsDataType[];
  error: string | null;
};

const initialInvestitionsState: InvestitionsStateType = {
  loading: false,
  investitionsData: [],
  error: null,
};

export const investitionsSlice = createSlice({
  name: "investitionsSlice",
  initialState: initialInvestitionsState,
  reducers: {
    getInvestitionsDataAction: (
      state,
      { payload }: { payload: { tid: number; selectedCountry: string } },
    ) => {
      state.loading = true;
      state.error = null;
      state.investitionsData = [];
    },
    getInvestitionsDataActionSuccess: (
      state,
      { payload }: { payload: InvestitionsDataType[] },
    ) => {
      state.loading = false;
      state.investitionsData = payload;
    },
    getInvestitionsDataActionFailure: (
      state,
      { payload }: { payload: string },
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  getInvestitionsDataAction,
  getInvestitionsDataActionSuccess,
  getInvestitionsDataActionFailure,
} = investitionsSlice.actions;
export const investitionsReducer = investitionsSlice.reducer;
