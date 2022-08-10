import { KeyboardEvent, ReactText, useMemo } from 'react';
import RCSelect, { ActionMeta, createFilter, ValueType } from 'react-select';

import { SelectActionTypes } from '../../constants';
import { CustomOption, MultiValue } from '../../helperComponents/MultiSelect';
import { MultiselectOptionType, SelectSizes } from '../../helpers/types';
import { styles } from '../../styles/multiSelect';
import * as S from './styled';

export type MultiSelectProps = {
  size?: SelectSizes;
  options: MultiselectOptionType[];
  value: MultiselectOptionType[];
  onSelectOption(option?: MultiselectOptionType): void;
  onRemoveOption(option?: MultiselectOptionType): void;
  onBlur?(): void;
  onKeyDown?(e: KeyboardEvent<HTMLElement>): void;
  onInputChange?(value: string): void;
  inputValue?: string;
  label?: ReactText;
  placeholder?: ReactText;
  className?: string;
};

export function MultiSelect({
  size = SelectSizes.Large,
  options,
  value,
  inputValue,
  onSelectOption,
  onRemoveOption,
  onKeyDown,
  onBlur,
  onInputChange,
  label,
  className,
  placeholder,
}: MultiSelectProps) {
  const handleChange = (value: ValueType<MultiselectOptionType, true>, meta: ActionMeta<MultiselectOptionType>) => {
    switch (meta.action) {
      case SelectActionTypes.RemoveValue:
        onRemoveOption(meta.removedValue);
        break;
      case SelectActionTypes.SelectOption:
        onSelectOption(meta.option);
        break;
      case SelectActionTypes.PopValue:
        onRemoveOption(meta.removedValue);
        break;
      default:
        break;
    }
  };

  const selectStyles = useMemo(() => styles(size), [size]);

  return (
    <S.MultiSelectWrap className={className}>
      {label && <S.Label>{label}</S.Label>}
      <RCSelect
        options={options}
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onBlur={onBlur}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        isMulti
        isSearchable
        backspaceRemovesValue
        filterOption={createFilter({
          ignoreCase: true,
          ignoreAccents: false,
          trim: true,
          matchFrom: 'start' as const,
        })}
        styles={selectStyles}
        isClearable={false}
        placeholder={placeholder}
        components={{
          IndicatorsContainer: () => <></>,
          NoOptionsMessage: () => <></>,
          MultiValue,
          Option: CustomOption,
        }}
      />
    </S.MultiSelectWrap>
  );
}

MultiSelect.size = SelectSizes;
