import { QuestionTooltip } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';

import { BaseDecoratorProps } from '../types';
import styles from './styles.module.scss';

export function ObjectDecorator({
  label,
  labelTooltip,
  tooltipPlacement,
}: Pick<BaseDecoratorProps, 'label' | 'labelTooltip' | 'tooltipPlacement'>) {
  return (
    <span className={styles.title}>
      <Typography.SansTitleM>{label}</Typography.SansTitleM>

      {labelTooltip && (
        <span className={styles.tipWrapperInline}>
          <QuestionTooltip placement={tooltipPlacement} data-pointer tip={labelTooltip} size='s' tabIndex={-1} />
        </span>
      )}
    </span>
  );
}
