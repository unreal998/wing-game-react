export type UserInitData = {
  telegramID: string;
  firstName: string;
  userName: string;
  lastName: string;
  language: string;
};

export type UserTelegramData = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
};

export type UserData = UserInitData & {
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
