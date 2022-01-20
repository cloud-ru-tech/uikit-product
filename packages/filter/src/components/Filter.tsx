import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Divider } from '@sbercloud/uikit-react-divider';
import { CloseInterfaceSVG, PlusInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { useLanguage } from '@sbercloud/uikit-utils';

import { ActionButton } from '../helperComponents/ActionButton';
import { Container } from '../helperComponents/Container';
import { FilterRow } from '../helperComponents/FilterRow';
import * as errors from '../helpers/errors';
import { getDefaultValue } from '../helpers/getValue';
import { logicOptions } from '../helpers/logicOptions';
import { parseQuery } from '../helpers/parseQuery';
import { Texts, textProvider } from '../helpers/texts-provider';
import { DatepickerType, IFilterProps, TFilterOption, TFilterOptionType, TFilterValueType } from '../helpers/types';
import * as S from './styled';

export type { TFilterValueType, IFilterProps };
export { TFilterOptionType, DatepickerType };

export const Filter: FC<IFilterProps> = ({ filterOptions = [], value = [], onChange, children, className }) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [isMoreFilter, setIsMoreFilter] = useState<boolean>();
  const [noFilteredProps, setNoFilteredProps] = useState<TFilterOption[]>();
  const [parsedValue, setParsedValue] = useState<TFilterValueType[]>([]);
  const logicOptionsList = useMemo(() => logicOptions(languageCode), [languageCode]);

  useEffect(() => {
    if (!value) return;

    const isArray = Array.isArray(value);
    const isString = typeof value === 'string';

    if (isArray) {
      setParsedValue(value as TFilterValueType[]);
      return;
    }
    if (isString) {
      try {
        const parsed = parseQuery(value as string);
        const isParsedArray = Array.isArray(parsed);
        if (!isParsedArray) {
          errors.notValid();
          return;
        }

        setParsedValue(parsed);
      } catch (error) {
        errors.notValid();
      }
      return;
    }

    errors.notValid();
  }, [value]);

  useEffect(() => {
    const filteredProps = parsedValue.map(filterSettings => filterSettings.id);
    const noInFilter = filterOptions.filter(fOptions => filteredProps.indexOf(fOptions.value) === -1);
    setNoFilteredProps(noInFilter);
    setIsMoreFilter(Boolean(noInFilter.length));
  }, [filterOptions, parsedValue]);

  const handleChange = useCallback(
    val => {
      const queryString = encodeURIComponent(JSON.stringify(val));
      onChange?.(val, queryString);
    },
    [onChange],
  );

  const addNewValue = useCallback(
    e => {
      e.stopPropagation();
      const { value: id, type, sourceData, includeConditions } = noFilteredProps?.[0] || {};

      if (!id || !type) return;

      const nextValue = [getDefaultValue(sourceData, type)];
      const condition = includeConditions ? includeConditions[0] : logicOptionsList[0];

      const newValue: TFilterValueType = {
        id,
        value: nextValue,
        condition,
      };

      handleChange?.([...parsedValue, newValue]);
    },
    [noFilteredProps, parsedValue, handleChange, logicOptionsList],
  );

  const getTrigger = useCallback(
    (show: boolean) =>
      typeof children === 'function'
        ? children({
            badgeNumber: parsedValue.length > 0 ? parsedValue.length : undefined,
            open: show,
          })
        : children,
    [children, parsedValue],
  );

  return (
    <Container className={className} getTrigger={getTrigger}>
      <div>
        {value.length ? (
          <>
            <S.Filters>
              {parsedValue.map((propValue: TFilterValueType, index: number) => (
                <FilterRow
                  key={propValue.id}
                  propValue={propValue}
                  index={index}
                  value={parsedValue}
                  filterOptions={filterOptions}
                  noFilteredProps={noFilteredProps}
                  onChange={handleChange}
                />
              ))}
            </S.Filters>
            <Divider />
            <S.Actions>
              {isMoreFilter && (
                <ActionButton onClick={addNewValue}>
                  <PlusInterfaceSVG /> {textProvider(languageCode, Texts.AddFilter)}
                </ActionButton>
              )}
              <ActionButton
                onClick={(e): void => {
                  e.stopPropagation();
                  handleChange([]);
                }}
              >
                <CloseInterfaceSVG />
                {textProvider(languageCode, Texts.Reset)}
              </ActionButton>
            </S.Actions>
          </>
        ) : (
          <S.Empty>
            <ActionButton onClick={addNewValue}>
              <PlusInterfaceSVG /> {textProvider(languageCode, Texts.AddFilter)}
            </ActionButton>
          </S.Empty>
        )}
      </div>
    </Container>
  );
};
