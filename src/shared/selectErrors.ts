import { RootState } from "../store";

export const selectErrors = (state: RootState): string[] => {
  const header = state.headerSlice as any;
  const home = state.homeSlice as any;
  const missions = state.missionsSlice as any;
  const referal = state.referalSlice as any;
  const settings = state.settingsSlice as any;
  const wallet = state.walletSlice as any;
  const shop = state.shopSlice as any;

  const allRawErrors = [
    header.errMessage,
    home.errMessage,
    missions.errMessage,
    referal.errMessage,
    settings.errorMessage,
    wallet.errMessage,
    shop.message,
  ];

  return allRawErrors
    .flat()
    .filter((err) => typeof err === "string" && err.trim() !== "");
};
