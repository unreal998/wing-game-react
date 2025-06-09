export type MissionsData = {
  id: number;
  created_at: string;
  title: { [key: string]: string };
  description: { [key: string]: string };
  reward: number;
  type: "quest" | "daily";
  coin: string;
  img: string | null;
  specType: string | null;
  specValue: string | null;
  status: "new" | "completed" | "finished";
};

export type MissionByTypeRequestType = {
  type: string;
  uid: string;
};

export type CompleteMissionRequestType = {
  mission: MissionsData;
  uid: string;
};
