import { ArgTypes } from '@storybook/react';

import * as Icons from '@snack-uikit/icons';
import { BaseItemProps } from '@snack-uikit/list';

import { APPEARANCE, HTML_TYPE, SIZE } from '../src/constants';

export const DROPLIST_ITEMS: BaseItemProps[] = [
  {
    content: {
      option: 'Option 1',
    },
  },
  {
    content: {
      option: 'Option 2',
    },
  },
  {
    content: {
      option: 'Option 3',
    },
  },
];

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

export const BUTTON_ARGS = {
  label: 'Label text',
  disabled: false,
  loading: false,
  icon: 'none',
};

export const COMMON_ARG_TYPES: ArgTypes = {
  type: {
    options: Object.values(HTML_TYPE),
    control: {
      type: 'radio',
    },
  },
  size: {
    options: Object.values(SIZE),
    control: {
      type: 'radio',
    },
  },
  appearance: {
    options: Object.values(APPEARANCE),
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
  testMode: {
    name: '[Stories]: Show onClick counter',
    control: {
      type: 'boolean',
    },
  },
  onClick: {
    table: {
      disable: true,
    },
  },
};
