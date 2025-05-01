import { createSlice } from "@reduxjs/toolkit";
import { Withdraw } from "../../shared/types";

type WalletState = {
  walletNumber: string;
  TONBalance: number;
  WindBalance: number;
  withdrawData: Withdraw[];
  loading: boolean;
  errMessage: string;
};

export const initialWalletState: WalletState = {
  walletNumber: "",
  TONBalance: 0,
  WindBalance: 0,
  withdrawData: [],
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
    getWithdrawAction: (state, { payload }: { payload: string }) => {
      state.loading = true;
    },
    getWithdrawActionSuccess: (state, { payload }: { payload: Withdraw[] }) => {
      state.loading = false;
      state.withdrawData = payload;
    },
    getWithdrawActionFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errMessage = payload;
    },
    sendWithdrawRequestAction: (
      state,
      {
        payload,
      }: {
        payload: {
          uid: string;
          wallet: string;
          amount: string;
          tonMemo: string;
        };
      },
    ) => {
      state.loading = true;
    },
    sendWithdrawRequestSuccess: (state) => {
      state.loading = false;
    },
    sendWithdrawRequestFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.errMessage = payload;
    },
  },
});

export const {
  createWalletAction,
  createWalletActionSuccess,
  createWalletActionFailure,
  getWithdrawAction,
  getWithdrawActionSuccess,
  getWithdrawActionFailure,
  sendWithdrawRequestAction,
  sendWithdrawRequestSuccess,
  sendWithdrawRequestFailure,
} = walletSlice.actions;

export type WalletStateType = typeof initialWalletState;

export const selectWalletLoading = (state: { walletSlice: WalletState }) =>
  state.walletSlice.loading;

export default walletSlice.reducer;
