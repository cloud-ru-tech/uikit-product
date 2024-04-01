import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonTonal, ButtonTonalProps } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { QuestionTooltip, QuestionTooltipProps, Tooltip, TooltipProps } from '@snack-uikit/tooltip';
import { TruncateString } from '@snack-uikit/truncate-string';

import styles from './styles.module.scss';

type RowActionButton = {
  tip?: Pick<TooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'> | string;
} & Omit<ButtonTonalProps, 'size' | 'appearance' | 'label'>;

export type InfoRowProps = WithSupportProps<{
  label: string;
  labelTruncate?: number;
  labelTooltip?:
    | Pick<QuestionTooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'>
    | string;
  topDivider?: boolean;
  bottomDivider?: boolean;
  className?: string;
  content?: ReactNode;
  rowActions?: {
    first: RowActionButton;
    second?: RowActionButton;
  };
}>;

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
  ...rest
}: InfoRowProps) {
  return (
    <div {...extractSupportProps(rest)} className={cn(styles.wrapper, className)}>
      {topDivider && <Divider weight='regular' />}

      <div className={styles.infoRow}>
        <div className={styles.labelLayout}>
          <TruncateString text={label} maxLines={labelTruncate} />

          {labelTooltip &&
            (typeof labelTooltip === 'string' ? (
              <QuestionTooltip tip={labelTooltip} size='xs' placement='top' trigger='hover' tabIndex={-1} />
            ) : (
              <QuestionTooltip {...labelTooltip} size='xs' />
            ))}
        </div>
        <div className={styles.contentLayout}>
          <div className={styles.content}>{content}</div>

          {rowActions && (
            <div className={styles.rowActions}>
              {withTip(<ButtonTonal {...rowActions.first} appearance='neutral' size='s' />, rowActions.first.tip)}
              {rowActions.second &&
                withTip(<ButtonTonal {...rowActions.second} appearance='neutral' size='s' />, rowActions.second.tip)}
            </div>
          )}
        </div>
      </div>

      {bottomDivider && <Divider weight='regular' />}
    </div>
  );
}
