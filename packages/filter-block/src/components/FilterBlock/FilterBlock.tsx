import { Button } from '@sbercloud/uikit-product-button';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { FilterTypes, MAX_FILTER_AMOUNT } from '../../constants';
import { textProvider, Texts } from '../../helpers/textProviders';
import { FastFilters as FastFiltersType, Filters } from '../../types';
import { CheckboxFilters } from '../CheckboxFilters';
import { FastFilters } from '../Fastfilters';
import { RadioFilters } from '../RadioFilters';
import * as S from './styled';

export type FilterBlockProps = {
  fastFilters?: {
    items: FastFiltersType;
    activeItems: string[];
    onFilterChange(field: string): void;
  };
  filters: {
    items: Filters;
    activeItems: { [key: string]: string[] | string };
    onFilterChange(title: string, field: string, type: FilterTypes): void;
  };
  onResetButtonClick(): void;
  maxFiltersAmount?: number;
  className?: string;
};

export function FilterBlock({
  fastFilters,
  filters,
  onResetButtonClick,
  maxFiltersAmount = MAX_FILTER_AMOUNT,
  className,
}: FilterBlockProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const { onFilterChange } = filters;
  const hasResetButton = Boolean(Object.entries(filters.activeItems).length || fastFilters?.activeItems.length);

  return (
    <S.FilterWrap className={className}>
      <FastFilters fastFilters={fastFilters} />
      {filters.items.map(filter => (
        <S.FiltersBlock key={filter.id}>
          <S.Title>{filter.title}</S.Title>
          <S.FilterOptions>
            {filter.type === FilterTypes.Checkbox ? (
              <CheckboxFilters
                filter={filter}
                activeItems={(filters.activeItems[filter.title] as string[]) || []}
                onChange={onFilterChange}
                maxFiltersAmount={maxFiltersAmount}
              />
            ) : (
              <RadioFilters
                filter={filter}
                activeRadio={(filters.activeItems[filter.title] as string) || ''}
                onChange={onFilterChange}
                maxFiltersAmount={maxFiltersAmount}
              />
            )}
          </S.FilterOptions>
        </S.FiltersBlock>
      ))}
      {hasResetButton && (
        <S.StyledButton
          onClick={onResetButtonClick}
          text={textProvider(languageCode, Texts.ClearFilters)}
          variant={Button.variants.Transparent}
        />
      )}
    </S.FilterWrap>
  );
}
