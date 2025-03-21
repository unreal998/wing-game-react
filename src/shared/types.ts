export type UserInitData = {
  telegramID: number;
  firstName: string;
  userName: string;
  lastName: string;
  language: string;
};

export type AreaType = {
  title: string;
  name: string;
  available: boolean;
  lastButtonPress: number;
  nextButtonPress: number;
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
  modifiers: string[];
  lvl: number;
  exp: number;
};
