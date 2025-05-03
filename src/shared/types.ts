export type UserInitData = {
  telegramID: number;
  firstName: string;
  userName: string;
  lastName: string;
  language: string;
};

export type UserSettingsData = {
  isTutorialFinished?: boolean;
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
  missions: string[];
  areas: AreaType[];
  modifiers: UserModifiersType[];
  lvl: number;
  userSettings: UserSettingsData;
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

export type County = {
  basicBonusPerClick: number;
  referalsToUnlock: number;
  shortName: string;
  title: string;
};
