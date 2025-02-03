import { ValueOf } from '@snack-uikit/utils';

import { TagSpecial, TagSpecialProps } from '../../helperComponents';
import { MEDIA_TYPE } from './constants';

export type TagMediaProps = {
  type: ValueOf<typeof MEDIA_TYPE>;
  size: TagSpecialProps['size'];
};

const getTagSpecialArgs = (type: TagMediaProps['type']): Pick<TagSpecialProps, 'text' | 'appearance'> | null => {
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

export function TagMedia({ type, size }: TagMediaProps) {
  const tagArgs = getTagSpecialArgs(type);

  return tagArgs && <TagSpecial size={size} {...tagArgs} />;
}
