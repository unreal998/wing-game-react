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
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

export type ReferalsByLevelResponse = {
  data: ReferalData[];
  levelCounts: { kwt: ReferalsByLevel; ton: ReferalsByLevel };
  referralsByLevel: Record<number, ReferalData[]>;
};
