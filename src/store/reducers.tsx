import { combineReducers } from "redux";
import { homeSlice } from "../modules/Home/slices";
import { headerSlice } from "../modules/Header/slices";
import { walletSlice } from "../modules/Wallet/slices";
import { missionsSlice } from "../modules/Missions/slices";

const slices: any[] = [homeSlice, headerSlice, walletSlice, missionsSlice];

const toolkitReducers = Object.fromEntries(
  slices.map(({ name, reducer }) => [name, reducer]),
);

export const rootReducer = combineReducers({
  ...toolkitReducers,
});
