import { createSlice } from "@reduxjs/toolkit";
import { UserData, UserInitData } from "../../shared/types";

type HeaderState = {
  userData: null | UserData;
  userInitData: null | UserInitData;
  errMessage: string;
};

export const initialHeaderState: HeaderState = {
  userData: null,
  errMessage: "",
  userInitData: null,
};

export const headerSlice = createSlice({
  name: "headerSlice",
  initialState: initialHeaderState,
  reducers: {
    initAction: (state, { payload }: { payload: UserInitData }) => {
      state.userInitData = payload;
    },
    initActionSuccess: (state, { payload }: { payload: UserData }) => {
      state.userData = payload;
    },
    initActionFailure: (state, { payload }: { payload: string }) => {
      state.errMessage = payload;
    },
  },
});

export const { initAction, initActionSuccess, initActionFailure } =
  headerSlice.actions;

export type HeaderStateType = typeof initialHeaderState;
