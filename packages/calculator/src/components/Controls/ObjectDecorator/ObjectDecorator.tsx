import { QuestionTooltip } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';

import { BaseDecoratorProps } from '../types';
import styles from './styles.module.scss';

export function ObjectDecorator({
  label,
  labelTooltip,
  labelTooltipPlacement,
}: Pick<BaseDecoratorProps, 'label' | 'labelTooltip' | 'labelTooltipPlacement'>) {
  return (
    <span className={styles.title}>
      <Typography.SansTitleM>{label}</Typography.SansTitleM>

      {labelTooltip && (
        <span className={styles.tipWrapperInline}>
          <QuestionTooltip placement={labelTooltipPlacement} data-pointer tip={labelTooltip} size='s' tabIndex={-1} />
        </span>
      )}
    </span>
  );
}
