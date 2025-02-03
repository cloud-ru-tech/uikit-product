import { ValueOf } from '@snack-uikit/utils';

import { TagSpecial, TagSpecialProps } from '../../helperComponents';
import { AUDIENCE_TYPE } from './constants';

export type TagAudienceProps = {
  type: ValueOf<typeof AUDIENCE_TYPE>;
  size: TagSpecialProps['size'];
};

const getTagSpecialText = (type: TagAudienceProps['type']): Pick<TagSpecialProps, 'text'>['text'] | null => {
  switch (type) {
    case AUDIENCE_TYPE.IT: {
      return 'Для IT';
    }
    case AUDIENCE_TYPE.Business: {
      return 'Для Бизнеса';
    }
    case AUDIENCE_TYPE.Students: {
      return 'Для Студентов';
    }
    default:
      return null;
  }
};

export function TagAudience({ type, size }: TagAudienceProps) {
  const tagText = getTagSpecialText(type);

  return tagText && <TagSpecial size={size} appearance='violet' text={tagText} />;
}
