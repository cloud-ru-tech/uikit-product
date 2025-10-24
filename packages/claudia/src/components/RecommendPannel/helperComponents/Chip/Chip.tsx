import cn from 'classnames';
import { forwardRef, MouseEventHandler } from 'react';

import { LAYOUT_TYPE, LayoutType } from '@sbercloud/uikit-product-utils';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { CHIP_TYPE, ChipType, SIZE, Size } from '../../types';
import styles from './styles.module.scss';

type ChipProps = {
  type: ChipType;
  label: string;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  isVisible?: boolean;
  size: Size;
  layoutType?: LayoutType;
};

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ layoutType, type, label, onClick, size, className }, ref) => {
    const isDefaultType = type === CHIP_TYPE.Default;
    const isMobile = layoutType === LAYOUT_TYPE.Mobile;
    const isMobileChipSize = isMobile || size === SIZE.M;

    return (
      <button
        ref={ref}
        data-mobile={isMobileChipSize || undefined}
        className={cn(
          styles.chip,
          {
            [styles.chipOutline]: !isDefaultType,
            [styles.chipDefault]: isDefaultType,
          },
          className,
        )}
        onClick={onClick}
      >
        <Typography.SansBodyS className={styles.text}>
          <TruncateString variant='end' placement='top' text={label} maxLines={1} />
        </Typography.SansBodyS>
      </button>
    );
  },
);
