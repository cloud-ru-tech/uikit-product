import { ReactText } from 'react';
import { MultiValueProps } from 'react-select';

import { useLanguage } from '@sbercloud/uikit-product-utils';

import { getCollapseIndex } from '../../../helpers/getCollapseIndex';
import { DictionaryPropertyAsFn, textProvider, Texts } from '../../../helpers/texts-provider';
import { MultiSelectModeType, MultiSelectOptionType } from '../../../helpers/types';
import { TagValue } from '../TagValue';
import { TagValueMore } from '../TagValueMore';

export function MultiValue({
  children,
  getValue,
  index,
  selectProps: { mode },
  removeProps,
  clearValue,
  data,
}: MultiValueProps<MultiSelectOptionType> & { index?: number }) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const value = getValue();
  const collapseIndex = getCollapseIndex(value.length, mode.props.collapseOnReaching);

  if (typeof index === 'undefined' || (typeof collapseIndex === 'number' && collapseIndex < index)) {
    return <></>;
  }

  const onRemoveClick = !data.isFixed
    ? (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        removeProps.onClick(e);
      }
    : undefined;

  if (collapseIndex !== index) {
    return (
      <TagValue className={mode.props.tagValueClassName} value={children as ReactText} onRemoveClick={onRemoveClick} />
    );
  }

  if (mode.type === MultiSelectModeType.InMenuSearch && collapseIndex === 0) {
    return (
      <TagValue
        value={textProvider<DictionaryPropertyAsFn>(languageCode, Texts.Selected)({ count: value.length })}
        onRemoveClick={clearValue}
      />
    );
  }

  return (
    <TagValueMore
      dropdownMenuClassName={mode.props.tagValuesDropdownClassName}
      items={value.slice(collapseIndex)}
      onRemove={onRemoveClick}
    />
  );
}
