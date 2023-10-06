import { forwardRef, ReactNode } from 'react';

import { ChipFilterLabelValue } from '../../types';
import { ClearFilterButton } from '../ClearFilterButton';
import * as S from './styled';

type FilterTriggerProps = {
  innerLabel: ReactNode;
  showClearButton?: boolean;
  onClear(): void;
  onClick?(): void;
} & ChipFilterLabelValue;

export const Trigger = forwardRef<HTMLDivElement, FilterTriggerProps>(
  ({ label, icon, innerLabel, showClearButton, onClear, onClick }, ref) => (
    <S.Chip onClick={onClick} ref={ref}>
      <S.FilterLabel>{label ? `${label}:` : icon}</S.FilterLabel>
      <S.InnerLabel>{innerLabel}</S.InnerLabel>

      {showClearButton && <ClearFilterButton onClick={onClear} />}
    </S.Chip>
  ),
);
