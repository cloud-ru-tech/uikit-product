import { VALIDATION_STATE } from '@snack-uikit/fields/dist/constants';
import * as Icons from '@snack-uikit/icons';

export const ICONS = {
  none: undefined,
  ...Object.fromEntries(
    (Object.keys(Icons) as Array<keyof typeof Icons>).map(key => {
      const Icon = Icons[key];

      return [key, Icon];
    }),
  ),
};

export const COMMON_ARG_TYPES = {
  validationState: {
    options: Object.values(VALIDATION_STATE),
    control: {
      type: 'radio',
    },
  },
  prefixIcon: {
    name: 'prefixIcon',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
  labelTooltip: {
    control: {
      type: 'text',
    },
  },
  localeName: {
    options: ['ru-RU', 'en-US'],
    control: { type: 'radio' },
  },
};
