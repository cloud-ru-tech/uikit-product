export enum Sizes {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export const SizePropsMap: Record<Sizes, { side: number; thickness: number; padding: number }> = {
  [Sizes.Small]: {
    side: 28,
    thickness: 2,
    padding: 8,
  },
  [Sizes.Medium]: {
    side: 68,
    thickness: 5,
    padding: 12,
  },
  [Sizes.Large]: {
    side: 100,
    thickness: 8,
    padding: 20,
  },
};
