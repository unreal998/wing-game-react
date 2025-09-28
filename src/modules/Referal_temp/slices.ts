import { createSlice } from "@reduxjs/toolkit";
import { ReferalData, ReferalsByLevelResponse } from "./types";

type ReferalState = {
  referalData: ReferalData[];

  loading: boolean;

  errMessage: string;

  childrenByParent: Record<string, ReferalData[]>;

  loadingByParent: Record<string, boolean>;

  userReferalData: ReferalsByLevelResponse | null;
  loadingUserReferalData: boolean;
  errMessageUserReferalData: string;
};

export const initialReferalState: ReferalState = {
  referalData: [],
  loading: false,
  errMessage: "",
  childrenByParent: {},
  loadingByParent: {},
  userReferalData: null,
  loadingUserReferalData: false,
  errMessageUserReferalData: "",
};

export const referalSlice = createSlice({
  name: "referalSlice",
  initialState: initialReferalState,
  reducers: {
    getReferalDataAction: (
      state,
      { payload }: { payload: number | string },
    ) => {
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

    setLoadingByParent: (
      state,
      { payload }: { payload: { tid: string; value: boolean } },
    ) => {
      state.loadingByParent[payload.tid] = payload.value;
    },

    getReferalChildrenAction: (
      state,
      { payload }: { payload: number | string },
    ) => {
      const tid = String(payload);
      state.loadingByParent[tid] = true;
    },
    getReferalChildrenActionSuccess: (
      state,
      { payload }: { payload: { tid: string; children: ReferalData[] } },
    ) => {
      state.loadingByParent[payload.tid] = false;
      state.childrenByParent[payload.tid] = payload.children;
    },
    getReferalChildrenActionFailure: (
      state,
      { payload }: { payload: { tid: string; error: string } },
    ) => {
      state.loadingByParent[payload.tid] = false;
      state.errMessage = payload.error;
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
    getUserReferalDataAction: (
      state,
      { payload }: { payload: number | string },
    ) => {
      state.loadingUserReferalData = true;
    },
    getUserReferalDataActionSuccess: (
      state,
      { payload }: { payload: ReferalsByLevelResponse },
    ) => {
      state.loadingUserReferalData = false;
      state.userReferalData = payload;
    },
    getUserReferalDataActionFailure: (
      state,
      { payload }: { payload: string },
    ) => {
      state.loadingUserReferalData = false;
      state.errMessageUserReferalData = payload;
    },
  },
});

export const {
  getReferalDataAction,
  getReferalDataActionSuccess,
  getReferalDataActionFailure,

  setLoadingByParent,
  getReferalChildrenAction,
  getReferalChildrenActionSuccess,
  getReferalChildrenActionFailure,

  buyCountry,
  buyCountrySuccess,
  buyCountryFailure,

  getUserReferalDataAction,
  getUserReferalDataActionSuccess,
  getUserReferalDataActionFailure,
} = referalSlice.actions;

export type ReferalStateType = typeof initialReferalState;

export const selectReferalLoading = (state: { referalSlice: ReferalState }) =>
  state.referalSlice.loading;

export default referalSlice.reducer;
