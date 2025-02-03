import { PromoTagProps } from '@snack-uikit/promo-tag';
import { ValueOf } from '@snack-uikit/utils';

export const APPEARANCE = {
  Neutral: 'neutral',
  Violet: 'violet',
  Blue: 'blue',
  Green: 'green',
  Yellow: 'yellow',
  Orange: 'orange',
  Red: 'red',
  Pink: 'pink',
  Primary: 'primary',
} as const;

export const APPEARANCE_TO_COLOR_MAP: Record<ValueOf<typeof APPEARANCE>, NonNullable<PromoTagProps['appearance']>> = {
  [APPEARANCE.Neutral]: 'neutral',
  [APPEARANCE.Primary]: 'neutral',
  [APPEARANCE.Blue]: 'blue',
  [APPEARANCE.Green]: 'green',
  [APPEARANCE.Orange]: 'orange',
  [APPEARANCE.Pink]: 'pink',
  [APPEARANCE.Red]: 'red',
  [APPEARANCE.Violet]: 'violet',
  [APPEARANCE.Yellow]: 'yellow',
} as const;
