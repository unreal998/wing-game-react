export type MissionsData = {
  title: string;
  description: number;
  revard: number;
  isCompleated: boolean;
};

export type MissionByTypeRequestType = {
  type: string;
  uid: string;
};
