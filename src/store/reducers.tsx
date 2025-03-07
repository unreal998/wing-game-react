import { combineReducers } from "redux";
import { homeSlice } from "../modules/Home/slices";

const slices: any[] = [homeSlice];

const toolkitReducers = Object.fromEntries(
  slices.map(({ name, reducer }) => [name, reducer]),
);

export const rootReducer = combineReducers({
  ...toolkitReducers,
});
