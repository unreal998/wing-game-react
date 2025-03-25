export type MissionsData = {
  title: string;
  description: number;
  reward: number;
  isCompleated: boolean;
  coin: string;
};

export type MissionByTypeRequestType = {
  type: string;
  uid: string;
};
