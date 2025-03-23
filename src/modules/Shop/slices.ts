import { createSlice } from "@reduxjs/toolkit";
import { ShopValues } from "./types";

type ShopState = {
  loading: boolean;
  values: ShopValues[];
  message: string;
};

export const initialShopState: ShopState = {
  loading: false,
  values: [],
  message: "",
};

export const shopSlice = createSlice({
  name: "shopSlice",
  initialState: initialShopState,
  reducers: {
    getShopDataByArea: (state, { payload }: { payload: string }) => {
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
  },
});

export const {
  getShopDataByArea,
  getShopDataByAreaSuccess,
  getShopDataByAreaFailure,
} = shopSlice.actions;

export type ShopStateType = typeof initialShopState;
