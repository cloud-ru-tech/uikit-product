import { AddSVG, CrossSVG } from '@sbercloud/icons';
import { Divider } from '@sbercloud/uikit-react-divider';
import { useLanguage } from '@sbercloud/uikit-react-localization';
import { OptionTypeBase } from '@sbercloud/uikit-react-select';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ActionButton } from '../helperComponents/ActionButton';
import { Container } from '../helperComponents/Container';
import { FilterRow } from '../helperComponents/FilterRow';
import * as errors from '../helpers/errors';
import { getFirstValueFromSelect } from '../helpers/getValue';
import { logicOptions } from '../helpers/logicOptions';
import { parseQuery } from '../helpers/parseQuery';
import { Texts, textProvider } from '../helpers/texts-provider';
import { IFilterProps, TFilterValueType } from '../helpers/types';
import * as S from './styled';

export type { TFilterValueType, IFilterProps };

export const Filter: React.FC<IFilterProps> = ({ filterOptions = [], value = [], onChange, children, className }) => {
  const language = useLanguage({ onlyEnabledLanguage: true });
  const [isMoreFilter, setIsMoreFilter] = useState<boolean>();
  const [noFilteredProps, setNoFilteredProps] = useState<OptionTypeBase[]>();
  const [parsedValue, setParsedValue] = useState<TFilterValueType[]>([]);
  const logicOptionsList = useMemo(() => logicOptions(language), [language]);

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
      const { value: id, sourceData, includeConditions } = noFilteredProps?.[0] || {};

      const nextValue = sourceData ? [getFirstValueFromSelect(sourceData)] : [''];
      const condition = includeConditions ? includeConditions[0] : logicOptionsList[0];
      if (!id) return;

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
            badgeText: parsedValue.length > 0 ? `${parsedValue.length}` : '',
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
            <Divider style={{ margin: 0 }} />
            <S.Actions>
              {isMoreFilter && (
                <ActionButton onClick={addNewValue}>
                  <AddSVG /> {textProvider(language, Texts.addFilter)}
                </ActionButton>
              )}
              <ActionButton
                onClick={(e): void => {
                  e.stopPropagation();
                  handleChange([]);
                }}
              >
                <CrossSVG />
                {textProvider(language, Texts.reset)}
              </ActionButton>
            </S.Actions>
          </>
        ) : (
          <S.Empty>
            <ActionButton onClick={addNewValue}>
              <AddSVG /> {textProvider(language, Texts.addFilter)}
            </ActionButton>
          </S.Empty>
        )}
      </div>
    </Container>
  );
};
