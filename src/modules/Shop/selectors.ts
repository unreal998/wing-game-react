import { shopSlice, ShopStateType } from "./slices";

export type ShopSliceStore = {
  [shopSlice.name]: ShopStateType;
};

export const selectShopData =
  () =>
  ({ shopSlice }: ShopSliceStore) =>
    shopSlice.values;
