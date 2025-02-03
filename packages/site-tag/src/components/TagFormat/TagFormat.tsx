import { ValueOf } from '@snack-uikit/utils';

import { TagSpecial, TagSpecialProps } from '../../helperComponents';
import { FORMAT_TYPE } from './constants';

export type TagFormatProps = {
  type: ValueOf<typeof FORMAT_TYPE>;
  size: TagSpecialProps['size'];
};

const getTagSpecialText = (type: TagFormatProps['type']): Pick<TagSpecialProps, 'text'>['text'] | null => {
  switch (type) {
    case FORMAT_TYPE.Hybrid: {
      return 'Гибрид';
    }
    case FORMAT_TYPE.Offline: {
      return 'Офлайн';
    }
    case FORMAT_TYPE.Online: {
      return 'Онлайн';
    }
    default:
      return null;
  }
};

export function TagFormat({ type, size }: TagFormatProps) {
  const tagText = getTagSpecialText(type);

  return tagText && <TagSpecial size={size} appearance='violet' text={tagText} />;
}
