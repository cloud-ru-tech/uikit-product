import cloneDeep from 'lodash.clonedeep';
import { FC, useCallback, useMemo } from 'react';

import { DatePicker } from '@sbercloud/uikit-product-datepicker';
import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { SimpleInput } from '@sbercloud/uikit-product-input-private';
import { OptionTypeBase, Select } from '@sbercloud/uikit-product-select';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { findSelectValue } from '../../helpers/getValue';
import { LogicConditionType, getLogicOptionByValue, logicOptions } from '../../helpers/logicOptions';
import { IFilterRowProps, TFilterOptionType, TFilterValueType } from '../../helpers/types';
import { ActionButton } from '../ActionButton';
import * as S from './styled';

export const FilterRow: FC<IFilterRowProps> = ({
  value = [],
  index,
  propValue = {},
  filterOptions,
  noFilteredProps = [],
  onChange,
}) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const handleChange = useCallback(
    (propName: string, val: unknown) => {
      const nextValue = cloneDeep(value);
      if (typeof index !== 'number') return;

      nextValue[index][propName] = val;
      onChange?.(nextValue);
    },
    [index, onChange, value],
  );

  const logicOptionsList = useMemo(() => logicOptions(languageCode), [languageCode]);
  const logicOptionByValue = useMemo(() => getLogicOptionByValue(languageCode), [languageCode]);

  const filterOption = useMemo(
    () => filterOptions?.find(fOpt => fOpt.value === propValue.id),
    [filterOptions, propValue.id],
  );

  const initValueOption = useMemo(() => {
    const { value } = propValue;

    let initValue;

    if (filterOption?.type === TFilterOptionType.Select && filterOption.sourceData) {
      initValue = findSelectValue(filterOption?.sourceData, value as string[]);
    }

    if (filterOption?.type === TFilterOptionType.Datepicker) {
      initValue = propValue.value?.[0] ? new Date(propValue.value[0]) : undefined;

      if (!initValue && filterOption.sourceData?.[0].value) {
        initValue = filterOption.sourceData[0].value;
      }

      return initValue;
    }

    return initValue || value?.[0];
  }, [propValue, filterOption]);

  const includedLogicOptions = useMemo(
    () =>
      filterOption?.includeConditions
        ? logicOptionsList.filter(
            lOption => filterOption?.includeConditions.indexOf(lOption.value as LogicConditionType) !== -1,
          )
        : logicOptionsList,
    [filterOption, logicOptionsList],
  );

  const handleChangeFilterType = (option: OptionTypeBase): void => {
    if (option.value === propValue.id) return;

    const newId = option.value;
    const filterProp = noFilteredProps.filter(filterProp => filterProp.value === newId)?.[0];
    const { sourceData, includeConditions } = filterProp;

    const nextSourceValue = sourceData ? [sourceData[0].value] : [''];
    const condition = includeConditions ? includeConditions[0] : logicOptionsList[0];

    if (!newId) return;

    const newValue: TFilterValueType = {
      id: newId,
      value: nextSourceValue,
      condition,
    };

    const nextValue = cloneDeep(value);
    if (typeof index === 'number') nextValue.splice(index, 1);

    onChange?.([...nextValue, newValue]);
  };

  return (
    <S.FilterRow>
      <S.FilterColumn>
        <Select
          defaultValue={filterOption}
          options={[filterOption, ...noFilteredProps]}
          type='medium'
          onChange={handleChangeFilterType}
        />
      </S.FilterColumn>
      <S.FilterColumn>
        <Select
          defaultValue={propValue?.condition && logicOptionByValue[propValue.condition as string]}
          options={includedLogicOptions}
          type='medium'
          onChange={(option: OptionTypeBase): void => {
            handleChange('condition', option.value);
          }}
        />
      </S.FilterColumn>

      <S.FilterColumn>
        {filterOption?.type === TFilterOptionType.Select && (
          <Select
            optionNoWrap
            defaultValue={initValueOption}
            options={filterOption?.sourceData}
            type='medium'
            onChange={(option: OptionTypeBase): void => {
              handleChange('value', [option.value]);
            }}
          />
        )}

        {filterOption?.type === TFilterOptionType.Datepicker && (
          <DatePicker
            value={initValueOption}
            size={DatePicker.size.m}
            pickTime={filterOption.datepickerType || DatePicker.time.None}
            onChange={date => handleChange('value', [date])}
          />
        )}

        {filterOption?.type === TFilterOptionType.Input && (
          <SimpleInput
            value={initValueOption as string}
            onChange={(value): void => {
              handleChange('value', [value]);
            }}
            className={S.filterInputClassName}
          />
        )}
      </S.FilterColumn>

      <S.FilterColumn data-delete>
        <ActionButton
          onClick={(e): void => {
            e.stopPropagation();
            const nextValue = cloneDeep(value);
            if (typeof index === 'number') nextValue.splice(index, 1);
            onChange?.(nextValue);
          }}
        >
          <CloseInterfaceSVG />
        </ActionButton>
      </S.FilterColumn>
    </S.FilterRow>
  );
};
