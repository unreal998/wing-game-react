export type UserInitData = {
  telegramID: number;
  firstName: string;
  userName: string;
  lastName: string;
  language: string;
};

export type UserData = UserInitData & {
  id: string;
  wallet: string;
  TONBalance: number;
  WindBalance: number;
  transactions: string[];
  referals: string[];
  missions: string[];
  areas: string[];
  modifiers: string[];
  lvl: number;
  exp: number;
};
