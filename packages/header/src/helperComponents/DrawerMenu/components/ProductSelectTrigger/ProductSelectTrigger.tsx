import cn from 'classnames';
import { forwardRef } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@sbercloud/uikit-product-icons';
import { Avatar, AvatarProps } from '@snack-uikit/avatar';
import { TruncateString } from '@snack-uikit/truncate-string';

import { ProductOption } from '../../../../types';
import styles from './styles.module.scss';

type ProductSelectTriggerProps = {
  selectedProduct: Omit<ProductOption, 'href'>;
  isOpen?: boolean;
  onClick?(): void;
  className?: string;
  hasChoice: boolean;
  appearance?: AvatarProps['appearance'];
  dataTestIdPostfix: string;
};

export const ProductSelectTrigger = forwardRef<HTMLDivElement, ProductSelectTriggerProps>(
  ({ selectedProduct, isOpen, onClick, className, hasChoice, appearance, dataTestIdPostfix }, ref) => (
    <div
      className={cn(styles.select, className)}
      tabIndex={hasChoice ? 0 : -1}
      role={'menu'}
      data-open={isOpen || undefined}
      data-test-id={`header__drawer-menu__select-${dataTestIdPostfix}`}
      onClick={onClick}
      data-active={hasChoice}
      ref={ref}
    >
      <div className={styles.logo}>
        {selectedProduct.logo ?? (
          <Avatar size='xs' name={selectedProduct.name} showTwoSymbols shape='square' appearance={appearance} />
        )}
      </div>

      <div className={styles.selectedSection}>
        <div
          className={styles.selectedHeading}
          data-test-id={`header__drawer-menu__select-${dataTestIdPostfix}__category`}
        >
          {selectedProduct.category}
        </div>

        <div className={styles.selectedOption} data-test-id={`header__drawer-menu__select-${dataTestIdPostfix}__name`}>
          <TruncateString text={selectedProduct.name} hideTooltip />
        </div>
      </div>

      {hasChoice && <div className={styles.chevron}>{isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}</div>}
    </div>
  ),
);
