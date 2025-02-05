import { ValueOf } from '@snack-uikit/utils';

import { TagPredefinedCommonProps, TagProps } from '../types';

export const FORMAT_TYPE = {
  Online: 'online',
  Hybrid: 'hybrid',
  Offline: 'offline',
} as const;

export type TagFormatProps = TagPredefinedCommonProps & {
  type: ValueOf<typeof FORMAT_TYPE>;
  variant: 'format';
};

export const getTagFormatProps = (type: TagFormatProps['type']): TagProps => {
  switch (type) {
    case FORMAT_TYPE.Hybrid: {
      return {
        appearance: 'violet',
        text: 'Гибрид',
      };
    }
    case FORMAT_TYPE.Offline: {
      return {
        appearance: 'violet',
        text: 'Офлайн',
      };
    }
    case FORMAT_TYPE.Online: {
      return {
        appearance: 'violet',
        text: 'Онлайн',
      };
    }
    default:
      return null;
  }
};
