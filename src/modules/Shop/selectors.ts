import { shopSlice, ShopStateType } from "./slices";

export type ShopSliceStore = {
  [shopSlice.name]: ShopStateType;
};

export const selectShopData =
  () =>
  ({ shopSlice }: ShopSliceStore) =>
    shopSlice.values;

export const selectWindValue =
  () =>
  ({ shopSlice }: ShopSliceStore) =>
    shopSlice.windValue;

export const selectLowBalanceModalOpen =
  () =>
  ({ shopSlice }: ShopSliceStore) =>
    shopSlice.lowBalanceModalOpen;
