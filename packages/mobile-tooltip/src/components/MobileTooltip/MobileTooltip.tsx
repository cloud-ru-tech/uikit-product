import { ReactNode } from 'react';

import { PopoverPrivate, PopoverPrivateProps } from '@snack-uikit/popover-private';
import { WithSupportProps } from '@snack-uikit/utils';

import { DEFAULT_FALLBACK_PLACEMENTS } from './constants';
import styles from './styles.module.scss';

export type MobileTooltipProps = WithSupportProps<
  {
    /** Содержимое тултипа */
    tip: ReactNode;
    /** Отключение ограничения ширины тултипа @default false */
    disableMaxWidth?: boolean;
  } & Pick<
    PopoverPrivateProps,
    | 'className'
    | 'triggerClassName'
    | 'open'
    | 'onOpenChange'
    | 'hoverDelayOpen'
    | 'hoverDelayClose'
    | 'triggerRef'
    | 'disableSpanWrapper'
    | 'fallbackPlacements'
  > &
    Partial<Pick<PopoverPrivateProps, 'trigger' | 'placement' | 'children'>>
>;

export function MobileTooltip({
  tip,
  trigger = 'hoverAndFocusVisible',
  placement = 'top',
  children,
  disableMaxWidth = false,
  ...otherProps
}: MobileTooltipProps) {
  if (!children) {
    return null;
  }

  return (
    <PopoverPrivate
      placement={placement}
      popoverContent={
        <div className={styles.tooltipContainer} data-disable-max-width={disableMaxWidth} data-placement={placement}>
          {tip}
        </div>
      }
      trigger={trigger}
      arrowContainerClassName={styles.tooltipArrowContainer}
      arrowElementClassName={styles.tooltipArrowElement}
      hasArrow
      fallbackPlacements={DEFAULT_FALLBACK_PLACEMENTS}
      {...otherProps}
    >
      {children}
    </PopoverPrivate>
  );
}
