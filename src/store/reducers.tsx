import { combineReducers } from "redux";
import { homeSlice } from "../modules/Home/slices";
import { headerSlice } from "../modules/Header/slices";
import { walletSlice } from "../modules/Wallet/slices";
import { shopSlice } from "../modules/Shop/slices";
import { referalSlice } from "../modules/Referal_temp/slices";
import { missionsSlice } from "../modules/Missions/slices";
import { settingsSlice } from "../modules/Settings/slices";

const slices: any[] = [
  homeSlice,
  headerSlice,
  walletSlice,
  shopSlice,
  referalSlice,
  missionsSlice,
  settingsSlice,
];

const toolkitReducers = Object.fromEntries(
  slices.map(({ name, reducer }) => [name, reducer]),
);

export const rootReducer = combineReducers({
  ...toolkitReducers,
});
