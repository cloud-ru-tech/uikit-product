import { CloseInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Input } from '@sbercloud/uikit-react-input';
import { useLanguage } from '@sbercloud/uikit-react-localization';
import { OptionTypeBase, Select } from '@sbercloud/uikit-react-select';
import cloneDeep from 'lodash.clonedeep';
import { useCallback, useMemo } from 'react';

import { findSelectValue } from '../../helpers/getValue';
import { LogicConditionType, getLogicOptionByValue, logicOptions } from '../../helpers/logicOptions';
import { IFilterRowProps, TFilterValueType } from '../../helpers/types';
import { ActionButton } from '../ActionButton';
import * as S from './styled';

export const FilterRow: React.FC<IFilterRowProps> = ({
  value = [],
  index,
  propValue = {},
  filterOptions,
  noFilteredProps = [],
  onChange,
}) => {
  const language = useLanguage({ onlyEnabledLanguage: true });
  const handleChange = useCallback(
    (propName: string, val: unknown) => {
      const nextValue = cloneDeep(value);
      if (typeof index !== 'number') return;

      nextValue[index][propName] = val;
      onChange?.(nextValue);
    },
    [value],
  );
  const logicOptionsList = useMemo(() => logicOptions(language), [language]);
  const logicOptionByValue = useMemo(() => getLogicOptionByValue(language), [language]);

  const filterOption = useMemo(() => filterOptions?.find(fOpt => fOpt.value === propValue.id), [filterOptions]);

  const initValueOption = useMemo(() => {
    const { value } = propValue;
    const filterVal = filterOptions?.find(option => option.value === propValue.id);
    return filterVal?.sourceData ? findSelectValue(filterVal?.sourceData, value as string[]) : propValue?.value?.[0];
  }, [propValue, filterOptions]);

  const includedLogicOptions = useMemo(
    () =>
      filterOption?.includeConditions
        ? logicOptionsList.filter(
            lOption => filterOption?.includeConditions.indexOf(lOption.value as LogicConditionType) !== -1,
          )
        : logicOptionsList,
    [filterOption, logicOptionsList],
  );

  return (
    <S.FilterRow>
      <S.FilterColumn>
        <Select
          defaultValue={filterOption}
          options={[filterOption, ...noFilteredProps]}
          type='medium'
          onChange={(option: OptionTypeBase): void => {
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
          }}
        />
      </S.FilterColumn>
      <S.FilterColumn>
        <Select
          defaultValue={propValue?.condition && logicOptionByValue[propValue.condition]}
          options={includedLogicOptions}
          type='medium'
          onChange={(option: OptionTypeBase): void => {
            handleChange('condition', option.value);
          }}
        />
      </S.FilterColumn>

      <S.FilterColumn>
        {filterOption?.sourceData ? (
          <Select
            optionNoWrap
            defaultValue={initValueOption}
            options={filterOption?.sourceData}
            type='medium'
            onChange={(option: OptionTypeBase): void => {
              handleChange('value', [option.value]);
            }}
          />
        ) : (
          <Input
            value={initValueOption as string}
            onChange={(e): void => {
              handleChange('value', [e.target.value]);
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
