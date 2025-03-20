import { combineReducers } from "redux";
import { homeSlice } from "../modules/Home/slices";
import { headerSlice } from "../modules/Header/slices";

const slices: any[] = [homeSlice, headerSlice];

const toolkitReducers = Object.fromEntries(
  slices.map(({ name, reducer }) => [name, reducer]),
);

export const rootReducer = combineReducers({
  ...toolkitReducers,
});
