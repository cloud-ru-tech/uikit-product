export enum Types {
  Success = 'success',
  Failed = 'failed',
  Warning = 'warning',
  Unactive = 'unactive',
  Progress = 'progress',
  Neutral = 'neutral',
}

export enum Variant {
  Transparent = 'transparent',
  Light = 'light',
  Dark = 'dark',
}

export enum Sizes {
  ExtraSmall = 'ExtraSmall',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  ExtraLarge = 'ExtraLarge',
}

export const SizeInPx = {
  ExtraSmall: {
    size: '6px',
    border: '1px',
  },
  Small: {
    size: '8px',
    border: '2px',
  },
  Medium: {
    size: '12px',
    border: '3px',
  },
  Large: {
    size: '16px',
    border: '4px',
  },
  ExtraLarge: {
    size: '20px',
    border: '4px',
  },
};
