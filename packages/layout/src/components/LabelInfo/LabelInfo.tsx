import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { QuestionTooltip, QuestionTooltipProps } from '@snack-uikit/tooltip';

import styles from './styles.module.scss';

export type LabelInfoProps = WithSupportProps<{
  label: string;
  tip?: QuestionTooltipProps['tip'];
  className?: string;
  size?: 's' | 'm' | 'l';
}>;

export function LabelInfo({ label, tip, className, size = 's', ...rest }: LabelInfoProps) {
  return (
    <div data-size={size} className={cn(styles.container, className)} {...extractSupportProps(rest)}>
      {label}&nbsp;
      <div className={styles.headline}>{tip && <QuestionTooltip tip={tip} size='s' />}</div>
    </div>
  );
}
