export const selectErrors = ({
  headerSlice,
  walletSlice,
  shopSlice,
  referalSlice,
  missionsSlice,
}: any) => {
  return [
    headerSlice.errMessage,
    walletSlice.errMessage,
    shopSlice.message,
    referalSlice.errMessage,
    missionsSlice.errMessage,
  ];
};
