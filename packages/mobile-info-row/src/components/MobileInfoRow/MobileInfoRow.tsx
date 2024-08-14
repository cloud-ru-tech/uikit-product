import cn from 'classnames';
import { ReactNode } from 'react';

import {
  MobileQuestionTooltip,
  MobileQuestionTooltipProps,
  MobileTooltip,
  MobileTooltipProps,
} from '@sbercloud/uikit-product-mobile-tooltip';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonTonal, ButtonTonalProps } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { SkeletonContextProvider, SkeletonText, WithSkeleton } from '@snack-uikit/skeleton';

import { POSITION } from '../../constants';
import { Position } from '../../types';
import styles from './styles.module.scss';

type RowActionButton = {
  tip?:
    | Pick<MobileTooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'>
    | string;
} & Omit<ButtonTonalProps, 'size' | 'appearance' | 'label'>;

export type MobileInfoRowPropsBase = {
  position?: Position;
  label: string;
  labelTruncate?: number;
  labelTooltip?:
    | Pick<MobileQuestionTooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'>
    | string;
  topDivider?: boolean;
  bottomDivider?: boolean;
  className?: string;
  content?: ReactNode;
  rowActions?: {
    first: RowActionButton;
    second?: RowActionButton;
  };
  loading?: boolean;
};

export type MobileInfoRowProps = WithSupportProps<MobileInfoRowPropsBase>;

export function withTip(children: ReactNode, tip?: MobileTooltipProps | string) {
  if (!tip) {
    return children;
  }

  return typeof tip === 'string' ? (
    <MobileTooltip tip={tip}>{children}</MobileTooltip>
  ) : (
    <MobileTooltip {...tip}>{children}</MobileTooltip>
  );
}

export function MobileInfoRow({
  label,
  topDivider = true,
  bottomDivider = true,
  className,
  labelTooltip,
  content,
  rowActions,
  loading = false,
  position = POSITION.Inner,
  ...rest
}: MobileInfoRowProps) {
  return (
    <div {...extractSupportProps(rest)} className={cn(styles.wrapper, className)}>
      {topDivider && position !== POSITION.First && <Divider weight='regular' />}

      <div className={styles.infoRow} data-position={position}>
        <div className={styles.labelLayout}>
          {label}

          {labelTooltip &&
            (typeof labelTooltip === 'string' ? (
              <MobileQuestionTooltip tip={labelTooltip} size='xs' placement='top' trigger='hover' tabIndex={-1} />
            ) : (
              <MobileQuestionTooltip {...labelTooltip} size='xs' />
            ))}
        </div>

        <div className={styles.contentLayout}>
          <SkeletonContextProvider loading={loading}>
            <WithSkeleton skeleton={<SkeletonText width={'100%'} lines={1} />}>
              <div className={styles.content}>{content}</div>
            </WithSkeleton>
          </SkeletonContextProvider>

          {rowActions && (
            <div className={styles.rowActions}>
              {withTip(
                <ButtonTonal
                  {...rowActions.first}
                  disabled={loading || rowActions.first.disabled}
                  appearance='neutral'
                  size='s'
                />,
                rowActions.first.tip,
              )}
              {rowActions.second &&
                withTip(
                  <ButtonTonal
                    {...rowActions.second}
                    disabled={loading || rowActions.second.disabled}
                    appearance='neutral'
                    size='s'
                  />,
                  rowActions.second.tip,
                )}
            </div>
          )}
        </div>
      </div>

      {bottomDivider && position !== POSITION.Last && <Divider weight='regular' />}
    </div>
  );
}
