import { ReactText } from 'react';
import { MultiValueProps } from 'react-select';

import { Tag } from '@sbercloud/uikit-product-tag';

import { MultiselectOptionType } from '../../../helpers/types';
import { TagValue } from './styled';

export function MultiValue({ children, removeProps }: MultiValueProps<MultiselectOptionType>) {
  return (
    <TagValue
      color={Tag.colors.Gray}
      size={Tag.sizes.Medium}
      value={children as ReactText}
      onRemoveClick={removeProps.onClick}
    />
  );
}
