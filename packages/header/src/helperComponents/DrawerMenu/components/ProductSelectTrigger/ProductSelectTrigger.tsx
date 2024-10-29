import cn from 'classnames';

import { ChevronDownSVG, ChevronUpSVG } from '@sbercloud/uikit-product-icons';
import { Avatar } from '@snack-uikit/avatar';
import { TruncateString } from '@snack-uikit/truncate-string';

import { ProductOption } from '../../../../types';
import styles from './styles.module.scss';

type ProductSelectTriggerProps = {
  selectedProduct: ProductOption;
  isOpen?: boolean;
  onClick?(): void;
  className?: string;
  hasChoice: boolean;
};

export function ProductSelectTrigger({
  selectedProduct,
  isOpen,
  onClick,
  className,
  hasChoice,
}: ProductSelectTriggerProps) {
  return (
    <div
      className={cn(styles.select, className)}
      tabIndex={0}
      role={'menu'}
      data-open={isOpen || undefined}
      data-test-id='header__drawer-menu__select'
      onClick={onClick}
      data-active={hasChoice}
    >
      <div className={styles.logo}>
        {selectedProduct.logo ?? <Avatar size='xs' name={selectedProduct.name} showTwoSymbols shape='square' />}
      </div>

      <div className={styles.selectedSection}>
        <div className={styles.selectedHeading} data-test-id='header__drawer-menu__select-product-category'>
          {selectedProduct.category}
        </div>

        <div className={styles.selectedOption} data-test-id='header__drawer-menu__select-product-name'>
          <TruncateString text={selectedProduct.name} hideTooltip />
        </div>
      </div>

      {hasChoice && <div className={styles.chevron}>{isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}</div>}
    </div>
  );
}
