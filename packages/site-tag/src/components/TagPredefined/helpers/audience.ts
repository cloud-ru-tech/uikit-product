import { ValueOf } from '@snack-uikit/utils';

import { TagPredefinedCommonProps, TagProps } from '../types';

export const AUDIENCE_TYPE = {
  IT: 'it',
  Business: 'business',
  Students: 'students',
} as const;

export type TagAudienceProps = TagPredefinedCommonProps & {
  type: ValueOf<typeof AUDIENCE_TYPE>;
  variant: 'audience';
};

export const getTagAudienceProps = (type: TagAudienceProps['type']): TagProps => {
  switch (type) {
    case AUDIENCE_TYPE.IT: {
      return {
        appearance: 'violet',
        text: 'Для IT',
      };
    }
    case AUDIENCE_TYPE.Business: {
      return {
        appearance: 'violet',
        text: 'Для Бизнеса',
      };
    }
    case AUDIENCE_TYPE.Students: {
      return {
        appearance: 'violet',
        text: 'Для Студентов',
      };
    }
    default:
      return null;
  }
};
