import { createSlice } from "@reduxjs/toolkit";
import { ReferalData } from "./types";

type ReferalState = {
  referalData: ReferalData[];
  loading: boolean;
  errMessage: string;
};

export const initialReferalState: ReferalState = {
  referalData: [],
  loading: false,
  errMessage: "",
};

export const referalSlice = createSlice({
  name: "referalSlice",
  initialState: initialReferalState,
  reducers: {
    getReferalDataAction: (state, { payload }: { payload: number }) => {
      state.loading = true;
    },
    getReferalDataActionSuccess: (
      state,
      { payload }: { payload: ReferalData[] },
    ) => {
      state.loading = false;
      state.referalData = payload;
    },
    getReferalDataActionFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errMessage = payload;
    },
    buyCountry: (
      state,
      { payload }: { payload: { uid: string; countryName: string } },
    ) => {
      state.loading = true;
    },
    buyCountrySuccess: (state) => {
      state.loading = false;
    },
    buyCountryFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errMessage = payload;
    },
  },
});

export const {
  getReferalDataAction,
  getReferalDataActionSuccess,
  getReferalDataActionFailure,
  buyCountry,
  buyCountrySuccess,
  buyCountryFailure,
} = referalSlice.actions;

export type ReferalStateType = typeof initialReferalState;

export const selectReferalLoading = (state: { referalSlice: ReferalState }) =>
  state.referalSlice.loading;

export default referalSlice.reducer;
