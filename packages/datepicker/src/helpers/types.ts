export type TSplitDateType = {
  day: string;
  month: string;
  year: string;
  time: string;
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

export type PickSettingProps = {
  pickTimeCheck?: boolean;
  isPickTimeOptional?: boolean;
  setPickTime?: React.Dispatch<React.SetStateAction<boolean>>;
  isPickTime?: boolean;
  isDatePickerOpen?: boolean;
};
