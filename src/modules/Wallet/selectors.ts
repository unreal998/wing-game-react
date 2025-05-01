import { walletSlice, WalletStateType } from "./slices";

export type WalletSliceStore = {
  [walletSlice.name]: WalletStateType;
};

export const selectWalletNumber =
  () =>
  ({ walletSlice }: WalletSliceStore) =>
    walletSlice.walletNumber;

export const selectWithdrawData =
  () =>
  ({ walletSlice }: WalletSliceStore) =>
    walletSlice.withdrawData;

export const selectIsWithdrawOpen =
  () =>
  ({ walletSlice }: WalletSliceStore) =>
    walletSlice.isWithdrawOpen;
