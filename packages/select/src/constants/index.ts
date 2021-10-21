export const PRESET_COLORS = [
  'green',
  'blue',
  'purple',
  'pink',
  'red',
  'default-gray',
  'gray',
  'brown',
  'orange',
  'yellow',
  'yellow-green',
  'blue-green',
] as const;

export enum SelectActionTypes {
  RemoveValue = 'remove-value',
  SelectOption = 'select-option',
  PopValue = 'pop-value',
}

export const KEYS_TO_BREAK = [',', 'Enter'];

export type PresetColorType = typeof PRESET_COLORS[number];
