import { createSlice } from "@reduxjs/toolkit";
import {
  County,
  IncomeDataType,
  UserData,
  UserInitData,
} from "../../shared/types";
import { UserBalanceResponse } from "./api";

type HeaderState = {
  userData: null | UserData;
  userInitData: null | UserInitData;
  errMessage: string;
  loading: boolean;
  countriesData: null | County[];
  tonIncome: string;
  kwtIncome: string;
};

export const initialHeaderState: HeaderState = {
  userData: null,
  errMessage: "",
  userInitData: null,
  loading: false,
  countriesData: null,
  tonIncome: "0",
  kwtIncome: "0",
};

export const headerSlice = createSlice({
  name: "headerSlice",
  initialState: initialHeaderState,
  reducers: {
    initAction: (state, { payload }: { payload: UserInitData }) => {
      state.loading = true; // Устанавливаем загрузку
      state.userInitData = payload;
    },
    initActionSuccess: (state, { payload }: { payload: UserData }) => {
      state.loading = false;
      state.userData = payload;
    },
    initActionFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errMessage = payload;
    },
    fetchCountriesActionSuccess: (
      state,
      { payload }: { payload: County[] },
    ) => {
      state.countriesData = payload.sort((a, b) => a.id - b.id);
    },
    updateBalanceAction: (state, { payload }: { payload: UserData["id"] }) => {
      state.loading = true;
    },
    updateBalanceActionSuccess: (
      state,
      { payload }: { payload: UserBalanceResponse },
    ) => {
      state.loading = false;
      if (state.userData) {
        state.userData.TONBalance = payload.TONBalance;
        state.userData.WindBalance = payload.WindBalance;
        state.userData.withdrawLimit = payload.withdrawLimit;
      }
    },
    updateBalanceActionFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errMessage = payload;
    },
    updateUserSettingsAction: (state, { payload }) => {
      state.loading = true;
    },
    updateUserSettingsActionSuccess: (state) => {
      state.loading = false;
    },
    updateUserSettingsActionFailure: (
      state,
      { payload }: { payload: string },
    ) => {
      state.loading = false;
      state.errMessage = payload;
    },
    getIncomeDataAction: (state, { payload }) => {
      state.loading = true;
    },
    getIncomeDataFailure: (state, { payload }) => {
      state.loading = false;
    },
    updateIncomeDataActionSuccess: (
      state,
      { payload }: { payload: IncomeDataType },
    ) => {
      state.loading = false;
      state.kwtIncome = payload.totalTurxGain;
      state.tonIncome = payload.totalTonGain;
    },
    updateIncomeDataActionFailed: (state, { payload }: { payload: string }) => {
      state.loading = false;
    },
    updateDailyMissionsAction: (state) => {
      state.loading = true;
    },
    updateDailyMissionsActionSuccess: (state) => {
      state.loading = false;
      if (!state.userData) return;
      state.userData.missions = [];
    },
    updateDailyMissionsActionFailure: (
      state,
      { payload }: { payload: string },
    ) => {
      state.loading = false;
      state.errMessage = payload;
    },
  },
});

export const {
  initAction,
  initActionSuccess,
  initActionFailure,
  fetchCountriesActionSuccess,
  updateBalanceAction,
  updateBalanceActionFailure,
  updateBalanceActionSuccess,
  updateUserSettingsActionSuccess,
  updateUserSettingsActionFailure,
  updateUserSettingsAction,
  updateIncomeDataActionSuccess,
  updateIncomeDataActionFailed,
  getIncomeDataAction,
  updateDailyMissionsAction,
  updateDailyMissionsActionFailure,
  updateDailyMissionsActionSuccess,
  getIncomeDataFailure,
} = headerSlice.actions;

export type HeaderStateType = typeof initialHeaderState;

export const selectHeaderLoading = (state: { headerSlice: HeaderState }) =>
  state.headerSlice.loading;

export default headerSlice.reducer;
