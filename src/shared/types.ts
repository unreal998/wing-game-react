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
export type Mission = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed" | "failed";
  reward: number;
  createdAt: number;
  updatedAt: number;
};

export type MissionDetails = {
  missionId: string;
  detailedDescription: string;
  requirements: string[];
  objectives: string[];
  rewardDetails: string;
  estimatedTime: number;
};
export type BuyItemType = {
  id: string;
  name: string;
  price: number;
};

export type ShopValues = {
  id: string;
  title: string;
  available: boolean;
};
