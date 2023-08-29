import { useEffect, useRef, useState } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { ClearAllFiltersButton } from '../ClearAllFiltersButton';
import { FilterChip, FilterChipProps } from '../FilterChip';
import * as S from './styled';

// https://github.com/microsoft/TypeScript/issues/31501
type RemoveKey<Type, Key> = {
  [Property in keyof Type as Exclude<Property, Key>]: Type[Property];
};
type ClearFilterFn = { handleClearFilter(): void };
export type FilterValue = Parameters<FilterChipProps['onChange']>[number];
type ForwardedRefs = { [id: string]: ClearFilterFn };
export type FiltersDefaultState = { [id: string]: FilterValue };

export type FilterRowProps<T> = WithSupportProps<{
  filters: RemoveKey<FilterChipProps, 'onChange'>[];
  onChange(filters: T): void;
  className?: string;
  withSingleFilterClearButton?: boolean;
  showClearAllButton?: boolean;
}>;

export type FiltersState = Record<string, unknown>;

export function FilterRow<T extends FiltersState>({
  filters,
  onChange,
  className,
  withSingleFilterClearButton = true,
  showClearAllButton = true,
  ...rest
}: FilterRowProps<T>) {
  const [state, setState] = useState<T>({} as T);
  const filtersRefs = useRef<ForwardedRefs>({});

  const handleChange = (fieldId: string, value: FilterValue) => {
    setState(state => ({
      ...state,
      [fieldId]: value,
    }));
  };

  const handleFiltersClear = () => {
    setState({} as T);
    Object.values(filtersRefs.current).forEach(f => f.handleClearFilter());
  };

  useEffect(() => {
    onChange(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const hasAnyFilter = Object.values(state).some(filter => {
    if (Array.isArray(filter)) {
      return filter.length > 0 && Object.values(filter).some(Boolean);
    }

    if (filter && typeof filter === 'object') {
      return Object.values(filter).some(Boolean);
    }

    return typeof filter === 'boolean' ? true : Boolean(filter);
  });

  return (
    <S.FilterRowContainer className={className} {...extractSupportProps(rest)}>
      <S.FilterChipsContainer>
        {filters.map(filter => (
          <FilterChip
            ref={(ref: ClearFilterFn) => {
              filtersRefs.current[filter.id] = ref;
            }}
            key={filter.id}
            withSingleFilterClearButton={withSingleFilterClearButton}
            {...filter}
            onChange={(value: FilterValue) => handleChange(filter.id, value)}
          />
        ))}
      </S.FilterChipsContainer>

      {hasAnyFilter && showClearAllButton && <ClearAllFiltersButton onClick={handleFiltersClear} />}
    </S.FilterRowContainer>
  );
}

FilterRow.filterTypes = FilterChip.types;
