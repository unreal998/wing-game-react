import { walletSlice, WalletStateType } from "./slices";

export type WalletSliceStore = {
  [walletSlice.name]: WalletStateType;
};

export const selectWalletNumber =
  () =>
  ({ walletSlice }: WalletSliceStore) =>
    walletSlice.walletNumber;

export const selectHistoryData =
  () =>
  ({ walletSlice }: WalletSliceStore) =>
    walletSlice.historyData;

export const selectIsWithdrawOpen =
  () =>
  ({ walletSlice }: WalletSliceStore) =>
    walletSlice.isWithdrawOpen;
