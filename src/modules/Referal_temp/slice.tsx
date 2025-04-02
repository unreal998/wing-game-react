import { createSlice } from "@reduxjs/toolkit";

export type Referal = {
  id: string;
  name: string;
  userName: string;
  joinedAt: number;
  earnings: number;
};

export type ReferalDetails = {
  referalId: string;
  transactions: string[];
  totalEarnings: number;
};

type ReferalState = {
  loading: boolean;
  referals: Referal[];
  referalDetails: ReferalDetails | null;
  message: string;
};

export const initialReferalState: ReferalState = {
  loading: false,
  referals: [],
  referalDetails: null,
  message: "",
};

export const referalSlice = createSlice({
  name: "referalSlice",
  initialState: initialReferalState,
  reducers: {
    getReferalsData: (state) => {
      state.loading = true;
    },
    getReferalsDataSuccess: (state, { payload }: { payload: Referal[] }) => {
      state.loading = false;
      state.referals = payload;
    },
    getReferalsDataFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.message = payload;
    },

    getReferalDetails: (state) => {
      state.loading = true;
    },
    getReferalDetailsSuccess: (
      state,
      { payload }: { payload: ReferalDetails },
    ) => {
      state.loading = false;
      state.referalDetails = payload;
    },
    getReferalDetailsFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.message = payload;
    },
  },
});

export const {
  getReferalsData,
  getReferalsDataSuccess,
  getReferalsDataFailure,
  getReferalDetails,
  getReferalDetailsSuccess,
  getReferalDetailsFailure,
} = referalSlice.actions;

export type ReferalStateType = typeof initialReferalState;

export const selectReferalsLoading = (state: { referalSlice: ReferalState }) =>
  state.referalSlice.loading;

export const selectReferals = (state: { referalSlice: ReferalState }) =>
  state.referalSlice.referals;

export const selectReferalDetails = (state: { referalSlice: ReferalState }) =>
  state.referalSlice.referalDetails;

export const selectReferalsError = (state: { referalSlice: ReferalState }) =>
  state.referalSlice.message;

export default referalSlice.reducer;
