import { referalSlice, ReferalStateType } from "./slices";

export type ReferalSliceStore = {
  [referalSlice.name]: ReferalStateType;
};

export const selectReferalData =
  () =>
  ({ referalSlice }: ReferalSliceStore) =>
    referalSlice.referalData;

export const selectChildrenByParent =
  () =>
  ({ referalSlice }: ReferalSliceStore) =>
    referalSlice.childrenByParent;

export const selectLoadingByParent =
  () =>
  ({ referalSlice }: ReferalSliceStore) =>
    referalSlice.loadingByParent;

export const selectLoading =
  () =>
  ({ referalSlice }: ReferalSliceStore) =>
    referalSlice.loading;

export const selectUserReferalData =
  () =>
  ({ referalSlice }: ReferalSliceStore) =>
    referalSlice.userReferalData?.referralsByLevel;

export const selectLoadingUserReferalData =
  () =>
  ({ referalSlice }: ReferalSliceStore) =>
    referalSlice.loadingUserReferalData;
