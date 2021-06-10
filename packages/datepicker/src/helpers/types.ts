export type TSplitDateType = {
  day: string;
  month: string;
  year: string;
  time: string;
  full?: string;
};

export enum SettingType {
  None = 'None',
  Requier = 'Require',
  Optional = 'Optional',
}

export enum TimeInputProps {
  day = 'day',
  month = 'month',
  year = 'year',
}

export interface PickSettingProps {
  pickTimeCheck?: boolean;
  isPickTimeOptional?: boolean;
  setPickTime?: React.Dispatch<React.SetStateAction<boolean>>;
  isPickTime?: boolean;
  isDatePickerOpen?: boolean;
}
