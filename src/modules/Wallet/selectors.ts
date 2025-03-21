import { walletSlice, HeaderStateType } from "./slices";

export type WalletSliceStore = {
  [walletSlice.name]: HeaderStateType;
};

export const selectWalletNumber =
  () =>
  ({ walletSlice }: WalletSliceStore) =>
    walletSlice.walletNumber;
