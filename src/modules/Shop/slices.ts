import { createSlice } from "@reduxjs/toolkit";
import { BuyItemType, ShopData, ShopValues } from "./types";

type ShopState = {
  loading: boolean;
  values: ShopData[];
  message: string;
  windValue: number;
  lowBalanceModalOpen: boolean;
};

export const initialShopState: ShopState = {
  loading: false,
  values: [],
  message: "",
  windValue: 0,
  lowBalanceModalOpen: false,
};

export const shopSlice = createSlice({
  name: "shopSlice",
  initialState: initialShopState,
  reducers: {
    getShopDataByArea: (state) => {
      state.loading = true;
    },
    getShopDataByAreaSuccess: (state, { payload }: { payload: ShopData[] }) => {
      state.loading = false;
      state.values = payload;
    },
    getShopDataByAreaFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.message = payload;
    },
    setWindValue: (state, { payload }: { payload: number }) => {
      state.windValue = payload;
    },
    buyItemAction: (state, { payload }: { payload: BuyItemType }) => {
      state.loading = true;
    },
    buyItemActionSuccess: (state) => {
      state.loading = false;
    },
    buyItemActionFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.message = payload;
    },
    setLowBalanceModalOpen: (state, { payload }: { payload: boolean }) => {
      state.lowBalanceModalOpen = payload;
    },
  },
});

export const {
  getShopDataByArea,
  getShopDataByAreaSuccess,
  getShopDataByAreaFailure,
  setWindValue,
  buyItemAction,
  buyItemActionSuccess,
  buyItemActionFailure,
  setLowBalanceModalOpen,
} = shopSlice.actions;

export type ShopStateType = typeof initialShopState;

export const selectShopLoading = (state: { shopSlice: ShopState }) =>
  state.shopSlice.loading;
