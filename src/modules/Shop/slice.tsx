import { createSlice } from "@reduxjs/toolkit";
import { BuyItemType, ShopValues } from "../../shared/types";

// Типы для магазина
export type ShopState = {
  loading: boolean;
  values: ShopValues[];
  message: string;
  windValue: number;
};

// Начальное состояние
export const initialShopState: ShopState = {
  loading: false,
  values: [],
  message: "",
  windValue: 0,
};

export const shopSlice = createSlice({
  name: "shopSlice",
  initialState: initialShopState,
  reducers: {
    getShopDataByArea: (state) => {
      state.loading = true;
    },
    getShopDataByAreaSuccess: (
      state,
      { payload }: { payload: ShopValues[] },
    ) => {
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
    buyItemAction: (state) => {
      state.loading = true;
    },
    buyItemActionSuccess: (state) => {
      state.loading = false;
    },
    buyItemActionFailure: (state, { payload }: { payload: string }) => {
      state.loading = false;
      state.message = payload;
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
} = shopSlice.actions;

export type ShopStateType = typeof initialShopState;

export const selectShopLoading = (state: { shopSlice: ShopState }) =>
  state.shopSlice.loading;

export const selectShopValues = (state: { shopSlice: ShopState }) =>
  state.shopSlice.values;

export const selectShopMessage = (state: { shopSlice: ShopState }) =>
  state.shopSlice.message;

export const selectWindValue = (state: { shopSlice: ShopState }) =>
  state.shopSlice.windValue;

export default shopSlice.reducer;
