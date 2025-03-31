export type MissionsData = {
  coin: string;
  created_at: string;
  description: number;
  id: number;
  img: string | null;
  isSuccess: boolean;
  reward: number;
  title: string;
};

export type MissionByTypeRequestType = {
  type: string;
  uid: string;
};
