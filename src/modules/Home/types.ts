import { AreaType } from "../../shared/types";

export type HomeState = {
  lastSelectedCountry: string;
  nextPressTimeDelay: number;
  disabledPowerButton: boolean;
  selectedCountry: AreaType;
  loading: boolean;
  errMessage: string;
};
