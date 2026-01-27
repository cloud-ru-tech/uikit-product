import cn from 'classnames';

import { CrossFilledSVG } from '@cloud-ru/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { themeVars } from '@snack-uikit/figma-tokens';
import { ProgressBar, ProgressBarProps } from '@snack-uikit/progress-bar';
import { Typography } from '@snack-uikit/typography';

import { DEFAULT_APPEARANCE_BY_PROGRESS, SYMBOL_BY_TYPE } from './constants';
import styles from './styles.module.scss';
import { LoadValueType, ProgressLimitList } from './types';
import { getProgressBarColor } from './utils';

export type LoadStatusProps = WithSupportProps<
  {
    label?: string;
    value?: string;
    hint?: string;
    valueType?: LoadValueType;
    appearanceByProgress?: ProgressLimitList;
    showErrorIcon?: boolean;
    className?: string;
  } & Pick<ProgressBarProps, 'progress' | 'size'>
>;

export function LoadStatus({
  label,
  value,
  hint,
  valueType = 'none',
  progress,
  size = 's',
  appearanceByProgress = DEFAULT_APPEARANCE_BY_PROGRESS,
  showErrorIcon,
  className,
  ...props
}: LoadStatusProps) {
  const progressAppearance = getProgressBarColor(progress, appearanceByProgress);

  const isShowHeader = label || value || valueType !== 'none';

  const symbol = SYMBOL_BY_TYPE[valueType];

  return (
    <div className={cn(styles.loadStatus, className)} {...extractSupportProps(props)}>
      {isShowHeader && (
        <div className={styles.header}>
          <Typography.SansBodyS>
            {label}
            <span className={styles.labelValue}>{value}</span>
          </Typography.SansBodyS>

          {symbol && (
            <Typography.SansBodyS className={styles.valueSymbol}>{`${progress} ${symbol}`}</Typography.SansBodyS>
          )}
        </div>
      )}
      <ProgressBar progress={progress} size={size} appearance={progressAppearance} />
      {hint && (
        <div className={styles.hintWrapper}>
          {showErrorIcon && <CrossFilledSVG color={themeVars.sys.red.accentDefault} size={16} />}

          <Typography.SansBodyS className={styles.hint}>{hint}</Typography.SansBodyS>
        </div>
      )}
    </div>
  );
}
