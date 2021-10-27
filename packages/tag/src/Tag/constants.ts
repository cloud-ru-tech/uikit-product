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

export type PresetColorType = typeof PRESET_COLORS[number];
