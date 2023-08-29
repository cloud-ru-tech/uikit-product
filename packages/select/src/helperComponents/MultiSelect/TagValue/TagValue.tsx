import { cx } from '@linaria/core';

import { Tag, TagProps } from '@sbercloud/uikit-product-tag';

import * as S from './styled';

export function TagValue({ value, className, onRemoveClick }: Pick<TagProps, 'value' | 'onRemoveClick' | 'className'>) {
  return (
    <Tag
      value={value}
      onRemoveClick={onRemoveClick}
      className={cx(S.tagValueClassName, className)}
      color={Tag.colors.Gray}
      size={Tag.sizes.Small}
    />
  );
}
