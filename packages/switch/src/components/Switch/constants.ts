export enum Size {
  Small = 'small',
  Big = 'big',
}

export const SizePropsMap: Record<Size, { height: number; width: number; handleDiameter: number }> = {
  [Size.Small]: {
    width: 24,
    height: 14,
    handleDiameter: 10,
  },
  [Size.Big]: {
    width: 32,
    height: 20,
    handleDiameter: 16,
  },
};
