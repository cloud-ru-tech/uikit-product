import { OptionProps } from 'react-select';

import { CheckboxIconPrivate } from '@sbercloud/uikit-product-checkbox';

import { SelectActionTypes } from '../../../constants';
import { MultiSelectModeType, MultiSelectOptionType } from '../../../helpers/types';
import * as S from './styled';

const { RemoveValue, SelectOption } = SelectActionTypes;

export function Option(props: OptionProps<MultiSelectOptionType, true>) {
  const {
    innerProps,
    isSelected,
    isDisabled,
    data,
    selectProps: { mode, onChange },
  } = props;

  if (mode.type === MultiSelectModeType.InMenuSearch) {
    const handleCheckbox = () =>
      onChange?.(data, {
        action: isSelected ? RemoveValue : SelectOption,
        removedValue: data,
        option: data,
      });

    const label = mode.props.renderOption ? mode.props.renderOption(data) : data.label;
    const isFixed = data?.isFixed;

    return (
      <S.CustomOptionWithCheckbox {...innerProps} onClick={!isFixed ? handleCheckbox : undefined}>
        <CheckboxIconPrivate checked={isSelected} disabled={isDisabled || isFixed} />
        <S.Label>{label}</S.Label>
      </S.CustomOptionWithCheckbox>
    );
  }

  return (
    <S.CustomOption {...innerProps}>
      <S.Label>{data.label}</S.Label>
      {data.amount !== undefined && <S.Amount>{data.amount}</S.Amount>}
    </S.CustomOption>
  );
}
