import { combineReducers } from "redux";
import { homeSlice } from "../modules/Home/slices";
import { headerSlice } from "../modules/Header/slices";
import { walletSlice } from "../modules/Wallet/slices";
import { missionsSlice } from "../modules/Missions/slices";
import { referalSlice } from "../modules/Referal_temp/slice";
import { shopSlice } from "../modules/Shop/slice";

const slices: any[] = [
  homeSlice,
  headerSlice,
  walletSlice,
  missionsSlice,
  referalSlice,
  shopSlice,
];

const toolkitReducers = Object.fromEntries(
  slices.map(({ name, reducer }) => [name, reducer]),
);

export const rootReducer = combineReducers({
  ...toolkitReducers,
});
