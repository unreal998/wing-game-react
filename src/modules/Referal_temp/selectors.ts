import { referalSlice, ReferalStateType } from "./slices";

export type ReferalSliceStore = {
  [referalSlice.name]: ReferalStateType;
};

export const selectReferalData =
  () =>
  ({ referalSlice }: ReferalSliceStore) =>
    referalSlice.referalData;

export const selectLoading =
  () =>
  ({ referalSlice }: ReferalSliceStore) =>
    referalSlice.loading;
