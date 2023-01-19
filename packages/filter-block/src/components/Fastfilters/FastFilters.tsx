import { FastFilters as FastFiltersType } from '../../types';
import * as S from './styled';

export type FastFiltersProps = {
  fastFilters?: {
    items: FastFiltersType;
    activeItems: string[];
    onFilterChange(field: string): void;
  };
};

export function FastFilters({ fastFilters }: FastFiltersProps) {
  if (!fastFilters) return <></>;
  const { items, activeItems, onFilterChange } = fastFilters;

  return (
    <S.FiltersBlock>
      {items.map(item => (
        <S.FastFilter
          onClick={() => onFilterChange(item.id)}
          data-active={activeItems.includes(item.id) || undefined}
          key={item.id}
        >
          <S.IconWrap>{item.icon}</S.IconWrap>
          {item.name}
        </S.FastFilter>
      ))}
    </S.FiltersBlock>
  );
}
