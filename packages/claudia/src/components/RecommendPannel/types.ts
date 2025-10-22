export enum ChipType {
  Default = 'default',
  Outline = 'outline',
}

export type ChipProps = {
  id: string;
  label: string;
  onClick?: () => void;
};

export enum Size {
  S = 's',
  M = 'm',
}
