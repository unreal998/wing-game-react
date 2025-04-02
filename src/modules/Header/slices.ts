import { createSlice } from "@reduxjs/toolkit";
import { UserData, UserInitData } from "../../shared/types";

type HeaderState = {
  userData: null | UserData;
  userInitData: null | UserInitData;
  errMessage: string;
  loading: boolean;
};

export const initialHeaderState: HeaderState = {
  userData: null,
  errMessage: "",
  userInitData: null,
  loading: false,
};

export const headerSlice = createSlice({
  name: "headerSlice",
  initialState: initialHeaderState,
  reducers: {
    initAction: (state, { payload }: { payload: UserInitData }) => {
      state.loading = true;
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
  },
});

export const { initAction, initActionSuccess, initActionFailure } =
  headerSlice.actions;

export type HeaderStateType = typeof initialHeaderState;

export const selectHeaderLoading =
  () =>
  ({ headerSlice }: { headerSlice: HeaderState }) =>
    headerSlice.loading;
