import { AreaType } from "../../shared/types";

export type HomeState = {
  nextPressTimeDelay: number;
  disabledPowerButton: boolean;
  selectedCountry: AreaType;
  loading: boolean;
  errMessage: string;
};
