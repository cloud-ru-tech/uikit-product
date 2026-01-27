import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { ButtonTonal, ButtonTonalProps } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { SkeletonContextProvider, SkeletonText, WithSkeleton } from '@snack-uikit/skeleton';
import { QuestionTooltip, QuestionTooltipProps, Tooltip, TooltipProps } from '@snack-uikit/tooltip';
import { TruncateString } from '@snack-uikit/truncate-string';

import styles from './styles.module.scss';

type RowActionButton = {
  tip?: Pick<TooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'> | string;
} & Omit<ButtonTonalProps, 'size' | 'appearance' | 'label'>;

export type InfoRowPropsBase = {
  label: string;
  labelTruncate?: number;
  labelTooltip?:
    | Pick<QuestionTooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'>
    | string;
  topDivider?: boolean;
  bottomDivider?: boolean;
  className?: string;
  labelClassName?: string;
  rowClassName?: string;
  content?: ReactNode;
  rowActions?: {
    first: RowActionButton;
    second?: RowActionButton;
  };
  loading?: boolean;
  width?: 'fixed' | 'full';
  labelWidth?: 'fixed' | 'auto';
};

export type InfoRowProps = WithSupportProps<InfoRowPropsBase>;

export function withTip(children: ReactNode, tip?: TooltipProps | string) {
  if (!tip) {
    return children;
  }

  return typeof tip === 'string' ? <Tooltip tip={tip}>{children}</Tooltip> : <Tooltip {...tip}>{children}</Tooltip>;
}

export function InfoRow({
  label,
  topDivider = true,
  bottomDivider = true,
  className,
  labelTooltip,
  content,
  rowActions,
  labelTruncate = 1,
  loading = false,
  width = 'fixed',
  labelClassName,
  rowClassName,
  labelWidth,
  ...rest
}: InfoRowProps) {
  return (
    <div {...extractSupportProps(rest)} className={cn(styles.wrapper, className)} data-width={width}>
      {topDivider && <Divider weight='light' />}

      <div className={cn(styles.infoRow, rowClassName)}>
        <div className={cn(styles.labelLayout, labelClassName)} data-label-width={labelWidth}>
          <TruncateString className={styles.label} text={label} maxLines={labelTruncate} />

          {labelTooltip &&
            (typeof labelTooltip === 'string' ? (
              <QuestionTooltip tip={labelTooltip} size='xs' placement='top' trigger='hover' tabIndex={-1} />
            ) : (
              <QuestionTooltip {...labelTooltip} size='xs' />
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

      {bottomDivider && <Divider weight='light' />}
    </div>
  );
}
