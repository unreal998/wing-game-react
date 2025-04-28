import { createSlice } from "@reduxjs/toolkit";
import { County, UserData, UserInitData } from "../../shared/types";

type HeaderState = {
  userData: null | UserData;
  userInitData: null | UserInitData;
  errMessage: string;
  loading: boolean;
  countriesData: null | County[];
};

export const initialHeaderState: HeaderState = {
  userData: null,
  errMessage: "",
  userInitData: null,
  loading: false,
  countriesData: null,
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
      state.countriesData = payload;
    },
  },
});

export const {
  initAction,
  initActionSuccess,
  initActionFailure,
  fetchCountriesActionSuccess,
} = headerSlice.actions;

export type HeaderStateType = typeof initialHeaderState;

export const selectHeaderLoading = (state: { headerSlice: HeaderState }) =>
  state.headerSlice.loading;

export default headerSlice.reducer;
