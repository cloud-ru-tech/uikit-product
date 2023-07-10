import { SingleValueProps } from 'react-select';

import { Tag } from '@sbercloud/uikit-product-tag';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { DictionaryPropertyAsFn, textProvider, Texts } from '../../../helpers/texts-provider';
import { MultiselectOptionType } from '../../../helpers/types';
import { TagValue } from '../MultiValue/styled';

export function SingleValue({ getValue, clearValue }: SingleValueProps<MultiselectOptionType>) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const { length } = getValue();

  return (
    <TagValue
      color={Tag.colors.Gray}
      size={Tag.sizes.Small}
      value={textProvider<DictionaryPropertyAsFn>(languageCode, Texts.Selected)({ count: length })}
      onRemoveClick={clearValue}
    />
  );
}
