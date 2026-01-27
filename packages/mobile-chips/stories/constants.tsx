import { ArgTypes } from '@storybook/react';

import * as Icons from '@cloud-ru/uikit-product-icons';

import { SIZE } from '../src/constants';

export const ICONS = {
  none: undefined,
  ...Object.fromEntries(
    (Object.keys(Icons) as Array<keyof typeof Icons>)
      .filter(key => key !== 'Sprite')
      .map(key => {
        const Icon = Icons[key];
        return [key, <Icon key={key} />];
      }),
  ),
};

export const COMMON_ARG_TYPES: ArgTypes = {
  size: {
    options: Object.values(SIZE),
    control: {
      type: 'radio',
    },
  },
  icon: {
    name: '[Stories]: Show icon examples',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
};

export const DEFAULT_VALUES = {
  multiple2: ['vm-1'],
  date: new Date('2025-01-01'),
  single2: 'true',
  dateRange: [new Date('2025-01-01'), new Date('2025-01-31')],
  time: { hours: 12, minutes: 0 },
};
