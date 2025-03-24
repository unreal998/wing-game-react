import { walletSlice, WalletStateType } from "./slices";

export type WalletSliceStore = {
  [walletSlice.name]: WalletStateType;
};

export const selectWalletNumber =
  () =>
  ({ walletSlice }: WalletSliceStore) =>
    walletSlice.walletNumber;
