import cn from 'classnames';

import { Avatar } from '@snack-uikit/avatar';
import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';
import { TruncateString } from '@snack-uikit/truncate-string';

import { ProductOption } from '../../../../types';
import styles from './styles.modules.scss';

type ProductSelectTriggerProps = {
  selectedProduct: ProductOption;
  isOpen?: boolean;
  onClick?(): void;
  className?: string;
};

export function ProductSelectTrigger({ selectedProduct, isOpen, onClick, className }: ProductSelectTriggerProps) {
  return (
    <div
      className={cn(styles.select, className)}
      tabIndex={0}
      role={'menu'}
      data-open={isOpen || undefined}
      data-test-id='header__drawer-menu-select'
      onClick={onClick}
    >
      <div className={styles.logo}>
        {selectedProduct.logo ?? <Avatar size='xs' name={selectedProduct.name} showTwoSymbols shape='square' />}
      </div>

      <div className={styles.selectedSection}>
        <div className={styles.selectedHeading} data-test-id='header__drawer-menu-select-product-category'>
          {selectedProduct.category}
        </div>

        <div className={styles.selectedOption} data-test-id='header__drawer-menu-select-product-name'>
          <TruncateString text={selectedProduct.name} hideTooltip />
        </div>
      </div>

      <div className={styles.chevron}>{isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}</div>
    </div>
  );
}
