import { investitionsSlice, InvestitionsStateType } from "./slice";

export type InvestitionsSliceStore = {
  [investitionsSlice.name]: InvestitionsStateType;
};

export const selectInvestitionsData =
  () =>
  ({ investitionsSlice }: InvestitionsSliceStore) =>
    investitionsSlice.investitionsData;

export const selectInvestitionsLoading =
  () =>
  ({ investitionsSlice }: InvestitionsSliceStore) =>
    investitionsSlice.loading;

export const selectInvestitionsError =
  () =>
  ({ investitionsSlice }: InvestitionsSliceStore) =>
    investitionsSlice.error;
