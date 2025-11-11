import { ValueOf } from '@snack-uikit/utils';

import { APPEARANCE } from '../../constants';

export enum Variant {
  LabelOnly = 'label-only',
  IconOnly = 'icon-only',
  IconBefore = 'icon-before',
  IconAfter = 'icon-after',
}

export const APPEARANCE_TO_COLOR_MAP: Record<ValueOf<typeof APPEARANCE>, ValueOf<typeof APPEARANCE>> = {
  [APPEARANCE.Primary]: APPEARANCE.Primary,
  [APPEARANCE.Neutral]: APPEARANCE.Neutral,
};
