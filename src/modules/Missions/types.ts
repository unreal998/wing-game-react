export type MissionsData = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  reward: number;
  type: "quest" | "daily";
  coin: string;
  img: string | null;
  specType: string | null;
  specValue: string | null;
  isSuccess: boolean;
};

export type MissionByTypeRequestType = {
  type: string;
  uid: string;
};

export type CompleteMissionRequestType = {
  mission: MissionsData;
  uid: string;
};
