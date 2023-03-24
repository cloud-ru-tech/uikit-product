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
type FilterValue = Parameters<FilterChipProps['onChange']>[number];
type ForwardedRefs = { [id: string]: ClearFilterFn };
export type FiltersState = { [id: string]: FilterValue };

export type FilterRowProps = WithSupportProps<{
  filters: RemoveKey<FilterChipProps, 'onChange'>[];
  onChange(filters: FiltersState): void;
  className?: string;
  withSingleFilterClearButton?: boolean;
}>;

export function FilterRow({
  filters,
  onChange,
  className,
  withSingleFilterClearButton = true,
  ...rest
}: FilterRowProps) {
  const [state, setState] = useState<FiltersState>({});
  const filtersRefs = useRef<ForwardedRefs>({});

  const handleChange = (fieldId: string, value: FilterValue) => {
    setState(state => ({
      ...state,
      [fieldId]: value,
    }));
  };

  const handleFiltersClear = () => {
    setState({});
    Object.values(filtersRefs.current).forEach(f => f.handleClearFilter());
  };

  useEffect(() => {
    onChange(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const hasAnyFilter = Object.values(state).some(filter => {
    if (Array.isArray(filter)) {
      return filter.length > 0;
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

      {hasAnyFilter && <ClearAllFiltersButton onClick={handleFiltersClear} />}
    </S.FilterRowContainer>
  );
}

FilterRow.filterTypes = FilterChip.types;
