import React, { ReactText } from 'react';
import RCSelect, { ActionMeta, ValueType, createFilter } from 'react-select';

import { SelectActionTypes } from '../../constants';
import { CustomOption, MultiValueRemove } from '../../helperComponents/MultiSelect';
import { MultiselectOptionType } from '../../helpers/types';
import { styles } from '../../styles/multiSelect';
import * as S from './styled';

export type MultiSelectProps = {
  options: MultiselectOptionType[];
  value: MultiselectOptionType[];
  onSelectOption(option?: MultiselectOptionType): void;
  onRemoveOption(option?: MultiselectOptionType): void;
  onBlur?(): void;
  onKeyDown?(e: React.KeyboardEvent<HTMLElement>): void;
  onInputChange?(value: string): void;
  inputValue?: string;
  label?: ReactText;
  placeholder?: ReactText;
  className?: string;
};

export function MultiSelect({
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
    }
  };

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
        styles={styles}
        isClearable={false}
        placeholder={placeholder}
        components={{
          IndicatorsContainer: () => <></>,
          NoOptionsMessage: () => <></>,
          MultiValueRemove,
          Option: CustomOption,
        }}
      />
    </S.MultiSelectWrap>
  );
}
