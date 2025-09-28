export type ReferalData = {
  userName: string;
  firstName: string;
  lastName: string;
  lvl: number;
  WindBalance: number;
  rewardFromClicks: number;
  TONRewardFromClicks: number;
  telegramID: number;
  referals: number[];
  level?: number;
};

export type ReferalsByLevel = {
  level: number;
  count: number;
};

export type ReferalsByLevelResponse = {
  data: ReferalData[];
  levelCounts: ReferalsByLevel[];
  referralsByLevel: Record<number, ReferalData[]>;
};
