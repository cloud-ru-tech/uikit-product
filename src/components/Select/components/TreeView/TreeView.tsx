import React, { FC, useMemo } from 'react';

import { Select, ISelectProps } from 'components/Select';
import {
  Menu,
  IMenuProps,
  IOptionProps,
  ValueContainer,
} from 'components/Select/helperComponents/TreeView';
import { DropdownIndicator } from 'components/Select/helpers/getSharedComponents';

type ITreeViewProps = ISelectProps<IOptionProps>;

/* FIXME:
 *   1. Не закрывается(допилить click outside)
 *   2. как отображать выбранные значения ?
 *   3. Типы */
export const TreeView: FC<ITreeViewProps> = props => {
  const { options, onChange, value } = props;
  // FIXME: пофиксить any после рафакторинга типов select-a components?
  const MenuMemo = useMemo(
    () => (menuProps: IMenuProps): JSX.Element => (
      <Menu {...menuProps} placeholderSearch='Поиск по организации' />
    ),
    [],
  );

  // TODO: IndicatorSeparator, DropdownIndicator добавить в react-select по умолчанию
  return (
    <Select
      backspaceRemovesValue={false}
      components={{
        ValueContainer,
        ClearIndicator: () => null,
        Menu: MenuMemo,
        DropdownIndicator,
        IndicatorSeparator: () => null,
      }}
      closeMenuOnSelect={false}
      value={value}
      onChange={onChange}
      placeholder='Добавить пользователей'
      placeholderSearch='Поиск по организации'
      options={options}
    />
  );
};
