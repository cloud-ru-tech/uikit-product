import { forwardRef, ReactNode } from 'react';

import { ChipFilterLabelValue } from '../../types';
import { ClearFilterButton } from '../ClearFilterButton';
import * as S from './styled';

type FilterTriggerProps = {
  innerLabel: ReactNode;
  showClearButton?: boolean;
  onClear(): void;
} & ChipFilterLabelValue;

export const Trigger = forwardRef<HTMLDivElement, FilterTriggerProps>(
  ({ label, icon, innerLabel, showClearButton, onClear }, ref) => (
    <S.Chip ref={ref}>
      <S.FilterLabel>{label || icon}:</S.FilterLabel>
      {innerLabel}

      {showClearButton && <ClearFilterButton onClick={onClear} />}
    </S.Chip>
  ),
);
