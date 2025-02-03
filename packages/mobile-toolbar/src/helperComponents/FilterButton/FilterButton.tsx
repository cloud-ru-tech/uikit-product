import { FilterSVG } from '@sbercloud/uikit-product-icons';
import { MobileTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { ButtonFunction } from '@snack-uikit/button';
import { useLocale } from '@snack-uikit/locale';

import { TEST_IDS } from '../../constants';

export type FilterButtonProps = {
  open: boolean;
  onOpenChange(open: boolean): void;
  numberOfFilters?: number;
};

export function FilterButton({ open, onOpenChange, numberOfFilters }: FilterButtonProps) {
  const { t } = useLocale('Toolbar');

  return (
    <MobileTooltip tip={open ? t('hideFilters') : t('showFilters')}>
      <ButtonFunction
        size='m'
        icon={<FilterSVG />}
        onClick={() => onOpenChange(!open)}
        counter={numberOfFilters ? { value: numberOfFilters, appearance: 'neutral' } : undefined}
        data-test-id={TEST_IDS.filterButton}
      />
    </MobileTooltip>
  );
}
