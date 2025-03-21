import { createSlice } from "@reduxjs/toolkit";

type WalletState = {
  walletNumber: string;
  TONBalance: number;
  WindBalance: number;
  loading: boolean;
  errMessage: string;
};

export const initialWalletState: WalletState = {
  walletNumber: "",
  TONBalance: 0,
  WindBalance: 0,
  loading: true,
  errMessage: "",
};

export const walletSlice = createSlice({
  name: "walletSlice",
  initialState: initialWalletState,
  reducers: {
    createWalletAction: (state, { payload }: { payload: string }) => {
      state.loading = true;
    },
    createWalletActionSuccess: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.walletNumber = payload;
    },
    createWalletActionFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errMessage = payload;
    },
  },
});

export const {
  createWalletAction,
  createWalletActionSuccess,
  createWalletActionFailure,
} = walletSlice.actions;

export type HeaderStateType = typeof initialWalletState;
