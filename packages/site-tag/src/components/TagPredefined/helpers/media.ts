import { ValueOf } from '@snack-uikit/utils';

import { TagPredefinedCommonProps, TagProps } from '../types';

export const MEDIA_TYPE = {
  News: 'news',
  Article: 'article',
  PressRelease: 'press-release',
  Course: 'course',
  Certification: 'certification',
  Webinar: 'webinar',
  Conference: 'conference',
} as const;

export type TagMediaProps = TagPredefinedCommonProps & {
  type: ValueOf<typeof MEDIA_TYPE>;
  variant: 'media';
};

export const getTagMediaProps = (type: TagMediaProps['type']): TagProps => {
  switch (type) {
    case MEDIA_TYPE.News:
      return {
        text: 'Новость',
        appearance: 'neutral',
      };
    case MEDIA_TYPE.Article:
      return {
        text: 'Статья',
        appearance: 'neutral',
      };
    case MEDIA_TYPE.PressRelease:
      return {
        text: 'Пресс-релиз',
        appearance: 'neutral',
      };
    case MEDIA_TYPE.Course:
      return {
        text: 'Курс',
        appearance: 'blue',
      };
    case MEDIA_TYPE.Certification:
      return {
        text: 'Сертификация',
        appearance: 'orange',
      };
    case MEDIA_TYPE.Webinar:
      return {
        text: 'Вебинар',
        appearance: 'violet',
      };
    case MEDIA_TYPE.Conference:
      return {
        text: 'Конференция',
        appearance: 'violet',
      };

    default: {
      return null;
    }
  }
};
