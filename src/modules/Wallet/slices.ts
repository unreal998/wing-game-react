import { createSlice } from "@reduxjs/toolkit";
import { HistoryType } from "../../shared/types";

type WalletState = {
  walletNumber: string;
  TONBalance: number;
  WindBalance: number;
  historyData: HistoryType[];
  loading: boolean;
  errMessage: string;
  isWithdrawOpen: boolean;
};

export const initialWalletState: WalletState = {
  walletNumber: "",
  TONBalance: 0,
  WindBalance: 0,
  historyData: [],
  loading: true,
  errMessage: "",
  isWithdrawOpen: false,
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
    getHistoryAction: (state, { payload }: { payload: string }) => {
      state.loading = true;
    },
    getHistorySuccess: (state, { payload }: { payload: HistoryType[] }) => {
      state.loading = false;
      state.historyData = payload;
    },
    getHistoryActionFailure: (state, { payload }: { payload: string }) => {
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
          tid: string;
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
    setWithdrawModalOpen: (state, { payload }: { payload: boolean }) => {
      state.isWithdrawOpen = payload;
    },
  },
});

export const {
  createWalletAction,
  createWalletActionSuccess,
  createWalletActionFailure,
  getHistoryAction,
  getHistorySuccess,
  getHistoryActionFailure,
  sendWithdrawRequestAction,
  sendWithdrawRequestSuccess,
  sendWithdrawRequestFailure,
  setWithdrawModalOpen,
} = walletSlice.actions;

export type WalletStateType = typeof initialWalletState;

export const selectWalletLoading = (state: { walletSlice: WalletState }) =>
  state.walletSlice.loading;

export default walletSlice.reducer;
