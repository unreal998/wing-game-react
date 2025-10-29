export type UserInitData = {
  telegramID: number;
  firstName: string;
  userName: string;
  lastName: string;
  language: string;
};

export type UserSettingsData = {
  isTutorialFinished?: boolean;
  soundEnabled?: boolean;
};

export type AreaType = {
  name: string;
  available: boolean;
  lastButtonPress: number;
  nextButtonPress: number;
  bought: boolean;
};

export type UserModifiersType = {
  areaName: string;
  boughtModifier: Modifier[] | null;
};

export type Modifier = {
  boughtDate: number;
  speed: number;
  clicksRemaining: number;
};

export type UserData = UserInitData & {
  id: string;
  wallet: string;
  TONBalance: number;
  WindBalance: number;
  transactions: string[];
  referals: string[];
  missions: { id: number; status: string }[];
  areas: AreaType[];
  modifiers: UserModifiersType[];
  lvl: number;
  userSettings: UserSettingsData;
  withdrawLimit: number;
  SOLBalance: number;
  BNBBalance: number;
  USDTBalance: number;
};

export type IncomeDataType = {
  kwt: number;
  TON: number;
  USDT: number;
  SOL: number;
  BNB: number;
};

export type Withdraw = {
  created_at: string;
  status: string;
  sum: number;
  wallet: string;
  uid: string;
  tid: string;
  id: string;
  MEMO: string;
};

export type HistoryType = {
  sum: number;
  created_at: string;
  status: string;
  type: string;
};

export type County = {
  basicBonusPerClick: number;
  referalsToUnlock: number;
  shortName: string;
  title: string;
  id: number;
  unlockPrice: number;
  percent_income: number;
};
